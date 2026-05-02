'use client'

import Link from 'next/link'
import { useDialect } from '@/hooks/useDialect'
import { units } from '@/lib/curriculum'
import { Dialect } from '@/lib/types'
import MicPermission from '@/components/MicPermission'

const levelMeta = [
  {
    id: 'basics',
    chineseTitle: '基礎',
    englishTitle: 'Basics',
    englishDesc: 'Greetings, numbers & daily life',
    watermark: '好',
  },
  {
    id: 'travel',
    chineseTitle: '旅行',
    englishTitle: 'Travel',
    englishDesc: 'Food, transport & shopping',
    watermark: '行',
  },
  {
    id: 'advanced',
    chineseTitle: '進階',
    englishTitle: 'Advanced',
    englishDesc: 'Plans, feelings & real conversations',
    watermark: '語',
  },
]

const dialectMeta: Record<Dialect, { name: string; subtitle: string; tag: string; watermark: string; bg: string }> = {
  cantonese: {
    name: '廣東話',
    subtitle: 'Cantonese',
    tag: '香港 · Hong Kong',
    watermark: '粵',
    bg: 'rgba(139,26,26,0.07)',
  },
  putonghua: {
    name: '普通話',
    subtitle: 'Putonghua',
    tag: '北京 · Beijing',
    watermark: '京',
    bg: 'rgba(139,26,26,0.04)',
  },
}

export default function HomePage() {
  const { dialect, setDialect } = useDialect()

  if (dialect === null) {
    return <DialectPicker onPick={setDialect} />
  }

  return <LevelGrid dialect={dialect} onSwitchDialect={setDialect} />
}

function DialectPicker({ onPick }: { onPick: (d: Dialect) => void }) {
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

      {/* Background watermarks */}
      <div className="cny-watermark" style={{ fontSize: '18rem', top: '-2rem', right: '-4rem', opacity: 0.07 }} aria-hidden>語</div>
      <div className="cny-watermark" style={{ fontSize: '12rem', bottom: '3rem', left: '-3rem', opacity: 0.06 }} aria-hidden>中</div>

      {/* Header */}
      <div style={{ textAlign: 'center', paddingTop: '3.5rem', paddingBottom: '2rem', position: 'relative', zIndex: 1 }}>
        <div className="chinese-char" style={{ fontSize: '3rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.05em', lineHeight: 1, textShadow: '0 2px 8px rgba(100,10,10,0.25)' }}>
          中文
        </div>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '0.5rem' }}>
          Learn Chinese
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
          <div style={{ width: '2rem', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: '5px', height: '5px', background: 'rgba(255,255,255,0.6)', transform: 'rotate(45deg)' }} />
          <div style={{ width: '2rem', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
        </div>

        <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
          Which dialect would you like to learn?
        </div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.25rem' }}>
          你想學邊種語言？
        </div>
      </div>

      {/* Dialect cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1 }}>
        {(['cantonese', 'putonghua'] as Dialect[]).map((d) => {
          const meta = dialectMeta[d]
          return (
            <button
              key={d}
              onClick={() => onPick(d)}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <div
                className="cny-panel"
                style={{
                  padding: '1.25rem 1.25rem',
                  position: 'relative',
                  overflow: 'hidden',
                  background: meta.bg,
                }}
              >
                <div className="cny-watermark" style={{ fontSize: '7rem', bottom: '-1.5rem', right: '0.5rem', opacity: 0.12 }} aria-hidden>
                  {meta.watermark}
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.3rem' }}>
                    <span className="chinese-char" style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--crimson)', lineHeight: 1 }}>
                      {meta.name}
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '0.05em' }}>
                      {meta.subtitle}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--crimson-mid)', fontWeight: 600, letterSpacing: '0.06em' }}>
                    {meta.tag}
                  </div>
                  <div style={{ marginTop: '0.6rem', fontSize: '0.7rem', color: 'var(--crimson)', fontWeight: 700, letterSpacing: '0.05em' }}>
                    開始學習 · Start learning →
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function LevelGrid({ dialect, onSwitchDialect }: { dialect: Dialect; onSwitchDialect: (d: Dialect) => void }) {
  const meta = dialectMeta[dialect]
  const other = dialect === 'cantonese' ? 'putonghua' : 'cantonese'
  const otherMeta = dialectMeta[other]

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

      {/* Background watermarks */}
      <div className="cny-watermark" style={{ fontSize: '22rem', top: '-3rem', right: '-4rem', opacity: 0.07 }} aria-hidden>學</div>
      <div className="cny-watermark" style={{ fontSize: '14rem', bottom: '4rem', left: '-3rem', opacity: 0.06 }} aria-hidden>話</div>

      {/* Header */}
      <div style={{ textAlign: 'center', paddingTop: '3rem', paddingBottom: '2rem', position: 'relative', zIndex: 1 }}>
        <div className="chinese-char" style={{ fontSize: '3.5rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.05em', lineHeight: 1, textShadow: '0 2px 8px rgba(100,10,10,0.25)' }}>
          中文
        </div>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '0.6rem' }}>
          Learn Chinese
        </div>

        {/* Dialect badge + switch */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
          <span className="chinese-char" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF', background: 'rgba(255,255,255,0.15)', borderRadius: '3px', padding: '0.2rem 0.6rem' }}>
            {meta.name} · {meta.subtitle}
          </span>
          <button
            onClick={() => onSwitchDialect(other)}
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '3px',
              padding: '0.2rem 0.5rem',
              color: 'rgba(255,255,255,0.75)',
              fontSize: '0.65rem',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.06em',
            }}
          >
            Switch to {otherMeta.subtitle}
          </button>
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
        {levelMeta.map((level) => {
          const unitCount = units.filter((u) => u.level === level.id && u.dialect === dialect).length
          return (
            <Link
              key={level.id}
              href={`/learn/${level.id}?d=${dialect}`}
              style={{ textDecoration: 'none', WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="cny-panel" style={{ padding: '1.1rem 1.25rem', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                <div className="cny-watermark" style={{ fontSize: '7rem', bottom: '-1.2rem', right: '0.5rem', opacity: 0.09, zIndex: 0 }} aria-hidden>
                  {level.watermark}
                </div>

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.3rem' }}>
                      <span className="chinese-char" style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--crimson)', lineHeight: 1 }}>
                        {level.chineseTitle}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-mid)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {level.englishTitle}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ink-mid)' }}>
                      {level.englishDesc}
                    </div>
                    <div style={{ marginTop: '0.6rem', fontSize: '0.7rem', color: 'var(--crimson)', fontWeight: 700, letterSpacing: '0.05em' }}>
                      {unitCount} 單元 · {unitCount} UNITS →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
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
