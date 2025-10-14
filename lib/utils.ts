export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }
  
  return null
}

export function extractYouTubeChannelId(url: string): string | null {
  const patterns = [
    /youtube\.com\/channel\/([^\/\n?#]+)/,
    /youtube\.com\/c\/([^\/\n?#]+)/,
    /youtube\.com\/@([^\/\n?#]+)/,
    /youtube\.com\/user\/([^\/\n?#]+)/,
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }
  
  return null
}

export function normalizeUrl(url: string): string {
  if (!url) return url
  
  // Trim whitespace
  url = url.trim()
  
  // If URL doesn't start with http:// or https://, add https://
  if (!url.match(/^https?:\/\//i)) {
    url = 'https://' + url
  }
  
  return url
}

export function isValidUrl(url: string): boolean {
  if (!url) return false
  
  try {
    // Try to normalize first
    const normalized = normalizeUrl(url)
    new URL(normalized)
    return true
  } catch {
    return false
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

