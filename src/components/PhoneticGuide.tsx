'use client'

interface PhoneticGuideProps {
  phoneticGuide: string
  toneNote: string
  pinyin: string
}

export default function PhoneticGuide({ phoneticGuide, toneNote, pinyin }: PhoneticGuideProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm">
      <div className="flex items-start gap-2">
        <span className="text-amber-500 text-lg leading-none mt-0.5">🔊</span>
        <div className="flex-1">
          <div className="font-semibold text-amber-900">
            Sounds like: <span className="text-amber-700">&ldquo;{phoneticGuide}&rdquo;</span>
          </div>
          <div className="text-amber-700 text-xs mt-1">{toneNote}</div>
          <div className="text-amber-600 text-xs mt-1 font-mono">{pinyin}</div>
        </div>
      </div>
    </div>
  )
}
