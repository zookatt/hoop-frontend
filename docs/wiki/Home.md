# HOOP Frontend

Frontend de HOOP (Hospitality Operations Optimization Platform), una aplicación
web para gestionar incidencias internas en alojamientos turísticos. Está
construida con Vue 3 y consume la API de `hoop-backend`.

La interfaz es responsive y mobile-first. Los dashboards y las acciones
disponibles dependen del rol del usuario. La autorización efectiva y el filtrado
de datos corresponden al backend; la interfaz solo adapta la experiencia.

## Contenido de la wiki

- [[Instalacion-y-desarrollo|Instalación y desarrollo]]
- [[Arquitectura|Arquitectura del frontend]]
- [[Autenticacion-y-rutas|Autenticación y rutas]]
- [[Gestion-de-incidencias|Gestión de incidencias]]
- [[Usuarios-y-permisos|Usuarios y permisos]]
- [[API-y-configuracion|API y configuración]]
- [[Pruebas|Pruebas]]

## Funcionalidades

- Inicio de sesión con JWT y cambio obligatorio de contraseña inicial.
- Dashboards por rol y rutas protegidas.
- Listado de incidencias con filtros por estado y prioridad.
- Creación, consulta, edición, asignación y cambio de estado de incidencias.
- Gestión básica de usuarios para `ADMIN`.
- Formularios y componentes adaptables a móvil y escritorio.

## Tecnologías

Vue 3 · Vite · Vue Router · Axios · Tailwind CSS · Vitest · Vue Test Utils

Para arrancar el proyecto, consultar
[[Instalacion-y-desarrollo|Instalación y desarrollo]].
