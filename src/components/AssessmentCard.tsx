'use client'

import { Assessment } from '@/lib/types'

interface AssessmentCardProps {
  assessment: Assessment
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <span className="text-sm font-bold" style={{ color }}>
        {score}%
      </span>
    </div>
  )
}

export default function AssessmentCard({ assessment }: AssessmentCardProps) {
  const { score, correct, correction, phoneticTip } = assessment
  const emoji = score >= 80 ? '🌟' : score >= 50 ? '👍' : '💪'
  const label = score >= 80 ? 'Excellent!' : score >= 50 ? 'Good try!' : 'Keep going!'

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm animate-slide-up">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{emoji}</span>
        <span className="font-semibold text-gray-800">{label}</span>
      </div>

      <ScoreBar score={score} />

      {correct && (
        <div className="mt-3 text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">
          ✓ {correct}
        </div>
      )}

      {correction && (
        <div className="mt-2 text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
          ✎ {correction}
        </div>
      )}

      {phoneticTip && (
        <div className="mt-2 text-sm text-blue-700 bg-blue-50 rounded-lg px-3 py-2">
          🔊 {phoneticTip}
        </div>
      )}
    </div>
  )
}
