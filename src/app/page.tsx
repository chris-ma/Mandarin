import Link from 'next/link'

const levels = [
  {
    id: 'basics',
    title: '基础',
    subtitle: 'Basics',
    description: 'Greetings, numbers, and introductions. The building blocks of every conversation.',
    emoji: '🌱',
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    units: 3,
  },
  {
    id: 'travel',
    title: '旅行',
    subtitle: 'Travel',
    description: 'Order food, ask directions, and shop like a local. Everything you need for a trip.',
    emoji: '✈️',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
    units: 3,
  },
  {
    id: 'advanced',
    title: '进阶',
    subtitle: 'Advanced',
    description: 'Make plans, express feelings, and hold real conversations with confidence.',
    emoji: '🎯',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    units: 2,
  },
]

export default function HomePage() {
  return (
    <div style={{ padding: '2rem 1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🀄</div>
        <h1
          className="chinese-char"
          style={{ fontSize: '2rem', fontWeight: 700, color: '#C8102E', margin: 0, letterSpacing: '-0.02em' }}
        >
          普通话
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#4a5565', marginTop: '0.25rem' }}>
          Learn Mandarin by Speaking
        </p>
        <p style={{ fontSize: '0.875rem', color: '#99a1af', marginTop: '0.5rem', maxWidth: '280px', margin: '0.5rem auto 0' }}>
          Talk to an AI tutor. Get real-time feedback. Learn like a local.
        </p>
      </div>

      {/* How it works */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        {[
          { icon: '📖', label: 'Learn words' },
          { icon: '💬', label: 'Practice phrases' },
          { icon: '🎙️', label: 'Have a conversation' },
        ].map((step) => (
          <div key={step.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '1.5rem' }}>{step.icon}</span>
            <span style={{ fontSize: '0.75rem', color: '#6a7282', fontWeight: 500 }}>{step.label}</span>
          </div>
        ))}
      </div>

      {/* Level cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {levels.map((level) => (
          <Link
            key={level.id}
            href={`/learn/${level.id}`}
            style={{
              display: 'block',
              borderRadius: '1rem',
              border: `2px solid ${level.border}`,
              padding: '1.25rem',
              background: level.bg,
              textDecoration: 'none',
              color: 'inherit',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div
                style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '0.75rem',
                  background: level.color + '20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0,
                }}
              >
                {level.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span
                    className="chinese-char"
                    style={{ fontSize: '1.5rem', fontWeight: 700, color: level.color }}
                  >
                    {level.title}
                  </span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4a5565' }}>
                    {level.subtitle}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#4a5565', margin: '0.25rem 0', lineHeight: 1.5 }}>
                  {level.description}
                </p>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: level.color, marginTop: '0.25rem' }}>
                  {level.units} units →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#99a1af', marginTop: '1.5rem' }}>
        Powered by AI · Progress saved locally
      </p>
    </div>
  )
}
