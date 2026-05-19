import { useState } from 'react'
import type { HistoryEntry } from '../types/api.types'
import CriticalityBadge from './ResultsPanel/CriticalityBadge'

interface Props {
  history: HistoryEntry[]
  onSelect: (entry: HistoryEntry) => void
  onClear: () => void
}

function relativeTime(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'justo ahora'
  if (mins < 60) return `hace ${mins} min`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `hace ${hrs} h`
  return `hace ${Math.floor(hrs / 24)} d`
}

export default function AnalysisHistory({ history, onSelect, onClear }: Props) {
  const [open, setOpen] = useState(false)

  if (history.length === 0) return null

  return (
    <div className="border-t border-gray-100 pt-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors mb-2"
      >
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Últimos análisis ({history.length})
        </span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="space-y-1.5">
          {history.map((entry) => (
            <button
              key={entry.id}
              onClick={() => onSelect(entry)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50 text-left transition-colors border border-transparent hover:border-gray-200"
            >
              <span className="text-[10px] font-bold uppercase text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                {entry.type}
              </span>
              <CriticalityBadge criticidad={entry.criticidad} size="sm" />
              <span className="text-sm font-semibold text-gray-700">{entry.puntuacion}</span>
              <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">{relativeTime(entry.timestamp)}</span>
            </button>
          ))}
          <button
            onClick={onClear}
            className="w-full text-xs text-gray-400 hover:text-red-500 py-1 text-center transition-colors"
          >
            Limpiar historial
          </button>
        </div>
      )}
    </div>
  )
}
