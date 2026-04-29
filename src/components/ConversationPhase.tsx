'use client'

import { useState, useEffect, useRef } from 'react'
import { ChatMessage, Cluster, TutorResponse } from '@/lib/types'
import ChatBubble from './ChatBubble'
import MicButton from './MicButton'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'

interface ConversationPhaseProps {
  cluster: Cluster
  unitId: string
  onComplete: () => void
}

export default function ConversationPhase({ cluster, unitId, onComplete }: ConversationPhaseProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  const { transcript, isListening, isSupported, start, stop, reset } = useSpeechRecognition('zh-CN')
  const { speak } = useSpeechSynthesis()

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  // Start conversation on mount
  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    startConversation()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // When transcript arrives after listening stops, submit it
  useEffect(() => {
    if (!isListening && transcript) {
      handleUserSpoke(transcript)
    }
  }, [isListening]) // eslint-disable-line react-hooks/exhaustive-deps

  async function callTutor(currentMessages: ChatMessage[], userTranscript: string | null, phase: 'start' | 'respond') {
    setIsLoading(true)

    // Show typing indicator
    setMessages((prev) => [...prev, { role: 'ai', isTyping: true }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: currentMessages,
          userTranscript,
          clusterId: cluster.id,
          unitId,
          phase,
        }),
      })

      const data: TutorResponse = await res.json()

      const aiMessage: ChatMessage = {
        role: 'ai',
        chinese: data.yourLine.chinese,
        pinyin: data.yourLine.pinyin,
        english: data.yourLine.english,
      }

      setMessages((prev) => [...prev.filter((m) => !m.isTyping), aiMessage])

      // Auto-play AI speech
      if (data.yourLine.chinese) {
        speak(data.yourLine.chinese)
      }

      if (data.isComplete) {
        setIsComplete(true)
      }
    } catch (err) {
      console.error(err)
      setMessages((prev) => prev.filter((m) => !m.isTyping))
    } finally {
      setIsLoading(false)
    }
  }

  function startConversation() {
    callTutor([], null, 'start')
  }

  function handleMicClick() {
    if (isListening) {
      stop()
    } else {
      reset()
      start()
    }
  }

  function handleUserSpoke(spokenText: string) {
    const userMessage: ChatMessage = {
      role: 'user',
      transcript: spokenText,
    }

    setMessages((prev) => [...prev, userMessage])
    callTutor([...messages, userMessage], spokenText, 'respond')
  }

  function handleSpeak(text: string) {
    speak(text)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-xl">
            🤖
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-900">AI Tutor</div>
            <div className="text-xs text-gray-500">{cluster.scenarioDescription}</div>
          </div>
          <div className="ml-auto">
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
              Phase 3 of 3 · Conversation
            </span>
          </div>
        </div>
      </div>

      {/* Target phrase reminder */}
      <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex-shrink-0">
        <div className="text-xs text-amber-700">
          <span className="font-semibold">Practice: </span>
          <span className="chinese-char font-bold">{cluster.phrase.chinese}</span>
          <span className="ml-2 text-amber-600">{cluster.phrase.meaning}</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg} onSpeak={handleSpeak} />
        ))}

        {isComplete && (
          <div className="text-center py-4 animate-fade-in">
            <div className="text-3xl mb-2">🎉</div>
            <div className="text-sm font-semibold text-gray-700">Conversation complete!</div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 border-t border-gray-100 bg-white px-4 py-4 pb-safe">
        {isComplete ? (
          <button
            onClick={onComplete}
            className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all active:scale-95 shadow-lg"
            style={{ background: 'var(--red)' }}
          >
            Complete Cluster 🎊
          </button>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {isListening && (
              <div className="text-sm text-gray-500 animate-pulse">Listening... speak now</div>
            )}
            {transcript && !isListening && (
              <div className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-1.5 max-w-full truncate">
                &ldquo;{transcript}&rdquo;
              </div>
            )}
            <MicButton
              isListening={isListening}
              isSupported={isSupported}
              onClick={handleMicClick}
              size="lg"
            />
            <div className="text-xs text-gray-400">
              {isListening ? 'Tap to stop' : isLoading ? 'AI is responding...' : 'Tap to speak in Mandarin'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
