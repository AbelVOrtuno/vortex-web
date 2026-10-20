# Vortex Web

Portafolio estático de Vortex Web, enfocado en desarrollo web, marketing digital e inteligencia artificial.

**Sitio publicado:** [stellar-kheer-b28084.netlify.app](https://stellar-kheer-b28084.netlify.app/)

## Tecnologías

- HTML5 semántico y Sass compilado a CSS
- JavaScript nativo con módulos ES
- Vite para desarrollo local
- Netlify con despliegue continuo desde GitHub

## Estructura

```text
src/
├── assets/       # Logotipo, retrato y capturas de proyectos
├── css/          # CSS compilado por Sass
├── index.html    # Página principal
├── js/           # Punto de entrada y módulos
└── scss/         # Estilos Sass organizados por sección
```

`calculadora/` y `morea-cafe/` son proyectos independientes; no forman parte del build de este portafolio.

## Requisitos

- Node.js 18 o superior
- npm

## Desarrollo y compilación

```bash
npm ci
npm run dev
```

Vite sirve el sitio en `http://localhost:5500` (o en el siguiente puerto disponible). Para compilar Sass:

```bash
npm run build
```

Comandos adicionales:

| Comando | Función |
| --- | --- |
| `npm run sass:build` | Compila Sass a `src/css/main.css` |
| `npm run sass:build:min` | Compila Sass minificado |
| `npm run sass:watch` | Recompila al cambiar archivos Sass |

Edita los estilos en `src/scss/`; `src/css/main.css` es un archivo generado.

## Arquitectura

Los estilos siguen una organización modular: `abstracts/` contiene variables y mixins; `base/`, los estilos globales; `layout/`, las secciones; y `components/`, los elementos reutilizables.

El JavaScript se divide en módulos nativos: `src/js/main.js` inicia `modules/nav.js` y `modules/vortex.js`. No requiere empaquetador para ejecutarse en el navegador.

## Git y commits

El flujo habitual usa ramas de funcionalidad, Pull Requests y Conventional Commits:

```text
<tipo>(<alcance opcional>): <descripción>
```

Tipos habituales: `feat`, `fix`, `docs`, `refactor`, `style` y `build`. Los mensajes del proyecto se escriben en español, por ejemplo:

```text
fix(portafolio): corregir rutas de imágenes
feat(portafolio): añadir sección de proyectos
```

Las ramas de trabajo se integran mediante PR; `main` es la rama estable y de producción.

## Despliegue

Netlify está conectado al repositorio `AbelVOrtuno/vortex-web`. El sitio se publica desde la rama de producción configurada en Netlify y cada push a esa rama inicia un despliegue.

La configuración está en `netlify.toml` y `vercel.json`:

- Comando de compilación: `npm run build`
- Directorio base: raíz del repositorio
- Directorio publicado: `src`

Antes de anunciar el sitio, confirma que el correo y el teléfono de contacto sean los definitivos. El subdominio actual lo asignó Netlify; se puede cambiar desde la configuración del sitio o vincular un dominio propio.

## Próximos pasos

- Añadir metadatos Open Graph y URL canónica cuando se defina el dominio definitivo.
- Conectar un formulario de contacto si se requiere recibir solicitudes directamente en el sitio.
- Añadir las URL reales de perfiles sociales si se desea mostrarlos.
