'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export default function ContactPage() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    setError('')
    setSuccess('')
    form.clearErrors()

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.8) { // Simulate a 20% chance of failure
            reject(new Error('Failed to send message. Please try again.'))
          } else {
            resolve(true)
          }
        }, 1500)
      })

      setSuccess('Thank you for your feedback!')
      form.reset()
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    }
  }

  return (
    <div className="space-y-8 py-8">
      <h1 className="text-4xl font-extrabold text-gray-900">Contact Us</h1>
      <p className="text-lg text-gray-600">We're here to help and answer any question you might have. We look forward to hearing from you!</p>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Send us a message</CardTitle>
          <CardDescription>Fill out the form below to get in touch with us.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="J Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jsmith@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your message here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
              <Button type="submit" className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md transition duration-300"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Sending...' : 'Submit'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Our Contact Details</CardTitle>
          <CardDescription>Reach out to us through other channels.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Phone:</h3>
            <p className="text-gray-700">+1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Email:</h3>
            <p className="text-gray-700">support@example.com</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Address:</h3>
            <p className="text-gray-700">123 The Strivers Lane, Green City, GC 12345</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Business Hours:</h3>
            <p className="text-gray-700">Mon - Fri: 9:00 AM - 5:00 PM (EST)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
