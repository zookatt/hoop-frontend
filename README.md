# HOOP Frontend

Frontend de **HOOP (Hospitality Operations Optimization Platform)**, una aplicacion web para gestionar incidencias internas en alojamientos turisticos.

El objetivo del frontend es consumir la API de `hoop-backend` y ofrecer una interfaz responsive para trabajadores con roles internos.

## Estado actual

Implementado hasta ahora:

- vista de login
- guardado de token JWT
- logout eliminando el token local
- rutas protegidas
- dashboard segun rol
- listado de incidencias
- filtros de incidencias por estado y prioridad
- creacion rapida de incidencias
- pagina de detalle `/incidents/:id`
- edicion basica de incidencias
- asignacion de departamento, prioridad y trabajador
- cambio de estado segun rol
- permisos visuales por rol
- iconos para incidencias sin asignar, mantenimiento y limpieza
- confirmacion antes de cerrar incidencia
- bloqueo visual de incidencias cerradas
- gestion de usuarios para administrador: listado y creacion
- cambio de password inicial
- textos visibles en castellano para roles, prioridades, estados y departamentos
- responsive mobile-first

## Tecnologias

- Vue 3
- Vite
- Vue Router
- Axios
- Tailwind CSS
- Vitest

Documentacion tecnica ampliada en [docs/frontend.md](docs/frontend.md).

Resumen del estado del PMV en [docs/project_status.md](docs/project_status.md).

## Conexion con backend

El frontend llama a la API con ruta relativa:

```text
/api/v1
```

En desarrollo, Vite usa proxy. Configura el destino local en `.env` usando la variable `API_PROXY_TARGET`. El archivo `.env` no debe subirse a Git.

Login actual del backend:

```text
POST /api/v1/auth/token
```

El login usa **Basic Auth** con email y password. La respuesta es un token JWT.

Despues del login, las peticiones protegidas deben enviar:

```text
Authorization: Bearer <token>
```

## Instalacion

Requisitos:

- Node.js 20.19+ o 22.12+
- backend arrancado si se van a probar datos reales

Instalar dependencias:

```bash
npm install
```

Arrancar en desarrollo:

```bash
npm run dev
```

La aplicacion estara disponible en la URL que muestre Vite, normalmente:

```text
http://localhost:5173
```

## Comandos disponibles

```bash
npm run dev      # Arrancar entorno de desarrollo
npm run build    # Compilar para produccion
npm run preview  # Previsualizar la compilacion
npm run test:unit # Ejecutar pruebas unitarias y de integracion
npm run test:coverage # Ejecutar pruebas y comprobar cobertura minima del 70 %
```

La cobertura minima del 70 % se aplica a autenticacion, utilidades de dominio y
flujos centrales de incidencias/login. Los tests de componentes verifican tambien
la interaccion del formulario de login.

## Flujo esperado del PMV

```text
login
  |
  v
guardar token
  |
  v
mostrar panel segun rol
  |
  v
crear / consultar / asignar / cambiar estado de incidencias
```

## Roles esperados

- `ADMIN`
- `RECEPTION`
- `MAINTENANCE`
- `CLEANING`

Reglas importantes:

- Todos los roles pueden crear incidencias.
- `ADMIN` y `RECEPTION` pueden editar, asignar y cerrar incidencias.
- `MAINTENANCE` y `CLEANING` solo ven incidencias de su departamento.
- `MAINTENANCE` y `CLEANING` solo pueden cambiar estado a `IN_PROGRESS` o `RESOLVED`.
- La seguridad real se valida en backend; el frontend solo oculta acciones para mejorar la experiencia.
