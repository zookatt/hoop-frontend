# Estado del PMV - Frontend HOOP

Este documento resume las decisiones de frontend tomadas y el estado real del PMV.

## Decisiones implementadas

- La interfaz esta pensada primero para movil, con adaptacion sencilla a tablet y desktop.
- La seguridad real vive en backend; el frontend solo oculta o desactiva acciones para mejorar la experiencia.
- El token JWT se guarda en `localStorage`.
- Las rutas privadas requieren token.
- Cada rol entra a su dashboard correspondiente.
- Los valores tecnicos del backend se traducen en frontend:
  - `LOW` -> `Baja`
  - `MAINTENANCE` -> `Mantenimiento`
  - `CLEANING` -> `Limpieza`
  - `ADMIN` -> `Administrador`
- La lista de incidencias se pinta segun lo que devuelve backend; el filtrado por rol no se duplica en frontend.
- La asignacion de trabajador se hace con desplegable filtrado por departamento.
- Antes de cerrar una incidencia se muestra confirmacion.
- Si una incidencia esta cerrada, sus acciones aparecen desactivadas.

## Funcionalidad implementada

### Autenticacion

- Login.
- Guardado de JWT.
- Logout local.
- Redireccion a dashboard por rol.
- Cambio de password inicial cuando el backend devuelve `409 Conflict`.

### Dashboards

- Dashboard para `ADMIN`.
- Dashboard para `RECEPTION`.
- Dashboard para `MAINTENANCE`.
- Dashboard para `CLEANING`.
- Logo y menu llevan al dashboard correspondiente del usuario logueado.

### Incidencias

- Listado de incidencias.
- Filtros visuales por estado.
- Filtros visuales por prioridad.
- Resumen de incidencias por estado.
- Creacion rapida de incidencia.
- Detalle en pagina `/incidents/:id`.
- Edicion basica.
- Asignacion de departamento, prioridad y trabajador.
- Cambio de estado.
- Confirmacion antes de cerrar.
- Bloqueo visual de acciones en incidencias cerradas.
- Iconos por tipo:
  - sin asignar
  - mantenimiento
  - limpieza
- Resumen con usuario creador y usuario asignado:
  - nombre
  - id
  - rol
- Prioridad visible en las tarjetas para identificar urgencia.

### Usuarios

- Pagina de gestion para `ADMIN`.
- Listado de usuarios.
- Creacion de usuarios.
- Visualizacion de estado activo/inactivo.
- Visualizacion de password temporal.

## No implementado o mejora futura

- Editar datos de usuario desde frontend.
- Cambiar rol de usuario desde frontend.
- Desactivar usuario desde frontend.
- Recuperacion de password.
- Dashboard con estadisticas.
- Historial avanzado de incidencias cerradas.
- Ampliar las pruebas a más vistas y componentes.
- Mensajes de error mas especificos segun cada respuesta del backend.

## Archivos clave

```text
src/core/api/apiClient.js
src/core/api/authService.js
src/core/api/incidentService.js
src/core/api/userService.js
src/core/auth/authStorage.js
src/core/auth/roleRoutes.js
src/composables/useLoginFlow.js
src/composables/useIncidents.js
src/composables/useIncidentDetail.js
src/composables/useAssignableUsers.js
src/composables/useAdminUsers.js
src/shared/utils/incidentFormatters.js
src/shared/utils/userFormatters.js
src/shared/utils/incidentPermissions.js
```
