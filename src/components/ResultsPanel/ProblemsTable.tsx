import { useState } from 'react'
import type { Issue, Severity } from '../../types/api.types'

interface Props {
  issues: Issue[]
}

const severityConfig: Record<Severity, { bg: string; text: string }> = {
  BAJA: { bg: 'bg-green-100', text: 'text-green-700' },
  MEDIA: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  ALTA: { bg: 'bg-orange-100', text: 'text-orange-700' },
  CRITICA: { bg: 'bg-[#cd1531]/10', text: 'text-[#cd1531]' },
}

const severities: Severity[] = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA']

export default function ProblemsTable({ issues }: Props) {
  const [activeFilter, setActiveFilter] = useState<Severity | null>(null)

  if (issues.length === 0) {
    return (
      <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        No se encontraron problemas
      </div>
    )
  }

  const presentSeverities = severities.filter((s) => issues.some((i) => i.severidad === s))
  const filtered = activeFilter ? issues.filter((i) => i.severidad === activeFilter) : issues

  return (
    <div>
      <div className="flex gap-2 mb-3 flex-wrap">
        <button
          onClick={() => setActiveFilter(null)}
          className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
            activeFilter === null
              ? 'bg-gray-700 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Todos ({issues.length})
        </button>
        {presentSeverities.map((s) => {
          const count = issues.filter((i) => i.severidad === s).length
          const { bg, text } = severityConfig[s]
          return (
            <button
              key={s}
              onClick={() => setActiveFilter(activeFilter === s ? null : s)}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                activeFilter === s
                  ? `${bg} ${text} ring-2 ring-current ring-offset-1`
                  : `${bg} ${text} opacity-70 hover:opacity-100`
              }`}
            >
              {s} ({count})
            </button>
          )
        })}
      </div>

      <div className="rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
              <th className="px-3 py-2 font-medium">Código</th>
              <th className="px-3 py-2 font-medium">Severidad</th>
              <th className="px-3 py-2 font-medium">Mensaje</th>
              <th className="px-3 py-2 font-medium text-right">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((issue, idx) => {
              const { bg, text } = severityConfig[issue.severidad]
              return (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-mono text-xs text-gray-500 whitespace-nowrap">{issue.codigo}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full text-xs font-semibold px-2 py-0.5 ${bg} ${text}`}>
                      {issue.severidad}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-700">
                    <div className="flex items-start gap-1.5">
                      <span className="leading-snug">{issue.mensaje}</span>
                      {issue.recomendacion && (
                        <div className="relative group/tip shrink-0 mt-0.5">
                          <span className="cursor-help flex items-center justify-center w-4 h-4 rounded-full bg-blue-50 border border-blue-200 text-blue-500 text-[9px] font-bold hover:bg-blue-100 transition-colors select-none">
                            i
                          </span>
                          <div className="pointer-events-none absolute z-50 hidden group-hover/tip:block right-0 bottom-full mb-2 w-72 bg-gray-900 text-white text-xs rounded-xl px-3 py-2.5 shadow-2xl">
                            <p className="font-semibold text-gray-400 mb-1 text-[10px] uppercase tracking-wider">Recomendación</p>
                            <p className="leading-relaxed text-gray-100">{issue.recomendacion}</p>
                            <div className="absolute right-3 top-full border-[5px] border-transparent border-t-gray-900" />
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right font-semibold text-gray-700 whitespace-nowrap">{issue.puntuacion}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
