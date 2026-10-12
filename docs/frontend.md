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
| `/admin/users` | `AdminUsersView` | Gestion basica de usuarios para administrador |

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

Si el backend responde `409 Conflict` en el login porque el usuario tiene password temporal, el frontend muestra el formulario de cambio de password inicial. Despues del cambio, vuelve a pedir token automaticamente con la nueva password.

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

Cuando una incidencia se cambia a `CLOSED`, el frontend muestra un modal de confirmacion. Las incidencias cerradas quedan bloqueadas visualmente: los campos y botones de edicion, asignacion y estado se desactivan.

El backend tambien protege esta regla: una incidencia cerrada no se puede editar, reasignar ni reabrir.

### Asignacion de trabajador

En el PMV, la asignacion se hace asi:

1. `ADMIN` o `RECEPTION` elige departamento.
2. El frontend carga usuarios desde `GET /api/v1/users`.
3. Si el departamento es mantenimiento, solo muestra trabajadores con rol `MAINTENANCE`.
4. Si el departamento es limpieza, solo muestra trabajadores con rol `CLEANING`.
5. Al guardar, el frontend envia `assignedToUserId` al backend.

Esto evita escribir manualmente el id del trabajador.

### Textos en castellano

El backend envia enums tecnicos como:

```text
LOW
MAINTENANCE
CLEANING
ADMIN
```

El frontend los muestra en castellano mediante formateadores:

```text
Baja
Mantenimiento
Limpieza
Administrador
```

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

Gestion de usuarios:

```text
components/users/AdminUsersSection.vue
components/users/UserCreateForm.vue
```

## Composables

```text
composables/useIncidents.js
composables/useCreateIncident.js
composables/useIncidentDetail.js
composables/useAssignableUsers.js
composables/useAdminUsers.js
composables/useLoginFlow.js
```

Responsabilidades:

- `useIncidents`: carga listado, filtros y resumen por estado.
- `useCreateIncident`: crea incidencias y controla el modal de creacion.
- `useIncidentDetail`: carga detalle, guarda edicion, asignacion y estado.
- `useAssignableUsers`: carga usuarios para asignar trabajador segun departamento.
- `useAdminUsers`: carga roles, lista usuarios y crea nuevos usuarios.
- `useLoginFlow`: controla login y cambio de password inicial.

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
- confirmacion antes de cerrar incidencia
- bloqueo visual de acciones en incidencias cerradas
- gestion de usuarios para `ADMIN`: listado y creacion
- cambio de password inicial cuando el backend devuelve `409 Conflict`
- traduccion visual de roles, prioridades, estados y departamentos
- layout mobile-first
- adaptacion sencilla a tablet y desktop

Pendiente o mejora futura:

- editar datos de usuario
- cambiar rol de usuario desde frontend
- desactivar usuario desde frontend
- mensajes de error mas especificos segun respuesta del backend
- tests de componentes y flujos principales
- dashboard con estadisticas
- historial avanzado de incidencias cerradas
