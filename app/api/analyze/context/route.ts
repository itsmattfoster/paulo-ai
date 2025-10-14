import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { websiteContent, youtubeTranscript } = await request.json()
    
    if (!websiteContent && !youtubeTranscript) {
      return NextResponse.json(
        { error: 'At least one content source is required' },
        { status: 400 }
      )
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable.' },
        { status: 500 }
      )
    }

    // Generate context summary using OpenAI
    const prompt = `You are analyzing content from a brand/creator to create a detailed context profile. 

${websiteContent ? `WEBSITE CONTENT:\n${websiteContent}\n\n` : ''}
${youtubeTranscript ? `YOUTUBE TRANSCRIPT:\n${youtubeTranscript}\n\n` : ''}

Please analyze this content and create a comprehensive profile including:
1. Brand voice and tone
2. Key topics and themes
3. Target audience
4. Unique value propositions
5. Common pain points addressed
6. Style and messaging approach
7. Key products/services mentioned

Provide a detailed summary that can be used to generate on-brand content.`

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a brand analysis expert. Create detailed, actionable context profiles.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      })

      const summary = completion.choices[0]?.message?.content || ''

      if (!summary) {
        return NextResponse.json(
          { error: 'OpenAI returned an empty response. Please try again.' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        summary,
      })
    } catch (openaiError: any) {
      console.error('OpenAI API error:', openaiError)
      
      // Handle specific OpenAI errors
      if (openaiError.status === 401) {
        return NextResponse.json(
          { error: 'Invalid OpenAI API key. Please check your OPENAI_API_KEY environment variable.' },
          { status: 500 }
        )
      } else if (openaiError.status === 429) {
        return NextResponse.json(
          { error: 'OpenAI API rate limit exceeded. Please try again in a moment.' },
          { status: 429 }
        )
      } else if (openaiError.status === 500 || openaiError.status === 503) {
        return NextResponse.json(
          { error: 'OpenAI service is temporarily unavailable. Please try again later.' },
          { status: 503 }
        )
      }
      
      throw openaiError
    }
  } catch (error: any) {
    console.error('Context analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to generate context summary. Please try again.', details: error.message },
      { status: 500 }
    )
  }
}

