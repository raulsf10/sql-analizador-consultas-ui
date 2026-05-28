export type Criticality = 'BAJA' | 'MEDIA' | 'ALTA' | 'CRITICA'
export type Severity = 'BAJA' | 'MEDIA' | 'ALTA' | 'CRITICA'
export type Dialect = 'oracle' | 'tsql' | 'postgres' | 'mysql'

export interface Issue {
  codigo: string
  severidad: Severity
  mensaje: string
  linea: number | null
  extracto?: string
  recomendacion: string
  puntuacion: number
}

export interface Statistics {
  tablasAfectadas: number
  sentenciasDelete: number
  sentenciasUpdate: number
  sentenciasSelect: number
  sentenciasInsert: number
  sentenciasDrop: number
  sentenciasTruncate: number
  totalSentencias: number
}

export interface AnalyzeResponse {
  exitoso: boolean
  criticidad: Criticality
  puntuacion: number
  requiereAprobacion: boolean
  problemas: Issue[]
  estadisticas: Statistics
  dialecto: string
  tiempoEjecucionMs: number
}

export interface QueryResult {
  nombre: string
  dialecto: string
  puntuacion: number
  criticidad: Criticality
  requiereAprobacion: boolean
  problemas: Issue[]
  estadisticas: Statistics
  tiempoEjecucionMs: number
}

export interface XmlAnalyzeResponse {
  exitoso: boolean
  totalConsultas: number
  criticidadGeneral: Criticality
  puntuacionMaxima: number
  consultasCriticas: number
  requiereAprobacion: boolean
  consultas: QueryResult[]
  tiempoTotalMs: number
}

export interface ApiError {
  success: false
  error: string
  message: string
}

export type AnalysisType = 'sql' | 'xml'

export interface HistoryEntry {
  id: string
  type: AnalysisType
  criticidad: Criticality
  puntuacion: number
  timestamp: number
  sqlInput?: string
  dialect?: Dialect
  sqlResult?: AnalyzeResponse
  xmlResult?: XmlAnalyzeResponse
  xmlFileName?: string
}
