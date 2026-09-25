## HOOP Frontend

Frontend de HOOP (Hospitality Operations Optimization Platform), una aplicación web para la gestión de incidencias en alojamientos turísticos.

HOOP permite registrar, valorar, asignar y gestionar incidencias, facilitando la coordinación entre los departamentos de Recepción, Mantenimiento y Limpieza.

Aplicación web responsive para centralizar las incidencias de un alojamiento turístico. Permite registrar problemas, asignarlos a departamentos y trabajadores, consultar su estado, hacer seguimiento y conservar un histórico.

El flujo principal es: **crear → valorar → asignar → gestionar → resolver → validar → cerrar**.

## Tecnologías y dependencias

- **Vue 3** y **Vite**: interfaz y entorno de desarrollo.
- **Vue Router**: navegación entre vistas.
- **Pinia**: gestión del estado global.
- **Axios**: comunicación con la API.
- **Tailwind CSS** y **Sass Embedded**: estilos.
- **ESLint** y **Prettier**: calidad y formato del código.
- **Vitest**, **Vue Test Utils** y **jsdom**: pruebas.

## Instalación y uso

Requisitos: Node.js 20.19+ o 22.12+.

```bash
npm install
npm run dev
```

La aplicación estará disponible en la URL que muestre Vite, normalmente `http://localhost:5173`.

## Otros comandos

```bash
npm run build          # Compilar para producción
npm run preview        # Previsualizar la compilación
npm run lint           # Revisar el código
npm run format         # Formatear los archivos
npm run test:unit      # Ejecutar las pruebas
npm run test:coverage  # Ejecutar pruebas con cobertura
```
