'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Life Cycle Assessment (LCA)?",
    answer: "Life Cycle Assessment (LCA) is a methodology for assessing the environmental impacts associated with all the stages of the life cycle of a commercial product, process, or service.",
  },
  {
    question: "What is circularity?",
    answer: "Circularity, in the context of a circular economy, is an economic model that is based on the principles of designing out waste and pollution, keeping products and materials in use, and regenerating natural systems.",
  },
  {
    question: "How does this tool work?",
    answer: "Our tool uses AI to analyze the data you provide and estimate any missing parameters. It then performs a comprehensive Life Cycle Assessment (LCA) and circularity analysis to provide you with actionable insights and recommendations.",
  },
  {
    question: "What kind of data do I need to provide?",
    answer: "You can provide a wide range of data points related to your processes, including energy consumption, water usage, material inputs, and waste generation. The more data you provide, the more accurate the analysis will be.",
  },
]

export default function FAQPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h1>
      <Card>
        <CardHeader>
          <CardTitle>Common Questions</CardTitle>
          <CardDescription>Find answers to common questions about LCA and our tool</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
