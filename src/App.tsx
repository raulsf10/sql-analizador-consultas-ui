import { useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import InputPanel from './components/InputPanel/InputPanel'
import ResultsPanel, { type ResultsState } from './components/ResultsPanel/ResultsPanel'
import { analyzeSql, analyzeXml } from './services/api'
// import { useAnalysisHistory } from './hooks/useAnalysisHistory'
import type { Dialect } from './types/api.types'

export default function App() {
  const [sqlDialect, setSqlDialect] = useState<Dialect>('oracle')
  const [sql, setSql] = useState('')
  const [sqlLoading, setSqlLoading] = useState(false)

  const [xmlDialect, setXmlDialect] = useState<Dialect>('oracle')
  const [xmlFile, setXmlFile] = useState<File | null>(null)
  const [xmlLoading, setXmlLoading] = useState(false)

  const [results, setResults] = useState<ResultsState>({ kind: 'empty' })

  // Historial comentado — disponible para activar en el futuro
  // const { history, addSqlEntry, addXmlEntry, clearHistory } = useAnalysisHistory()

  const handleAnalyzeSql = async () => {
    if (!sql.trim()) return
    setSqlLoading(true)
    setResults({ kind: 'loading' })
    try {
      const data = await analyzeSql(sql, sqlDialect)
      setResults({ kind: 'sql', data })
      // addSqlEntry(data, sql, sqlDialect)
    } catch (err) {
      setResults({ kind: 'error', message: extractErrorMessage(err) })
    } finally {
      setSqlLoading(false)
    }
  }

  const handleClearSql = () => {
    setSql('')
    setResults({ kind: 'empty' })
  }

  const handleAnalyzeXml = async () => {
    if (!xmlFile) return
    setXmlLoading(true)
    setResults({ kind: 'loading' })
    try {
      const data = await analyzeXml(xmlFile, xmlDialect)
      setResults({ kind: 'xml', data })
      // addXmlEntry(data, xmlFile.name, xmlDialect)
    } catch (err) {
      setResults({ kind: 'error', message: extractErrorMessage(err) })
    } finally {
      setXmlLoading(false)
    }
  }

  const handleClearXml = () => {
    setXmlFile(null)
    setResults({ kind: 'empty' })
  }

  // Historial comentado — disponible para activar en el futuro
  // const handleHistorySelect = (entry: HistoryEntry) => { ... }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      <Header />
      <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
        <div className="w-full md:w-[40%] flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
          <InputPanel
            sqlDialect={sqlDialect}
            onSqlDialectChange={setSqlDialect}
            sql={sql}
            onSqlChange={setSql}
            onAnalyzeSql={handleAnalyzeSql}
            onClearSql={handleClearSql}
            sqlLoading={sqlLoading}
            xmlDialect={xmlDialect}
            onXmlDialectChange={setXmlDialect}
            xmlFile={xmlFile}
            onXmlFileChange={setXmlFile}
            onAnalyzeXml={handleAnalyzeXml}
            onClearXml={handleClearXml}
            xmlLoading={xmlLoading}
            onTabChange={() => setResults({ kind: 'empty' })}
          />
        </div>
        <div className="w-full md:w-[60%] flex flex-col" style={{ minHeight: 'calc(100vh - 100px)' }}>
          <ResultsPanel state={results} />
        </div>
      </main>
    </div>
  )
}

function extractErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data
    if (data?.message) return `${data.error ?? 'Error'}: ${data.message}`
    if (err.message) return err.message
  }
  if (err instanceof Error) return err.message
  return 'Error desconocido. Revisa la consola para más detalles.'
}
