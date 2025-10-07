'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowRight, 
  Leaf, 
  Recycle, 
  Factory,
  TrendingDown,
  TrendingUp,
  DollarSign,
  Zap,
  Droplets,
  Truck,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Download
} from 'lucide-react'

interface PathwayData {
  name: string
  type: 'conventional' | 'circular'
  description: string
  metrics: {
    co2Emissions: number
    energyConsumption: number
    waterUsage: number
    wasteGenerated: number
    materialCost: number
    recycledContent: number
    circularityScore: number
    resourceEfficiency: number
  }
  stages: Array<{
    name: string
    co2Emissions: number
    energyConsumption: number
    waterUsage: number
    wasteGenerated: number
  }>
  advantages: string[]
  challenges: string[]
  implementationCost: 'low' | 'medium' | 'high'
  timeToImplement: string
}

const pathwaysData: Record<string, PathwayData[]> = {
  aluminium: [
    {
      name: 'Conventional Primary Production',
      type: 'conventional',
      description: 'Traditional production from bauxite mining to primary aluminium',
      metrics: {
        co2Emissions: 12000,
        energyConsumption: 14000,
        waterUsage: 8000,
        wasteGenerated: 1200,
        materialCost: 1800,
        recycledContent: 5,
        circularityScore: 15,
        resourceEfficiency: 35
      },
      stages: [
        { name: 'Bauxite Mining', co2Emissions: 150, energyConsumption: 200, waterUsage: 1500, wasteGenerated: 800 },
        { name: 'Alumina Refining', co2Emissions: 1200, energyConsumption: 3800, waterUsage: 4500, wasteGenerated: 300 },
        { name: 'Smelting', co2Emissions: 10500, energyConsumption: 9800, waterUsage: 1800, wasteGenerated: 80 },
        { name: 'Fabrication', co2Emissions: 150, energyConsumption: 200, waterUsage: 200, wasteGenerated: 20 }
      ],
      advantages: ['Established technology', 'High quality output', 'Consistent supply'],
      challenges: ['High energy demand', 'Significant CO₂ emissions', 'Limited resource availability'],
      implementationCost: 'low',
      timeToImplement: 'Immediate'
    },
    {
      name: 'Circular Economy Model',
      type: 'circular',
      description: 'Closed-loop system with high recycling rate and renewable energy',
      metrics: {
        co2Emissions: 3500,
        energyConsumption: 4200,
        waterUsage: 2800,
        wasteGenerated: 350,
        materialCost: 1200,
        recycledContent: 85,
        circularityScore: 82,
        resourceEfficiency: 78
      },
      stages: [
        { name: 'Collection & Sorting', co2Emissions: 200, energyConsumption: 400, waterUsage: 300, wasteGenerated: 100 },
        { name: 'Recycling & Remelting', co2Emissions: 2800, energyConsumption: 3200, waterUsage: 1800, wasteGenerated: 200 },
        { name: 'Alloy Adjustment', co2Emissions: 400, energyConsumption: 500, waterUsage: 600, wasteGenerated: 40 },
        { name: 'Fabrication', co2Emissions: 100, energyConsumption: 100, waterUsage: 100, wasteGenerated: 10 }
      ],
      advantages: ['70% CO₂ reduction', 'Lower energy costs', 'Resource independence'],
      challenges: ['Collection infrastructure', 'Quality control', 'Initial investment'],
      implementationCost: 'high',
      timeToImplement: '3-5 years'
    }
  ],
  copper: [
    {
      name: 'Conventional Mining & Processing',
      type: 'conventional',
      description: 'Traditional copper production from ore mining to refining',
      metrics: {
        co2Emissions: 4500,
        energyConsumption: 6500,
        waterUsage: 12000,
        wasteGenerated: 2800,
        materialCost: 6500,
        recycledContent: 10,
        circularityScore: 22,
        resourceEfficiency: 42
      },
      stages: [
        { name: 'Mining', co2Emissions: 800, energyConsumption: 1200, waterUsage: 4500, wasteGenerated: 2000 },
        { name: 'Concentration', co2Emissions: 1200, energyConsumption: 2800, waterUsage: 5500, wasteGenerated: 600 },
        { name: 'Smelting', co2Emissions: 2000, energyConsumption: 2000, waterUsage: 1800, wasteGenerated: 180 },
        { name: 'Refining', co2Emissions: 500, energyConsumption: 500, waterUsage: 200, wasteGenerated: 20 }
      ],
      advantages: ['Well-established', 'High purity', 'Large scale'],
      challenges: ['Ore grade decline', 'Water intensive', 'Tailings management'],
      implementationCost: 'low',
      timeToImplement: 'Immediate'
    },
    {
      name: 'Circular Copper System',
      type: 'circular',
      description: 'Urban mining and advanced recycling with material recovery',
      metrics: {
        co2Emissions: 1800,
        energyConsumption: 2200,
        waterUsage: 4200,
        wasteGenerated: 450,
        materialCost: 4200,
        recycledContent: 78,
        circularityScore: 75,
        resourceEfficiency: 82
      },
      stages: [
        { name: 'Urban Mining', co2Emissions: 300, energyConsumption: 500, waterUsage: 1200, wasteGenerated: 200 },
        { name: 'Mechanical Recycling', co2Emissions: 600, energyConsumption: 800, waterUsage: 1800, wasteGenerated: 150 },
        { name: 'Hydrometallurgical', co2Emissions: 700, energyConsumption: 700, waterUsage: 1000, wasteGenerated: 80 },
        { name: 'Electrorefining', co2Emissions: 200, energyConsumption: 200, waterUsage: 200, wasteGenerated: 20 }
      ],
      advantages: ['60% CO₂ reduction', 'Lower water use', 'Resource security'],
      challenges: ['Collection logistics', 'Contamination control', 'Technology investment'],
      implementationCost: 'medium',
      timeToImplement: '2-4 years'
    }
  ]
}

