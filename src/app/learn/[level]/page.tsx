import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getUnitsByLevel } from '@/lib/curriculum'
import { Level } from '@/lib/types'

const levelMeta: Record<Level, { title: string; subtitle: string; color: string }> = {
  basics: { title: '基础', subtitle: 'Basics', color: '#16a34a' },
  travel: { title: '旅行', subtitle: 'Travel', color: '#2563eb' },
  advanced: { title: '进阶', subtitle: 'Advanced', color: '#7c3aed' },
}

export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params
  const validLevels: Level[] = ['basics', 'travel', 'advanced']
  if (!validLevels.includes(level as Level)) notFound()

  const units = getUnitsByLevel(level)
  const meta = levelMeta[level as Level]

  return (
    <div className="flex flex-col flex-1 px-4 py-6 pt-safe">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
          ←
        </Link>
        <div>
          <h1 className="text-xl font-bold chinese-char" style={{ color: meta.color }}>
            {meta.title}
          </h1>
          <p className="text-sm text-gray-500">{meta.subtitle} · {units.length} units</p>
        </div>
      </div>

      {/* Unit cards */}
      <div className="flex flex-col gap-3 flex-1">
        {units.map((unit, index) => (
          <Link
            key={unit.id}
            href={`/learn/${level}/${unit.id}`}
            className="block bg-white rounded-2xl border border-gray-100 shadow-sm p-4 transition-all active:scale-95 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                style={{ background: meta.color }}
              >
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-900">{unit.title}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{unit.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1">
                    {unit.clusters.map((cluster) => (
                      <div
                        key={cluster.id}
                        className="w-2 h-2 rounded-full bg-gray-200"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{unit.clusters.length} clusters</span>
                </div>
              </div>
              <div className="text-gray-300 text-xl">›</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
