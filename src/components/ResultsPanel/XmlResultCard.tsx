import { useState } from 'react'
import type { QueryResult } from '../../types/api.types'
import CriticalityBadge from './CriticalityBadge'
import ProblemsTable from './ProblemsTable'

interface Props {
  query: QueryResult
  defaultExpanded?: boolean
}

export default function XmlResultCard({ query, defaultExpanded = false }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <svg
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="font-medium text-gray-800 truncate flex-1">{query.nombre}</span>
        <CriticalityBadge criticidad={query.criticidad} size="sm" />
        <span className="text-sm font-bold text-gray-700 ml-1">{query.puntuacion}</span>
        {query.requiereAprobacion ? (
          <svg className="w-4 h-4 text-[#cd1531] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-3 space-y-3">
          <ProblemsTable issues={query.problemas} />
          <p className="text-xs text-gray-400">
            Dialecto: {query.dialecto}
          </p>
        </div>
      )}
    </div>
  )
}
