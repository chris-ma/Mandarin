import { notFound } from 'next/navigation'
import { getUnit } from '@/lib/curriculum'
import LearningSession from '@/components/LearningSession'

export default async function UnitPage({
  params,
}: {
  params: Promise<{ level: string; unitId: string }>
}) {
  const { level, unitId } = await params
  const unit = getUnit(unitId)

  if (!unit || unit.level !== level) notFound()

  return <LearningSession unit={unit} />
}
