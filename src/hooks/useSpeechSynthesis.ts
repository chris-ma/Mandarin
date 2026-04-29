'use client'

import { useState, useCallback } from 'react'

interface UseSpeechSynthesisReturn {
  speak: (text: string, lang?: string) => void
  isSpeaking: boolean
  isSupported: boolean
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  const speak = useCallback((text: string, lang = 'zh-CN') => {
    if (!isSupported) return
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.85
    utterance.pitch = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }, [isSupported])

  return { speak, isSpeaking, isSupported }
}
