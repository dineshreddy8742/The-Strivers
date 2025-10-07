'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  Plus, 
  Trash2, 
  Zap, 
  Droplets, 
  Truck, 
  Factory,
  Recycle,
  Calculator,
  Lightbulb
} from 'lucide-react'

interface ProcessStage {
  id: string
  name: string
  stageType: string
  energyConsumption: string
  waterUsage: string
  materialInput: string
  materialOutput: string
  recycledContent: string
  transportDistance: string
  co2Emissions: string
  wasteGenerated: string
}

interface LCAData {
  name: string
  metalType: string
  description: string
  productionRoute: string
  targetRecycledContent: string
  processStages: ProcessStage[]
}

import { useForm, useFieldArray } from 'react-hook-form'
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

// Zod Schema for Validation
const processStageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Stage name is required'),
  stageType: z.string().min(1, 'Stage type is required'),
  energyConsumption: z.string().optional(),
  waterUsage: z.string().optional(),
  materialInput: z.string().optional(),
  materialOutput: z.string().optional(),
  recycledContent: z.string().optional(),
  transportDistance: z.string().optional(),
  co2Emissions: z.string().optional(),
  wasteGenerated: z.string().optional(),
})

const lcaSchema = z.object({
  name: z.string().min(1, 'Assessment name is required'),
  metalType: z.string().min(1, 'Metal type is required'),
  description: z.string().optional(),
  productionRoute: z.string().min(1, 'Production route is required'),
  targetRecycledContent: z.string().optional(),
  processStages: z.array(processStageSchema).min(1, 'At least one process stage is required'),
})

