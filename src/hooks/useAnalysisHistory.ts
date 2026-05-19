import { useState, useCallback } from 'react'
import type { HistoryEntry, AnalyzeResponse, XmlAnalyzeResponse, Dialect } from '../types/api.types'

const STORAGE_KEY = 'sql-analyzer-history'
const MAX_ENTRIES = 5

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : []
  } catch {
    return []
  }
}

function saveHistory(entries: HistoryEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useAnalysisHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory)

  const addSqlEntry = useCallback(
    (result: AnalyzeResponse, sqlInput: string, dialect: Dialect) => {
      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        type: 'sql',
        criticidad: result.criticidad,
        puntuacion: result.puntuacion,
        timestamp: Date.now(),
        sqlInput,
        dialect,
        sqlResult: result,
      }
      setHistory((prev) => {
        const next = [entry, ...prev].slice(0, MAX_ENTRIES)
        saveHistory(next)
        return next
      })
    },
    []
  )

  const addXmlEntry = useCallback(
    (result: XmlAnalyzeResponse, fileName: string, dialect: Dialect) => {
      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        type: 'xml',
        criticidad: result.criticidadGeneral,
        puntuacion: result.puntuacionMaxima,
        timestamp: Date.now(),
        dialect,
        xmlResult: result,
        xmlFileName: fileName,
      }
      setHistory((prev) => {
        const next = [entry, ...prev].slice(0, MAX_ENTRIES)
        saveHistory(next)
        return next
      })
    },
    []
  )

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setHistory([])
  }, [])

  return { history, addSqlEntry, addXmlEntry, clearHistory }
}
