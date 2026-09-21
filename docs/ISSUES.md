# Historial de Issues

Este archivo documenta los issues que dieron origen a cada rama del proyecto. Como el repositorio se preparó localmente (sin un remoto de GitHub/GitLab todavía), estos issues están registrados aquí en vez de en la pestaña "Issues" de una plataforma. Al subir el repositorio, se recomienda recrearlos ahí para mantener la trazabilidad real y poder referenciarlos desde los Pull Requests (`Closes #1`, etc.).

---

### #1 — Migrar los estilos incrustados a una arquitectura SCSS modular

**Tipo:** `feature`
**Rama:** `feature/sass-architecture`
**Estado:** Cerrado ✅ (fusionado a `develop`)

**Descripción:**
Todo el CSS vive en un `<style>` dentro del HTML. Esto dificulta mantener el proyecto a medida que crece: no hay separación por responsabilidad, no se pueden reutilizar variables de forma cómoda y cualquier cambio de color implica buscar manualmente cada ocurrencia.

**Criterios de aceptación:**
- [x] Variables de diseño (colores, tipografías, breakpoints) centralizadas en `abstracts/_variables.scss`.
- [x] Un mixin para el breakpoint de tablet, reutilizado en todos los archivos que lo necesiten.
- [x] Estilos separados por capa: base, layout (uno por sección) y componentes reutilizables.
- [x] `main.scss` como único punto de entrada que importa todo en el orden correcto.
- [x] CSS compilado resultante visualmente idéntico al original.

---

### #2 — Dividir el JavaScript incrustado en módulos ES

**Tipo:** `feature`
**Rama:** `feature/js-modularization`
**Estado:** Cerrado ✅ (fusionado a `develop`)

**Descripción:**
El JavaScript de la animación del remolino y del scroll-spy del menú vive en un único `<script>` al final del HTML. Se necesita separar cada responsabilidad en su propio módulo para poder editarlas de forma independiente.

**Criterios de aceptación:**
- [x] `modules/vortex.js` exporta `initVortex()` y no depende de nada fuera de sí mismo salvo el DOM.
- [x] `modules/nav.js` exporta `initNavScrollSpy()` y `initMobileMenu()` por separado.
- [x] `main.js` es el único punto de entrada e inicializa todo al cargar el DOM.
- [x] Bonus: el botón de menú móvil (`.menu-toggle`), que ya existía en el markup pero no hacía nada, queda funcional.

---

### #3 — Extraer el HTML a un archivo propio referenciando los assets externos

**Tipo:** `feature`
**Rama:** `feature/html-restructure`
**Estado:** Cerrado ✅ (fusionado a `develop`)

**Descripción:**
Una vez separados los estilos y el script, el HTML debe quedar como marcado puro, referenciando `css/main.css` y `js/main.js` en vez de contenerlos inline.

**Criterios de aceptación:**
- [x] `src/index.html` sin ningún `<style>` ni `<script>` con lógica incrustada.
- [x] Referencias correctas a `css/main.css` y `js/main.js` (este último como `type="module"`).
- [x] El sitio se ve y funciona igual que la versión de un solo archivo.

---

### #4 — Documentar el proyecto y el flujo de trabajo Git

**Tipo:** `docs`
**Rama:** `docs/readme-and-workflow`
**Estado:** Cerrado ✅ (fusionado a `develop`)

**Descripción:**
El proyecto necesita un `README.md` que explique la arquitectura, cómo instalarlo y compilarlo, y el flujo de Issues/Commits/Pull Requests que se sigue para contribuir.

**Criterios de aceptación:**
- [x] README con estructura de carpetas, instalación, scripts y arquitectura de SCSS/JS.
- [x] Este archivo (`docs/ISSUES.md`) documentando el historial de issues.
- [x] Convención de commits definida y ejemplificada con commits reales del historial.
