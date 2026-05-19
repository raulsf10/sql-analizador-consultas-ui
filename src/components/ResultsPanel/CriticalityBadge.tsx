import type { Criticality } from '../../types/api.types'

interface Props {
  criticidad: Criticality
  size?: 'sm' | 'md' | 'lg'
}

const config: Record<Criticality, { bg: string; text: string; label: string }> = {
  BAJA: { bg: 'bg-green-100', text: 'text-green-700', label: 'BAJA' },
  MEDIA: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'MEDIA' },
  ALTA: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'ALTA' },
  CRITICA: { bg: 'bg-[#cd1531]/10', text: 'text-[#cd1531]', label: 'CRÍTICA' },
}

const sizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5 font-bold',
}

export default function CriticalityBadge({ criticidad, size = 'md' }: Props) {
  const { bg, text, label } = config[criticidad]
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${bg} ${text} ${sizes[size]}`}>
      {label}
    </span>
  )
}
