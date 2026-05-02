'use client'

import { useState, useEffect, useCallback } from 'react'
import { Cluster, Dialect, Phrase, Assessment } from '@/lib/types'
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
  const allPhrases: Phrase[] = cluster.phrases ?? [cluster.phrase]

  const [phraseIndex, setPhraseIndex] = useState(0)
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [nothingHeard, setNothingHeard] = useState(false)

  const currentPhrase = allPhrases[phraseIndex]
  const isLastPhrase = phraseIndex === allPhrases.length - 1

  const lang = dialect === 'cantonese' ? 'zh-HK' : 'zh-CN'
  const { transcript, interimTranscript, isListening, isSupported, start, stop, reset } =
    useSpeechRecognition(lang)
  const { speak } = useSpeechSynthesis()

  // Reset per-phrase state when moving to a new phrase
  useEffect(() => {
    setAssessment(null)
    setAttempts(0)
    setNothingHeard(false)
    reset()
  }, [phraseIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-submit once a final transcript lands
  useEffect(() => {
    if (transcript && !isListening && !isLoading && !assessment) {
      submitAttempt(transcript)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, isListening])

  // Auto-advance after a passing assessment
  useEffect(() => {
    if (assessment && assessment.score >= 60) {
      const t = setTimeout(() => {
        if (isLastPhrase) {
          onComplete()
        } else {
          setPhraseIndex((i) => i + 1)
        }
      }, 1400)
      return () => clearTimeout(t)
    }
  }, [assessment, isLastPhrase, onComplete])

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
          mode: 'phrase',
          targetPhrase: currentPhrase.chinese,
          targetPinyin: currentPhrase.pinyin,
          targetMeaning: currentPhrase.meaning,
        }),
      })
      const data = await res.json()
      setAssessment(
        data.assessment ?? {
          score: spokenText.replace(/\s/g, '').includes(
            currentPhrase.chinese.replace(/[！。？，]/g, '').replace(/\s/g, '').slice(0, 3)
          ) ? 75 : 35,
          correct: 'Good effort!',
          correction: `Try: ${currentPhrase.chinese}`,
          spokenTranslation: spokenText,
        }
      )
    } catch {
      setAssessment({ score: 0, correct: '', correction: 'Could not assess. Please try again.', spokenTranslation: spokenText })
    } finally {
      setIsLoading(false)
    }
  }, [cluster, unitId, dialect, currentPhrase])

  function handlePressStart() {
    reset()
    setAssessment(null)
    setNothingHeard(false)
    start()
  }

  function handlePressEnd() { stop() }

  useEffect(() => {
    if (!isListening && !isLoading && !transcript && !assessment && attempts === 0) return
    if (!isListening && !isLoading && !transcript && !assessment && !interimTranscript) {
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
  const liveText = interimTranscript || transcript

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1rem' }}>
      {/* Phase label + phrase counter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="chinese-char" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--crimson)', letterSpacing: '0.1em' }}>
            第二階段
          </span>
          <div style={{ width: '4px', height: '4px', background: 'rgba(139,26,26,0.3)', transform: 'rotate(45deg)' }} />
          <span style={{ fontSize: '0.7rem', color: 'var(--ink-mid)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
            Phase 2 · Phrase Practice
          </span>
        </div>
        {allPhrases.length > 1 && (
          <div style={{ display: 'flex', gap: '4px' }}>
            {allPhrases.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === phraseIndex ? '16px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i < phraseIndex ? 'var(--crimson)' : i === phraseIndex ? 'var(--crimson)' : 'rgba(139,26,26,0.2)',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Target phrase panel */}
      <div className="cny-panel" style={{ padding: '1rem', marginBottom: '0.875rem' }}>
        {allPhrases.length > 1 && (
          <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--crimson-mid)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', position: 'relative', zIndex: 1 }}>
            Phrase {phraseIndex + 1} of {allPhrases.length}
          </div>
        )}
        <div style={{ textAlign: 'center', marginBottom: '0.875rem', position: 'relative', zIndex: 1 }}>
          <div
            className="chinese-char"
            style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--crimson)', lineHeight: 1.2, marginBottom: '0.35rem' }}
          >
            {currentPhrase.chinese}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--ink-mid)', fontFamily: 'monospace', marginBottom: '0.25rem' }}>
            {currentPhrase.pinyin}
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)' }}>
            {currentPhrase.meaning}
          </div>
        </div>

        {/* Word breakdown */}
        <div style={{ borderTop: '1px solid rgba(139,26,26,0.15)', paddingTop: '0.75rem', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--crimson-mid)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            逐字 · Word by word
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {currentPhrase.breakdown.map((part, i) => (
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
          onClick={() => speak(currentPhrase.chinese, lang)}
          className="cny-pill"
          style={{ marginTop: '0.75rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.45rem', background: 'transparent', color: 'var(--crimson)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', border: 'none', position: 'relative', zIndex: 1 }}
        >
          🔊 <span className="chinese-char">聆聽</span> · Hear phrase
        </button>
      </div>

      {/* Live recording panel */}
      {isListening && (
        <div
          className="cny-panel animate-fade-in"
          style={{ padding: '1rem', marginBottom: '0.875rem', textAlign: 'center', minHeight: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {liveText ? (
            <div className="chinese-char" style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--crimson)', lineHeight: 1.2 }}>
              {liveText}
            </div>
          ) : (
            <div style={{ color: 'var(--ink-mid)', fontSize: '0.85rem' }}>
              <span className="chinese-char" style={{ fontWeight: 700 }}>說吧…</span>
              <span style={{ marginLeft: '0.4rem' }}>Speak now…</span>
            </div>
          )}
        </div>
      )}

      {/* Assessment result */}
      {assessment && !isListening && (
        <div
          className="cny-panel animate-fade-in"
          style={{
            padding: '1rem',
            marginBottom: '0.875rem',
            background: passed ? 'rgba(21,128,61,0.06)' : 'rgba(139,26,26,0.05)',
            borderColor: passed ? '#15803d' : 'var(--crimson)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: '1.25rem' }}>{passed ? '✅' : '❌'}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: passed ? '#15803d' : 'var(--crimson)', letterSpacing: '0.05em' }}>
              {passed ? '正確！ Correct!' : `分數 Score: ${assessment.score}/100`}
            </span>
          </div>

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

          {passed && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#15803d', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              {!isLastPhrase
                ? <><span className="chinese-char">下一句</span> · Next phrase…</>
                : <><span className="chinese-char">繼續下一步</span> · Moving on…</>}
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

        {canForceAdvance && !isListening && (
          <button
            onClick={() => {
              if (isLastPhrase) onComplete()
              else setPhraseIndex((i) => i + 1)
            }}
            style={{ marginTop: '0.25rem', padding: '0.6rem 1.5rem', background: 'var(--crimson)', color: '#fff', fontWeight: 700, fontSize: '0.85rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            <span className="chinese-char">繼續</span> · {isLastPhrase ? 'Continue anyway →' : 'Skip to next →'}
          </button>
        )}
      </div>
    </div>
  )
}
