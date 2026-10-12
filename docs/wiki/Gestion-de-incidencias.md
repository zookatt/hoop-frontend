# Gestión de incidencias

## Listado

La página `/incidents` obtiene las incidencias de `GET /api/v1/incidents`.
Muestra un resumen de cantidades por estado y permite filtrar localmente por
estado y prioridad. El listado se representa según los datos devueltos por el
backend, que aplica las reglas de acceso y filtrado correspondientes al usuario.

## Creación

Desde el listado se puede abrir un formulario modal. Los campos de creación son:

- `title`
- `description`
- `roomNumber`

El envío crea la incidencia mediante `POST /api/v1/incidents`. El formulario
indica los errores y, tras una creación correcta, cierra el modal y refresca el
listado.

Las incidencias nuevas se crean abiertas y sin asignación; el estado y la
asignación efectiva los determina el backend según el contrato de la API.

## Detalle y edición

La ruta `/incidents/:id` carga el detalle con `GET /api/v1/incidents/{id}`. La
vista permite, según rol y estado:

- Editar título, descripción y habitación con `PUT /api/v1/incidents/{id}`.
- Asignar departamento, prioridad y trabajador con
  `PUT /api/v1/incidents/{id}/assignment`.
- Cambiar el estado con `PUT /api/v1/incidents/{id}/status`.

Antes de cerrar una incidencia se pide confirmación. Las incidencias cerradas
quedan bloqueadas visualmente para evitar nuevas ediciones o cambios de estado.
El backend debe aplicar igualmente estas restricciones.

## Asignación de trabajadores

La interfaz carga usuarios con `GET /api/v1/users` y ofrece trabajadores activos
que coinciden con el departamento elegido:

| Departamento  | Rol del trabajador |
| ------------- | ------------------ |
| `MAINTENANCE` | `MAINTENANCE`      |
| `CLEANING`    | `CLEANING`         |

La asignación se envía al backend mediante `assignedToUserId`.

## Etiquetas e iconos

Los estados, prioridades y departamentos técnicos se muestran con etiquetas
localizadas. Las tarjetas usan un icono para incidencias sin asignar, de
mantenimiento o de limpieza.

Los datos mostrados son respuesta de la API; el frontend no debe considerarse
autoridad para el estado persistido o la visibilidad de una incidencia.

Ver [[Usuarios-y-permisos|Usuarios y permisos]] para las acciones disponibles
por rol.
