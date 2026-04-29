import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q') || 'china'
  const key = process.env.UNSPLASH_ACCESS_KEY

  if (!key) {
    // Return a placeholder color gradient as SVG when no API key
    return new NextResponse(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
        <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#C8102E;stop-opacity:0.3"/>
          <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:0.8"/>
        </linearGradient></defs>
        <rect width="400" height="300" fill="url(#g)"/>
      </svg>`,
      { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' } }
    )
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${key}` }, next: { revalidate: 3600 } }
    )

    if (!res.ok) throw new Error('Unsplash error')

    const data = await res.json()
    const url = data?.urls?.regular

    if (!url) throw new Error('No URL')

    return NextResponse.redirect(url)
  } catch {
    return NextResponse.redirect(
      `https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80`
    )
  }
}
