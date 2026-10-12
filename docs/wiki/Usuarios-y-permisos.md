# Usuarios y permisos

## Roles de HOOP

- `ADMIN`
- `RECEPTION`
- `MAINTENANCE`
- `CLEANING`

Los roles visibles se localizan en la interfaz: por ejemplo, `ADMIN` se muestra
como «Administrador» y `MAINTENANCE` como «Mantenimiento».

## Acciones de incidencias

| Rol           | Editar datos | Asignar | Cambiar estado                                |
| ------------- | ------------ | ------- | --------------------------------------------- |
| `ADMIN`       | Sí           | Sí      | Todos los estados permitidos por la interfaz. |
| `RECEPTION`   | Sí           | Sí      | Todos los estados permitidos por la interfaz. |
| `MAINTENANCE` | No           | No      | `IN_PROGRESS` y `RESOLVED`.                   |
| `CLEANING`    | No           | No      | `IN_PROGRESS` y `RESOLVED`.                   |

La lógica de la interfaz está en `src/shared/utils/incidentPermissions.js`.
Estas reglas controlan qué controles se muestran o habilitan; el backend sigue
siendo responsable de autorizar cada solicitud.

## Administración de usuarios

La ruta `/admin/users` está restringida a `ADMIN`. La página:

- Consulta los usuarios con `GET /api/v1/users`.
- Consulta los roles con `GET /api/v1/user-roles`.
- Crea usuarios con `POST /api/v1/users`.

El formulario de creación envía `name`, `email`, `password` y `roleId`. La
gestión disponible actualmente es de consulta y creación; no se ofrece edición
de usuario, cambio de rol ni desactivación desde la interfaz.

## Visibilidad de incidencias

El backend aplica el filtrado de incidencias por usuario y rol. El frontend
presenta el resultado recibido y no replica esa autorización como mecanismo de
seguridad.

Ver [[Gestion-de-incidencias|Gestión de incidencias]] para los flujos de
consulta, asignación y edición.
