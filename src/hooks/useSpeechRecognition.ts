'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface UseSpeechRecognitionReturn {
  transcript: string
  isListening: boolean
  isSupported: boolean
  start: () => void
  stop: () => void
  reset: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyWindow = Record<string, any>

function getSpeechRecognitionCtor() {
  if (typeof window === 'undefined') return null
  const w = window as unknown as AnyWindow
  return w['SpeechRecognition'] ?? w['webkitSpeechRecognition'] ?? null
}

export function useSpeechRecognition(lang = 'zh-CN'): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    setIsSupported(!!getSpeechRecognitionCtor())
  }, [])

  const start = useCallback(() => {
    const SR = getSpeechRecognitionCtor()
    if (!SR) return

    const recognition = new SR()
    recognition.lang = lang
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.continuous = false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript
      setTranscript(result)
    }

    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
    setTranscript('')
  }, [lang])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  const reset = useCallback(() => setTranscript(''), [])

  return { transcript, isListening, isSupported, start, stop, reset }
}
