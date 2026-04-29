'use client'

import { Cluster } from '@/lib/types'

interface ClusterCompleteProps {
  cluster: Cluster
  isLastCluster: boolean
  onNext: () => void
  onBack: () => void
}

export default function ClusterComplete({ cluster, isLastCluster, onNext, onBack }: ClusterCompleteProps) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center px-6 py-8 animate-fade-in">
      <div className="text-6xl mb-4">🎊</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        Cluster Complete!
      </h2>
      <p className="text-gray-500 text-center mb-6">
        You practiced <span className="font-semibold text-gray-800">{cluster.title}</span>
      </p>

      {/* Words summary */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
          Words you learned
        </div>
        <div className="flex flex-col gap-2">
          {cluster.words.map((word) => (
            <div key={word.character} className="flex items-center gap-3">
              <span
                className="text-xl font-bold chinese-char"
                style={{ color: 'var(--red)' }}
              >
                {word.character}
              </span>
              <span className="text-sm text-gray-500 font-mono">{word.pinyin}</span>
              <span className="text-sm text-gray-700 ml-auto">{word.meaning}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Phrase summary */}
      <div className="w-full bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8">
        <div className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-2">
          Phrase you practiced
        </div>
        <div className="text-lg font-bold chinese-char" style={{ color: 'var(--red)' }}>
          {cluster.phrase.chinese}
        </div>
        <div className="text-sm text-amber-700 mt-1">{cluster.phrase.meaning}</div>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col gap-3 pb-safe">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all active:scale-95 shadow-lg"
          style={{ background: 'var(--red)' }}
        >
          {isLastCluster ? '🏆 Finish Unit' : '→ Next Cluster'}
        </button>
        <button
          onClick={onBack}
          className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold transition-all active:scale-95"
        >
          Back to Units
        </button>
      </div>
    </div>
  )
}
