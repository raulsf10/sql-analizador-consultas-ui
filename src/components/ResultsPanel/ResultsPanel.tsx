import { useState } from 'react'
import type { AnalyzeResponse, XmlAnalyzeResponse } from '../../types/api.types'
import EmptyState from './EmptyState'
import CriticalityBadge from './CriticalityBadge'
import ProblemsTable from './ProblemsTable'
import XmlResultCard from './XmlResultCard'

type State =
  | { kind: 'empty' }
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'sql'; data: AnalyzeResponse }
  | { kind: 'xml'; data: XmlAnalyzeResponse }

interface Props {
  state: State
}

function SkeletonLoader() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="flex gap-3 items-center">
        <div className="h-8 w-24 bg-gray-200 rounded-full" />
        <div className="h-8 w-16 bg-gray-200 rounded" />
      </div>
      <div className="h-32 bg-gray-200 rounded-lg mt-4" />
      <div className="h-48 bg-gray-200 rounded-lg" />
    </div>
  )
}

function CopyButton({ data }: { data: unknown }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded px-2 py-1 transition-colors"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-600">Copiado</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copiar JSON
        </>
      )}
    </button>
  )
}

function SqlResult({ data }: { data: AnalyzeResponse }) {
  return (
    <div className="p-5 space-y-5 overflow-y-auto h-full">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <CriticalityBadge criticidad={data.criticidad} size="lg" />
          <span className="text-4xl font-black text-gray-800">{data.puntuacion}</span>
          {data.requiereAprobacion ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#cd1531] bg-[#cd1531]/10 px-3 py-1 rounded-full">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Requiere aprobación
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Aprobado
            </span>
          )}
        </div>
        <CopyButton data={data} />
      </div>

      <div className="text-xs text-gray-400">
        Dialecto: <span className="font-medium text-gray-600">{data.dialecto}</span>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Problemas
          {data.problemas.length > 0 && (
            <span className="ml-2 text-xs font-normal text-gray-400">({data.problemas.length})</span>
          )}
        </h3>
        <ProblemsTable issues={data.problemas} />
      </div>
    </div>
  )
}

function XmlResult({ data }: { data: XmlAnalyzeResponse }) {
  return (
    <div className="p-5 space-y-5 overflow-y-auto h-full">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <CriticalityBadge criticidad={data.criticidadGeneral} size="lg" />
          <span className="text-4xl font-black text-gray-800">{data.puntuacionMaxima}</span>
          <span className="text-sm font-semibold text-gray-700">
            {data.consultas.filter((c) => c.requiereAprobacion).length}/{data.totalConsultas}
            <span className="font-normal text-gray-400 ml-1">requieren aprobación</span>
          </span>
        </div>
        <CopyButton data={data} />
      </div>

      <div className="text-xs text-gray-400">
        {data.totalConsultas} consultas
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">Consultas</h3>
        {data.consultas.map((q, i) => (
          <XmlResultCard
            key={i}
            query={q}
            defaultExpanded={q.criticidad === 'CRITICA' || q.criticidad === 'ALTA'}
          />
        ))}
      </div>
    </div>
  )
}

export default function ResultsPanel({ state }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden h-full">
      {state.kind === 'empty' && <EmptyState />}
      {state.kind === 'loading' && <SkeletonLoader />}
      {state.kind === 'error' && (
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-red-800 font-semibold text-sm">Error en el análisis</p>
                <p className="text-red-600 text-sm mt-1">{state.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {state.kind === 'sql' && <SqlResult data={state.data} />}
      {state.kind === 'xml' && <XmlResult data={state.data} />}
    </div>
  )
}

export type { State as ResultsState }
