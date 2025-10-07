'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ComparisonTool from '@/components/lca/ComparisonTool'
import ReportGenerator from '@/components/lca/ReportGenerator'
import { AnalysisCharts } from '@/components/lca/AnalysisCharts'
import CircularFlowVisualization from '@/components/lca/CircularFlowVisualization'

export default function AnalysisResultsPage() {
  const [results, setResults] = useState(null)

  useEffect(() => {
    const storedResults = localStorage.getItem('lcaAnalysisResults')
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }
  }, [])

  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No analysis results found. Please run an analysis first.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-600 text-center">AI-Driven Life Cycle Assessment (LCA) Tool for Advancing Circularity and Sustainability in Metallurgy and Mining</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Analysis Overview</h2>
        <p className="text-lg">
          This section presents the comprehensive results of your Life Cycle Assessment.
          Explore the various environmental impacts, resource consumption, and potential
          areas for improvement across the product&apos;s life cycle.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Key Impact Categories</h3>
          <AnalysisCharts results={results} />
        </div>
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Circular Flow Visualization</h3>
          <CircularFlowVisualization />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Comparison Tool</h2>
        <p className="text-lg mb-4">
          Compare different product designs, materials, or processes to identify the most
          sustainable options.
        </p>
        <ComparisonTool />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Generate Report</h2>
        <p className="text-lg mb-4">
          Create a detailed report of your LCA findings, suitable for stakeholders and
          decision-makers.
        </p>
        <ReportGenerator />
      </section>
    </div>
  )
}