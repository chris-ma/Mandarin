import Link from 'next/link'
import MicPermission from '@/components/MicPermission'

const levels = [
  {
    id: 'basics',
    chineseTitle: '基礎',
    englishTitle: 'Basics',
    chineseDesc: '問候，數字，日常生活',
    englishDesc: 'Greetings, numbers & daily life',
    units: 4,
    watermark: '好',
  },
  {
    id: 'travel',
    chineseTitle: '旅行',
    englishTitle: 'Travel',
    chineseDesc: '點餐，問路，購物，住宿',
    englishDesc: 'Food, transport, shopping & hotels',
    units: 5,
    watermark: '行',
  },
  {
    id: 'advanced',
    chineseTitle: '進階',
    englishTitle: 'Advanced',
    chineseDesc: '計劃，感受，工作，健康',
    englishDesc: 'Plans, feelings, work & health',
    units: 5,
    watermark: '語',
  },
]

export default function HomePage() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '0 1rem 2rem',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <MicPermission />
      {/* Background watermark */}
      <div
        className="cny-watermark"
        style={{ fontSize: '22rem', top: '-3rem', right: '-4rem', opacity: 0.07 }}
        aria-hidden
      >
        學
      </div>
      <div
        className="cny-watermark"
        style={{ fontSize: '14rem', bottom: '4rem', left: '-3rem', opacity: 0.06 }}
        aria-hidden
      >
        話
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', paddingTop: '3rem', paddingBottom: '2rem', position: 'relative', zIndex: 1 }}>
        <div
          className="chinese-char"
          style={{
            fontSize: '3.5rem',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '0.05em',
            lineHeight: 1,
            textShadow: '0 2px 8px rgba(100,10,10,0.25)',
          }}
        >
          普通話
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginTop: '0.6rem',
          }}
        >
          Learn Mandarin
        </div>

        {/* Decorative divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
          <div style={{ width: '2rem', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: '5px', height: '5px', background: 'rgba(255,255,255,0.6)', transform: 'rotate(45deg)' }} />
          <div style={{ width: '2rem', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginTop: '1.25rem', alignItems: 'center' }}>
          {[
            { zh: '字', en: 'Words' },
            { zh: '→', en: '' },
            { zh: '語', en: 'Phrases' },
            { zh: '→', en: '' },
            { zh: '話', en: 'Speak' },
          ].map((step, i) =>
            step.en === '' ? (
              <span key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', padding: '0 0.1rem' }}>→</span>
            ) : (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="chinese-char" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>{step.zh}</div>
                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.05em', marginTop: '1px' }}>{step.en}</div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Level cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1 }}>
        {levels.map((level) => (
          <Link
            key={level.id}
            href={`/learn/${level.id}`}
            style={{ textDecoration: 'none', WebkitTapHighlightColor: 'transparent' }}
          >
            <div
              className="cny-panel"
              style={{
                padding: '1.1rem 1.25rem',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Card watermark character */}
              <div
                className="cny-watermark"
                style={{ fontSize: '7rem', bottom: '-1.2rem', right: '0.5rem', opacity: 0.09, zIndex: 0 }}
                aria-hidden
              >
                {level.watermark}
              </div>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.3rem' }}>
                    <span
                      className="chinese-char"
                      style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--crimson)', lineHeight: 1 }}
                    >
                      {level.chineseTitle}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-mid)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {level.englishTitle}
                    </span>
                  </div>
                  <div className="chinese-char" style={{ fontSize: '0.8rem', color: 'var(--crimson-mid)', marginBottom: '0.2rem', fontWeight: 700 }}>
                    {level.chineseDesc}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-mid)' }}>
                    {level.englishDesc}
                  </div>
                  <div style={{ marginTop: '0.6rem', fontSize: '0.7rem', color: 'var(--crimson)', fontWeight: 700, letterSpacing: '0.05em' }}>
                    {level.units} 單元 · {level.units} UNITS →
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <div style={{ width: '1.5rem', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
          <div style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.4)', transform: 'rotate(45deg)' }} />
          <div style={{ width: '1.5rem', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
        </div>
        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em' }}>
          以 AI 驅動 · POWERED BY AI
        </p>
      </div>
    </div>
  )
}
