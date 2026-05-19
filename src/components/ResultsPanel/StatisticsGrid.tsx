import type { Statistics } from '../../types/api.types'

interface Props {
  stats: Statistics
}

interface StatItem {
  label: string
  value: number
  always?: boolean
}

export default function StatisticsGrid({ stats }: Props) {
  const items: StatItem[] = [
    { label: 'Total sentencias', value: stats.totalSentencias, always: true },
    { label: 'Tablas afectadas', value: stats.tablasAfectadas, always: true },
    { label: 'SELECTs', value: stats.sentenciasSelect },
    { label: 'INSERTs', value: stats.sentenciasInsert },
    { label: 'UPDATEs', value: stats.sentenciasUpdate },
    { label: 'DELETEs', value: stats.sentenciasDelete },
    { label: 'DROPs', value: stats.sentenciasDrop },
    { label: 'TRUNCATEs', value: stats.sentenciasTruncate },
  ]

  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map(({ label, value, always }) => (
        <div
          key={label}
          className={`rounded-lg p-3 text-center ${
            value > 0 || always ? 'bg-gray-50 border border-gray-200' : 'bg-gray-50/50 border border-gray-100'
          }`}
        >
          <div
            className={`text-2xl font-bold ${
              value > 0 || always ? 'text-gray-800' : 'text-gray-300'
            }`}
          >
            {value}
          </div>
          <div
            className={`text-xs mt-0.5 ${
              value > 0 || always ? 'text-gray-500' : 'text-gray-300'
            }`}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}
