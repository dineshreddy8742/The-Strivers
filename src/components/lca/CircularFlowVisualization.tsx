'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowRight, 
  Recycle, 
  Factory, 
  Package, 
  Truck, 
  Users, 
  Leaf,
  Zap,
  Droplets,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

interface FlowStage {
  id: string
  name: string
  type: 'extraction' | 'processing' | 'secondary_processing' | 'manufacturing' | 'remanufacturing' | 'use' | 'collection' | 'recycling'
  description: string
  inputs: string[]
  outputs: string[]
  circularityScore: number
  impactLevel: 'low' | 'medium' | 'high'
  co2Emissions: number
  energyConsumption: number
  waterUsage: number
  wasteGenerated: number
  recycledContent: number
}

interface CircularFlowData {
  stages: FlowStage[]
  overallCircularity: number
  totalCO2: number
  totalEnergy: number
  totalWater: number
  totalWaste: number
  recyclingRate: number
  resourceEfficiency: number
}

const mockData: CircularFlowData = {
  stages: [
    {
      id: '1',
      name: 'Raw Material Extraction',
      type: 'extraction',
      description: 'Mining and quarrying of raw materials',
      inputs: ['Ore deposits', 'Energy', 'Water'],
      outputs: ['Raw ore', 'Waste rock', 'Emissions'],
      circularityScore: 15,
      impactLevel: 'high',
      co2Emissions: 1200,
      energyConsumption: 3500,
      waterUsage: 4500,
      wasteGenerated: 800,
      recycledContent: 5
    },
    {
      id: '2',
      name: 'Processing & Refining',
      type: 'processing',
      description: 'Beneficiation and refining processes',
      inputs: ['Raw ore', 'Energy', 'Chemicals'],
      outputs: ['Refined metal', 'Slag', 'Effluents'],
      circularityScore: 25,
      impactLevel: 'high',
      co2Emissions: 3500,
      energyConsumption: 12000,
      waterUsage: 6200,
      wasteGenerated: 450,
      recycledContent: 15
    },
    {
      id: '3',
      name: 'Secondary Processing',
      type: 'secondary_processing',
      description: 'Further processing of metals into alloys',
      inputs: ['Refined metal', 'Alloying elements', 'Energy'],
      outputs: ['Metal alloys', 'Dross', 'Emissions'],
      circularityScore: 35,
      impactLevel: 'medium',
      co2Emissions: 800,
      energyConsumption: 2000,
      waterUsage: 1000,
      wasteGenerated: 150,
      recycledContent: 20
    },
    {
      id: '4',
      name: 'Manufacturing',
      type: 'manufacturing',
      description: 'Product fabrication and assembly',
      inputs: ['Metal alloys', 'Components', 'Energy'],
      outputs: ['Finished products', 'Scrap', 'Packaging waste'],
      circularityScore: 45,
      impactLevel: 'medium',
      co2Emissions: 1800,
      energyConsumption: 4200,
      waterUsage: 1800,
      wasteGenerated: 220,
      recycledContent: 35
    },
    {
      id: '5',
      name: 'Use Phase',
      type: 'use',
      description: 'Product utilization and maintenance',
      inputs: ['Products', 'Maintenance', 'Energy'],
      outputs: ['Services', 'Wear', 'End-of-life products'],
      circularityScore: 65,
      impactLevel: 'low',
      co2Emissions: 800,
      energyConsumption: 2500,
      waterUsage: 1200,
      wasteGenerated: 80,
      recycledContent: 0
    },
    {
      id: '6',
      name: 'Collection & Sorting',
      type: 'collection',
      description: 'Collection and sorting of end-of-life products',
      inputs: ['EOL products', 'Collection logistics'],
      outputs: ['Sorted materials', 'Contaminated waste'],
      circularityScore: 75,
      impactLevel: 'low',
      co2Emissions: 300,
      energyConsumption: 800,
      waterUsage: 400,
      wasteGenerated: 120,
      recycledContent: 85
    },
    {
      id: '7',
      name: 'Remanufacturing',
      type: 'remanufacturing',
      description: 'Rebuilding products to as-new condition',
      inputs: ['Sorted materials', 'Energy', 'New components'],
      outputs: ['Remanufactured products', 'Waste'],
      circularityScore: 85,
      impactLevel: 'low',
      co2Emissions: 400,
      energyConsumption: 1500,
      waterUsage: 800,
      wasteGenerated: 100,
      recycledContent: 70
    },
    {
      id: '8',
      name: 'Recycling & Recovery',
      type: 'recycling',
      description: 'Material recovery and reprocessing',
      inputs: ['Sorted materials', 'Energy'],
      outputs: ['Recycled materials', 'Recovered metals', 'Residual waste'],
      circularityScore: 90,
      impactLevel: 'medium',
      co2Emissions: 700,
      energyConsumption: 2800,
      waterUsage: 1600,
      wasteGenerated: 180,
      recycledContent: 95
    }
  ],
  overallCircularity: 68,
  totalCO2: 8300,
  totalEnergy: 25800,
  totalWater: 15700,
  totalWaste: 1850,
  recyclingRate: 72,
  resourceEfficiency: 64
}

