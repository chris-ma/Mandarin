'use client'

import { ChatMessage } from '@/lib/types'
import AssessmentCard from './AssessmentCard'

interface ChatBubbleProps {
  message: ChatMessage
  onSpeak?: (text: string) => void
  lang?: string
}

export default function ChatBubble({ message, onSpeak, lang: _lang }: ChatBubbleProps) {
  const isAI = message.role === 'ai'

  if (message.isTyping) {
    return (
      <div className="flex items-end gap-2 animate-fade-in">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-sm">
          🤖
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
          <div className="flex gap-1 items-center h-5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isAI) {
    return (
      <div className="flex items-end gap-2 animate-slide-up">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-sm">
          🤖
        </div>
        <div className="flex flex-col gap-1 max-w-[80%]">
          <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
            {message.chinese && (
              <div
                className="text-xl font-bold chinese-char leading-tight mb-1"
                style={{ color: 'var(--red)' }}
              >
                {message.chinese}
              </div>
            )}
            {message.pinyin && (
              <div className="text-xs text-gray-500 font-mono mb-1">{message.pinyin}</div>
            )}
            {message.english && (
              <div className="text-sm text-gray-600 italic">{message.english}</div>
            )}
            {onSpeak && message.chinese && (
              <button
                onClick={() => onSpeak(message.chinese!)}
                style={{
                  marginTop: '0.5rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.3rem 0.75rem',
                  background: 'rgba(139,26,26,0.08)',
                  border: '1px solid rgba(139,26,26,0.25)',
                  borderRadius: '20px',
                  color: 'var(--crimson)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                🔊 <span className="chinese-char">聆聽</span> · Play
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // User message
  return (
    <div className="flex flex-col items-end gap-2 animate-slide-up">
      <div className="flex items-end gap-2">
        <div
          className="max-w-[80%] rounded-2xl rounded-br-sm px-4 py-3 text-white"
          style={{ background: 'var(--crimson)' }}
        >
          <div className="chinese-char" style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.3 }}>
            {message.transcript || '...'}
          </div>
          {message.assessment?.spokenTranslation && (
            <div style={{ fontSize: '0.72rem', opacity: 0.85, fontStyle: 'italic', marginTop: '0.2rem' }}>
              &ldquo;{message.assessment.spokenTranslation}&rdquo;
            </div>
          )}
          {onSpeak && message.transcript && (
            <button
              onClick={() => onSpeak(message.transcript!)}
              style={{
                marginTop: '0.4rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.2rem 0.6rem',
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '20px',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              🔊 Play back
            </button>
          )}
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-sm">
          👤
        </div>
      </div>
      {message.assessment && <AssessmentCard assessment={message.assessment} />}
    </div>
  )
}
