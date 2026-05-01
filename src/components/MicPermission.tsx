'use client'

import { useEffect } from 'react'

export default function MicPermission() {
  useEffect(() => {
    navigator.mediaDevices
      ?.getUserMedia({ audio: true })
      .then((stream) => stream.getTracks().forEach((t) => t.stop()))
      .catch(() => {})
  }, [])
  return null
}
