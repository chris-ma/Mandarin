'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface UseSpeechRecognitionReturn {
  transcript: string
  interimTranscript: string
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
  const [interimTranscript, setInterimTranscript] = useState('')
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
    recognition.interimResults = true
    recognition.maxAlternatives = 1
    recognition.continuous = false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let interim = ''
      let final = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const r = event.results[i]
        if (r.isFinal) final += r[0].transcript
        else interim += r[0].transcript
      }
      if (final) setTranscript(final)
      setInterimTranscript(interim)
    }

    recognition.onend = () => {
      setIsListening(false)
      setInterimTranscript('')
    }
    recognition.onerror = () => {
      setIsListening(false)
      setInterimTranscript('')
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
    setTranscript('')
    setInterimTranscript('')
  }, [lang])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  const reset = useCallback(() => {
    setTranscript('')
    setInterimTranscript('')
  }, [])

  return { transcript, interimTranscript, isListening, isSupported, start, stop, reset }
}
