'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Mic, 
  Paperclip, 
  Send, 
  Volume2, 
  MessageSquare,
  XCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000';

interface Message {
  id: string;
  text: string;
  type: 'user' | 'ai' | 'audio' | 'image';
  audioSrc?: string;
  imageUrl?: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your environmental AI assistant. How can I help you with sustainability insights today?",
      type: 'ai',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'basic' | 'research'>('basic'); // Added mode state
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (text: string, type: 'user' | 'ai' | 'audio' | 'image', audioSrc?: string, imageUrl?: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now().toString(), text, type, audioSrc, imageUrl },
    ]);
  };

  const playAudio = (base64Audio: string) => {
    if (audioPlayerRef.current) {
      const audioBlob = new Blob([Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0))], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      audioPlayerRef.current.src = audioUrl;
      audioPlayerRef.current.play();
    }
  };

  const sendMessage = async () => {
    const message = inputMessage.trim();
    if (message === '') return;

    addMessage(message, 'user');
    setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.filter(msg => msg.type !== 'audio' && msg.type !== 'image').map(msg => ({
        user: msg.type === 'user' ? msg.text : undefined,
        ai: msg.type === 'ai' ? msg.text : undefined,
      }));

      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, history, mode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        addMessage(`Error: ${errorData.error || 'Failed to get response from AI.'}`, 'ai');
        return;
      }

      const data = await response.json();
      addMessage(data.reply_text, 'ai');
      if (data.reply_audio) {
        playAudio(data.reply_audio);
      }
      if (data.image_prompt && data.auto_generate_image) {
        addMessage(`Generating image for: ${data.image_prompt}`, 'ai');
        try {
          const imageResponse = await fetch(`${API_BASE_URL}/generate-image`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: data.image_prompt }),
          });

          if (!imageResponse.ok) {
            const errorData = await imageResponse.json();
            addMessage(`Error generating image: ${errorData.error || 'Failed to generate image.'}`, 'ai');
            return;
          }

          const imageData = await imageResponse.json();
          if (imageData.image_url) {
            addMessage(data.image_prompt, 'image', undefined, imageData.image_url);
          } else {
            addMessage('Error: No image URL received.', 'ai');
          }
        } catch (imageError) {
          console.error('Image generation API error:', imageError);
          addMessage('Error: Could not generate image.', 'ai');
        }
      }

    } catch (error) {
      console.error('Chat API error:', error);
      addMessage('Error: Could not connect to the AI assistant.', 'ai');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          addMessage('', 'audio', URL.createObjectURL(audioBlob));
          setIsLoading(true);

          const formData = new FormData();
          formData.append('audio_data', audioBlob, 'recording.webm');

          try {
            const response = await fetch(`${API_BASE_URL}/transcribe`, {
              method: 'POST',
              body: formData,
            });

            if (!response.ok) {
              const errorData = await response.json();
              addMessage(`Error: ${errorData.error || 'Failed to transcribe audio.'}`, 'ai');
              return;
            }

            const data = await response.json();
            const transcribedText = data.transcribed_text;
            addMessage(`(Transcribed): ${transcribedText}`, 'user');
            // Now send the transcribed text to the chat endpoint
            const history = messages.filter(msg => msg.type !== 'audio' && msg.type !== 'image').map(msg => ({
              user: msg.type === 'user' ? msg.text : undefined,
              ai: msg.type === 'ai' ? msg.text : undefined,
            }));

            const chatResponse = await fetch(`${API_BASE_URL}/chat`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message: transcribedText, history, mode }),
            });

            if (!chatResponse.ok) {
              const errorData = await chatResponse.json();
              addMessage(`Error: ${errorData.error || 'Failed to get response from AI.'}`, 'ai');
              return;
            }

            const chatData = await chatResponse.json();
            addMessage(chatData.reply_text, 'ai');
            if (chatData.reply_audio) {
              playAudio(chatData.reply_audio);
            }
            if (chatData.image_prompt && chatData.auto_generate_image) {
              // Trigger image generation (will implement later)
              addMessage(`Generating image for: ${chatData.image_prompt}`, 'ai');
            }

          } catch (error) {
            console.error('Transcription/Chat API error:', error);
            addMessage('Error: Could not process audio.', 'ai');
          } finally {
            setIsLoading(false);
          }
          
          // Stop all tracks to release microphone
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Unable to access microphone. Please check your permissions.');
      }
    }
  };

  const handleFileAttach = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      addMessage(`📁 Uploaded file: ${file.name}. Analyzing...`, 'user');
      setIsLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`${API_BASE_URL}/upload-file`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          addMessage(`Error: ${errorData.error || 'Failed to analyze file.'}`, 'ai');
          return;
        }

        const data = await response.json();
        addMessage(`Analysis of ${data.filename}:\n${data.analysis}`, 'ai');

      } catch (error) {
        console.error('File upload API error:', error);
        addMessage('Error: Could not upload or analyze file.', 'ai');
      } finally {
        setIsLoading(false);
        event.target.value = ''; // Clear the input
      }
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      {/* Star Background */}
      <div className="star-background">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>

      <Card className="flex-1 flex flex-col bg-gray-800 text-white border border-purple-500 shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-purple-700/20 border-b border-purple-500 p-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            The Strivers AI Assistant
          </CardTitle>
          <CardDescription className="text-gray-300">
            Ask me anything about environmental data, sustainability, or waste management!
          </CardDescription>
        </CardHeader>
        
        <CardContent ref={chatMessagesRef} className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "p-3 rounded-lg max-w-[80%] w-fit",
                message.type === 'user' ? "ml-auto bg-purple-600 text-white" : "mr-auto bg-gray-700 text-white",
                message.type === 'audio' && "ml-auto bg-purple-600 text-white",
                message.type === 'image' && "ml-auto bg-transparent p-0"
              )}
            >
              {message.type === 'audio' ? (
                <audio controls src={message.audioSrc} className="w-64 h-10" />
              ) : message.type === 'image' ? (
                <img src={message.imageUrl} alt={message.text} className="max-w-full h-auto rounded-lg" />
              ) : (
                <p>{message.type === 'user' ? '👤 You:' : '🤖 The Strivers AI:'} {message.text}</p>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="message ai">
              <strong>🤖 The Strivers AI:</strong> Thinking...
            </div>
          )}
        </CardContent>

        <div className="p-4 bg-gray-800 border-t border-purple-500">
          <div className="flex items-center gap-2 bg-gray-700 rounded-full p-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleRecording}
              className={cn(
                "text-purple-300 hover:text-purple-100",
                isRecording && "animate-pulse text-red-400"
              )}
              disabled={isLoading}
            >
              <Mic className="w-5 h-5" />
            </Button>
            <Input
              type="text"
              placeholder="Type your message here..."
              className="flex-1 bg-transparent border-none focus-visible:ring-0 text-white placeholder-gray-400"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
              disabled={isLoading}
            />
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileAttach} 
              className="hidden"
              accept="audio/*,image/*,.pdf,.doc,.docx,.txt"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => fileInputRef.current?.click()}
              className="text-purple-300 hover:text-purple-100"
              disabled={isLoading}
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={sendMessage}
              className="text-purple-300 hover:text-purple-100"
              disabled={isLoading || inputMessage.trim() === ''}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
      <audio ref={audioPlayerRef} className="hidden" />

      <style jsx>{`
        @keyframes starMove {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }

        .star-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #16213e 100%);
        }

        .star {
            position: absolute;
            background: white;
            border-radius: 50%;
            animation: starMove linear infinite;
        }

        .star:nth-child(1) { width: 2px; height: 2px; left: 10%; animation-duration: 15s; animation-delay: 0s; }
        .star:nth-child(2) { width: 3px; height: 3px; left: 20%; animation-duration: 20s; animation-delay: 2s; }
        .star:nth-child(3) { width: 1px; height: 1px; left: 30%; animation-duration: 25s; animation-delay: 4s; }
        .star:nth-child(4) { width: 2px; height: 2px; left: 40%; animation-duration: 18s; animation-delay: 6s; }
        .star:nth-child(5) { width: 4px; height: 4px; left: 50%; animation-duration: 22s; animation-delay: 8s; animation-name: twinkle, starMove; }
        .star:nth-child(6) { width: 2px; height: 2px; left: 60%; animation-duration: 16s; animation-delay: 10s; }
        .star:nth-child(7) { width: 1px; height: 1px; left: 70%; animation-duration: 24s; animation-delay: 12s; }
        .star:nth-child(8) { width: 3px; height: 3px; left: 80%; animation-duration: 19s; animation-delay: 14s; }
        .star:nth-child(9) { width: 2px; height: 2px; left: 90%; animation-duration: 21s; animation-delay: 16s; }
        .star:nth-child(10) { width: 1px; height: 1px; left: 15%; animation-duration: 17s; animation-delay: 18s; }
      `}</style>
    </div>
  );
}
