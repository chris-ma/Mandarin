import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '普通話 — Learn Mandarin',
  description: 'Speak your way to Mandarin fluency. Conversational AI learning for all levels.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#EF8172',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body style={{ minHeight: '100vh', overflowY: 'auto', backgroundColor: '#EF8172' }}>
        <div
          style={{
            maxWidth: '512px',
            margin: '0 auto',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </body>
    </html>
  )
}
