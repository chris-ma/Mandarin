'use client'

import { useState } from 'react'
import { Cluster } from '@/lib/types'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import MicButton from './MicButton'
import AssessmentCard from './AssessmentCard'
import { Assessment } from '@/lib/types'

interface PhrasePhaseProps {
  cluster: Cluster
  unitId: string
  onComplete: () => void
}

export default function PhrasePhase({ cluster, unitId, onComplete }: PhrasePhaseProps) {
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const { transcript, isListening, isSupported, start, stop, reset } = useSpeechRecognition('zh-CN')
  const { speak } = useSpeechSynthesis()

  function handleMicClick() {
    if (isListening) {
      stop()
      if (transcript) submitAttempt(transcript)
    } else {
      reset()
      setAssessment(null)
      start()
    }
  }

  async function submitAttempt(spokenText: string) {
    setIsLoading(true)
    setAttempts((a) => a + 1)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: [], userTranscript: spokenText, clusterId: cluster.id, unitId, phase: 'respond' }),
      })
      const data = await res.json()
      if (data.assessment) {
        setAssessment(data.assessment)
      } else {
        const matched = spokenText.replace(/\s/g, '').includes(
          cluster.phrase.chinese.replace(/[！。？，]/g, '').replace(/\s/g, '').slice(0, 3)
        )
        setAssessment({
          score: matched ? 75 : 40,
          correct: matched ? 'Good effort! You got the key sounds.' : 'Keep trying!',
          correction: matched ? undefined : `Try saying: ${cluster.phrase.chinese}`,
          phoneticTip: undefined,
        })
      }
    } catch {
      setAssessment({ score: 0, correct: '', correction: 'Could not assess. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const canProceed = assessment && (assessment.score >= 60 || attempts >= 3)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1rem' }}>
      {/* Phase label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
        <span className="chinese-char" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.1em' }}>
          第二階段
        </span>
        <div style={{ width: '4px', height: '4px', background: 'rgba(139,26,26,0.3)', transform: 'rotate(45deg)' }} />
        <span style={{ fontSize: '0.7rem', color: 'var(--ink-mid)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
          Phase 2 of 3 · Phrase Practice
        </span>
      </div>

      {/* Phrase panel */}
      <div className="cny-panel" style={{ padding: '1.1rem', marginBottom: '0.875rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
          <div
            className="chinese-char"
            style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--crimson)', lineHeight: 1.2, marginBottom: '0.4rem' }}
          >
            {cluster.phrase.chinese}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--ink-mid)', fontFamily: 'monospace', marginBottom: '0.3rem' }}>
            {cluster.phrase.pinyin}
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)' }}>
            {cluster.phrase.meaning}
          </div>
        </div>

        {/* Word breakdown */}
        <div style={{ borderTop: '1px solid rgba(139,26,26,0.15)', paddingTop: '0.875rem', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--crimson-mid)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            逐字分析 · Word by word
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {cluster.phrase.breakdown.map((part, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid rgba(139,26,26,0.25)',
                  borderRadius: '2px',
                  padding: '0.3rem 0.5rem',
                  textAlign: 'center',
                  minWidth: '3.5rem',
                  background: 'rgba(139,26,26,0.04)',
                }}
              >
                <div className="chinese-char" style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--crimson)' }}>{part.chinese}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--ink-mid)', fontFamily: 'monospace' }}>{part.pinyin}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--ink)' }}>{part.meaning}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Listen button */}
        <button
          onClick={() => speak(cluster.phrase.chinese)}
          className="cny-pill"
          style={{
            marginTop: '0.875rem',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            padding: '0.5rem',
            background: 'transparent',
            color: 'var(--crimson)',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
            position: 'relative',
            zIndex: 1,
          }}
        >
          🔊 <span className="chinese-char">聆聽</span> · Hear phrase
        </button>
      </div>

      {/* Transcript */}
      {transcript && (
        <div
          style={{
            background: 'rgba(139,26,26,0.06)',
            border: '1px solid rgba(139,26,26,0.2)',
            borderRadius: '4px',
            padding: '0.6rem 0.875rem',
            marginBottom: '0.875rem',
            fontSize: '0.85rem',
            color: 'var(--ink-mid)',
          }}
        >
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--crimson-mid)', letterSpacing: '0.05em' }}>你說了 · You said: </span>
          <span className="chinese-char" style={{ fontWeight: 700, color: 'var(--ink)' }}>&ldquo;{transcript}&rdquo;</span>
        </div>
      )}

      {/* Assessment */}
      {assessment && <div style={{ marginBottom: '0.875rem' }}><AssessmentCard assessment={assessment} /></div>}

      {/* Loading */}
      {isLoading && (
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--crimson-mid)', marginBottom: '0.875rem' }}>
          <span className="chinese-char">評估中</span> · Assessing...
        </div>
      )}

      {/* Actions */}
      <div style={{ marginTop: 'auto', paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
        {isListening && (
          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--crimson-mid)', marginBottom: '0.75rem' }}>
            <span className="chinese-char">聆聽中</span> · Listening... speak now
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.875rem' }}>
          <MicButton isListening={isListening} isSupported={isSupported} onClick={handleMicClick} size={canProceed ? 'sm' : 'lg'} />
        </div>

        {!canProceed && (
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--ink-mid)' }}>
            {isListening ? '點擊停止 · Tap to stop' : '點擊麥克風說句子 · Tap mic to speak'}
          </p>
        )}

        {canProceed && (
          <button
            onClick={onComplete}
            style={{
              width: '100%',
              padding: '0.875rem',
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
            <span className="chinese-char">開始對話</span> · Start Conversation →
          </button>
        )}
      </div>
    </div>
  )
}
