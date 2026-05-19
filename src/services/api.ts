import axios from 'axios'
import type { AnalyzeResponse, XmlAnalyzeResponse, Dialect } from '../types/api.types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8005',
  timeout: 60000,
})

export async function analyzeSql(script: string, dialect: Dialect): Promise<AnalyzeResponse> {
  const sanitized = sanitizeScript(script)
  const { data } = await api.post<AnalyzeResponse>('/analyze', {
    dialect,
    script: sanitized,
  })
  return data
}

export async function analyzeXml(file: File, dialect: Dialect): Promise<XmlAnalyzeResponse> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('dialect', dialect)
  const { data } = await api.post<XmlAnalyzeResponse>('/analyze/xml', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

function sanitizeScript(raw: string): string {
  let s = raw.trim()
  s = s.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  s = s.replace(/\n{3,}/g, '\n\n')
  return s
}
