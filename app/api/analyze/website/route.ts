import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json(
        { error: 'Website URL is required' },
        { status: 400 }
      )
    }

    // Normalize and validate URL
    let normalizedUrl = url.trim()
    if (!normalizedUrl.match(/^https?:\/\//i)) {
      normalizedUrl = 'https://' + normalizedUrl
    }

    // Validate URL
    try {
      new URL(normalizedUrl)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format. Please provide a valid website URL.' },
        { status: 400 }
      )
    }

    // Fetch website content
    const response = await axios.get(normalizedUrl, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    // Parse HTML
    const $ = cheerio.load(response.data)
    
    // Remove script and style elements
    $('script, style, nav, footer, iframe').remove()
    
    // Extract text content
    const title = $('title').text().trim()
    const metaDescription = $('meta[name="description"]').attr('content') || ''
    
    // Get main content
    let mainContent = ''
    
    // Try to find main content areas
    const contentSelectors = [
      'main',
      'article',
      '[role="main"]',
      '.content',
      '.main-content',
      '#content',
      '#main',
      'body'
    ]
    
    for (const selector of contentSelectors) {
      const element = $(selector).first()
      if (element.length) {
        mainContent = element.text()
        break
      }
    }
    
    // Clean up text
    mainContent = mainContent
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim()
    
    // Extract headings
    const headings: string[] = []
    $('h1, h2, h3').each((_, el) => {
      const text = $(el).text().trim()
      if (text) headings.push(text)
    })

    // Combine all content
    const fullContent = `
Title: ${title}

Meta Description: ${metaDescription}

Main Headings:
${headings.join('\n')}

Content:
${mainContent}
    `.trim()

    // Limit content size (max ~8000 chars to avoid token limits)
    const limitedContent = fullContent.substring(0, 8000)

    return NextResponse.json({
      success: true,
      content: limitedContent,
      title,
      url: normalizedUrl,
    })
  } catch (error: any) {
    console.error('Website analysis error:', error)
    
    // Provide specific error messages based on error type
    if (error.code === 'ENOTFOUND') {
      return NextResponse.json(
        { error: 'Website not found. Please check the URL and try again.' },
        { status: 404 }
      )
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      return NextResponse.json(
        { error: 'Request timed out. The website took too long to respond.' },
        { status: 408 }
      )
    } else if (error.response?.status === 403 || error.response?.status === 401) {
      return NextResponse.json(
        { error: 'Access denied. The website may be blocking automated requests.' },
        { status: 403 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to analyze website. Please ensure the URL is accessible.', details: error.message },
      { status: 500 }
    )
  }
}

