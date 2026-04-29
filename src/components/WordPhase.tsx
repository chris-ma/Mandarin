'use client'

import { useState } from 'react'
import { Word } from '@/lib/types'
import WordCard from './WordCard'

interface WordPhaseProps {
  words: Word[]
  onComplete: () => void
}

export default function WordPhase({ words, onComplete }: WordPhaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const isLast = currentIndex === words.length - 1

  function handleNext() {
    if (isLast) {
      onComplete()
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  function handlePrev() {
    setCurrentIndex((i) => Math.max(0, i - 1))
  }

  return (
    <div className="flex flex-col flex-1 px-4 py-4">
      {/* Phase label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Phase 1 of 3
        </span>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
          Vocabulary
        </span>
      </div>

      {/* Card */}
      <div className="flex-1">
        <WordCard
          key={currentIndex}
          word={words[currentIndex]}
          index={currentIndex}
          total={words.length}
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-4 pb-safe">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-700 font-semibold transition-all active:scale-95"
          >
            ← Back
          </button>
        )}
        <button
          onClick={handleNext}
          className="flex-1 py-3.5 rounded-xl text-white font-semibold transition-all active:scale-95"
          style={{ background: 'var(--red)' }}
        >
          {isLast ? 'Practice Phrase →' : 'Next Word →'}
        </button>
      </div>
    </div>
  )
}
