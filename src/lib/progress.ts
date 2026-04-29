import { Progress } from './types'

const KEY = 'mandarin_progress'

export function getProgress(): Progress {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

export function markClusterComplete(unitId: string, clusterId: string): void {
  const progress = getProgress()
  if (!progress[unitId]) {
    progress[unitId] = { completedClusters: [], lastAccessedAt: new Date().toISOString() }
  }
  if (!progress[unitId].completedClusters.includes(clusterId)) {
    progress[unitId].completedClusters.push(clusterId)
  }
  progress[unitId].lastAccessedAt = new Date().toISOString()
  localStorage.setItem(KEY, JSON.stringify(progress))
}

export function getUnitProgress(unitId: string, totalClusters: number): { completed: number; total: number } {
  const progress = getProgress()
  return {
    completed: progress[unitId]?.completedClusters.length ?? 0,
    total: totalClusters,
  }
}

export function isClusterComplete(unitId: string, clusterId: string): boolean {
  const progress = getProgress()
  return progress[unitId]?.completedClusters.includes(clusterId) ?? false
}

export function resetProgress(): void {
  localStorage.removeItem(KEY)
}
