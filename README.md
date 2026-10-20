# Vortex Web

Portafolio estático de Vortex Web. El sitio publicado se construye desde `src/`; `calculadora/` y `morea-cafe/` son repositorios independientes y se mantienen fuera de este despliegue.

## Desarrollo local

Requiere Node.js y npm.

```bash
npm ci
npm run dev
```

El sitio estará disponible en `http://localhost:5500`.

## Compilación

```bash
npm run build
```

La compilación genera `src/css/main.css` a partir de los archivos Sass en `src/scss/`.

## Publicación

Netlify y Vercel ya están configurados para ejecutar `npm run build` y publicar el directorio `src`. Conecta este repositorio a la plataforma y conserva esos valores de build y directorio de salida.

Antes de publicar, confirma que los enlaces de las demos, el correo y el teléfono de contacto sigan vigentes. Agrega las URL reales de los perfiles sociales si se desea mostrarlos; no se incluyen enlaces genéricos.