import { useState } from 'react'
import type { Dialect } from '../../types/api.types'
import SqlInput from './SqlInput'
import XmlInput from './XmlInput'
// import AnalysisHistory from '../AnalysisHistory'

type Tab = 'sql' | 'xml'

interface Props {
  sqlDialect: Dialect
  onSqlDialectChange: (d: Dialect) => void
  sql: string
  onSqlChange: (s: string) => void
  onAnalyzeSql: () => void
  onClearSql: () => void
  sqlLoading: boolean

  xmlDialect: Dialect
  onXmlDialectChange: (d: Dialect) => void
  xmlFile: File | null
  onXmlFileChange: (f: File | null) => void
  onAnalyzeXml: () => void
  onClearXml: () => void
  xmlLoading: boolean

  onTabChange: (tab: Tab) => void
}

export default function InputPanel({
  sqlDialect, onSqlDialectChange, sql, onSqlChange, onAnalyzeSql, onClearSql, sqlLoading,
  xmlDialect, onXmlDialectChange, xmlFile, onXmlFileChange, onAnalyzeXml, onClearXml, xmlLoading,
  onTabChange,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('sql')

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    onTabChange(tab)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden h-full">
      <div className="flex border-b border-gray-100">
        {(['sql', 'xml'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`flex-1 text-sm font-medium py-3 transition-colors ${
              activeTab === tab
                ? 'text-[#cd1531] border-b-2 border-[#cd1531]'
                : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
            }`}
          >
            {tab === 'sql' ? 'Consulta SQL' : 'Archivo XML'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {activeTab === 'sql' ? (
          <SqlInput
            dialect={sqlDialect}
            onDialectChange={onSqlDialectChange}
            sql={sql}
            onSqlChange={onSqlChange}
            onAnalyze={onAnalyzeSql}
            onClear={onClearSql}
            loading={sqlLoading}
          />
        ) : (
          <XmlInput
            dialect={xmlDialect}
            onDialectChange={onXmlDialectChange}
            file={xmlFile}
            onFileChange={onXmlFileChange}
            onAnalyze={onAnalyzeXml}
            onClear={onClearXml}
            loading={xmlLoading}
          />
        )}

        {/* Historial comentado — disponible para activar en el futuro
        <AnalysisHistory
          history={history}
          onSelect={(entry) => {
            onHistorySelect(entry)
            handleTabChange(entry.type)
          }}
          onClear={onHistoryClear}
        />
        */}
      </div>
    </div>
  )
}

export type { Tab }
