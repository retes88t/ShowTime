# Administrador de Tareas de la Obra

## Descripcion

Pantalla para gestionar todas las tareas relacionadas con la produccion de una obra. Permite crear, asignar, dar seguimiento y controlar el avance de cada tarea, asi como identificar riesgos y definir planes alternativos.

---

## Permisos

| Rol            | Permisos                                                                 |
| -------------- | ------------------------------------------------------------------------ |
| **Admin**      | Crear, editar, eliminar tareas, asignar responsables, gestionar riesgos  |
| **Usuario**    | Solo lectura: puede ver las tareas y su avance, pero no modificar nada   |

> **Nota:** Todas las acciones de creacion, edicion y eliminacion de tareas, responsables y riesgos estan restringidas exclusivamente al rol de **Administrador**.

---

## Funcionalidades principales

### 1. Gestion de tareas

Cada tarea debe contener:

| Campo               | Descripcion                                                        |
| ------------------- | ------------------------------------------------------------------ |
| **Titulo**          | Nombre descriptivo de la tarea                                     |
| **Descripcion**     | Detalle de lo que se debe realizar                                 |
| **Responsables**    | Una o mas personas asignadas a la tarea                            |
| **Porcentaje**      | Avance de la tarea (0% - 100%), editable manualmente               |
| **Fecha limite**    | Fecha maxima para completar la tarea                               |
| **Nivel**           | Clasificacion de la tarea (ver seccion de niveles)                 |
| **Estado**          | Pendiente, En progreso, Completada, Bloqueada                     |

### 2. Niveles de tarea

| Nivel              | Descripcion                                                         |
| ------------------ | ------------------------------------------------------------------- |
| **Facil**          | Tarea sencilla, no requiere experiencia especial                    |
| **Dificil**        | Requiere mas tiempo o habilidades especificas                       |
| **Critico**        | Impacta directamente el resultado de la obra si no se cumple        |
| **Indispensable**  | Sin esta tarea la obra no puede llevarse a cabo                     |

### 3. Asignacion de responsables

- Se pueden asignar **multiples personas** a una misma tarea.
- Cada responsable puede ver las tareas que tiene asignadas.

### 4. Riesgos y planes de contingencia

Cada tarea puede tener uno o mas riesgos asociados:

| Campo                   | Descripcion                                                    |
| ----------------------- | -------------------------------------------------------------- |
| **Riesgo**              | Descripcion de lo que podria salir mal                         |
| **Probabilidad**        | Baja, Media, Alta                                              |
| **Plan B**              | Primera alternativa si el riesgo se materializa                |
| **Plan C** (opcional)   | Segunda alternativa si el Plan B tambien falla                 |
| **Planes adicionales**  | Se pueden agregar tantos planes como sea necesario             |

---

## Implementacion tecnica

### Backend: Google Apps Script + Google Sheets

El administrador de tareas se integra con el mismo recurso de **Google Apps Script** que ya usa la aplicacion (`VITE_APPS_SCRIPT_URL`), siguiendo el patron existente de `sheetsClient.ts`.

### Nuevas pestanas en Google Sheets

| Pestana          | Descripcion                                              |
| ---------------- | -------------------------------------------------------- |
| **Tareas**       | Almacena todas las tareas con sus campos                 |
| **Riesgos**      | Almacena los riesgos y planes de contingencia por tarea  |

### Estructura de la pestana `Tareas`

| Columna         | Tipo              | Ejemplo                              |
| --------------- | ----------------- | ------------------------------------ |
| id              | string (UUID)     | `t-001`                              |
| titulo          | string            | "Conseguir utileria acto 2"         |
| descripcion     | string            | "Comprar y preparar las sillas..."   |
| responsables    | string (IDs separados por coma) | `p-001,p-003`             |
| porcentaje      | number (0-100)    | `45`                                 |
| fechaLimite     | string (fecha)    | `2026-04-15`                         |
| nivel           | string            | `Facil \| Dificil \| Critico \| Indispensable` |
| estado          | string            | `Pendiente \| En progreso \| Completada \| Bloqueada` |

> Los **responsables** se relacionan con la pestana `Personas` existente, usando sus IDs separados por coma para soportar multiples asignaciones.

### Estructura de la pestana `Riesgos`

| Columna         | Tipo              | Ejemplo                              |
| --------------- | ----------------- | ------------------------------------ |
| id              | string (UUID)     | `r-001`                              |
| tareaId         | string            | `t-001`                              |
| riesgo          | string            | "El proveedor no entrega a tiempo"   |
| probabilidad    | string            | `Baja \| Media \| Alta`             |
| planes          | string (JSON)     | `["Comprar en tienda local","Fabricar a mano"]` |

> El campo **planes** es un arreglo JSON donde cada elemento es un plan de contingencia (Plan B, Plan C, etc.), permitiendo agregar tantos como sea necesario.

### Operaciones via Google Apps Script

Se reutiliza el mismo patron de comunicacion existente:

- **Lectura:** `GET ?action=read&tab=Tareas` / `GET ?action=read&tab=Riesgos`
- **Escritura:** `POST { action: 'add'|'update'|'delete', tab: 'Tareas'|'Riesgos', data, password }`

### Archivos a crear/modificar en el frontend

| Archivo                          | Accion   | Descripcion                                      |
| -------------------------------- | -------- | ------------------------------------------------ |
| `src/api/tareasApi.ts`           | Crear    | CRUD de tareas usando `sheetsClient`              |
| `src/api/riesgosApi.ts`          | Crear    | CRUD de riesgos usando `sheetsClient`             |
| `src/types/index.ts`             | Modificar| Agregar tipos `Tarea`, `Riesgo` y tabs nuevos    |
| `src/pages/TareasPage.tsx`       | Crear    | Pantalla principal del administrador de tareas    |
| `src/components/tareas/`         | Crear    | Componentes de UI (lista, formulario, riesgos)    |

### Permisos en el frontend

- Las acciones de escritura (crear, editar, eliminar) solo se habilitan si `isAdmin === true` en el `AppContext`.
- Los usuarios no admin ven la pantalla en **modo solo lectura**.

---

## Resumen

- Crear y editar tareas con titulo, descripcion, fecha limite, nivel y porcentaje de avance.
- Asignar uno o varios responsables por tarea.
- Clasificar tareas por nivel: Facil, Dificil, Critico, Indispensable.
- Registrar riesgos con probabilidad y multiples planes de contingencia (Plan B, C, etc.).
- Visualizar el estado general de las tareas de la obra.
