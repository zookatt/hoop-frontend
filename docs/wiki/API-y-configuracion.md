# API y configuración

## Base URL y desarrollo local

Los servicios consumen la API usando la ruta relativa `/api/v1`. En desarrollo,
Vite puede reenviar las peticiones al backend configurado en
`API_PROXY_TARGET`:

```dotenv
API_PROXY_TARGET=http://localhost:8080
```

Define esta variable en `.env`, que no se versiona. La configuración del proxy
está en `vite.config.js` y solo aplica al servidor de desarrollo.

## Endpoints utilizados

| Método | Endpoint                     | Uso                                      |
| ------ | ---------------------------- | ---------------------------------------- |
| `POST` | `/auth/token`                | Iniciar sesión mediante Basic Auth.      |
| `POST` | `/auth/change-password`      | Cambiar contraseña inicial.              |
| `GET`  | `/incidents`                 | Obtener el listado de incidencias.       |
| `GET`  | `/incidents/{id}`            | Obtener el detalle de una incidencia.    |
| `POST` | `/incidents`                 | Crear una incidencia.                    |
| `PUT`  | `/incidents/{id}`            | Actualizar datos básicos.                |
| `PUT`  | `/incidents/{id}/assignment` | Asignar departamento y trabajador.       |
| `PUT`  | `/incidents/{id}/status`     | Cambiar el estado.                       |
| `GET`  | `/users`                     | Obtener usuarios.                        |
| `POST` | `/users`                     | Crear un usuario.                        |
| `GET`  | `/user-roles`                | Obtener roles disponibles para creación. |

Los servicios que llaman a estos endpoints están en `src/core/api/`. Las
peticiones protegidas usan el cliente centralizado `apiClient`; la autenticación
inicial y el cambio de contraseña utilizan Axios directamente.

## Manejo de errores

El interceptor del cliente centralizado limpia la sesión en respuestas
`401 Unauthorized`. Los composables traducen errores de operaciones frecuentes
a mensajes mostrados en la interfaz.

La autorización y validación de los datos deben realizarse también en el
backend. El proxy de Vite es una facilidad de desarrollo, no forma parte de la
configuración del despliegue.
