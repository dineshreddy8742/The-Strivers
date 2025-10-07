'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Help & Guidance</h1>
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>How to use the AI-Driven LCA Tool</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <section>
            <h2 className="text-xl font-semibold">1. Creating a New Assessment</h2>
            <p className="text-slate-600">To start a new Life Cycle Assessment (LCA), click on the "New Assessment" button on the dashboard. This will open a form where you can input the details of your assessment.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">2. Importing Data</h2>
            <p className="text-slate-600">You can import your own data for analysis. Navigate to the "Data" page and use the import tool to upload your data file. The supported formats are CSV and Excel.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">3. Analyzing Results</h2>
            <p className="text-slate-600">Once your assessment is created, you can view the analysis on the "Analysis" page. This includes environmental impact, circularity metrics, and recommendations.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">4. Generating Reports</h2>
            <p className="text-slate-600">You can generate detailed reports of your assessments from the "Reports" page. These reports can be exported in various formats for sharing and record-keeping.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
