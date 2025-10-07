'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    name: "Dr. Anya Sharma",
    title: "Lead Metallurgist, Global Mining Corp.",
    quote: "The Strivers has revolutionized our LCA process. The AI-driven insights are incredibly accurate, and the circularity analysis helps us identify tangible improvements for our operations. A truly indispensable tool!",
    avatar: "/avatars/anya.jpg",
  },
  {
    name: "Mark Johnson",
    title: "Sustainability Manager, Green Metals Inc.",
    quote: "The ability to compare conventional and circular pathways side-by-side is a game-changer. We've been able to demonstrate significant CO2 reductions to our stakeholders, thanks to The Strivers.",
    avatar: "/avatars/mark.jpg",
  },
  {
    name: "Sarah Chen",
    title: "Environmental Policy Advisor, Ministry of Mines",
    quote: "For policy-making, having a clear, data-driven understanding of environmental impacts across the value chain is critical. The Strivers provides that clarity and helps us shape more effective regulations.",
    avatar: "/avatars/sarah.jpg",
  },
]

export default function TestimonialsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">What Our Users Say</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="p-6 space-y-4">
              <p className="text-lg italic text-slate-700">" {testimonial.quote} "</p>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
