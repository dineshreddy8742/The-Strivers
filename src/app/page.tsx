'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import LCAForm from '@/components/lca/LCAForm'
import CircularFlowVisualization from '@/components/lca/CircularFlowVisualization'
import ComparisonTool from '@/components/lca/ComparisonTool'
import ReportGenerator from '@/components/lca/ReportGenerator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  BarChart3, 
  Leaf, 
  Recycle, 
  TrendingUp, 
  Plus, 
  FileText, 
  Settings,
  Factory,
  Truck,
  Droplets,
  Zap,
  LayoutDashboard
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function LCADashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('overview')
  const [showForm, setShowForm] = useState(false)


  if (!session) {
    redirect('/login')
  }
  const recentAssessments = [
    {
      id: '1',
      name: 'Aluminium Production - Circular Model',
      metalType: 'Aluminium',
      date: '2024-01-15',
      status: 'completed',
      circularityScore: 78,
      co2Reduction: 45
    },
    {
      id: '2',
      name: 'Copper Mining Process Analysis',
      metalType: 'Copper',
      date: '2024-01-12',
      status: 'in_progress',
      circularityScore: 62,
      co2Reduction: 28
    }
  ]

  const metrics = [
    {
      title: 'Total Assessments',
      value: '24',
      change: '+12%',
      icon: FileText,
      color: 'text-primary',
      tooltip: 'Total number of LCA assessments created.'
    },
    {
      title: 'Avg. Circularity Score',
      value: '71%',
      change: '+8%',
      icon: Recycle,
      color: 'text-green-600',
      tooltip: 'Average circularity score across all assessments.'
    },
    {
      title: 'CO₂ Reduction',
      value: '34%',
      change: '+15%',
      icon: Leaf,
      color: 'text-primary',
      tooltip: 'Average CO₂ reduction compared to industry benchmarks.'
    },
    {
      title: 'Active Projects',
      value: '6',
      change: '+2',
      icon: Factory,
      color: 'text-accent',
      tooltip: 'Number of assessments currently in progress.'
    }
  ]

  const processStages = [
    { name: 'Raw Material Extraction', impact: 35, circularity: 20 },
    { name: 'Processing & Refining', impact: 28, circularity: 35 },
    { name: 'Manufacturing', impact: 22, circularity: 45 },
    { name: 'Use Phase', impact: 10, circularity: 65 },
    { name: 'End-of-Life', impact: 5, circularity: 85 }
  ]

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              onClick={() => setShowForm(false)}
            >
              ← Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-slate-900">New LCA Assessment</h1>
            <div className="w-20"></div>
          </div>
          <LCAForm />
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-3xl font-bold text-green-600 text-center glow-text">
              Welcome to your AI-Driven LCA Tool
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="glow-button"
                onClick={() => setShowForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Assessment
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Start a new Life Cycle Assessment</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Card className="bg-card-bg shadow-sm glow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-600">{metric.title}</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{metric.value}</p>
                        <p className="text-xs text-green-600 mt-1">{metric.change}</p>
                      </div>
                      <metric.icon className={`w-8 h-8 ${metric.color}`} />
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>{metric.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Assessments */}
              <Card className="bg-card-bg glow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-bold">
                    <FileText className="w-5 h-5" />
                    Recent Assessments
                  </CardTitle>
                  <CardDescription>
                    Latest LCA assessments and their circularity scores
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAssessments.map((assessment) => (
                    <div key={assessment.id} className="flex items-center justify-between p-4 border border-border-light rounded-lg bg-card-bg">
                      <div className="flex-1">
                        <h4 className="font-bold text-base text-slate-900">{assessment.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{assessment.metalType}</Badge>
                          <span className="text-sm text-slate-500">{assessment.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Recycle className="w-4 h-4 text-green-600" />
                          <span className="font-bold text-base">{assessment.circularityScore}%</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          CO₂ ↓ {assessment.co2Reduction}%
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Process Impact Analysis */}
              <Card className="bg-card-bg glow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-bold">
                    <BarChart3 className="w-5 h-5" />
                    Process Impact Analysis
                  </CardTitle>
                  <CardDescription>
                    Environmental impact and circularity potential by stage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {processStages.map((stage, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-bold text-base">{stage.name}</span>
                        <div className="flex gap-4">
                          <span className="text-orange-600">Impact: {stage.impact}%</span>
                          <span className="text-green-600">Circularity: {stage.circularity}%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Progress value={stage.impact} className="flex-1" />
                        <Progress value={stage.circularity} className="flex-1" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card-bg glow-card">
              <CardHeader>
                <CardTitle className="font-bold">Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and workflows for LCA analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="default" 
                    className="h-20 flex-col glow-button"
                    onClick={() => setActiveTab('analysis')}
                  >
                    <Factory className="w-6 h-6 mb-2" />
                    Compare Production Routes
                  </Button>
                  <Button 
                    variant="default" 
                    className="h-20 flex-col glow-button"
                    onClick={() => setActiveTab('analysis')}
                  >
                    <Recycle className="w-6 h-6 mb-2" />
                    Analyze Circular Pathways
                  </Button>
                  <Button 
                    variant="default" 
                    className="h-20 flex-col glow-button"
                    onClick={() => setActiveTab('analysis')}
                  >
                    <TrendingUp className="w-6 h-6 mb-2" />
                    Generate Recommendations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments">
            <Card className="bg-card-bg glow-card">
              <CardHeader>
                <CardTitle className="font-bold">LCA Assessments</CardTitle>
                <CardDescription>
                  Manage and analyze your life cycle assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    No assessments yet
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Create your first LCA assessment to get started
                  </p>
                  <Button 
                    className="glow-button"
                    onClick={() => setShowForm(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis">
            <div className="space-y-6">
              <CircularFlowVisualization />
              <ComparisonTool />
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <ReportGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  )
}