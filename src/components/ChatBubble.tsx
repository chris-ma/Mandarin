'use client'

import { ChatMessage } from '@/lib/types'
import AssessmentCard from './AssessmentCard'

interface ChatBubbleProps {
  message: ChatMessage
  onSpeak?: (text: string) => void
}

export default function ChatBubble({ message, onSpeak }: ChatBubbleProps) {
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
                className="mt-2 text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
              >
                🔊 Listen
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
          style={{ background: 'var(--red)' }}
        >
          <div className="text-sm font-medium">{message.transcript || '...'}</div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-sm">
          👤
        </div>
      </div>
      {message.assessment && <AssessmentCard assessment={message.assessment} />}
    </div>
  )
}
