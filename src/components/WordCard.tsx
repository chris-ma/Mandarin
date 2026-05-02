'use client'

import Image from 'next/image'
import { Word, Dialect } from '@/lib/types'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import PhoneticGuide from './PhoneticGuide'

interface WordCardProps {
  word: Word
  index: number
  total: number
  dialect: Dialect
}

export default function WordCard({ word, index, total, dialect }: WordCardProps) {
  const { speak, isSpeaking } = useSpeechSynthesis()
  const lang = dialect === 'cantonese' ? 'zh-HK' : 'zh-CN'

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Image with CNY frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '11rem',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1.5px solid rgba(139,26,26,0.35)',
          marginBottom: '1rem',
          flexShrink: 0,
          background: 'rgba(139,26,26,0.08)',
        }}
      >
        <Image
          src={`/api/image?q=${encodeURIComponent(word.imageQuery)}`}
          alt={word.meaning}
          fill
          className="object-cover"
          unoptimized
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(45,8,8,0.5))' }} />
        <div
          style={{
            position: 'absolute',
            bottom: '0.5rem',
            right: '0.6rem',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: 700,
            background: 'rgba(139,26,26,0.7)',
            borderRadius: '2px',
            padding: '1px 6px',
            letterSpacing: '0.05em',
          }}
        >
          {index + 1} / {total}
        </div>
      </div>

      {/* Character — the hero element */}
      <div style={{ textAlign: 'center', marginBottom: '1rem', position: 'relative' }}>
        <div
          className="chinese-char"
          style={{
            fontSize: '5.5rem',
            fontWeight: 900,
            color: 'var(--crimson)',
            lineHeight: 1,
            marginBottom: '0.4rem',
            textShadow: '0 2px 0 rgba(139,26,26,0.15)',
          }}
        >
          {word.character}
        </div>
        <div style={{ fontSize: '1rem', color: 'var(--ink-mid)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
          {word.pinyin}
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)', marginTop: '0.3rem' }}>
          {word.meaning}
        </div>

        {/* Decorative line under character */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.6rem' }}>
          <div style={{ width: '1.5rem', height: '1px', background: 'rgba(139,26,26,0.2)' }} />
          <div style={{ width: '4px', height: '4px', background: 'rgba(139,26,26,0.3)', transform: 'rotate(45deg)' }} />
          <div style={{ width: '1.5rem', height: '1px', background: 'rgba(139,26,26,0.2)' }} />
        </div>
      </div>

      {/* Phonetic guide */}
      <PhoneticGuide phoneticGuide={word.phoneticGuide} toneNote={word.toneNote} pinyin={word.pinyin} />

      {/* Listen button */}
      <button
        onClick={() => speak(word.character, lang)}
        disabled={isSpeaking}
        className="cny-pill"
        style={{
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          width: '100%',
          padding: '0.75rem',
          background: isSpeaking ? 'rgba(139,26,26,0.08)' : 'transparent',
          color: 'var(--crimson)',
          fontWeight: 700,
          fontSize: '0.875rem',
          letterSpacing: '0.04em',
          cursor: isSpeaking ? 'default' : 'pointer',
          opacity: isSpeaking ? 0.7 : 1,
          border: 'none',
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>{isSpeaking ? '🔉' : '🔊'}</span>
        {isSpeaking ? '播放中 · Playing...' : '聆聽發音 · Hear pronunciation'}
      </button>
    </div>
  )
}
