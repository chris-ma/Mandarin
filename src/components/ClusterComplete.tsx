'use client'

import { Cluster } from '@/lib/types'

interface ClusterCompleteProps {
  cluster: Cluster
  isLastCluster: boolean
  onNext: () => void
  onBack: () => void
}

export default function ClusterComplete({ cluster, isLastCluster, onNext, onBack }: ClusterCompleteProps) {
  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        padding: '2rem 1.25rem',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Background watermark */}
      <div
        className="cny-watermark"
        style={{ fontSize: '16rem', top: '-2rem', right: '-3rem', opacity: 0.06, color: 'rgba(139,26,26,0.1)' }}
        aria-hidden
      >
        完
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
        <div className="chinese-char" style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--crimson)', lineHeight: 1 }}>
          完成！
        </div>
        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', marginTop: '0.4rem' }}>
          Cluster Complete
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--ink-mid)', marginTop: '0.3rem' }}>
          You practiced <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{cluster.title}</span>
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.875rem' }}>
          <div style={{ width: '2rem', height: '1px', background: 'rgba(139,26,26,0.2)' }} />
          <div style={{ width: '5px', height: '5px', background: 'rgba(139,26,26,0.3)', transform: 'rotate(45deg)' }} />
          <div style={{ width: '2rem', height: '1px', background: 'rgba(139,26,26,0.2)' }} />
        </div>
      </div>

      {/* Words learned */}
      <div className="cny-panel" style={{ width: '100%', padding: '1rem', marginBottom: '0.875rem', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--crimson-mid)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem', position: 'relative', zIndex: 1 }}>
          學到的字詞 · Words you learned
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', position: 'relative', zIndex: 1 }}>
          {cluster.words.map((word) => (
            <div
              key={word.character}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                paddingBottom: '0.6rem',
                borderBottom: '1px solid rgba(139,26,26,0.1)',
              }}
            >
              <span className="chinese-char" style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--crimson)', minWidth: '2rem', textAlign: 'center' }}>
                {word.character}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--ink-mid)', fontFamily: 'monospace', minWidth: '4rem' }}>
                {word.pinyin}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--ink)', fontWeight: 600, marginLeft: 'auto' }}>
                {word.meaning}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Phrase practiced */}
      <div
        className="cny-panel"
        style={{ width: '100%', padding: '1rem', marginBottom: '1.5rem', position: 'relative', zIndex: 1, background: 'rgba(139,26,26,0.06)' }}
      >
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--crimson-mid)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem', position: 'relative', zIndex: 1 }}>
          練習的句型 · Phrase practiced
        </div>
        <div className="chinese-char" style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--crimson)', position: 'relative', zIndex: 1 }}>
          {cluster.phrase.chinese}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--ink-mid)', marginTop: '0.3rem', position: 'relative', zIndex: 1 }}>
          {cluster.phrase.meaning}
        </div>
      </div>

      {/* Actions */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: 'auto', paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))', position: 'relative', zIndex: 1 }}>
        <button
          onClick={onNext}
          style={{
            width: '100%',
            padding: '0.9rem',
            background: 'var(--crimson)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            letterSpacing: '0.05em',
          }}
        >
          {isLastCluster
            ? <><span className="chinese-char">完成單元</span> · Finish Unit 🏆</>
            : <><span className="chinese-char">下一組</span> · Next Cluster →</>}
        </button>
        <button
          onClick={onBack}
          className="cny-pill"
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'transparent',
            color: 'var(--crimson)',
            fontWeight: 700,
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.04em',
          }}
        >
          <span className="chinese-char">返回</span> · Back to Units
        </button>
      </div>
    </div>
  )
}
