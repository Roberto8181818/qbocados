# QBocados

Web comercial de una sola página para **QBocados**, pasabocas congeladas artesanales preparadas por encargo. Incluye catálogo en COP, carrito persistente y un checkout que termina en un mensaje de WhatsApp con el pedido completo.

El proyecto no tiene backend: la web arma el pedido, valida los datos y abre WhatsApp. La disponibilidad, el valor final y la entrega se confirman en esa conversación.

> **Estado:** listo para desplegar en un hosting estático, pendiente de sustituir los datos de negocio marcados como provisionales (ver [Antes de publicar](#antes-de-publicar)).

---

## Stack

- **React 19** + **TypeScript** en modo estricto
- **Vite 8**
- **Framer Motion** para animaciones y `MotionConfig` con respeto a `prefers-reduced-motion`
- **Lucide React** para iconografía
- **CSS propio** con design system, sin framework de estilos
- **Vitest** para pruebas unitarias
- **ESLint 10** con flat config y TypeScript ESLint

Requiere Node.js 20.19+ o 22.12+ (probado con Node 24).

---

## Inicio rápido

```bash
npm install
npm run dev
```

Servidor de desarrollo en `http://localhost:5173`.

### Scripts

| Script              | Qué hace                                                  |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo con HMR                            |
| `npm run build`     | `tsc --noEmit` + build de producción en `dist/`           |
| `npm run preview`   | Sirve el build de producción en local                     |
| `npm run typecheck` | Comprueba tipos sin emitir                                |
| `npm run lint`      | ESLint sobre todo el proyecto                             |
| `npm run test`      | Vitest en modo CI (una pasada)                            |
| `npm run test:watch`| Vitest en modo interactivo                                |
| `npm run check`     | typecheck + lint + tests                                  |

---

## Estructura

```text
index.html                          Metadatos SEO, fuentes, JSON-LD global
public/
  favicon.svg                       Icono vectorial de la marca
  apple-touch-icon.png              Icono 180x180 para iOS
  og-image.png                      Imagen social 1200x630
  robots.txt                        Indexación y sitemap
  sitemap.xml                       Sitemap de la página única
scripts/
  generate-brand-assets.ps1         Regenera OG e icono con System.Drawing
src/
  main.tsx                          Punto de entrada
  App.tsx                           Composición, carrito, toast y avisos de desarrollo
  styles.css                        Design system completo y responsive
  config/
    business.ts                     Datos y copy central del negocio
  data/
    products.ts                     Catálogo: única fuente de productos y precios
    faq.ts                          Preguntas frecuentes
  hooks/
    useCart.ts                      Estado del carrito, persistencia y sincronía entre pestañas
  lib/
    cart.ts                         Dominio del carrito, normalización y almacenamiento
    format.ts                       Formato de moneda COP y cantidades
    order.ts                        Construcción del mensaje de pedido
    validation.ts                   Validación y limpieza de datos del cliente
    whatsapp.ts                     Enlaces y mensajes de WhatsApp
  components/
    Navbar.tsx  Hero.tsx  MenuSection.tsx  Features.tsx
    HowItWorks.tsx  Faq.tsx  Cta.tsx  Footer.tsx  Toast.tsx
    ProductIllustration.tsx         Ilustraciones SVG de producto
    cart/
      CartDrawer.tsx                Drawer, pasos, foco y ciclo del pedido
      CartLine.tsx                  Línea de producto con cantidades
      CheckoutForm.tsx              Formulario de cliente y entrega
      OrderReview.tsx               Revisión previa a WhatsApp
      OrderSent.tsx                 Estado enviado y vaciado confirmado
```

---

## Configuración del negocio

`src/config/business.ts` centraliza el nombre, WhatsApp, URL, país, idioma, moneda y los textos comerciales compartidos. Los componentes no repiten estos valores.

### Marcadores de posición

| Dato                    | Valor actual              | Dónde se cambia                                                                 |
| ----------------------- | ------------------------- | ------------------------------------------------------------------------------- |
| WhatsApp                | `573000000000`            | `src/config/business.ts`                                                        |
| Dominio canónico        | `https://qbocados.com`    | `src/config/business.ts`, `index.html`, `public/robots.txt`, `public/sitemap.xml` |
| Precios                 | Valores de referencia COP | `src/data/products.ts`                                                          |
| Fotos de producto       | Ilustraciones SVG         | Campo `image` de cada producto + archivos en `public/`                          |

En desarrollo, la consola avisa si el WhatsApp o la URL siguen siendo marcadores. Esos avisos no se ejecutan en producción.

Al cambiar el dominio:

1. Actualiza `business.siteUrl`.
2. Actualiza canonical, Open Graph, Twitter Card y JSON-LD en `index.html`.
3. Actualiza `public/robots.txt` y `public/sitemap.xml`.
4. Cambia el dominio dibujado en `scripts/generate-brand-assets.ps1` y regenera la imagen OG.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/generate-brand-assets.ps1
```

El script está escrito en ASCII puro para funcionar igual en Windows PowerShell 5.1 y PowerShell 7. Genera `public/og-image.png` (1200×630) y `public/apple-touch-icon.png` (180×180).

---

## Catálogo

`src/data/products.ts` es la única fuente de verdad. Cada producto declara:

- `id` estable usado por el carrito
- `name`, `description`, `alt`
- `price` en COP
- `presentation` y `availability`
- `category`: `empanadas`, `quesos` o `aperitivos`
- `kind`: variante de ilustración SVG
- `image` opcional: si existe, sustituye a la ilustración

Los filtros del catálogo se derivan de `productCategories`. La moneda se formatea en `src/lib/format.ts` con `Intl.NumberFormat("es-CO")`, sin decimales.

Para añadir o cambiar un producto, edita solo ese archivo. El carrito ignora identificadores que no existan en el catálogo, por lo que un producto retirado no rompe cestas guardadas.

### Copiar contenido con criterio

El copy evita testimonios, certificaciones, plazos de entrega, tiempos de conservación, envíos gratis y promesas no verificadas. Los precios se presentan como referencia y la confirmación siempre ocurre por WhatsApp. Mantén ese criterio al editar textos.

---

## Carrito y checkout

- Persistencia en `localStorage` bajo la clave `qbocados.cart.v1`.
- Solo se guardan `{ id, qty }`: **nunca precios ni datos del cliente**.
- Normalización defensiva: descarta productos desconocidos, fusiona duplicados, limita cantidades a `1–99` y tolera almacenamiento corrupto o no disponible.
- Sincronización entre pestañas mediante el evento `storage`.
- Cantidades con `+` / `−`, eliminación por línea y subtotal recalculado.
- El drawer atrapa el foco, cierra con `Escape`, bloquea el scroll del documento y expone `role="dialog"`, `aria-modal` y `aria-labelledby`.
- Flujo en tres pasos: **Cesta → Datos → Revisión**, seguido del estado **Pedido en WhatsApp**.
- Campos obligatorios: nombre, teléfono y dirección. Referencias y notas son opcionales. Hay límites de longitud y validación de teléfono.
- Al revisar, el mensaje incluye productos, cantidades, precio unitario, total de referencia y datos de entrega.
- **La cesta no se vacía al abrir WhatsApp.** Solo se vacía tras la confirmación explícita de “Ya envié mi pedido · Vaciar cesta”.
- Los datos del formulario no se persisten; se usan para componer el mensaje y se descartan al cerrar.

---

## SEO

- `lang="es-CO"`, title y description orientados a la búsqueda local.
- Canonical, Open Graph y Twitter Card con imagen 1200×630.
- `theme-color`, favicon SVG y apple-touch-icon.
- JSON-LD `Organization` y `WebSite` en `index.html`.
- JSON-LD `FAQPage` generado desde `src/data/faq.ts`.
- `robots.txt` y `sitemap.xml`.
- Fuentes con `preconnect` y `display=swap`.
- Sin rutas internas: una sola URL canónica.

Las imágenes sociales y los iconos se generan con `scripts/generate-brand-assets.ps1`; no se editan a mano.

---

## Accesibilidad

- Enlace “Saltar al contenido principal”.
- Landmarks semánticos (`header`, `nav`, `main`, `footer`) y jerarquía de encabezados.
- Foco visible en todos los controles y `:focus-visible` consistente.
- Navegación completa por teclado: menú móvil, filtros, carrito y formulario.
- Focus trap y restauración de foco en el drawer.
- Etiquetas asociadas, `aria-invalid`, `aria-describedby` y resumen de errores con foco al primer campo inválido.
- Regiones `aria-live` para feedback del carrito y del toast.
- Contraste revisado en botones, textos y estados.
- `prefers-reduced-motion` respetado por CSS y por `MotionConfig`.
- Objetivos táctiles y layout verificados a 390 px y 1440 px, sin scroll horizontal.

---

## Calidad

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Estado actual:

- 5 archivos de pruebas, **39 tests** en verde.
- Typecheck y lint sin errores.
- Build de producción correcto: ~414 kB de JS (130 kB gzip) y ~35 kB de CSS (7,3 kB gzip).
- `npm audit --omit=dev`: 0 vulnerabilidades.

`npm audit` completo reporta avisos moderados de `minimatch` en la cadena de tooling de ESLint. Son dependencias de desarrollo y el fix forzado degradaría `typescript-eslint`; no se aplica.

### QA realizada

Se ejecutó una QA con Chrome headless vía DevTools Protocol (script externo, no incluido en el repositorio) sobre escritorio a 1440 px y móvil a 390 px:

- carga inicial, navegación y menú móvil
- filtros del catálogo
- añadir producto, incrementar/decrementar, subtotal y eliminación
- apertura del drawer, focus trap, `Escape`, bloqueo y restauración del scroll
- validación del formulario, foco en el primer error y resumen accesible
- revisión de datos y mensaje de WhatsApp
- persistencia tras abrir WhatsApp y vaciado solo con confirmación
- contraste del CTA móvil y ausencia de overflow horizontal
- consola sin errores; solo los avisos esperados de placeholders

---

## Despliegue

```bash
npm run build
```

Sube el contenido de `dist/` a cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.). Al ser una página única, no necesita reglas de SPA.

Checklist mínima:

1. Reemplazar WhatsApp, dominio y precios reales.
2. Revisar el copy de FAQ y features con el negocio.
3. Añadir fotos reales si existen y actualizar `image` + `alt`.
4. Regenerar OG si cambia el dominio o el mensaje principal.
5. Probar el enlace de WhatsApp en un teléfono real.
6. Verificar el sitio en 375, 768, 1024 y 1920 px.
7. Añadir analítica y aviso de cookies solo si el negocio lo requiere.

---

## Antes de publicar

- [ ] Número de WhatsApp definitivo.
- [ ] Dominio definitivo en los cuatro puntos indicados.
- [ ] Lista de precios COP aprobada.
- [ ] Presentación, disponibilidad y condiciones de entrega confirmadas.
- [ ] Fotos de producto (opcional; hoy hay ilustraciones SVG).
- [ ] Revisión legal del texto de privacidad y del tratamiento de datos.
- [ ] Regenerar `og-image.png` si cambia el dominio.
- [ ] Prueba del pedido completo desde un dispositivo real.

---

Proyecto privado de QBocados. Todos los derechos reservados.
