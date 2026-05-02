'use client'

import Link from 'next/link'
import { useParams, useSearchParams, notFound } from 'next/navigation'
import { getUnitsByLevel } from '@/lib/curriculum'
import { Level, Dialect } from '@/lib/types'

const levelMeta: Record<Level, { zh: string; en: string; watermark: string }> = {
  basics:   { zh: '基礎', en: 'Basics',   watermark: '好' },
  travel:   { zh: '旅行', en: 'Travel',   watermark: '行' },
  advanced: { zh: '進階', en: 'Advanced', watermark: '語' },
}

const chineseNumerals = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

export default function LevelPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const level = params.level as string
  const dialect = (searchParams.get('d') ?? 'putonghua') as Dialect

  const validLevels: Level[] = ['basics', 'travel', 'advanced']
  if (!validLevels.includes(level as Level)) notFound()

  const units = getUnitsByLevel(level, dialect)
  const meta = levelMeta[level as Level]

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
      {/* Background watermark */}
      <div
        className="cny-watermark"
        style={{ fontSize: '20rem', top: '-2rem', right: '-4rem', opacity: 0.07 }}
        aria-hidden
      >
        {meta.watermark}
      </div>

      {/* Header */}
      <div style={{ paddingTop: '2.5rem', paddingBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Link
            href={`/?d=${dialect}`}
            style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              border: '1.5px solid var(--crimson)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: 'var(--crimson)',
              fontWeight: 700,
              fontSize: '1rem',
              flexShrink: 0,
            }}
          >
            ←
          </Link>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span className="chinese-char" style={{ fontSize: '1.75rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
                {meta.zh}
              </span>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {meta.en}
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.1rem' }}>
              {units.length} 單元 · {units.length} units
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
          <div style={{ width: '1.5rem', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
          <div style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.4)', transform: 'rotate(45deg)' }} />
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
        </div>
      </div>

      {/* Unit cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', position: 'relative', zIndex: 1 }}>
        {units.map((unit, index) => (
          <Link
            key={unit.id}
            href={`/learn/${level}/${unit.id}?d=${dialect}`}
            style={{ textDecoration: 'none', WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="cny-panel" style={{ padding: '1rem 1.1rem', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
              <div className="cny-watermark" style={{ fontSize: '5rem', bottom: '-0.75rem', right: '0.75rem', opacity: 0.1 }} aria-hidden>
                {chineseNumerals[index] ?? index + 1}
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', position: 'relative', zIndex: 1 }}>
                <div
                  className="chinese-char"
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '2px',
                    border: '1.5px solid var(--crimson)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 900,
                    color: 'var(--crimson)',
                    flexShrink: 0,
                    background: 'rgba(139,26,26,0.07)',
                  }}
                >
                  {chineseNumerals[index] ?? index + 1}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                    {unit.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--ink-mid)', lineHeight: 1.4 }}>
                    {unit.description}
                  </div>
                  <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {unit.clusters.map((cluster) => (
                        <div key={cluster.id} style={{ width: '6px', height: '6px', borderRadius: '1px', background: 'rgba(139,26,26,0.25)', transform: 'rotate(45deg)' }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--crimson-mid)', fontWeight: 600, letterSpacing: '0.05em' }}>
                      {unit.clusters.length} CLUSTERS
                    </span>
                  </div>
                </div>

                <div style={{ color: 'var(--crimson)', fontSize: '1.1rem', alignSelf: 'center', opacity: 0.6 }}>›</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
