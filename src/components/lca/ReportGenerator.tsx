'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { 
  FileText, 
  Download, 
  Share2, 
  Eye,
  Calendar,
  User,
  BarChart3,
  Leaf,
  Recycle,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  Globe
} from 'lucide-react'

interface ReportData {
  id: string
  name: string
  metalType: string
  date: string
  status: 'draft' | 'completed' | 'shared'
  circularityScore: number
  co2Reduction: number
  keyFindings: string[]
  recommendations: Array<{
    category: string
    title: string
    description: string
    impact: 'high' | 'medium' | 'low'
    feasibility: 'easy' | 'medium' | 'challenging'
  }>
  charts: Array<{
    type: 'bar' | 'pie' | 'line'
    title: string
    data: any
  }>
}

const mockReports: ReportData[] = [
  {
    id: '1',
    name: 'Aluminium Production - Circular Model Analysis',
    metalType: 'Aluminium',
    date: '2024-01-15',
    status: 'completed',
    circularityScore: 78,
    co2Reduction: 45,
    keyFindings: [
      '70% reduction in CO₂ emissions compared to conventional production',
      '85% recycled content achievable with proper collection systems',
      'Energy consumption reduced by 65% through recycling',
      'Water usage decreased by 55% in circular model'
    ],
    recommendations: [
      {
        category: 'circularity',
        title: 'Implement Advanced Sorting Technology',
        description: 'Deploy AI-powered sorting systems to improve material recovery rates',
        impact: 'high',
        feasibility: 'medium'
      },
      {
        category: 'energy',
        title: 'Transition to Renewable Energy',
        description: 'Power smelting operations with renewable energy sources',
        impact: 'high',
        feasibility: 'challenging'
      },
      {
        category: 'water',
        title: 'Closed-Loop Water Systems',
        description: 'Implement water recycling and treatment facilities',
        impact: 'medium',
        feasibility: 'medium'
      }
    ],
    charts: [
      { type: 'bar', title: 'CO₂ Emissions by Stage', data: {} },
      { type: 'pie', title: 'Material Flow Distribution', data: {} },
      { type: 'line', title: 'Circularity Improvement Timeline', data: {} }
    ]
  },
  {
    id: '2',
    name: 'Copper Mining Process Assessment',
    metalType: 'Copper',
    date: '2024-01-12',
    status: 'draft',
    circularityScore: 62,
    co2Reduction: 28,
    keyFindings: [
      'Urban mining potential shows 40% lower environmental impact',
      'Water recycling can reduce consumption by 35%',
      'Hydrometallurgical processes offer better recovery rates'
    ],
    recommendations: [
      {
        category: 'collection',
        title: 'Develop Urban Mining Infrastructure',
        description: 'Establish collection networks for end-of-life copper products',
        impact: 'high',
        feasibility: 'medium'
      }
    ],
    charts: [
      { type: 'bar', title: 'Energy Consumption Comparison', data: {} }
    ]
  }
]

export default function ReportGenerator() {
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(mockReports[0])
  const [reportFormat, setReportFormat] = useState<'summary' | 'detailed' | 'executive'>('detailed')
  const [customNotes, setCustomNotes] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      alert('Report generated successfully!')
    }, 2000)
  }

  const handleDownloadReport = (format: 'pdf' | 'excel' | 'word') => {
    alert(`Downloading report in ${format.toUpperCase()} format...`)
  }

  const handleShareReport = () => {
    alert('Report link copied to clipboard!')
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-slate-600 bg-slate-50 border-slate-200'
    }
  }

  const getFeasibilityColor = (feasibility: string) => {
    switch (feasibility) {
      case 'easy': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'challenging': return 'text-red-600'
      default: return 'text-slate-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600'
      case 'draft': return 'text-yellow-600'
      case 'shared': return 'text-blue-600'
      default: return 'text-slate-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Report Generation & Recommendations
          </CardTitle>
          <CardDescription>
            Generate comprehensive LCA reports with AI-powered insights and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="report-select" className="text-sm font-medium">Select Report:</label>
              <Select value={selectedReport?.id || ''} onValueChange={(value) => {
                const report = mockReports.find(r => r.id === value)
                setSelectedReport(report || null)
              }}>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="Choose a report" />
                </SelectTrigger>
                <SelectContent>
                  {mockReports.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      {report.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="format-select" className="text-sm font-medium">Format:</label>
              <Select value={reportFormat} onValueChange={(value) => setReportFormat(value as any)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Summary</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="audience-select" className="text-sm font-medium">Audience:</label>
              <Select defaultValue="technical">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                  <SelectItem value="regulator">Regulator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedReport && (
        <>
          {/* Report Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedReport.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4" />
                    {selectedReport.date}
                    <Badge className={getStatusColor(selectedReport.status)}>
                      {selectedReport.status}
                    </Badge>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadReport('pdf')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadReport('excel')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Excel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShareReport}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <Recycle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">Circularity Score</p>
                  <p className="text-2xl font-bold text-green-600">{selectedReport.circularityScore}%</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Leaf className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">CO₂ Reduction</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedReport.co2Reduction}%</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">Recommendations</p>
                  <p className="text-2xl font-bold text-purple-600">{selectedReport.recommendations.length}</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">Charts</p>
                  <p className="text-2xl font-bold text-orange-600">{selectedReport.charts.length}</p>
                </div>
              </div>

              <Tabs defaultValue="findings" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="findings">Key Findings</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="charts">Visualizations</TabsTrigger>
                  <TabsTrigger value="custom">Custom Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="findings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        Key Findings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {selectedReport.keyFindings.map((finding, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700">{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  <div className="grid gap-4">
                    {selectedReport.recommendations.map((rec, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{rec.category}</Badge>
                                <Badge className={getImpactColor(rec.impact)}>
                                  {rec.impact} impact
                                </Badge>
                                <span className={`text-sm ${getFeasibilityColor(rec.feasibility)}`}>
                                  {rec.feasibility} to implement
                                </span>
                              </div>
                              <h4 className="font-medium mb-1">{rec.title}</h4>
                              <p className="text-sm text-slate-600">{rec.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="charts" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedReport.charts.map((chart, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-base">{chart.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center">
                            <BarChart3 className="w-12 h-12 text-slate-400" />
                            <span className="ml-2 text-slate-500">Chart visualization</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="custom" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Custom Notes & Observations</CardTitle>
                      <CardDescription>
                        Add your own insights and observations to the report
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Enter your custom notes, observations, or additional insights..."
                        value={customNotes}
                        onChange={(e) => setCustomNotes(e.target.value)}
                        rows={6}
                      />
                      <div className="flex justify-end mt-4">
                        <Button onClick={handleGenerateReport} disabled={isGenerating}>
                          {isGenerating ? 'Generating...' : 'Generate Report'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Report Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Report Templates</CardTitle>
              <CardDescription>
                Pre-configured report templates for different stakeholders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <User className="w-6 h-6 mb-2" />
                  Executive Summary
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Globe className="w-6 h-6 mb-2" />
                  Sustainability Report
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <TrendingUp className="w-6 h-6 mb-2" />
                  Technical Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}