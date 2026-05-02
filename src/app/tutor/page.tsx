'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { units } from '@/lib/curriculum'
import { Cluster, Unit, Dialect } from '@/lib/types'
import ConversationPhase from '@/components/ConversationPhase'

const levelMeta: Record<string, { zh: string; en: string }> = {
  basics:   { zh: '基礎', en: 'Basics' },
  travel:   { zh: '旅行', en: 'Travel' },
  advanced: { zh: '進階', en: 'Advanced' },
}

type Selection = { unit: Unit; cluster: Cluster } | null

export default function TutorPage() {
  return (
    <Suspense>
      <TutorPageInner />
    </Suspense>
  )
}

function TutorPageInner() {
  const searchParams = useSearchParams()
  const dialect = (searchParams.get('d') ?? 'putonghua') as Dialect
  const [selected, setSelected] = useState<Selection>(null)

  const backHref = `/?d=${dialect}`
  const dialectUnits = units.filter((u) => u.dialect === dialect)

  if (selected) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100vh' }}>
        {/* Nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--cream)',
            borderBottom: '1.5px solid rgba(139,26,26,0.2)',
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              background: 'var(--cream)',
              border: '1.5px solid var(--crimson)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--crimson)',
              fontWeight: 700,
              fontSize: '0.9rem',
              flexShrink: 0,
              cursor: 'pointer',
            }}
          >
            ←
          </button>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink)' }}>
              {selected.unit.title} · {selected.cluster.title}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--ink-mid)' }}>
              {selected.cluster.scenarioDescription}
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--cream)', overflow: 'hidden' }}>
          <ConversationPhase
            key={`${selected.cluster.id}-${dialect}`}
            cluster={selected.cluster}
            unitId={selected.unit.id}
            dialect={dialect}
            onComplete={() => setSelected(null)}
          />
        </div>
      </div>
    )
  }

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
      {/* Watermarks */}
      <div className="cny-watermark" style={{ fontSize: '20rem', top: '-2rem', right: '-4rem', opacity: 0.07 }} aria-hidden>話</div>

      {/* Header */}
      <div style={{ paddingTop: '2.5rem', paddingBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <Link
            href={backHref}
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
              <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>🤖</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                AI Tutor
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.1rem' }}>
              Pick a scenario and have a free conversation
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
          <div style={{ width: '1.5rem', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
          <div style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.4)', transform: 'rotate(45deg)' }} />
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
        </div>
      </div>

      {/* Scenario list grouped by level */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
        {(['basics', 'travel', 'advanced'] as const).map((level) => {
          const levelUnits = dialectUnits.filter((u) => u.level === level)
          if (levelUnits.length === 0) return null
          const meta = levelMeta[level]
          return (
            <div key={level}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="chinese-char" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{meta.zh}</span>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{meta.en}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {levelUnits.flatMap((unit) =>
                  unit.clusters.map((cluster) => (
                    <button
                      key={cluster.id}
                      onClick={() => setSelected({ unit, cluster })}
                      style={{
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        WebkitTapHighlightColor: 'transparent',
                      }}
                    >
                      <div className="cny-panel" style={{ padding: '0.75rem 1rem', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative', zIndex: 1 }}>
                          <div
                            style={{
                              width: '2rem',
                              height: '2rem',
                              borderRadius: '50%',
                              background: 'rgba(139,26,26,0.08)',
                              border: '1px solid rgba(139,26,26,0.25)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem',
                              flexShrink: 0,
                            }}
                          >
                            🤖
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--ink)', marginBottom: '0.1rem' }}>
                              {unit.title} · {cluster.title}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--ink-mid)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                              {cluster.scenarioDescription}
                            </div>
                          </div>
                          <div style={{ color: 'var(--crimson)', fontSize: '1.1rem', opacity: 0.6, flexShrink: 0 }}>›</div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
