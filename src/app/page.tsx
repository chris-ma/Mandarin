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
    <div className="flex flex-col flex-1 px-4 py-8 pt-safe">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🀄</div>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--red)' }}>
          普通话
        </h1>
        <p className="text-lg font-medium text-gray-600 mt-1">Learn Mandarin by Speaking</p>
        <p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto">
          Talk to an AI tutor. Get real-time feedback. Learn like a local.
        </p>
      </div>

      {/* How it works */}
      <div className="flex justify-center gap-6 mb-8 text-center">
        {[
          { icon: '📖', label: 'Learn words' },
          { icon: '💬', label: 'Practice phrases' },
          { icon: '🎙️', label: 'Have a conversation' },
        ].map((step) => (
          <div key={step.label} className="flex flex-col items-center gap-1">
            <span className="text-2xl">{step.icon}</span>
            <span className="text-xs text-gray-500 font-medium">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Level cards */}
      <div className="flex flex-col gap-4 flex-1">
        {levels.map((level) => (
          <Link
            key={level.id}
            href={`/learn/${level.id}`}
            className="block rounded-2xl border-2 p-5 transition-all active:scale-95 hover:shadow-md"
            style={{ background: level.bg, borderColor: level.border }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: level.color + '20' }}
              >
                {level.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold chinese-char" style={{ color: level.color }}>
                    {level.title}
                  </span>
                  <span className="text-sm font-semibold text-gray-600">{level.subtitle}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{level.description}</p>
                <div className="mt-2 text-xs font-medium" style={{ color: level.color }}>
                  {level.units} units →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        Powered by AI · Progress saved locally
      </p>
    </div>
  )
}
