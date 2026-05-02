'use client'

import { useState, useEffect, useCallback } from 'react'
import { Cluster, Dialect, Assessment } from '@/lib/types'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import MicButton from './MicButton'

interface PhrasePhaseProps {
  cluster: Cluster
  unitId: string
  dialect: Dialect
  onComplete: () => void
}

export default function PhrasePhase({ cluster, unitId, dialect, onComplete }: PhrasePhaseProps) {
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [nothingHeard, setNothingHeard] = useState(false)

  const lang = dialect === 'cantonese' ? 'zh-HK' : 'zh-CN'
  const { transcript, interimTranscript, isListening, isSupported, start, stop, reset } =
    useSpeechRecognition(lang)
  const { speak } = useSpeechSynthesis()

  // Auto-submit once a final transcript lands (triggered by releasing the button)
  useEffect(() => {
    if (transcript && !isListening && !isLoading && !assessment) {
      submitAttempt(transcript)
    }
  // submitAttempt is stable (defined with useCallback below), but listing deps explicitly
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, isListening])

  // Auto-advance 1.5 s after a passing assessment
  useEffect(() => {
    if (assessment && assessment.score >= 60) {
      const t = setTimeout(onComplete, 1500)
      return () => clearTimeout(t)
    }
  }, [assessment, onComplete])

  const submitAttempt = useCallback(async (spokenText: string) => {
    setIsLoading(true)
    setAttempts((a) => a + 1)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: [],
          userTranscript: spokenText,
          clusterId: cluster.id,
          unitId,
          dialect,
          phase: 'respond',
        }),
      })
      const data = await res.json()
      setAssessment(
        data.assessment ?? {
          score: spokenText.replace(/\s/g, '').includes(
            cluster.phrase.chinese.replace(/[！。？，]/g, '').replace(/\s/g, '').slice(0, 3)
          ) ? 75 : 35,
          correct: 'Good effort!',
          correction: `Try: ${cluster.phrase.chinese}`,
          spokenTranslation: spokenText,
        }
      )
    } catch {
      setAssessment({ score: 0, correct: '', correction: 'Could not assess. Please try again.', spokenTranslation: spokenText })
    } finally {
      setIsLoading(false)
    }
  }, [cluster, unitId])

  function handlePressStart() {
    reset()
    setAssessment(null)
    setNothingHeard(false)
    start()
  }

  function handlePressEnd() {
    stop()
    // If nothing was captured at all, flag it
    // (transcript + interimTranscript are both empty → nothing heard)
  }

  // Detect "nothing heard" — happens when stop() fires but transcript stays empty
  useEffect(() => {
    if (!isListening && !isLoading && !transcript && !assessment && attempts === 0) return
    if (!isListening && !isLoading && !transcript && !assessment && !interimTranscript) {
      // Only show "nothing heard" if we were just recording (prevent showing on initial mount)
      setNothingHeard(true)
    }
  }, [isListening, isLoading, transcript, assessment, interimTranscript, attempts])

  function handleRetry() {
    reset()
    setAssessment(null)
    setNothingHeard(false)
  }

  const passed = assessment && assessment.score >= 60
  const failed = assessment && assessment.score < 60
  const canForceAdvance = failed && attempts >= 3

  // Derive what the live display should show while recording
  const liveText = interimTranscript || transcript

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1rem' }}>
      {/* Phase label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
        <span className="chinese-char" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.1em' }}>
          第二階段
        </span>
        <div style={{ width: '4px', height: '4px', background: 'rgba(139,26,26,0.3)', transform: 'rotate(45deg)' }} />
        <span style={{ fontSize: '0.7rem', color: 'var(--ink-mid)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
          Phase 2 · Phrase Practice
        </span>
      </div>

      {/* Target phrase panel */}
      <div className="cny-panel" style={{ padding: '1rem', marginBottom: '0.875rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.875rem', position: 'relative', zIndex: 1 }}>
          <div
            className="chinese-char"
            style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--crimson)', lineHeight: 1.2, marginBottom: '0.35rem' }}
          >
            {cluster.phrase.chinese}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--ink-mid)', fontFamily: 'monospace', marginBottom: '0.25rem' }}>
            {cluster.phrase.pinyin}
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)' }}>
            {cluster.phrase.meaning}
          </div>
        </div>

        {/* Word breakdown */}
        <div style={{ borderTop: '1px solid rgba(139,26,26,0.15)', paddingTop: '0.75rem', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--crimson-mid)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            逐字 · Word by word
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {cluster.phrase.breakdown.map((part, i) => (
              <div
                key={i}
                style={{ border: '1px solid rgba(139,26,26,0.25)', borderRadius: '2px', padding: '0.25rem 0.4rem', textAlign: 'center', minWidth: '3rem', background: 'rgba(139,26,26,0.04)' }}
              >
                <div className="chinese-char" style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--crimson)' }}>{part.chinese}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--ink-mid)', fontFamily: 'monospace' }}>{part.pinyin}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--ink)' }}>{part.meaning}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Listen button */}
        <button
          onClick={() => speak(cluster.phrase.chinese, lang)}
          className="cny-pill"
          style={{ marginTop: '0.75rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.45rem', background: 'transparent', color: 'var(--crimson)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', border: 'none', position: 'relative', zIndex: 1 }}
        >
          🔊 <span className="chinese-char">聆聽</span> · Hear phrase
        </button>
      </div>

      {/* Live recording panel — shown while holding */}
      {isListening && (
        <div
          className="cny-panel animate-fade-in"
          style={{ padding: '1rem', marginBottom: '0.875rem', textAlign: 'center', minHeight: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {liveText ? (
            <div>
              <div className="chinese-char" style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--crimson)', lineHeight: 1.2 }}>
                {liveText}
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--ink-mid)', fontSize: '0.85rem' }}>
              <span className="chinese-char" style={{ fontWeight: 700 }}>說吧…</span>
              <span style={{ marginLeft: '0.4rem' }}>Speak now…</span>
            </div>
          )}
        </div>
      )}

      {/* Assessment result panel */}
      {assessment && !isListening && (
        <div
          className={`cny-panel animate-fade-in`}
          style={{
            padding: '1rem',
            marginBottom: '0.875rem',
            background: passed ? 'rgba(21,128,61,0.06)' : 'rgba(139,26,26,0.05)',
            borderColor: passed ? '#15803d' : 'var(--crimson)',
          }}
        >
          {/* Pass / fail indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: '1.25rem' }}>{passed ? '✅' : '❌'}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: passed ? '#15803d' : 'var(--crimson)', letterSpacing: '0.05em' }}>
              {passed ? '正確！ Correct!' : `分數 Score: ${assessment.score}/100`}
            </span>
          </div>

          {/* What they said — Chinese + English */}
          <div style={{ marginBottom: '0.6rem', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--ink-mid)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
              你說了 · You said
            </div>
            <div className="chinese-char" style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--ink)', marginBottom: '0.15rem' }}>
              {transcript}
            </div>
            {assessment.spokenTranslation && (
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-mid)', fontStyle: 'italic' }}>
                "{assessment.spokenTranslation}"
              </div>
            )}
          </div>

          {/* Feedback */}
          {assessment.correct && (
            <div style={{ fontSize: '0.8rem', color: passed ? '#15803d' : 'var(--ink)', marginBottom: '0.3rem', position: 'relative', zIndex: 1 }}>
              {assessment.correct}
            </div>
          )}
          {assessment.correction && (
            <div style={{ fontSize: '0.78rem', color: 'var(--crimson-mid)', marginBottom: '0.3rem', position: 'relative', zIndex: 1 }}>
              {assessment.correction}
            </div>
          )}
          {assessment.phoneticTip && (
            <div style={{ fontSize: '0.75rem', color: 'var(--ink-mid)', background: 'rgba(139,26,26,0.07)', padding: '0.3rem 0.5rem', borderRadius: '2px', position: 'relative', zIndex: 1 }}>
              💡 {assessment.phoneticTip}
            </div>
          )}

          {/* Auto-advance hint */}
          {passed && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#15803d', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <span className="chinese-char">繼續下一步</span> · Moving on…
            </div>
          )}
        </div>
      )}

      {/* Nothing heard */}
      {nothingHeard && !isListening && !assessment && !isLoading && (
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--ink-mid)', marginBottom: '0.75rem' }}>
          <span className="chinese-char">沒有聽到</span> · Nothing heard — try again
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--crimson-mid)', marginBottom: '0.75rem' }}>
          <span className="chinese-char">評估中…</span> · Assessing…
        </div>
      )}

      {/* Mic + instructions */}
      <div style={{ marginTop: 'auto', paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        {/* Only show mic when not in a terminal state */}
        {!passed && !isLoading && (
          <>
            <MicButton
              isListening={isListening}
              isSupported={isSupported}
              onPressStart={handlePressStart}
              onPressEnd={handlePressEnd}
              size="lg"
            />
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--ink-mid)' }}>
              {isListening
                ? <><span className="chinese-char">放開即提交</span> · Release to submit</>
                : failed
                  ? <><span className="chinese-char">再試一次</span> · Hold to try again</>
                  : <><span className="chinese-char">按住說話</span> · Hold &amp; speak the phrase</>}
            </p>
          </>
        )}

        {/* Force-advance after 3 failures */}
        {canForceAdvance && !isListening && (
          <button
            onClick={onComplete}
            style={{ marginTop: '0.25rem', padding: '0.6rem 1.5rem', background: 'var(--crimson)', color: '#fff', fontWeight: 700, fontSize: '0.85rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            <span className="chinese-char">繼續</span> · Continue anyway →
          </button>
        )}
      </div>
    </div>
  )
}