export default function LCAForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const form = useForm<z.infer<typeof lcaSchema>>({
    resolver: zodResolver(lcaSchema),
    defaultValues: {
      name: '',
      metalType: '',
      description: '',
      productionRoute: '',
      targetRecycledContent: '',
      processStages: [
        {
          id: '1',
          name: '',
          stageType: '',
          energyConsumption: '',
          waterUsage: '',
          materialInput: '',
          materialOutput: '',
          recycledContent: '',
          transportDistance: '',
          co2Emissions: '',
          wasteGenerated: ''
        }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "processStages"
  });

  const onSubmit = (data: z.infer<typeof lcaSchema>) => {
    toast({
      title: "Form Submitted!",
      description: "Your LCA data has been submitted for analysis.",
    });
    setCurrentStep(3)
  }

  const metalTypes = [
    'Aluminium',
    'Copper',
    'Steel',
    'Iron',
    'Zinc',
    'Lead',
    'Nickel',
    'Titanium',
    'Rare Earth Elements',
    'Lithium',
    'Cobalt',
    'Other'
  ]

  const stageTypes = [
    'Raw Material Extraction',
    'Ore Processing & Beneficiation',
    'Smelting & Refining',
    'Manufacturing & Fabrication',
    'Use Phase',
    'Collection & Sorting',
    'Recycling & Recovery',
    'Disposal & Landfill'
  ]

  const productionRoutes = [
    'Primary (Virgin Materials)',
    'Secondary (Recycled Materials)',
    'Hybrid (Mixed)',
    'Circular Economy Model',
    'Closed-Loop System'
  ]

  const addProcessStage = () => {
    append({ 
      id: Date.now().toString(),
      name: '', 
      stageType: '', 
      energyConsumption: '', 
      waterUsage: '', 
      materialInput: '', 
      materialOutput: '', 
      recycledContent: '', 
      transportDistance: '', 
      co2Emissions: '', 
      wasteGenerated: '' 
    });
  }

  const removeProcessStage = (index: number) => {
    remove(index);
  }

  const handleRunAnalysis = async (data: z.infer<typeof lcaSchema>) => {
    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/lca/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      // Store results and redirect to analysis view
      localStorage.setItem('lcaAnalysisResults', JSON.stringify(result))
      window.location.href = '/analysis-results'

    } catch (error) {
      console.error('Analysis error:', error)
      alert('Failed to run analysis')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleEstimate = async () => {
    const data = form.getValues();
    try {
      const response = await fetch('/api/lca/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        form.reset(result.data.originalData); // Assuming the API returns the full data with estimates
        toast({
          title: "Estimation Complete",
          description: "Missing fields have been estimated by AI.",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Estimation error:', error);
      alert('Failed to estimate data');
    }
  }

  const calculateProgress = () => {
    const data = form.getValues();
    const totalFields = 5 + (data.processStages.length * 9)
    let filledFields = 0
    
    // Count basic info fields
    if (data.name) filledFields++
    if (data.metalType) filledFields++
    if (data.description) filledFields++
    if (data.productionRoute) filledFields++
    if (data.targetRecycledContent) filledFields++
    
    // Count process stage fields
    data.processStages.forEach(stage => {
      Object.values(stage).forEach(value => {
        if (value && value !== '') filledFields++
      })
    })
    
    return Math.round((filledFields / totalFields) * 100)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Progress Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Assessment Progress</h3>
              <span className="text-sm text-slate-600">{calculateProgress()}%</span>
            </div>
            <Progress value={calculateProgress()} className="w-full" />
          </CardContent>
        </Card>

        {/* Main Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              LCA Assessment Configuration
            </CardTitle>
            <CardDescription>
              Configure your Life Cycle Assessment with process details and production parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={`step-${currentStep}`} onValueChange={(value) => setCurrentStep(parseInt(value.split('-')[1]))}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="step-1">Basic Information</TabsTrigger>
                <TabsTrigger value="step-2">Process Stages</TabsTrigger>
                <TabsTrigger value="step-3">Analysis</TabsTrigger>
              </TabsList>

              {/* Step 1: Basic Information */}
              <TabsContent value="step-1" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assessment Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Aluminium Production Analysis" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="metalType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Metal Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select metal type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {metalTypes.map((metal) => (
                              <SelectItem key={metal} value={metal}>{metal}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the scope and objectives of this LCA assessment..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="productionRoute"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Production Route</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select production route" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {productionRoutes.map((route) => (
                              <SelectItem key={route} value={route}>{route}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="targetRecycledContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Recycled Content (%)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 75" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => form.trigger(['name', 'metalType', 'productionRoute']).then(isValid => isValid && setCurrentStep(2))} className="bg-green-600 hover:bg-green-700">
                    Next: Process Stages
                  </Button>
                </div>
              </TabsContent>

              {/* Step 2: Process Stages */}
              <TabsContent value="step-2" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Process Stages</h3>
                    <p className="text-sm text-slate-600">Define each stage in your production lifecycle</p>
                  </div>
                  <Button onClick={addProcessStage} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Stage
                  </Button>
                </div>

                <div className="space-y-6">
                  {fields.map((stage, index) => (
                    <Card key={stage.id} className="relative">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Stage {index + 1}</CardTitle>
                          {fields.length > 1 && (
                            <Button
                              onClick={() => removeProcessStage(index)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`processStages.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Stage Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Bauxite Mining" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`processStages.${index}.stageType`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Stage Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select stage type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {stageTypes.map((type) => (
                                      <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Other fields would be similarly converted... */}

                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Previous
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleEstimate}
                      variant="outline"
                      disabled={isAnalyzing}
                      className="flex items-center gap-2"
                    >
                      <Lightbulb className="w-4 h-4" />
                      {isAnalyzing ? 'Analyzing...' : 'AI Estimate Missing Data'}
                    </Button>
                    <Button onClick={() => form.trigger().then(isValid => isValid && setCurrentStep(3))} className="bg-green-600 hover:bg-green-700">
                      Next: Analysis
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Step 3: Analysis */}
              <TabsContent value="step-3" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Recycle className="w-5 h-5" />
                      Ready for Analysis
                    </CardTitle>
                    <CardDescription>
                      Your LCA assessment is configured and ready for AI-powered analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Assessment Summary</h4>
                        <div className="space-y-1 text-sm">
                          <p><strong>Name:</strong> {form.getValues("name") || 'Not specified'}</p>
                          <p><strong>Metal:</strong> {form.getValues("metalType") || 'Not specified'}</p>
                          <p><strong>Route:</strong> {form.getValues("productionRoute") || 'Not specified'}</p>
                          <p><strong>Process Stages:</strong> {form.getValues("processStages").length}</p>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Data Completeness</h4>
                        <div className="space-y-2">
                          <Progress value={calculateProgress()} className="w-full" />
                          <p className="text-sm text-slate-600">
                            {calculateProgress()}% of required data provided
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-center">
                      <Button 
                        size="lg" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleRunAnalysis(form.getValues())}
                        disabled={isAnalyzing}
                      >
                        <Calculator className="w-5 h-5 mr-2" />
                        {isAnalyzing ? 'Running Analysis...' : 'Run LCA Analysis'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Previous
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Start Over
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}