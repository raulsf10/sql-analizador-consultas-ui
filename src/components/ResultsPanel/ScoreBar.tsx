import type { Criticality } from '../../types/api.types'

interface Props {
  score: number
  criticidad: Criticality
  threshold?: number
}

const barColor: Record<Criticality, string> = {
  BAJA: 'bg-green-500',
  MEDIA: 'bg-yellow-500',
  ALTA: 'bg-orange-500',
  CRITICA: 'bg-[#cd1531]',
}

export default function ScoreBar({ score, criticidad, threshold = 60 }: Props) {
  const pct = Math.min(100, Math.max(0, score))
  const thresholdPct = Math.min(100, Math.max(0, threshold))

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>0</span>
        <span>100</span>
      </div>
      <div className="relative h-3 bg-gray-100 rounded-full overflow-visible">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor[criticidad]}`}
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-[-4px] bottom-[-4px] w-[2px] bg-gray-500 rounded"
          style={{ left: `${thresholdPct}%` }}
          title={`Umbral de aprobación: ${threshold}`}
        />
        <div
          className="absolute top-[-20px] text-[10px] text-gray-500 -translate-x-1/2 whitespace-nowrap"
          style={{ left: `${thresholdPct}%` }}
        >
          umbral {threshold}
        </div>
      </div>
    </div>
  )
}
