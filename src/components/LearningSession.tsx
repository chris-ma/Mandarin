'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Unit } from '@/lib/types'
import { markClusterComplete } from '@/lib/progress'
import WordPhase from './WordPhase'
import PhrasePhase from './PhrasePhase'
import ConversationPhase from './ConversationPhase'
import ClusterComplete from './ClusterComplete'

type Phase = 'words' | 'phrase' | 'conversation' | 'complete'

interface LearningSessionProps {
  unit: Unit
}

const levelColors: Record<string, string> = {
  basics: '#16a34a',
  travel: '#2563eb',
  advanced: '#7c3aed',
}

export default function LearningSession({ unit }: LearningSessionProps) {
  const router = useRouter()
  const [clusterIndex, setClusterIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('words')

  const cluster = unit.clusters[clusterIndex]
  const isLastCluster = clusterIndex === unit.clusters.length - 1
  const levelColor = levelColors[unit.level] || 'var(--red)'

  function handleWordsDone() {
    setPhase('phrase')
  }

  function handlePhraseDone() {
    setPhase('conversation')
  }

  function handleConversationDone() {
    markClusterComplete(unit.id, cluster.id)
    setPhase('complete')
  }

  function handleNextCluster() {
    if (isLastCluster) {
      router.push(`/learn/${unit.level}`)
    } else {
      setClusterIndex((i) => i + 1)
      setPhase('words')
    }
  }

  function handleBack() {
    router.push(`/learn/${unit.level}`)
  }

  // Progress header dots
  const totalPhases = unit.clusters.length * 3
  const currentPhaseNum = clusterIndex * 3 + (['words', 'phrase', 'conversation', 'complete'].indexOf(phase))

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      {/* Top nav */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0">
        <Link
          href={`/learn/${unit.level}`}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors text-sm"
        >
          ←
        </Link>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-900 truncate">{unit.title}</div>
          <div className="text-xs text-gray-400 truncate">{cluster.title}</div>
        </div>
        {/* Progress bar */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPhases }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentPhaseNum ? '16px' : '6px',
                height: '6px',
                background: i <= currentPhaseNum ? levelColor : '#e5e7eb',
              }}
            />
          ))}
        </div>
      </div>

      {/* Phase content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {phase === 'words' && (
          <WordPhase words={cluster.words} onComplete={handleWordsDone} />
        )}
        {phase === 'phrase' && (
          <PhrasePhase cluster={cluster} unitId={unit.id} onComplete={handlePhraseDone} />
        )}
        {phase === 'conversation' && (
          <ConversationPhase cluster={cluster} unitId={unit.id} onComplete={handleConversationDone} />
        )}
        {phase === 'complete' && (
          <ClusterComplete
            cluster={cluster}
            isLastCluster={isLastCluster}
            onNext={handleNextCluster}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  )
}
