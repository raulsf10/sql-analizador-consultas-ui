import { useRef, useState } from 'react'
import type { Dialect } from '../../types/api.types'

interface Props {
  dialect: Dialect
  onDialectChange: (d: Dialect) => void
  file: File | null
  onFileChange: (f: File | null) => void
  onAnalyze: () => void
  onClear: () => void
  loading: boolean
}

const dialects: { label: string; value: Dialect }[] = [
  { label: 'Oracle', value: 'oracle' },
  { label: 'SQL Server', value: 'tsql' },
  { label: 'PostgreSQL', value: 'postgres' },
  { label: 'MySQL', value: 'mysql' },
]

export default function XmlInput({
  dialect,
  onDialectChange,
  file,
  onFileChange,
  onAnalyze,
  onClear,
  loading,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped && dropped.name.endsWith('.xml')) {
      onFileChange(dropped)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) onFileChange(selected)
    e.target.value = ''
  }

  const handleClear = () => {
    onFileChange(null)
    onClear()
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-gray-500 whitespace-nowrap">Dialecto</label>
        <select
          value={dialect}
          onChange={(e) => onDialectChange(e.target.value as Dialect)}
          className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#cd1531]/30 focus:border-[#cd1531]"
        >
          {dialects.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer
          transition-colors min-h-[200px] ${
          dragging
            ? 'border-[#cd1531] bg-[#cd1531]/5'
            : file
            ? 'border-green-400 bg-green-50/50'
            : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100/50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xml"
          className="hidden"
          onChange={handleFileInput}
        />
        {file ? (
          <div className="text-center px-4">
            <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm font-medium text-gray-700 break-all">{file.name}</p>
            <p className="text-xs text-gray-400 mt-1">{(file.size / 1024).toFixed(1)} KB · Click para cambiar</p>
          </div>
        ) : (
          <div className="text-center px-4">
            <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm font-medium text-gray-600">Arrastra tu archivo XML aquí</p>
            <p className="text-xs text-gray-400 mt-1">o haz click para seleccionar</p>
            <p className="text-xs text-gray-300 mt-1">Solo archivos .xml</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={onAnalyze}
          disabled={loading || !file}
          className="flex-1 flex items-center justify-center gap-2 bg-[#cd1531] text-white text-sm font-semibold
            px-4 py-2.5 rounded-lg hover:bg-[#b01229] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analizando...
            </>
          ) : (
            'Analizar XML'
          )}
        </button>
        <button
          onClick={handleClear}
          disabled={loading}
          className="px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg
            hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Limpiar
        </button>
      </div>
    </div>
  )
}
