import type { Dialect } from '../../types/api.types'

interface Props {
  dialect: Dialect
  onDialectChange: (d: Dialect) => void
  sql: string
  onSqlChange: (s: string) => void
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

export default function SqlInput({
  dialect,
  onDialectChange,
  sql,
  onSqlChange,
  onAnalyze,
  onClear,
  loading,
}: Props) {
  return (
    <div className="flex flex-col gap-3 h-full">
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

      <textarea
        value={sql}
        onChange={(e) => onSqlChange(e.target.value)}
        placeholder="Escribe o pega tu consulta SQL aquí..."
        rows={12}
        className="flex-1 w-full font-mono text-sm border border-gray-200 rounded-lg px-3 py-2.5 resize-none bg-white
          placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cd1531]/30 focus:border-[#cd1531]
          focus:bg-red-50/20 transition-colors"
        spellCheck={false}
      />

      <div className="flex gap-2">
        <button
          onClick={onAnalyze}
          disabled={loading || !sql.trim()}
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
            'Analizar'
          )}
        </button>
        <button
          onClick={onClear}
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
