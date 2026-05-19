# Analizador consultas SQL

Herramienta interna para análisis de riesgo SQL. Consume una API REST en el backend.

## Requisitos del servidor

- Windows Server (cualquier versión reciente)
- Node.js 16+ — https://nodejs.org
- npm 8+
- PM2 instalado globalmente: `npm install -g pm2`
- pm2-windows-startup (para auto-inicio): `npm install -g pm2-windows-startup`
- Git (para clonar)

---

## Despliegue en Windows Server con PM2

### Paso 1 — Clonar el repositorio

```powershell
git clone https://github.com/raulsf10/sql-analizador-consultas-ui.git
cd sql-analizador-consultas-ui
```

### Paso 2 — Configurar variables de entorno

```powershell
copy .env.example .env
notepad .env
```

Ajusta `VITE_API_URL` con la URL donde corre la API. Ejemplo:
```
VITE_API_URL=http://localhost:8000
```

### Paso 3 — Instalar dependencias

```powershell
npm install
```

### Paso 4 — Generar el build de producción

```powershell
npm run build
```

### Paso 5 — Verificar que el puerto 3004 esté libre

```powershell
netstat -ano | findstr :3004
```

- Si **no devuelve nada** → el puerto está libre, continúa al paso 6.
- Si **devuelve líneas**, identifica el PID en la última columna y termina el proceso:

```powershell
taskkill /PID <número-del-PID> /F
```

### Paso 6 — Iniciar la aplicación con PM2

```powershell
pm2 start ecosystem.config.js
```

Verifica que quedó corriendo:

```powershell
pm2 status
pm2 logs sql-analizador-consultas-ui
```

Accede en: **http://IP-DEL-SERVIDOR:3004**

### Paso 7 — Configurar inicio automático al reiniciar el servidor

```powershell
pm2 save
pm2-startup install
```

> Esto registra PM2 como tarea en el Programador de tareas de Windows.
> Los procesos guardados con `pm2 save` se restaurarán automáticamente al reiniciar.

---

## Actualizar la aplicación

Cuando haya cambios en el repositorio:

```powershell
git pull origin main
npm install
npm run build
pm2 restart sql-analizador-consultas-ui
```

---

## Comandos útiles de PM2

```powershell
pm2 status                              # Ver estado de todos los procesos
pm2 logs sql-analizador-consultas-ui   # Ver logs en tiempo real
pm2 restart sql-analizador-consultas-ui # Reiniciar la app
pm2 stop sql-analizador-consultas-ui   # Detener la app
pm2 delete sql-analizador-consultas-ui # Eliminar el proceso de PM2
```

---

## Desarrollo local

```powershell
npm install
npm run dev
```

Accede en: http://localhost:3004

---

## Variables de entorno

| Variable       | Descripción             | Valor por defecto       |
|----------------|-------------------------|-------------------------|
| `VITE_API_URL` | URL base de la API REST | `http://localhost:8000` |
| `PORT`         | Puerto del servidor     | `3004`                  |
