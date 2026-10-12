# Instalación y desarrollo

## Requisitos

- Node.js 20.19+ o 22.12+.
- npm.
- El backend de HOOP es necesario para probar operaciones con datos reales.

## Instalación

Desde la raíz del repositorio:

```bash
npm install
```

## Configurar el proxy de desarrollo

El frontend consume la API con la ruta relativa `/api/v1`. Para reenviar esas
peticiones al backend local, crea un archivo `.env` en la raíz del proyecto:

```dotenv
API_PROXY_TARGET=http://localhost:8080
```

El repositorio incluye `.env.example` con este valor de ejemplo. El archivo
`.env` es local y está excluido de Git; no añadas credenciales ni secretos al
repositorio.

El proxy solo se configura cuando Vite ejecuta el servidor de desarrollo y la
variable `API_PROXY_TARGET` tiene valor.

## Comandos

```bash
npm run dev
npm run build
npm run preview
npm run test:unit
npm run test:coverage
```

| Comando                 | Uso                                                     |
| ----------------------- | ------------------------------------------------------- |
| `npm run dev`           | Arranca el servidor local de Vite.                      |
| `npm run build`         | Genera la compilación de producción en `dist/`.         |
| `npm run preview`       | Sirve localmente la compilación generada.               |
| `npm run test:unit`     | Ejecuta la suite de pruebas con Vitest.                 |
| `npm run test:coverage` | Ejecuta las pruebas y aplica los umbrales de cobertura. |

Para el alcance de cobertura y la organización de las pruebas, consultar
[[Pruebas|Pruebas]].
