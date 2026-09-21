# Vortex Web

Landing page / portafolio de **Vortex Web**, agencia de desarrollo web, marketing digital e IA. Sitio de una sola página construido con HTML, SCSS y JavaScript vanilla (sin frameworks), pensado para cargar rápido y ser fácil de editar.

**Demo en vivo:** _agrega aquí el link una vez desplegado (Vercel / Netlify / GitHub Pages)._

---

## Tabla de contenido

- [Stack técnico](#stack-técnico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación y uso](#instalación-y-uso)
- [Scripts disponibles](#scripts-disponibles)
- [Arquitectura de estilos (SCSS)](#arquitectura-de-estilos-scss)
- [Arquitectura de JavaScript](#arquitectura-de-javascript)
- [Contenido a personalizar](#contenido-a-personalizar)
- [Flujo de trabajo Git (Issues → Commits → Pull Requests)](#flujo-de-trabajo-git-issues--commits--pull-requests)
- [Convención de commits](#convención-de-commits)
- [Ramas del repositorio](#ramas-del-repositorio)
- [Despliegue](#despliegue)
- [Roadmap / próximos pasos](#roadmap--próximos-pasos)

---

## Stack técnico

| Capa       | Tecnología                          |
|------------|--------------------------------------|
| Estructura | HTML5 semántico                      |
| Estilos    | SCSS (Dart Sass) → compilado a CSS   |
| Scripts    | JavaScript ES Modules (sin frameworks) |
| Fuentes    | Google Fonts (Sora, Inter)            |
| Build      | `sass` CLI (sin bundler, sin transpilador) |

No se usa React, Vue, Tailwind ni ningún framework: es intencional. El sitio es una landing de una sola página y no necesita esa complejidad — carga más rápido y es más fácil de mantener así.

---

## Estructura del proyecto

```
vortex-web/
├── README.md
├── package.json
├── .gitignore
├── docs/
│   └── ISSUES.md              # historial de issues simulados (ver flujo de trabajo)
├── assets/                    # imágenes, íconos, capturas de proyectos (vacío por ahora)
└── src/
    ├── index.html             # marcado de la página, sin CSS/JS incrustado
    ├── scss/
    │   ├── main.scss          # punto de entrada, importa todos los parciales
    │   ├── abstracts/
    │   │   ├── _variables.scss    # colores, tipografías, breakpoints
    │   │   └── _mixins.scss       # mixin tablet-down para responsive
    │   ├── base/
    │   │   ├── _root.scss         # variables CSS (:root) generadas desde SCSS
    │   │   └── _reset.scss        # reset y estilos globales
    │   ├── layout/
    │   │   ├── _header.scss
    │   │   ├── _hero.scss
    │   │   ├── _section-heads.scss
    │   │   ├── _about.scss
    │   │   ├── _projects.scss
    │   │   ├── _skills.scss
    │   │   ├── _contact.scss
    │   │   └── _footer.scss
    │   └── components/
    │       ├── _buttons.scss
    │       ├── _chips.scss
    │       └── _cards.scss
    ├── css/
    │   └── main.css           # CSS compilado (generado, no editar a mano)
    └── js/
        ├── main.js            # punto de entrada, importa y arranca los módulos
        └── modules/
            ├── vortex.js       # animación del remolino en <canvas>
            └── nav.js          # scroll-spy del menú + menú móvil
```

**Regla simple:** todo lo que se edita a mano vive en `src/scss/**` y `src/js/**`. Lo que hay en `src/css/main.css` es un artefacto generado por Sass — no lo edites directamente, tus cambios se perderían al recompilar.

---

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior (incluye `npm`)
- Un editor de código (VS Code recomendado)

No se necesita ninguna cuenta ni servicio externo para desarrollar localmente.

---

## Instalación y uso

```bash
# 1. Clona el repositorio
git clone <url-del-repositorio>
cd vortex-web

# 2. Instala las dependencias de desarrollo (solo el compilador de Sass y un servidor local)
npm install

# 3. Compila el SCSS una vez
npm run sass:build

# 4. (Opcional) recompila automáticamente cada vez que edites un archivo .scss
npm run sass:watch

# 5. Levanta un servidor local para ver el sitio con recarga en vivo
npm run dev
```

Esto abre el sitio en `http://localhost:5500` sirviendo la carpeta `src/`.

> Si prefieres no usar `live-server`, también puedes abrir `src/index.html` directamente en el navegador o usar la extensión **Live Server** de VS Code apuntando a esa carpeta.

---

## Scripts disponibles

| Comando                  | Qué hace                                                        |
|---------------------------|-----------------------------------------------------------------|
| `npm run sass:build`      | Compila `src/scss/main.scss` → `src/css/main.css` una sola vez |
| `npm run sass:build:min`  | Igual, pero minificado (para producción)                       |
| `npm run sass:watch`      | Recompila automáticamente al guardar cualquier `.scss`          |
| `npm run dev`             | Sirve `src/` en un servidor local con recarga en vivo           |

---

## Arquitectura de estilos (SCSS)

Se sigue una versión simplificada de la metodología **7-1** (variables/mixins → base → layout → components):

1. **`abstracts/`** — no genera CSS por sí sola. Son variables (`$color-*`, `$bp-tablet`, etc.) y el mixin `tablet-down`.
2. **`base/`** — reset del navegador y las variables CSS globales (`:root`) que sí llegan al navegador y que también puede leer JavaScript en tiempo de ejecución.
3. **`layout/`** — un archivo por sección de la página (header, hero, about, projects, skills, contact, footer). Cada uno controla su propia estructura y su propio `@media` cuando aplica.
4. **`components/`** — piezas reutilizables entre secciones: botones, tags/chips y las tarjetas de proyecto.

Para cambiar la paleta de colores completa del sitio, edita únicamente `src/scss/abstracts/_variables.scss` y recompila — se propaga a todo el sitio a través de las variables CSS en `_root.scss`.

---

## Arquitectura de JavaScript

El JS está dividido en **ES Modules** nativos del navegador (no requieren bundler):

- **`js/modules/vortex.js`** — toda la lógica de la animación del remolino en `<canvas>`. Exporta `initVortex(canvasId)`.
- **`js/modules/nav.js`** — exporta dos funciones independientes:
  - `initNavScrollSpy()`: resalta el link del menú según la sección visible.
  - `initMobileMenu()`: abre/cierra el menú en pantallas pequeñas (el botón hamburguesa).
- **`js/main.js`** — punto de entrada. Importa los módulos anteriores y los inicializa cuando el DOM está listo.

`index.html` carga este entrypoint con `<script type="module" src="js/main.js">`, por lo que los `import`/`export` funcionan directo en el navegador sin necesidad de Webpack, Vite ni ninguna herramienta de build para JS.

---

## Contenido a personalizar

Antes de publicar el sitio como definitivo, reemplaza en `src/index.html`:

- [ ] Correo de contacto (`hola@vortexweb.mx`) y número de WhatsApp
- [ ] Links reales de GitHub y LinkedIn
- [ ] Las 4 tarjetas de `#projects` con proyectos reales
- [ ] El texto de `#about` con tu historia real
- [ ] Los chips de `#skills` si tu stack cambia

---

## Flujo de trabajo Git (Issues → Commits → Pull Requests)

Este repositorio sigue un flujo basado en **ramas por funcionalidad**, cada una asociada a un *issue*, con historial de commits descriptivo y fusionada a `develop` mediante un merge equivalente a un Pull Request (`--no-ff`, para conservar el historial de la rama).

Flujo estándar para cualquier cambio nuevo:

1. **Abrir un Issue** describiendo el problema o la funcionalidad (ver `docs/ISSUES.md` para el historial de issues de este proyecto).
2. **Crear una rama** desde `develop` con el prefijo correspondiente:
   - `feature/nombre-corto` — nueva funcionalidad
   - `fix/nombre-corto` — corrección de un bug
   - `docs/nombre-corto` — documentación
3. **Commitear en pequeños pasos**, siguiendo la convención de abajo, referenciando el issue (`Refs #3`, `Closes #3`).
4. **Abrir un Pull Request** de la rama hacia `develop`. Describir qué cambia y por qué, enlazar el issue.
5. **Revisar y fusionar** el PR (merge `--no-ff` para conservar el historial de la rama).
6. Cuando `develop` esté estable, se fusiona a `main` y se etiqueta una versión (`v1.0.0`, `v1.1.0`, etc.).

> Este repositorio se inicializó localmente con esta convención ya aplicada (ver ramas y `git log --graph --all`). Al subirlo a GitHub/GitLab, continúa el flujo abriendo los Issues y Pull Requests reales en la plataforma — `docs/ISSUES.md` documenta los que dieron origen a cada rama para que puedas recrearlos ahí si quieres mantener la trazabilidad.

---

## Convención de commits

Se usa el formato de **Conventional Commits**:

```
<tipo>(<alcance opcional>): <descripción breve>
```

Tipos usados en este proyecto: `feat`, `fix`, `docs`, `refactor`, `style`, `chore`.

Ejemplos reales del historial:

```
feat(styles): migrar CSS incrustado a arquitectura SCSS modular
feat(scripts): dividir JS incrustado en módulos ES (vortex, nav)
feat(markup): extraer HTML a src/index.html referenciando assets externos
docs: agregar README del proyecto y flujo de issues
```

---

## Ramas del repositorio

| Rama                          | Propósito                                                   |
|--------------------------------|---------------------------------------------------------------|
| `main`                         | Versión estable y desplegable                                |
| `develop`                      | Integración de features antes de pasar a `main`               |
| `feature/sass-architecture`    | Migración de CSS incrustado a SCSS modular                    |
| `feature/js-modularization`    | División del JS incrustado en módulos ES                      |
| `feature/html-restructure`     | Extracción del HTML a archivo propio con referencias externas |
| `docs/readme-and-workflow`     | Este README y la documentación del flujo de trabajo           |

---

## Despliegue

El sitio es 100% estático, así que puede desplegarse en cualquier hosting estático apuntando la raíz de publicación a `src/` (después de correr `npm run sass:build:min`):

- **Vercel / Netlify:** build command `npm run sass:build:min`, publish directory `src`
- **GitHub Pages:** correr el build y publicar la carpeta `src` en la rama `gh-pages`

---

## Roadmap / próximos pasos

- [ ] Conectar el formulario de contacto a un servicio real (Formspree, Resend, etc.) en vez de solo `mailto:`
- [ ] Agregar capturas reales a `assets/` para las tarjetas de proyectos
- [ ] Optimizar imágenes cuando se agreguen (WebP + `loading="lazy"`)
- [ ] Añadir metaetiquetas Open Graph para compartir en redes
