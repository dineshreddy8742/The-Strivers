import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { db } from '@/lib/db'

interface ProcessStage {
  id: string
  name: string
  stageType: string
  energyConsumption?: string
  waterUsage?: string
  materialInput?: string
  materialOutput?: string
  recycledContent?: string
  transportDistance?: string
  co2Emissions?: string
  wasteGenerated?: string
}

interface LCAData {
  name: string
  metalType: string
  description: string
  productionRoute: string
  targetRecycledContent: string
  processStages: ProcessStage[]
}

export async function POST(request: NextRequest) {
  try {
    const lcaData: LCAData = await request.json()

    // Initialize ZAI SDK
    const zai = await ZAI.create()

    // Calculate basic metrics from the data
    const totalEnergy = lcaData.processStages.reduce((sum, stage) => 
      sum + (parseFloat(stage.energyConsumption || '0')), 0)
    const totalWater = lcaData.processStages.reduce((sum, stage) => 
      sum + (parseFloat(stage.waterUsage || '0')), 0)
    const totalCO2 = lcaData.processStages.reduce((sum, stage) => 
      sum + (parseFloat(stage.co2Emissions || '0')), 0)
    const totalWaste = lcaData.processStages.reduce((sum, stage) => 
      sum + (parseFloat(stage.wasteGenerated || '0')), 0)
    const avgRecycledContent = lcaData.processStages.reduce((sum, stage) => 
      sum + (parseFloat(stage.recycledContent || '0')), 0) / lcaData.processStages.length

    // Create comprehensive analysis prompt
    const prompt = `As an expert LCA analyst, analyze the following Life Cycle Assessment data for ${lcaData.metalType} production:

Assessment Name: ${lcaData.name}
Production Route: ${lcaData.productionRoute}
Target Recycled Content: ${lcaData.targetRecycledContent}%

Calculated Totals:
- Total Energy Consumption: ${totalEnergy.toFixed(2)} MJ
- Total Water Usage: ${totalWater.toFixed(2)} L
- Total CO₂ Emissions: ${totalCO2.toFixed(2)} kg
- Total Waste Generated: ${totalWaste.toFixed(2)} kg
- Average Recycled Content: ${avgRecycledContent.toFixed(2)}%

Process Stage Breakdown:
${lcaData.processStages.map((stage, index) => `
Stage ${index + 1}: ${stage.name}
Type: ${stage.stageType}
- Energy: ${stage.energyConsumption || '0'} MJ
- Water: ${stage.waterUsage || '0'} L
- CO₂: ${stage.co2Emissions || '0'} kg
- Waste: ${stage.wasteGenerated || '0'} kg
- Recycled Content: ${stage.recycledContent || '0'}%
`).join('\n')}

Please provide a comprehensive analysis including:

1. Environmental Impact Assessment:
   - Global warming potential analysis
   - Water footprint evaluation
   - Energy efficiency assessment
   - Waste generation analysis

2. Circularity Analysis:
   - Overall circularity score (0-100)
   - Recycled content effectiveness
   - Resource efficiency metrics
   - Circular economy alignment

3. Benchmarking:
   - Comparison with industry averages for ${lcaData.metalType}
   - Performance vs. conventional production
   - Identification of improvement opportunities

4. Recommendations:
   - Top 5 recommendations for reducing environmental impact
   - Strategies to improve circularity
   - Process optimization suggestions
   - End-of-life improvement opportunities

5. Impact Reduction Potential:
   - Potential CO₂ reduction with optimized processes
   - Water reduction opportunities
   - Energy efficiency improvements
   - Waste minimization strategies

Return the analysis in the following JSON format:
{
  "environmentalImpacts": {
    "globalWarmingPotential": {
      "value": number,
      "unit": "kg CO2eq",
      "assessment": "low/medium/high",
      "benchmark": number
    },
    "waterFootprint": {
      "value": number,
      "unit": "L",
      "assessment": "low/medium/high",
      "benchmark": number
    },
    "energyEfficiency": {
      "value": number,
      "unit": "MJ/kg",
      "assessment": "good/fair/poor",
      "benchmark": number
    }
  },
  "circularityMetrics": {
    "overallScore": number,
    "recycledContentScore": number,
    "resourceEfficiency": number,
    "circularEconomyAlignment": number
  },
  "benchmarking": {
    "industryAverage": {
      "co2": number,
      "water": number,
      "energy": number
    },
    "performanceVsConventional": "better/worse/similar",
    "improvementOpportunities": ["opportunity1", "opportunity2"]
  },
  "recommendations": [
    {
      "category": "energy/water/circularity/waste",
      "title": "recommendation title",
      "description": "detailed description",
      "impact": "high/medium/low",
      "feasibility": "easy/medium/challenging",
      "source": "Best Practice" | "AI-Generated"
    }
  ],
  "reductionPotential": {
    "co2Reduction": {
      "current": number,
      "potential": number,
      "percentage": number
    },
    "waterReduction": {
      "current": number,
      "potential": number,
      "percentage": number
    },
    "energyReduction": {
      "current": number,
      "potential": number,
      "percentage": number
    }
  }
}`

    // Call ZAI for analysis
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert LCA analyst specializing in metallurgy and mining. Provide detailed, actionable insights based on life cycle assessment data. Use industry-standard methodologies and consider circular economy principles in your analysis.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.4,
      max_tokens: 3000
    })

    const responseContent = completion.choices[0]?.message?.content
    
    if (!responseContent) {
      throw new Error('No response from AI model')
    }

    // Try to parse the JSON response
    let analysisResult
    try {
      const jsonMatch = responseContent.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Failed to parse AI analysis response:', parseError)
      // Return basic analysis if JSON parsing fails
      analysisResult = generateBasicAnalysis(lcaData, totalEnergy, totalWater, totalCO2, totalWaste, avgRecycledContent)
    }

    // Save assessment to database (in a real implementation)
    // await saveAssessmentToDatabase(lcaData, analysisResult)

    return NextResponse.json({
      success: true,
      data: analysisResult,
      metrics: {
        totalEnergy,
        totalWater,
        totalCO2,
        totalWaste,
        avgRecycledContent
      }
    })

  } catch (error) {
    console.error('LCA analysis error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to analyze LCA data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

function generateBasicAnalysis(lcaData: LCAData, totalEnergy: number, totalWater: number, totalCO2: number, totalWaste: number, avgRecycledContent: number) {
  return {
    environmentalImpacts: {
      globalWarmingPotential: {
        value: totalCO2,
        unit: "kg CO2eq",
        assessment: totalCO2 > 10000 ? "high" : totalCO2 > 5000 ? "medium" : "low",
        benchmark: lcaData.metalType === "Aluminium" ? 12000 : 8000
      },
      waterFootprint: {
        value: totalWater,
        unit: "L",
        assessment: totalWater > 10000 ? "high" : totalWater > 5000 ? "medium" : "low",
        benchmark: 8000
      },
      energyEfficiency: {
        value: totalEnergy / 1000, // Assuming 1000kg production
        unit: "MJ/kg",
        assessment: totalEnergy > 15000 ? "poor" : totalEnergy > 10000 ? "fair" : "good",
        benchmark: lcaData.metalType === "Aluminium" ? 14000 : 6000
      }
    },
    circularityMetrics: {
      overallScore: Math.min(avgRecycledContent + 20, 100),
      recycledContentScore: avgRecycledContent,
      resourceEfficiency: 70,
      circularEconomyAlignment: lcaData.productionRoute.includes("Circular") ? 85 : 60
    },
    benchmarking: {
      industryAverage: {
        co2: lcaData.metalType === "Aluminium" ? 12000 : 8000,
        water: 8000,
        energy: lcaData.metalType === "Aluminium" ? 14000 : 6000
      },
      performanceVsConventional: totalCO2 < 8000 ? "better" : "worse",
      improvementOpportunities: ["Increase recycled content", "Optimize energy consumption", "Reduce water usage"]
    },
    recommendations: [
      {
        category: "circularity",
        title: "Increase Recycled Content",
        description: "Increasing recycled content can significantly reduce environmental impacts",
        impact: "high",
        feasibility: "medium",
        source: "Best Practice"
      },
      {
        category: "energy",
        title: "Optimize Energy Consumption",
        description: "Focus on energy-intensive stages like smelting and refining",
        impact: "high",
        feasibility: "challenging",
        source: "Best Practice"
      }
    ],
    reductionPotential: {
      co2Reduction: {
        current: totalCO2,
        potential: totalCO2 * 0.3,
        percentage: 30
      },
      waterReduction: {
        current: totalWater,
        potential: totalWater * 0.2,
        percentage: 20
      },
      energyReduction: {
        current: totalEnergy,
        potential: totalEnergy * 0.25,
        percentage: 25
      }
    }
  }
}