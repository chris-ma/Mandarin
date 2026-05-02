'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Unit, Dialect } from '@/lib/types'
import { markClusterComplete } from '@/lib/progress'
import WordPhase from './WordPhase'
import PhrasePhase from './PhrasePhase'
import ConversationPhase from './ConversationPhase'
import ClusterComplete from './ClusterComplete'

type Phase = 'words' | 'phrase' | 'conversation' | 'complete'

interface LearningSessionProps {
  unit: Unit
  dialect: Dialect
}

export default function LearningSession({ unit, dialect }: LearningSessionProps) {
  const router = useRouter()
  const [clusterIndex, setClusterIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('words')

  const cluster = unit.clusters[clusterIndex]
  const isLastCluster = clusterIndex === unit.clusters.length - 1

  const totalPhases = unit.clusters.length * 3
  const currentPhaseNum = clusterIndex * 3 + (['words', 'phrase', 'conversation', 'complete'].indexOf(phase))

  const backHref = `/learn/${unit.level}?d=${dialect}`

  function handleWordsDone()        { setPhase('phrase') }
  function handlePhraseDone()       { setPhase('conversation') }
  function handleConversationDone() { markClusterComplete(unit.id, cluster.id); setPhase('complete') }
  function handleNextCluster() {
    if (isLastCluster) router.push(backHref)
    else { setClusterIndex((i) => i + 1); setPhase('words') }
  }
  function handleBack() { router.push(backHref) }

  const phaseLabels: Record<Phase, { zh: string; en: string }> = {
    words:        { zh: '字詞', en: 'Words' },
    phrase:       { zh: '句型', en: 'Phrase' },
    conversation: { zh: '對話', en: 'Conversation' },
    complete:     { zh: '完成', en: 'Complete' },
  }
  const { zh: phaseZh, en: phaseEn } = phaseLabels[phase]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100vh' }}>
      {/* Nav bar */}
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
        <Link
          href={backHref}
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            background: 'var(--cream)',
            border: '1.5px solid var(--crimson)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            color: 'var(--crimson)',
            fontWeight: 700,
            fontSize: '0.9rem',
            flexShrink: 0,
          }}
        >
          ←
        </Link>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {unit.title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '1px' }}>
            <span className="chinese-char" style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--crimson)' }}>{phaseZh}</span>
            <span style={{ fontSize: '0.6rem', color: 'rgba(139,26,26,0.5)' }}>·</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--ink-mid)' }}>{phaseEn}</span>
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          {Array.from({ length: totalPhases }).map((_, i) => (
            <div
              key={i}
              style={{
                height: '5px',
                borderRadius: '1px',
                transition: 'all 0.3s',
                width: i === currentPhaseNum ? '14px' : '5px',
                background: i <= currentPhaseNum ? 'var(--crimson)' : 'rgba(139,26,26,0.18)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Phase content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--cream)', overflowY: 'auto' }}>
        {phase === 'words'        && <WordPhase words={cluster.words} dialect={dialect} onComplete={handleWordsDone} />}
        {phase === 'phrase'       && <PhrasePhase cluster={cluster} unitId={unit.id} dialect={dialect} onComplete={handlePhraseDone} />}
        {phase === 'conversation' && <ConversationPhase cluster={cluster} unitId={unit.id} dialect={dialect} onComplete={handleConversationDone} />}
        {phase === 'complete'     && <ClusterComplete cluster={cluster} isLastCluster={isLastCluster} onNext={handleNextCluster} onBack={handleBack} />}
      </div>
    </div>
  )
}
