'use client'

import { useState, useEffect, useRef } from 'react'
import { ChatMessage, Cluster, TutorResponse, Dialect } from '@/lib/types'
import ChatBubble from './ChatBubble'
import MicButton from './MicButton'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'

interface ConversationPhaseProps {
  cluster: Cluster
  unitId: string
  dialect: Dialect
  onComplete: () => void
}

export default function ConversationPhase({ cluster, unitId, dialect, onComplete }: ConversationPhaseProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [startError, setStartError] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  const lang = dialect === 'cantonese' ? 'zh-HK' : 'zh-CN'
  const { transcript, isListening, isSupported, start, stop, reset } = useSpeechRecognition(lang)
  const { speak } = useSpeechSynthesis()

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    startConversation()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isListening && transcript) {
      handleUserSpoke(transcript)
    }
  }, [isListening]) // eslint-disable-line react-hooks/exhaustive-deps

  async function callTutor(
    currentMessages: ChatMessage[],
    userTranscript: string | null,
    phase: 'start' | 'respond'
  ) {
    setIsLoading(true)
    setMessages((prev) => [...prev, { role: 'ai', isTyping: true }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: currentMessages, userTranscript, clusterId: cluster.id, unitId, dialect, phase, mode: 'conversation' }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data: TutorResponse = await res.json()

      const aiMessage: ChatMessage = {
        role: 'ai',
        chinese: data.yourLine.chinese,
        pinyin: data.yourLine.pinyin,
        english: data.yourLine.english,
      }

      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => !m.isTyping)
        const result = [...withoutTyping, aiMessage]

        // Attach assessment to the last user message
        if (data.assessment) {
          const lastUserIdx = result.map((m) => m.role).lastIndexOf('user')
          if (lastUserIdx !== -1) {
            result[lastUserIdx] = { ...result[lastUserIdx], assessment: data.assessment }
          }
        }
        return result
      })

      if (data.yourLine.chinese) speak(data.yourLine.chinese, lang)
      if (data.isComplete) setIsComplete(true)
    } catch (err) {
      console.error('[ConversationPhase]', err)
      setMessages((prev) => prev.filter((m) => !m.isTyping))
      if (phase === 'start') setStartError(true)
    } finally {
      setIsLoading(false)
    }
  }

  function startConversation() {
    setStartError(false)
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
    const userMessage: ChatMessage = { role: 'user', transcript: spokenText }
    setMessages((prev) => [...prev, userMessage])
    callTutor([...messages, userMessage], spokenText, 'respond')
  }

  const showEmptyLoading = messages.length === 0 && isLoading
  const showEmptyError = messages.length === 0 && !isLoading && startError

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* Header */}
      <div
        style={{
          padding: '0.75rem 1rem',
          borderBottom: '1.5px solid rgba(139,26,26,0.15)',
          background: 'var(--cream)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            border: '1.5px solid rgba(139,26,26,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            background: 'rgba(139,26,26,0.06)',
            flexShrink: 0,
          }}
        >
          🤖
        </div>
        <div style={{ flex: 1 }}>
          <div className="chinese-char" style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--ink)' }}>
            AI 老師 · AI Tutor
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--ink-mid)' }}>{cluster.scenarioDescription}</div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        {/* Loading first message */}
        {showEmptyLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', animation: 'fade-in 0.4s ease-out' }}>
            <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(139,26,26,0.08)', border: '1px solid rgba(139,26,26,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>🤖</div>
            <div style={{ background: 'white', border: '1.5px solid rgba(139,26,26,0.2)', borderRadius: '0 12px 12px 12px', padding: '0.75rem 1rem' }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="animate-bounce" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(139,26,26,0.35)', animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error — tutor failed to start */}
        {showEmptyError && (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div className="chinese-char" style={{ fontSize: '1rem', color: 'var(--crimson)', marginBottom: '0.5rem' }}>
              連線失敗
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--ink-mid)', marginBottom: '1rem' }}>
              Could not connect to AI tutor. Check your internet connection.
            </div>
            <button
              onClick={startConversation}
              style={{ padding: '0.6rem 1.5rem', background: 'var(--crimson)', color: '#fff', fontWeight: 700, fontSize: '0.85rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              重試 · Retry
            </button>
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg} onSpeak={(text) => speak(text, lang)} />
        ))}

        {isComplete && (
          <div style={{ textAlign: 'center', padding: '1rem', animation: 'fade-in 0.4s ease-out' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🎉</div>
            <div className="chinese-char" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--crimson)' }}>
              對話完成！Conversation complete!
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div
        style={{
          flexShrink: 0,
          borderTop: '1.5px solid rgba(139,26,26,0.15)',
          background: 'var(--cream)',
          padding: '0.875rem 1rem',
          paddingBottom: 'max(0.875rem, env(safe-area-inset-bottom))',
        }}
      >
        {isComplete ? (
          <button
            onClick={onComplete}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: 'var(--crimson)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              letterSpacing: '0.04em',
            }}
          >
            <span className="chinese-char">完成練習</span> · Complete Cluster 🎊
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            {isListening && (
              <div style={{ fontSize: '0.78rem', color: 'var(--crimson-mid)' }} className="animate-pulse">
                <span className="chinese-char">聆聽中</span> · Listening…
              </div>
            )}
            {transcript && !isListening && (
              <div
                className="chinese-char"
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--ink)',
                  background: 'rgba(139,26,26,0.06)',
                  border: '1px solid rgba(139,26,26,0.2)',
                  borderRadius: '3px',
                  padding: '0.3rem 0.75rem',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                &ldquo;{transcript}&rdquo;
              </div>
            )}
            <MicButton
              isListening={isListening}
              isSupported={isSupported}
              onClick={handleMicClick}
              size="lg"
            />
            <div style={{ fontSize: '0.72rem', color: 'var(--ink-mid)' }}>
              {isListening
                ? <><span className="chinese-char">點擊停止</span> · Tap to stop</>
                : isLoading
                  ? <><span className="chinese-char">老師回覆中</span> · AI is responding…</>
                  : <><span className="chinese-char">{dialect === 'cantonese' ? '點擊說廣東話' : '點擊說普通話'}</span> · Tap to speak</>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
