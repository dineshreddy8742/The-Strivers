'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">How It Works</h1>
      <Card>
        <CardHeader>
          <CardTitle>Our Methodology</CardTitle>
          <CardDescription>Understanding our AI-powered LCA process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold">1. Data Collection and Input</h2>
            <p className="text-slate-600">The process begins with the data you provide. Our tool accepts a wide range of data points related to your processes, including energy consumption, water usage, material inputs, and waste generation. You can also specify the production route and target recycled content.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">2. AI-Powered Parameter Estimation</h2>
            <p className="text-slate-600">For any missing parameters in your data, our AI models step in. Trained on a vast dataset of industry benchmarks and scientific literature, our models can estimate missing values with a high degree of accuracy. This ensures that your LCA is comprehensive, even with incomplete data.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">3. Life Cycle Impact Assessment (LCIA)</h2>
            <p className="text-slate-600">Our tool performs a comprehensive LCIA based on the collected and estimated data. We analyze various environmental impact categories, including global warming potential, water footprint, and energy efficiency. The results are benchmarked against industry averages to provide context.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">4. Circularity Analysis</h2>
            <p className="text-slate-600">We go beyond traditional LCA by performing a detailed circularity analysis. This includes calculating an overall circularity score, evaluating the effectiveness of recycled content, and assessing resource efficiency. Our goal is to help you transition to a more circular economy.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">5. Actionable Recommendations</h2>
            <p className="text-slate-600">Based on the analysis, our AI generates a set of actionable recommendations to reduce your environmental impact and improve circularity. These recommendations are prioritized based on their potential impact and feasibility, helping you make informed decisions.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