export default function CircularFlowVisualization() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'flow' | 'impact' | 'circularity'>('flow')

  const getStageIcon = (type: FlowStage['type']) => {
    switch (type) {
      case 'extraction': return <Factory className="w-5 h-5" />
      case 'processing': return <Zap className="w-5 h-5" />
      case 'secondary_processing': return <Zap className="w-5 h-5" />
      case 'manufacturing': return <Package className="w-5 h-5" />
      case 'remanufacturing': return <Recycle className="w-5 h-5" />
      case 'use': return <Users className="w-5 h-5" />
      case 'collection': return <Truck className="w-5 h-5" />
      case 'recycling': return <Recycle className="w-5 h-5" />
    }
  }

  const getImpactColor = (level: FlowStage['impactLevel']) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
    }
  }

  const getCircularityColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const selectedStageData = mockData.stages.find(stage => stage.id === selectedStage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Recycle className="w-5 h-5" />
            Circular Flow Analysis
          </CardTitle>
          <CardDescription>
            Visualize material flows and circularity opportunities across the value chain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="flow">Material Flow</TabsTrigger>
              <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
              <TabsTrigger value="circularity">Circularity Metrics</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Overall Circularity</p>
                <p className="text-2xl font-bold text-green-600">{mockData.overallCircularity}%</p>
              </div>
              <Recycle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Recycling Rate</p>
                <p className="text-2xl font-bold text-blue-600">{mockData.recyclingRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total CO₂</p>
                <p className="text-2xl font-bold text-orange-600">{mockData.totalCO2.toLocaleString()}</p>
                <p className="text-xs text-slate-500">kg CO₂eq</p>
              </div>
              <Leaf className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Resource Efficiency</p>
                <p className="text-2xl font-bold text-purple-600">{mockData.resourceEfficiency}%</p>
              </div>
              <Factory className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flow Diagram */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Material Flow Diagram</CardTitle>
            <CardDescription>
              Click on stages to view detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.stages.map((stage, index) => (
                <div key={stage.id} className="relative">
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedStage === stage.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedStage(stage.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          stage.impactLevel === 'high' ? 'bg-red-100' :
                          stage.impactLevel === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                        }`}>
                          {getStageIcon(stage.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{stage.name}</h4>
                          <p className="text-sm text-slate-600">{stage.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${getCircularityColor(stage.circularityScore)}`}>
                            {stage.circularityScore}%
                          </span>
                          <Badge 
                            variant="outline" 
                            className={getImpactColor(stage.impactLevel)}
                          >
                            {stage.impactLevel}
                          </Badge>
                        </div>
                        <Progress value={stage.circularityScore} className="w-20 mt-1" />
                      </div>
                    </div>
                  </div>
                  
                  {index < mockData.stages.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stage Details */}
        <Card>
          <CardHeader>
            <CardTitle>Stage Details</CardTitle>
            <CardDescription>
              {selectedStage ? 'Selected stage information' : 'Select a stage to view details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedStageData ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{selectedStageData.name}</h4>
                  <p className="text-sm text-slate-600">{selectedStageData.description}</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Circularity Score</span>
                    <span className={`text-sm font-bold ${getCircularityColor(selectedStageData.circularityScore)}`}>
                      {selectedStageData.circularityScore}%
                    </span>
                  </div>
                  <Progress value={selectedStageData.circularityScore} />

                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Impact Level</span>
                    <Badge className={getImpactColor(selectedStageData.impactLevel)}>
                      {selectedStageData.impactLevel}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Environmental Metrics</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>CO₂:</span>
                      <span>{selectedStageData.co2Emissions} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Energy:</span>
                      <span>{selectedStageData.energyConsumption} MJ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Water:</span>
                      <span>{selectedStageData.waterUsage} L</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Waste:</span>
                      <span>{selectedStageData.wasteGenerated} kg</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Material Flows</h5>
                  <div>
                    <p className="text-xs font-medium text-slate-600 mb-1">Inputs:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedStageData.inputs.map((input, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {input}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-600 mb-1">Outputs:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedStageData.outputs.map((output, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {output}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600">Select a stage to view detailed information</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Circularity Improvement Opportunities</CardTitle>
          <CardDescription>
            AI-powered recommendations to enhance circularity and reduce environmental impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Recycle className="w-5 h-5 text-green-600" />
                <h4 className="font-medium">Increase Recycling Rate</h4>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                Improve collection systems to increase recycling from 72% to 85%
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">High Impact</Badge>
                <span className="text-xs text-green-600">CO₂ ↓ 15%</span>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium">Optimize Energy Use</h4>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                Implement renewable energy in processing stages
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Medium Impact</Badge>
                <span className="text-xs text-blue-600">Energy ↓ 25%</span>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-cyan-600" />
                <h4 className="font-medium">Water Conservation</h4>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                Implement water recycling in extraction and processing
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Medium Impact</Badge>
                <span className="text-xs text-cyan-600">Water ↓ 30%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}