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
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-pattern">
        <div className="mx-auto max-w-lg min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
