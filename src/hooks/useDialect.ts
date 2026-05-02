'use client'

import { useState, useEffect, useCallback } from 'react'
import { Dialect } from '@/lib/types'

const STORAGE_KEY = 'chinese_dialect'

export function useDialect() {
  const [dialect, setDialectState] = useState<Dialect | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'cantonese' || stored === 'putonghua') {
      setDialectState(stored)
    }
  }, [])

  const setDialect = useCallback((d: Dialect) => {
    localStorage.setItem(STORAGE_KEY, d)
    setDialectState(d)
  }, [])

  return { dialect, setDialect }
}
