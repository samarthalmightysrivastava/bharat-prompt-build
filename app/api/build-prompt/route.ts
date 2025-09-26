import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '../../../lib/supabase-server'
import { generatePrompt } from '../../../lib/openai'
import { BuildPromptRequest, BuildPromptResponse, PlanName } from '../../../types/database'

export async function POST(request: NextRequest) {
  try {
    const body: BuildPromptRequest = await request.json()
    
    // Validate request
    if (!body.language || !body.categories || !body.user_text) {
      return NextResponse.json(
        { error: 'Missing required fields: language, categories, user_text' },
        { status: 400 }
      )
    }

    if (!Array.isArray(body.categories) || body.categories.length === 0) {
      return NextResponse.json(
        { error: 'Categories must be a non-empty array' },
        { status: 400 }
      )
    }

    if (body.user_text.trim().length < 5) {
      return NextResponse.json(
        { error: 'User text must be at least 5 characters' },
        { status: 400 }
      )
    }

    // For now, just generate the prompt without strict quota checking
    // The frontend handles quota display and warnings
    
    // Generate the prompt using OpenAI
    const finalPrompt = await generatePrompt(body)

    // Simple response for MVP
    const response: BuildPromptResponse = {
      final_prompt: finalPrompt,
      quota_left: 10, // Placeholder value
      plan: 'free'
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Build prompt error:', error)
    
    // Check if it's an OpenAI API error
    if (error instanceof Error && error.message.includes('OpenAI API error')) {
      return NextResponse.json(
        { error: 'AI service temporarily unavailable. Please try again.' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// CORS headers for cross-origin requests
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}