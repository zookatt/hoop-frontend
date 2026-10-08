# HOOP Frontend

Frontend de **HOOP (Hospitality Operations Optimization Platform)**, una aplicacion web para gestionar incidencias internas en alojamientos turisticos.

El objetivo del frontend es consumir la API de `hoop-backend` y ofrecer una interfaz responsive para trabajadores con roles internos.

## Estado actual

El proyecto frontend esta iniciado con Vue y Vite.

Pendiente para el PMV:

- vista de login
- guardado de token JWT
- logout eliminando el token local
- panel segun rol
- listado de incidencias
- formulario de creacion de incidencia
- acciones de asignacion y cambio de estado segun permisos
- responsive mobile y desktop

## Tecnologias

- Vue 3
- Vite
- Pinia
- Vue Router
- Axios
- Tailwind CSS
- Vitest

Nota: algunas dependencias ya estan instaladas, pero no todas las funcionalidades estan implementadas todavia.

## Conexion con backend

Backend local:

```text
http://localhost:8080/api/v1
```

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
```

## Comandos pendientes

Estos comandos se podran anadir cuando se configure linting y tests en `package.json`:

```bash
npm run lint
npm run format
npm run test:unit
npm run test:coverage
```

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

Regla importante: todos los roles pueden crear incidencias, pero solo `ADMIN` y `RECEPTION` pueden cerrarlas definitivamente.
