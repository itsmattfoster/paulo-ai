import { NextRequest, NextResponse } from 'next/server'
import { YoutubeTranscript } from 'youtube-transcript'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json(
        { error: 'YouTube URL is required' },
        { status: 400 }
      )
    }

    // Normalize URL
    let normalizedUrl = url.trim()
    if (!normalizedUrl.match(/^https?:\/\//i)) {
      normalizedUrl = 'https://' + normalizedUrl
    }

    // Extract video ID
    const videoIdMatch = normalizedUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    
    if (!videoIdMatch) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL. Please provide a valid YouTube video URL (e.g., youtube.com/watch?v=VIDEO_ID or youtu.be/VIDEO_ID)' },
        { status: 400 }
      )
    }

    const videoId = videoIdMatch[1]

    try {
      // Fetch transcript
      const transcript = await YoutubeTranscript.fetchTranscript(videoId)
      
      // Combine transcript text
      const fullTranscript = transcript
        .map((item: any) => item.text)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()

      if (!fullTranscript) {
        return NextResponse.json(
          { error: 'The video transcript is empty. Please try a different video.' },
          { status: 400 }
        )
      }

      return NextResponse.json({
        success: true,
        transcript: fullTranscript,
        videoId,
      })
    } catch (transcriptError: any) {
      console.error('Transcript fetch error:', transcriptError)
      
      // Provide specific error messages
      const errorMessage = transcriptError.message || ''
      if (errorMessage.includes('disabled') || errorMessage.includes('not available')) {
        return NextResponse.json(
          { error: 'This video does not have captions/subtitles available. Please try a different video or enable captions on your video.' },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { 
          error: 'Could not fetch video transcript. Make sure the video has captions/subtitles enabled and is publicly accessible.',
          details: transcriptError.message 
        },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('YouTube analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze YouTube content. Please check the URL and try again.', details: error.message },
      { status: 500 }
    )
  }
}

