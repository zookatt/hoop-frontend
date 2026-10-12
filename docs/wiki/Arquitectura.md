# Arquitectura del frontend

## Tecnologías principales

- **Vue 3** para vistas y componentes.
- **Vite** para desarrollo y compilación.
- **Vue Router** para navegación y rutas protegidas.
- **Axios** para las peticiones HTTP.
- **Tailwind CSS** para estilos utilitarios y diseño responsive.
- **Vitest** y **Vue Test Utils** para pruebas.

## Organización del código

```text
src/
  assets/       Imágenes, fuentes y estilos globales
  components/   Componentes reutilizables de interfaz y dominio
  composables/  Estado y lógica reutilizable de flujos de interfaz
  core/
    api/        Cliente HTTP y servicios de la API
    auth/       Sesión local y navegación según rol
  router/       Definición de rutas y guardas de navegación
  shared/
    constants/  Opciones y metadatos compartidos
    utils/      Formateadores, permisos y filtros
  views/        Páginas asociadas a las rutas
```

## Rutas de la aplicación

| Ruta             | Nombre                  | Vista                | Acceso                              |
| ---------------- | ----------------------- | -------------------- | ----------------------------------- |
| `/login`         | `login`                 | `LoginView`          | Solo usuarios no autenticados.      |
| `/admin`         | `admin-dashboard`       | `DashboardHomeView`  | Sesión autenticada.                 |
| `/reception`     | `reception-dashboard`   | `DashboardHomeView`  | Sesión autenticada.                 |
| `/maintenance`   | `maintenance-dashboard` | `DashboardHomeView`  | Sesión autenticada.                 |
| `/cleaning`      | `cleaning-dashboard`    | `DashboardHomeView`  | Sesión autenticada.                 |
| `/incidents`     | `incidents`             | `IncidentsView`      | Sesión autenticada.                 |
| `/incidents/:id` | `incident-detail`       | `IncidentDetailView` | Sesión autenticada.                 |
| `/admin/users`   | `admin-users`           | `AdminUsersView`     | Sesión autenticada con rol `ADMIN`. |

Las rutas privadas comparten `DashboardLayout`. Si el usuario no tiene una
sesión válida, la guarda de navegación lo envía al login. Si intenta abrir una
ruta restringida por rol, se le redirige a su dashboard.

## Componentes y lógica de dominio

Las vistas conectan componentes de presentación con composables:

- `useLoginFlow`: inicio de sesión y cambio de contraseña inicial.
- `useIncidents`: carga, filtrado y resumen por estado.
- `useCreateIncident`: modal y envío de creación.
- `useIncidentDetail`: carga y operaciones del detalle.
- `useAssignableUsers`: carga de usuarios para la asignación.
- `useAdminUsers`: listado, roles y creación de usuarios.

Los servicios HTTP viven en `src/core/api/`. Los formateadores, permisos y
filtros compartidos viven en `src/shared/utils/`.

## Decisiones de diseño

- Las rutas y acciones de la interfaz se adaptan al rol almacenado en la sesión.
- La API es la fuente de verdad para autorización y filtrado de datos.
- Los valores técnicos de la API se convierten a etiquetas comprensibles para
  mostrarlos en pantalla.
- La interfaz está diseñada primero para móvil y se adapta a pantallas mayores.

Ver también [[Autenticacion-y-rutas|Autenticación y rutas]] y
[[Usuarios-y-permisos|Usuarios y permisos]].
