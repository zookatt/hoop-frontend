# Autenticación y rutas

## Inicio de sesión

El frontend envía las credenciales al endpoint:

```text
POST /api/v1/auth/token
```

La petición usa Basic Auth. La respuesta esperada es un JWT en formato de
cadena. El cliente decodifica las claims del token para obtener el correo
(`sub`), el rol reconocido en `scope` y la expiración (`exp`).

La sesión se guarda en `localStorage`:

- `hoop_auth_token`: JWT.
- `hoop_auth_user`: correo, rol y expiración de la sesión.

Después de iniciar sesión, el usuario se redirige al dashboard asociado a su
rol. Los roles reconocidos son `ADMIN`, `RECEPTION`, `MAINTENANCE` y `CLEANING`.

## Cambio de contraseña inicial

Si el endpoint de login responde `409 Conflict`, la interfaz solicita cambiar
la contraseña inicial:

```text
POST /api/v1/auth/change-password
```

Tras cambiarla, vuelve a iniciar sesión automáticamente con la contraseña nueva.

## Peticiones autenticadas y expiración

El cliente centralizado está en `src/core/api/apiClient.js` y usa `/api/v1`
como base URL. Añade el JWT a las peticiones protegidas. Cuando el backend
responde `401 Unauthorized`, elimina de `localStorage` los datos de sesión.

La sesión se considera inválida si falta el token o el usuario, o si la
expiración del token ya ha pasado.

## Protección de rutas

- Las rutas privadas requieren una sesión vigente.
- `/login` solo está disponible para usuarios no autenticados.
- `/admin/users` requiere el rol `ADMIN`.
- Las rutas raíz redirigen al dashboard del rol actual.

La navegación por rol mejora la experiencia de uso, pero **no sustituye la
autorización del backend**. Cada operación protegida debe seguir validándose en
la API.

## Cierre de sesión

El cierre de sesión elimina el token y el usuario guardados en `localStorage`.
Al recibir una respuesta `401`, el interceptor también limpia estos datos.

Ver [[API-y-configuracion|API y configuración]] para los endpoints y la
configuración del proxy.
