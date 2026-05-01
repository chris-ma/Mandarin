'use client'

import { Assessment } from '@/lib/types'

interface AssessmentCardProps {
  assessment: Assessment
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? '#15803d' : score >= 50 ? '#b45309' : '#b91c1c'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ flex: 1, height: '6px', background: 'rgba(139,26,26,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: '3px', background: color, width: `${score}%`, transition: 'width 0.7s ease' }} />
      </div>
      <span style={{ fontSize: '0.8rem', fontWeight: 700, color, minWidth: '2.5rem', textAlign: 'right' }}>
        {score}%
      </span>
    </div>
  )
}

export default function AssessmentCard({ assessment }: AssessmentCardProps) {
  const { score, correct, correction, phoneticTip, spokenTranslation } = assessment
  const emoji = score >= 80 ? '🌟' : score >= 50 ? '👍' : '💪'
  const label = score >= 80 ? '很好！Excellent!' : score >= 50 ? '不錯！Good try!' : '繼續！Keep going!'

  return (
    <div
      className="cny-panel animate-slide-up"
      style={{ padding: '0.875rem', width: '100%' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: '1.1rem' }}>{emoji}</span>
        <span className="chinese-char" style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--ink)' }}>{label}</span>
      </div>

      <div style={{ marginBottom: '0.6rem', position: 'relative', zIndex: 1 }}>
        <ScoreBar score={score} />
      </div>

      {/* What they said in English — the key feedback */}
      {spokenTranslation && (
        <div
          style={{
            marginBottom: '0.5rem',
            padding: '0.4rem 0.6rem',
            background: 'rgba(139,26,26,0.06)',
            border: '1px solid rgba(139,26,26,0.2)',
            borderRadius: '3px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--crimson-mid)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.15rem' }}>
            你說的意思 · You said
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--ink)', fontStyle: 'italic' }}>
            &ldquo;{spokenTranslation}&rdquo;
          </div>
        </div>
      )}

      {correct && (
        <div style={{ marginBottom: '0.35rem', fontSize: '0.78rem', color: '#15803d', background: 'rgba(21,128,61,0.07)', padding: '0.3rem 0.5rem', borderRadius: '3px', position: 'relative', zIndex: 1 }}>
          ✓ {correct}
        </div>
      )}

      {correction && (
        <div style={{ marginBottom: '0.35rem', fontSize: '0.75rem', color: '#b45309', background: 'rgba(180,83,9,0.07)', padding: '0.3rem 0.5rem', borderRadius: '3px', position: 'relative', zIndex: 1 }}>
          ✎ {correction}
        </div>
      )}

      {phoneticTip && (
        <div style={{ fontSize: '0.75rem', color: 'var(--crimson-mid)', background: 'rgba(139,26,26,0.06)', padding: '0.3rem 0.5rem', borderRadius: '3px', position: 'relative', zIndex: 1 }}>
          💡 {phoneticTip}
        </div>
      )}
    </div>
  )
}
