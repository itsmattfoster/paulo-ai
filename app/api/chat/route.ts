import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const MODE_PROMPTS = {
  general: 'You are a helpful AI assistant with knowledge of the user\'s brand.',
  ads: 'You are an expert ad copywriter. Create compelling, conversion-focused advertisements.',
  vsl: 'You are a VSL (Video Sales Letter) expert. Create engaging video sales scripts.',
  emails: 'You are an email marketing expert. Write persuasive, engaging email copy.',
  webinar: 'You are a webinar script writer. Create engaging educational webinar content.',
  shortform: 'You are a short-form content creator. Write punchy, engaging short scripts for social media.',
  longform: 'You are a long-form content writer. Create detailed, valuable content.',
  social: 'You are a social media expert. Create engaging, shareable social media content.',
}

export async function POST(request: NextRequest) {
  try {
    const { messages, mode, contextProfile } = await request.json()
    
    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      )
    }

    // Build system message with context
    let systemMessage = MODE_PROMPTS[mode as keyof typeof MODE_PROMPTS] || MODE_PROMPTS.general
    
    if (contextProfile) {
      systemMessage += `\n\nBRAND CONTEXT:\n${contextProfile.summary}\n\nUse this context to inform your responses and ensure all content aligns with the brand voice and values.`
    }

    // Prepare messages for OpenAI
    const openaiMessages = [
      {
        role: 'system' as const,
        content: systemMessage,
      },
      ...messages.map((msg: any) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ]

    // Create streaming response
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: openaiMessages,
      temperature: 0.7,
      max_tokens: 2000,
      stream: true,
    })

    // Create a readable stream
    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ''
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response', details: error.message },
      { status: 500 }
    )
  }
}

