import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

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

    // Create a comprehensive prompt for AI estimation
    const prompt = `As an expert in Life Cycle Assessment (LCA) for metallurgy and mining, please estimate missing parameters for the following assessment:

Metal Type: ${lcaData.metalType}
Production Route: ${lcaData.productionRoute}
Target Recycled Content: ${lcaData.targetRecycledContent}%

Process Stages:
${lcaData.processStages.map((stage, index) => `
Stage ${index + 1}: ${stage.name || 'Unnamed'}
Type: ${stage.stageType || 'Not specified'}
Current Data:
- Energy Consumption: ${stage.energyConsumption || 'MISSING'} MJ
- Water Usage: ${stage.waterUsage || 'MISSING'} L
- Material Input: ${stage.materialInput || 'MISSING'} kg
- Material Output: ${stage.materialOutput || 'MISSING'} kg
- Recycled Content: ${stage.recycledContent || 'MISSING'}%
- Transport Distance: ${stage.transportDistance || 'MISSING'} km
- CO₂ Emissions: ${stage.co2Emissions || 'MISSING'} kg
- Waste Generated: ${stage.wasteGenerated || 'MISSING'} kg
`).join('\n')}

Please provide realistic estimates for all MISSING values based on:
1. Industry standards for ${lcaData.metalType} production
2. The specified production route (${lcaData.productionRoute})
3. Target recycled content of ${lcaData.targetRecycledContent}%
4. Best available scientific data and LCA databases

Return the estimates in the following JSON format:
{
  "processStages": [
    {
      "id": "stage_id",
      "energyConsumption": estimated_value,
      "waterUsage": estimated_value,
      "materialInput": estimated_value,
      "materialOutput": estimated_value,
      "recycledContent": estimated_value,
      "transportDistance": estimated_value,
      "co2Emissions": estimated_value,
      "wasteGenerated": estimated_value
    }
  ],
  "confidence": "high/medium/low",
  "assumptions": ["list of key assumptions made"],
  "dataSources": ["sources used for estimation"]
}

Only provide numerical estimates for fields that are currently missing or empty. Keep existing values unchanged.`

    // Call ZAI for estimation
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert LCA analyst specializing in metallurgy and mining with deep knowledge of environmental impacts, energy consumption, and circular economy principles. Always provide realistic, scientifically-grounded estimates based on industry standards and best available data.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3, // Lower temperature for more consistent estimates
      max_tokens: 2000
    })

    const responseContent = completion.choices[0]?.message?.content
    
    if (!responseContent) {
      throw new Error('No response from AI model')
    }

    // Try to parse the JSON response
    let estimationResult
    try {
      // Extract JSON from the response
      const jsonMatch = responseContent.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        estimationResult = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      // Return a basic estimation if JSON parsing fails
      estimationResult = {
        processStages: lcaData.processStages.map(stage => ({
          id: stage.id,
          energyConsumption: stage.energyConsumption || generateBasicEstimate('energy', stage.stageType, lcaData.metalType),
          waterUsage: stage.waterUsage || generateBasicEstimate('water', stage.stageType, lcaData.metalType),
          materialInput: stage.materialInput || generateBasicEstimate('material', stage.stageType, lcaData.metalType),
          materialOutput: stage.materialOutput || generateBasicEstimate('material', stage.stageType, lcaData.metalType),
          recycledContent: stage.recycledContent || generateBasicEstimate('recycled', stage.stageType, lcaData.metalType),
          transportDistance: stage.transportDistance || generateBasicEstimate('transport', stage.stageType, lcaData.metalType),
          co2Emissions: stage.co2Emissions || generateBasicEstimate('co2', stage.stageType, lcaData.metalType),
          wasteGenerated: stage.wasteGenerated || generateBasicEstimate('waste', stage.stageType, lcaData.metalType)
        })),
        confidence: 'medium',
        assumptions: ['Basic industry averages used'],
        dataSources: ['Industry standard databases']
      }
    }

    return NextResponse.json({
      success: true,
      data: estimationResult,
      originalData: lcaData
    })

  } catch (error) {
    console.error('AI estimation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to estimate parameters using AI',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Fallback function for basic estimates
function generateBasicEstimate(type: string, stageType: string, metalType: string): number {
  const estimates: Record<string, Record<string, number>> = {
    energy: {
      'Raw Material Extraction': metalType === 'Aluminium' ? 150 : 100,
      'Ore Processing & Beneficiation': metalType === 'Aluminium' ? 200 : 150,
      'Smelting & Refining': metalType === 'Aluminium' ? 14000 : 3500,
      'Manufacturing & Fabrication': 500,
      'Collection & Sorting': 50,
      'Recycling & Recovery': metalType === 'Aluminium' ? 700 : 1200,
      default: 500
    },
    water: {
      'Raw Material Extraction': 1500,
      'Ore Processing & Beneficiation': 5000,
      'Smelting & Refining': 2000,
      'Manufacturing & Fabrication': 500,
      'Recycling & Recovery': 1000,
      default: 1000
    },
    co2: {
      'Raw Material Extraction': 50,
      'Ore Processing & Beneficiation': 100,
      'Smelting & Refining': metalType === 'Aluminium' ? 12000 : 2000,
      'Manufacturing & Fabrication': 200,
      'Recycling & Recovery': metalType === 'Aluminium' ? 500 : 800,
      default: 500
    },
    transport: {
      default: 500
    },
    waste: {
      'Raw Material Extraction': 200,
      'Ore Processing & Beneficiation': 500,
      'Smelting & Refining': 100,
      'Manufacturing & Fabrication': 50,
      'Recycling & Recovery': 50,
      default: 100
    },
    material: {
      default: 1000
    },
    recycled: {
      'Primary (Virgin Materials)': 5,
      'Secondary (Recycled Materials)': 85,
      'Hybrid (Mixed)': 45,
      'Circular Economy Model': 75,
      'Closed-Loop System': 90,
      default: 30
    }
  }

  return estimates[type]?.[stageType] || estimates[type]?.default || 0
}