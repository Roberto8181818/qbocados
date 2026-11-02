# QBocados · Landing de pasabocas congeladas

Landing profesional (página de una sola página) para promocionar **QBocados**, una página de pasabocas congelados.

## 🎨 Marca y colores

- **Marca:** QBocados
- **Colores principales:** amarillo (`#FFC400`), naranja (`#FF6B00`) y blanco
- **Tipografía:** Sora (títulos) + Inter (texto), con fallback a sistemas

## 🧱 Stack tecnológico (listo para producción)

- **Vite 8** + **React 19** (componentes en TypeScript)
- **Framer Motion** (animaciones: entrada hero, scroll reveal, FAQ, carrito, toast)
- **Lucide React** (iconos profesionales)
- **TypeScript** + **Vite build** (producción)

## 📄 Estructura

```
index.html              → Plantilla HTML (Vite + meta tags + fuentes)
public/favicon.svg      → Favicon de la marca
src/main.tsx            → Punto de entrada de React
src/App.tsx             → Composición de la landing + estado del carrito
src/styles.css          → Design system (paleta, componentes, responsive)
src/components/         → Navbar, Hero, MenuSection, Features, HowItWorks,
                          Testimonials, Faq, Cta, Footer, CartDrawer, Toast
```

## 🚀 Cómo verla / construirla

```bash
npm install
npm run dev     # servidor de desarrollo → http://localhost:5173
npm run build   # build de producción → dist/
npm run preview # vista previa del build
```

## ✨ Secciones

- Hero con CTAs y estadísticas
- Menú destacado de productos (con carrito funcional)
- Por qué QBocados (features)
- Cómo trabajamos (4 pasos)
- Opiniones
- FAQ acordeón
- CTA final + Footer

## 🎨 Personalizar

- Colores: editar variables CSS en `src/styles.css`
- Productos: modificar el array `products` en `src/components/MenuSection.tsx`
- Textos: todos los copy está en español y listo para adaptar
