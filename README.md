# SQL Risk Analyzer UI

Herramienta interna para usuarios de Testing y DBAs que consume una API REST de análisis de riesgo SQL.

## Requisitos

- Node.js 18+
- npm 9+
- API corriendo en `http://localhost:8000` (configurable vía `.env`)

## Desarrollo

```bash
npm install
npm run dev
```

Accede en [http://localhost:3004](http://localhost:3004)

## Producción con PM2

```bash
npm install
npm run build
pm2 start ecosystem.config.js
```

Accede en [http://servidor:3004](http://servidor:3004)

## Variables de entorno

| Variable        | Descripción              | Valor por defecto          |
|-----------------|--------------------------|----------------------------|
| `VITE_API_URL`  | URL base de la API REST  | `http://localhost:8000`    |

Edita el archivo `.env` en la raíz del proyecto para sobreescribir los valores.

## Scripts

| Script           | Descripción                              |
|------------------|------------------------------------------|
| `npm run dev`    | Servidor de desarrollo (Vite, puerto 3004) |
| `npm run build`  | Genera build de producción en `dist/`    |
| `npm run preview`| Previsualiza el build localmente         |
| `npm start`      | Inicia Express para servir `dist/`       |

## Funcionalidades

- Análisis de consultas SQL por dialecto (Oracle, SQL Server, PostgreSQL, MySQL)
- Carga y análisis de archivos XML con múltiples transformaciones
- Visualización de criticidad, puntuación y problemas con recomendaciones
- Historial de los últimos 5 análisis (persiste en localStorage)
- Botón "Copiar JSON" para exportar el resultado completo
- Indicador visual de umbral de aprobación en la barra de puntuación
