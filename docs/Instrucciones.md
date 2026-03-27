# ShowTime - Instrucciones de despliegue

## Sitio publicado

El sitio esta disponible en:
**https://retes88t.github.io/ShowTime/**

## Como publicar cambios

Cada vez que hagas cambios y quieras actualizar el sitio publicado:

### 1. Asegurate de que tus cambios esten en commit

```bash
git add .
git commit -m "descripcion del cambio"
git push origin main
```

### 2. Despliega a GitHub Pages

```bash
npm run deploy
```

Este comando hace dos cosas automaticamente:
- `npm run build` — compila el proyecto (TypeScript + Vite)
- `gh-pages -d dist` — sube la carpeta `dist/` al branch `gh-pages`

### 3. Espera 1-2 minutos

GitHub Pages tarda un poco en actualizar. Despues de ese tiempo el sitio ya refleja los cambios.

## Rutas importantes

| Ruta | Acceso | Descripcion |
|------|--------|-------------|
| `/` | Publico | Pagina principal con escenas |
| `/escena/:id` | Publico | Detalle de cada escena |
| `/estructura` | Publico | Estructura de la obra |
| `/libreto` | Publico | Libreto |
| `/audicion` | Publico | Audiciones |
| `/tareas` | Publico | Tareas |
| `/admin` | Admin | Panel de administracion (Personas, Escenas, Noticias, Minutas) |
| `/minutas` | Admin | Historial de minutas con detalle visual, PDF y Excel |

## Acceso admin

1. Click en "Admin" en el header
2. Ingresa la contrasena
3. Aparece el tab de Admin en la navegacion

## Minutas

Las minutas se administran desde **Admin > Minutas**:
- Crear nueva minuta con titulo, fecha, asistentes, resumen, compromisos, notas y proximos pasos
- Ver el historial completo en `/minutas` (solo admin, acceso por link directo)
- Descargar PDF o Excel de materiales desde la vista de minutas

### Formato de texto para que se vean bonitas

**Compromisos** — separar cada persona con doble salto de linea:
```
Tony (Disenador):
- Flyers y publicidad
- Materiales graficos

Arturo:
- Recoleccion de materiales
- Logistica
```

**Notas al vuelo** — formato `Titulo: descripcion` por linea:
```
Sillas: preguntar a Fersa
Focos: preguntar a Ellen
Baobabs: plantas artificiales, maquillaje
```

**Proximos pasos** — una linea por paso:
```
1. Definir nombre de la obra
2. Establecer fecha limite
3. Agendar sesion de manualidades
```

## Requisitos para desarrollar

- Node.js 18+
- npm
- La variable `VITE_APPS_SCRIPT_URL` en `.env` apuntando al Google Apps Script
