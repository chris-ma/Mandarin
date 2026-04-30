import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '普通话 — Learn Mandarin',
  description: 'Speak your way to Mandarin fluency. Conversational AI learning for all levels.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#C8102E',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="bg-pattern"
        style={{ minHeight: '100vh', overflowY: 'auto', color: '#1a1a1a' }}
      >
        <div
          style={{
            maxWidth: '512px',
            margin: '0 auto',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>
      </body>
    </html>
  )
}
