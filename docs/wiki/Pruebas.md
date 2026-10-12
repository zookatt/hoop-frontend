# Pruebas

## Tecnologías y comandos

La suite usa Vitest, `jsdom` y Vue Test Utils.

```bash
npm run test:unit
npm run test:coverage
```

`test:unit` ejecuta las pruebas una vez. `test:coverage` ejecuta la misma suite
con cobertura V8 y aplica un umbral mínimo del 70% en statements, branches,
functions y lines.

## Alcance de cobertura configurado

La configuración de cobertura se centra en la lógica crítica:

- Autenticación, almacenamiento de sesión y rutas por rol.
- Formateadores, permisos y filtros compartidos.
- Flujos de creación y listado de incidencias.
- Flujo de login y su formulario.

El umbral se aplica a los archivos incluidos en `coverage.include` de
`vite.config.js`; **no significa que el 70% de todas las vistas y componentes
del frontend esté cubierto**.

## Pruebas de integración incluidas

Además de pruebas unitarias de utilidades y lógica, la suite monta el formulario
de login con Vue Test Utils para comprobar interacciones relevantes, y monta los
composables principales dentro de un componente de prueba con servicios externos
simulados.

No hay una suite de pruebas end-to-end que arranque el backend o automatice el
navegador completo. Las operaciones HTTP se simulan en las pruebas de los
composables.

## Archivos de pruebas

- `src/core/auth/authStorage.test.js`: sesión, JWT almacenado y expiración.
- `src/shared/utils/domainUtils.test.js`: rutas por rol, permisos, etiquetas y
  filtros de asignación.
- `src/components/auth/LoginForm.test.js`: validación, envío y visibilidad de
  contraseña.
- `src/composables/loginAndIncidentComposables.test.js`: login, cambio inicial
  de contraseña, listado y creación de incidencias.

La carpeta `coverage/` se genera al ejecutar el comando de cobertura y está
excluida del control de versiones.
