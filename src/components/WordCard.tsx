'use client'

import Image from 'next/image'
import { Word } from '@/lib/types'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import PhoneticGuide from './PhoneticGuide'

interface WordCardProps {
  word: Word
  index: number
  total: number
}

export default function WordCard({ word, index, total }: WordCardProps) {
  const { speak, isSpeaking } = useSpeechSynthesis()

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Image */}
      <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gray-100 mb-4 flex-shrink-0">
        <Image
          src={`/api/image?q=${encodeURIComponent(word.imageQuery)}`}
          alt={word.meaning}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        <div className="absolute bottom-3 right-3 text-white text-xs font-medium bg-black/30 rounded-full px-2 py-0.5">
          {index + 1} of {total}
        </div>
      </div>

      {/* Character */}
      <div className="text-center mb-4">
        <div
          className="text-7xl font-bold chinese-char leading-none mb-2"
          style={{ color: 'var(--red)' }}
        >
          {word.character}
        </div>
        <div className="text-lg text-gray-500 font-mono">{word.pinyin}</div>
        <div className="text-2xl font-semibold text-gray-800 mt-1">{word.meaning}</div>
      </div>

      {/* Phonetic guide */}
      <PhoneticGuide
        phoneticGuide={word.phoneticGuide}
        toneNote={word.toneNote}
        pinyin={word.pinyin}
      />

      {/* Listen button */}
      <button
        onClick={() => speak(word.character)}
        disabled={isSpeaking}
        className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-700 font-medium transition-all active:scale-95 hover:border-gray-300 disabled:opacity-50"
      >
        <span className="text-xl">{isSpeaking ? '🔉' : '🔊'}</span>
        {isSpeaking ? 'Playing...' : 'Hear pronunciation'}
      </button>
    </div>
  )
}