export default function ComparisonTool() {
  const [selectedMetal, setSelectedMetal] = useState<string>('aluminium')
  const [comparisonMode, setComparisonMode] = useState<'overview' | 'detailed' | 'financial'>('overview')

  const currentPathways = pathwaysData[selectedMetal]
  const conventionalPathway = currentPathways.find(p => p.type === 'conventional')!
  const circularPathway = currentPathways.find(p => p.type === 'circular')!

  const calculateImprovement = (conventional: number, circular: number) => {
    const improvement = ((conventional - circular) / conventional) * 100
    return improvement > 0 ? improvement : 0
  }

  const getImprovementColor = (improvement: number) => {
    if (improvement >= 50) return 'text-green-600'
    if (improvement >= 25) return 'text-blue-600'
    if (improvement >= 10) return 'text-yellow-600'
    return 'text-slate-600'
  }

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'high': return 'text-red-600'
    }
  }

  const handleDownloadChart = () => {
    alert('Downloading chart data...')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Production Pathway Comparison
            </div>
            <Button variant="outline" size="sm" onClick={handleDownloadChart}>
              <Download className="w-4 h-4 mr-2" />
              Download Chart
            </Button>
          </CardTitle>
          <CardDescription>
            Compare conventional vs circular production pathways for different metals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="metal-select" className="text-sm font-medium">Metal Type:</label>
              <Select value={selectedMetal} onValueChange={setSelectedMetal}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aluminium">Aluminium</SelectItem>
                  <SelectItem value="copper">Copper</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Tabs value={comparisonMode} onValueChange={(value) => setComparisonMode(value as any)}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="detailed">Detailed</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Key Improvements */}
      <Card>
        <CardHeader>
          <CardTitle>Circular vs Conventional - Key Improvements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-600">CO₂ Reduction</p>
              <p className={`text-2xl font-bold ${getImprovementColor(calculateImprovement(conventionalPathway.metrics.co2Emissions, circularPathway.metrics.co2Emissions))}`}>
                {calculateImprovement(conventionalPathway.metrics.co2Emissions, circularPathway.metrics.co2Emissions).toFixed(0)}%
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-600">Energy Savings</p>
              <p className={`text-2xl font-bold ${getImprovementColor(calculateImprovement(conventionalPathway.metrics.energyConsumption, circularPathway.metrics.energyConsumption))}`}>
                {calculateImprovement(conventionalPathway.metrics.energyConsumption, circularPathway.metrics.energyConsumption).toFixed(0)}%
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Droplets className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-600">Water Reduction</p>
              <p className={`text-2xl font-bold ${getImprovementColor(calculateImprovement(conventionalPathway.metrics.waterUsage, circularPathway.metrics.waterUsage))}`}>
                {calculateImprovement(conventionalPathway.metrics.waterUsage, circularPathway.metrics.waterUsage).toFixed(0)}%
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Recycle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-600">Circularity Score</p>
              <p className={`text-2xl font-bold ${getImprovementColor(circularPathway.metrics.circularityScore - conventionalPathway.metrics.circularityScore, 100)}`}>
                +{circularPathway.metrics.circularityScore - conventionalPathway.metrics.circularityScore} pts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Content */}
      <Tabs value={comparisonMode} className="space-y-6">
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conventional Pathway */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Factory className="w-5 h-5" />
                  {conventionalPathway.name}
                </CardTitle>
                <CardDescription>{conventionalPathway.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">CO₂ Emissions</p>
                    <p className="text-lg font-bold">{conventionalPathway.metrics.co2Emissions.toLocaleString()} kg</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Energy Use</p>
                    <p className="text-lg font-bold">{conventionalPathway.metrics.energyConsumption.toLocaleString()} MJ</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Water Use</p>
                    <p className="text-lg font-bold">{conventionalPathway.metrics.waterUsage.toLocaleString()} L</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Circularity Score</p>
                    <p className="text-lg font-bold">{conventionalPathway.metrics.circularityScore}%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Advantages:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {conventionalPathway.advantages.map((advantage, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Circular Pathway */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Recycle className="w-5 h-5 text-green-600" />
                  {circularPathway.name}
                </CardTitle>
                <CardDescription>{circularPathway.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">CO₂ Emissions</p>
                    <p className="text-lg font-bold text-green-600">{circularPathway.metrics.co2Emissions.toLocaleString()} kg</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Energy Use</p>
                    <p className="text-lg font-bold text-green-600">{circularPathway.metrics.energyConsumption.toLocaleString()} MJ</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Water Use</p>
                    <p className="text-lg font-bold text-green-600">{circularPathway.metrics.waterUsage.toLocaleString()} L</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Circularity Score</p>
                    <p className="text-lg font-bold text-green-600">{circularPathway.metrics.circularityScore}%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Advantages:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {circularPathway.advantages.map((advantage, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stage-by-Stage Comparison</CardTitle>
              <CardDescription>
                Detailed comparison of environmental impacts by production stage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {conventionalPathway.stages.map((stage, index) => {
                  const circularStage = circularPathway.stages[index]
                  return (
                    <div key={index} className="space-y-3">
                      <h4 className="font-medium">{stage.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="p-3 border rounded">
                          <p className="text-sm font-medium text-slate-600">CO₂ Emissions</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm">{stage.co2Emissions} kg</span>
                            <ArrowRight className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-green-600">{circularStage.co2Emissions} kg</span>
                          </div>
                          <Progress value={(circularStage.co2Emissions / stage.co2Emissions) * 100} className="mt-2" />
                        </div>
                        <div className="p-3 border rounded">
                          <p className="text-sm font-medium text-slate-600">Energy Use</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm">{stage.energyConsumption} MJ</span>
                            <ArrowRight className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-green-600">{circularStage.energyConsumption} MJ</span>
                          </div>
                          <Progress value={(circularStage.energyConsumption / stage.energyConsumption) * 100} className="mt-2" />
                        </div>
                        <div className="p-3 border rounded">
                          <p className="text-sm font-medium text-slate-600">Water Use</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm">{stage.waterUsage} L</span>
                            <ArrowRight className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-green-600">{circularStage.waterUsage} L</span>
                          </div>
                          <Progress value={(circularStage.waterUsage / stage.waterUsage) * 100} className="mt-2" />
                        </div>
                        <div className="p-3 border rounded">
                          <p className="text-sm font-medium text-slate-600">Waste</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm">{stage.wasteGenerated} kg</span>
                            <ArrowRight className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-green-600">{circularStage.wasteGenerated} kg</span>
                          </div>
                          <Progress value={(circularStage.wasteGenerated / stage.wasteGenerated) * 100} className="mt-2" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Cost Comparison
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Material Cost (Conventional)</span>
                    <span className="text-lg font-bold">${conventionalPathway.metrics.materialCost.toLocaleString()}/ton</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Material Cost (Circular)</span>
                    <span className="text-lg font-bold text-green-600">${circularPathway.metrics.materialCost.toLocaleString()}/ton</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Cost Savings</span>
                    <span className="text-lg font-bold text-green-600">
                      ${((conventionalPathway.metrics.materialCost - circularPathway.metrics.materialCost) / conventionalPathway.metrics.materialCost * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Implementation Cost</span>
                    <Badge className={getCostColor(conventionalPathway.implementationCost)}>
                      {conventionalPathway.implementationCost}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Implementation Cost</span>
                    <Badge className={getCostColor(circularPathway.implementationCost)}>
                      {circularPathway.implementationCost}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Time to Implement</span>
                    <span>{conventionalPathway.timeToImplement}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Time to Implement</span>
                    <span>{circularPathway.timeToImplement}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>ROI Analysis</CardTitle>
              <CardDescription>
                Return on investment for transitioning to circular pathways
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">Payback Period</p>
                  <p className="text-2xl font-bold">3-5 years</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">Annual Savings</p>
                  <p className="text-2xl font-bold">$2.8M</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">Carbon Credit Value</p>
                  <p className="text-2xl font-bold">$850K/year</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}