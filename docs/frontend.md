# HOOP Frontend - Documentacion tecnica

Este documento resume el estado actual del frontend de HOOP y como se organiza la interfaz.

## Tecnologias

- Vue 3
- Vite
- Vue Router
- Axios
- Tailwind CSS

## Flujo principal

```text
Login
  |
  v
Guardar JWT y rol
  |
  v
Dashboard segun rol
  |
  v
Listado de incidencias
  |
  v
Detalle / edicion de incidencia
```

## Rutas principales

| Ruta | Vista | Uso |
| --- | --- | --- |
| `/login` | `LoginView` | Inicio de sesion |
| `/admin` | `DashboardHomeView` | Panel de administrador |
| `/reception` | `DashboardHomeView` | Panel de recepcion |
| `/maintenance` | `DashboardHomeView` | Panel de mantenimiento |
| `/cleaning` | `DashboardHomeView` | Panel de limpieza |
| `/incidents` | `IncidentsView` | Listado de incidencias |
| `/incidents/:id` | `IncidentDetailView` | Detalle, edicion, asignacion y cambio de estado |

Las rutas privadas usan `DashboardLayout` y requieren token guardado.

## Autenticacion

El frontend pide token al backend en:

```text
POST /api/v1/auth/token
```

El backend usa Basic Auth para este endpoint. El token JWT se guarda en `localStorage` mediante `authStorage.js`.

Las peticiones posteriores usan:

```text
Authorization: Bearer <token>
```

El cliente Axios centralizado esta en:

```text
src/core/api/apiClient.js
```

Si una respuesta devuelve `401 Unauthorized`, el frontend limpia la sesion local.

## Incidencias

### Listado

La vista `IncidentsView` muestra las incidencias recibidas desde el backend.

El backend ya devuelve las incidencias:

- filtradas segun rol
- ordenadas por `createdAt DESC`

Por eso el frontend no aplica reglas de seguridad sobre el listado. Solo pinta lo recibido.

### Creacion rapida

Desde `/incidents` se puede crear una incidencia con un modal rapido.

Campos:

```text
title
description
roomNumber
```

Una incidencia nueva nace con:

```text
status = OPEN
department = null
priority = null
assignedToUserId = null
```

En la interfaz, las incidencias sin departamento se muestran como:

```text
Sin asignar
```

### Detalle y edicion

La pagina `/incidents/:id` permite:

- ver detalle de una incidencia
- editar titulo, descripcion y habitacion
- asignar departamento, prioridad y trabajador
- cambiar estado

Estas acciones se muestran segun rol.

## Permisos visuales por rol

La seguridad real esta en backend. El frontend solo oculta acciones para mejorar la experiencia.

Reglas visuales actuales:

| Rol | Editar datos | Asignar | Cambiar estado |
| --- | --- | --- | --- |
| `ADMIN` | Si | Si | Si |
| `RECEPTION` | Si | Si | Si |
| `MAINTENANCE` | No | No | Solo `IN_PROGRESS` y `RESOLVED` |
| `CLEANING` | No | No | Solo `IN_PROGRESS` y `RESOLVED` |

La logica esta en:

```text
src/shared/utils/incidentPermissions.js
```

## Iconos de incidencias

Las tarjetas muestran un icono segun departamento:

| Estado de asignacion | Icono |
| --- | --- |
| Sin asignar | `nuevo.png` |
| Mantenimiento | `mantenimiento.png` |
| Limpieza | `limpieza.png` |

Los assets estan en:

```text
src/assets/images/
```

El formateo de etiquetas e iconos esta en:

```text
src/shared/utils/incidentFormatters.js
```

## Componentes principales

```text
components/incidents/IncidentCard.vue
components/incidents/IncidentForm.vue
components/incidents/IncidentBasicEditForm.vue
components/incidents/IncidentAssignmentForm.vue
components/incidents/IncidentStatusForm.vue
```

Componentes UI reutilizables:

```text
components/ui/BaseButton.vue
components/ui/BaseModal.vue
components/ui/FilterButton.vue
components/ui/StatusMessage.vue
```

## Composables

```text
composables/useIncidents.js
composables/useCreateIncident.js
composables/useIncidentDetail.js
```

Responsabilidades:

- `useIncidents`: carga listado, filtros y resumen por estado.
- `useCreateIncident`: crea incidencias y controla el modal de creacion.
- `useIncidentDetail`: carga detalle, guarda edicion, asignacion y estado.

## Estado actual del PMV frontend

Implementado:

- login
- guardado de token
- rutas protegidas
- dashboards por rol
- listado de incidencias
- creacion rapida
- detalle de incidencia
- edicion basica
- asignacion
- cambio de estado
- permisos visuales por rol
- iconos por departamento/asignacion
- layout mobile-first

Pendiente o mejora futura:

- gestion visual completa de usuarios
- mensajes de error mas especificos segun respuesta del backend
- tests de componentes y flujos principales
