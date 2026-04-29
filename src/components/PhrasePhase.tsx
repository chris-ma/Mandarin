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
      if (transcript) {
        submitAttempt(transcript)
      }
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
        body: JSON.stringify({
          history: [],
          userTranscript: spokenText,
          clusterId: cluster.id,
          unitId,
          phase: 'respond',
        }),
      })
      const data = await res.json()
      if (data.assessment) {
        setAssessment(data.assessment)
      } else {
        // If Claude didn't return an assessment, make a simple one
        const matched = spokenText
          .replace(/\s/g, '')
          .includes(cluster.phrase.chinese.replace(/[！。？，]/g, '').replace(/\s/g, '').slice(0, 3))
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
    <div className="flex flex-col flex-1 px-4 py-4">
      {/* Phase label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Phase 2 of 3
        </span>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
          Phrase Practice
        </span>
      </div>

      {/* Phrase display */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
        <div className="text-center mb-4">
          <div
            className="text-3xl font-bold chinese-char leading-tight mb-2"
            style={{ color: 'var(--red)' }}
          >
            {cluster.phrase.chinese}
          </div>
          <div className="text-sm text-gray-500 font-mono mb-1">{cluster.phrase.pinyin}</div>
          <div className="text-base text-gray-700 font-medium">{cluster.phrase.meaning}</div>
        </div>

        {/* Breakdown */}
        <div className="border-t border-gray-100 pt-4">
          <div className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">
            Word by word
          </div>
          <div className="flex flex-wrap gap-2">
            {cluster.phrase.breakdown.map((part, i) => (
              <div key={i} className="bg-gray-50 rounded-lg px-2 py-1.5 text-center min-w-[60px]">
                <div className="text-sm font-bold chinese-char" style={{ color: 'var(--red)' }}>
                  {part.chinese}
                </div>
                <div className="text-xs text-gray-400 font-mono">{part.pinyin}</div>
                <div className="text-xs text-gray-600">{part.meaning}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Listen button */}
        <button
          onClick={() => speak(cluster.phrase.chinese)}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          🔊 Hear the phrase
        </button>
      </div>

      {/* Transcript display */}
      {transcript && (
        <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4 text-sm text-gray-600">
          You said: <span className="font-medium chinese-char">&ldquo;{transcript}&rdquo;</span>
        </div>
      )}

      {/* Assessment */}
      {assessment && <div className="mb-4"><AssessmentCard assessment={assessment} /></div>}

      {/* Loading */}
      {isLoading && (
        <div className="text-center text-sm text-gray-500 animate-pulse mb-4">
          Assessing your pronunciation...
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto pb-safe">
        {isListening && (
          <div className="text-center text-sm text-gray-500 animate-pulse mb-3">
            Listening... speak the phrase now
          </div>
        )}

        <div className="flex items-center justify-center mb-4">
          <MicButton
            isListening={isListening}
            isSupported={isSupported}
            onClick={handleMicClick}
            size={canProceed ? 'sm' : 'lg'}
          />
        </div>

        {!canProceed && (
          <p className="text-center text-xs text-gray-400">
            {isListening ? 'Tap to stop recording' : 'Tap the mic and say the phrase'}
          </p>
        )}

        {canProceed && (
          <button
            onClick={onComplete}
            className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all active:scale-95 shadow-lg"
            style={{ background: 'var(--red)' }}
          >
            Start Conversation →
          </button>
        )}
      </div>
    </div>
  )
}
