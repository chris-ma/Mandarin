'use client'

import { useParams, useSearchParams, notFound } from 'next/navigation'
import { getUnit } from '@/lib/curriculum'
import { Dialect } from '@/lib/types'
import LearningSession from '@/components/LearningSession'

export default function UnitPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const level = params.level as string
  const unitId = params.unitId as string
  const dialect = (searchParams.get('d') ?? 'putonghua') as Dialect

  const unit = getUnit(unitId)
  if (!unit || unit.level !== level) notFound()

  return <LearningSession unit={unit} dialect={dialect} />
}
