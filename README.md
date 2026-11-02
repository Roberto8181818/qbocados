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

## Identidad visual

La paleta se deriva del logo de la marca (`references/logo.png`) y mantiene el tono editorial y gastronómico.

| Token          | Valor     | Uso principal                                      |
| -------------- | --------- | -------------------------------------------------- |
| `--cream`      | `#f7f0e1` | Fondo general y `theme-color`                      |
| `--cream-soft` | `#fcf7ec` | Placas, tarjetas y logo del pie                    |
| `--beige`      | `#ece1cc` | Superficies secundarias                            |
| `--brand`      | `#b0441a` | CTA principal y acentos (5,02:1 sobre crema)       |
| `--brand-deep` | `#943614` | Acentos pequeños y hover (6,62:1 sobre crema)      |
| `--gold`       | `#c98a1f` | Detalles decorativos y líneas                      |
| `--gold-ink`   | `#8a5a18` | Texto dorado accesible sobre fondos claros         |
| `--ink`        | `#382617` | Texto principal y fondo del pie                    |
| `--on-brand`   | `#fff8eb` | Texto sobre terracota y marrón                     |

El logo real se usa en la cabecera y en el pie. El pie tiene fondo marrón profundo y una placa crema para que el wordmark conserve legibilidad. La marca cuadrada (`logo-mark.png`), los favicons y la imagen social se derivan del logo original.

### Assets de marca

```text
public/logo.png               Logo horizontal optimizado (480x150)
public/logo-mark.png          Marca cuadrada sobre crema (512x512)
public/favicon.svg            Favicon SVG con PNG embebido
public/favicon-32.png         Favicon 32x32
public/favicon-192.png        Icono 192x192
public/apple-touch-icon.png   Icono 180x180 para iOS
public/og-image.png           Imagen social 1200x630
```

Todos se regeneran desde el logo fuente con:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/generate-brand-assets.ps1
```

El script recorta el logo por transparencia, optimiza el wordmark y elimina del icono cuadrado el punto decorativo que acompaña a la Q. Está escrito en ASCII puro para funcionar igual en Windows PowerShell 5.1 y PowerShell 7.

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
  logo.png                          Logo horizontal optimizado
  logo-mark.png                     Marca cuadrada para iconos
  favicon.svg                       Icono vectorial de la marca
  favicon-32.png  favicon-192.png   Iconos PNG de respaldo
  apple-touch-icon.png              Icono 180x180 para iOS
  og-image.png                      Imagen social 1200x630
  robots.txt                        Indexación y sitemap
  sitemap.xml                       Sitemap de la página única
scripts/
  generate-brand-assets.ps1         Regenera logo, marca, iconos y OG
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

### Datos configurables

| Dato                    | Valor actual              | Estado                                                                          |
| ----------------------- | ------------------------- | ------------------------------------------------------------------------------- |
| WhatsApp                | `573044929739`            | Definitivo; se cambia en `src/config/business.ts`                               |
| Dominio canónico        | `https://qbocados.com`    | Provisional; `src/config/business.ts`, `index.html`, `robots.txt` y `sitemap.xml` |
| Precios                 | Valores de referencia COP | Pendientes de aprobación; `src/data/products.ts`                                |
| Fotos de producto       | Ilustraciones SVG         | Campo `image` de cada producto + archivos en `public/`                          |

En desarrollo, la consola avisa si el WhatsApp vuelve al marcador `573000000000` o si la URL sigue siendo `https://qbocados.com`. Esos avisos no se ejecutan en producción.

Al cambiar el dominio:

1. Actualiza `business.siteUrl`.
2. Actualiza canonical, Open Graph, Twitter Card y JSON-LD en `index.html`.
3. Actualiza `public/robots.txt` y `public/sitemap.xml`.
4. Cambia el dominio dibujado en `scripts/generate-brand-assets.ps1` y regenera logo, iconos e imagen OG.

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
- `theme-color`, favicon SVG, favicons PNG y apple-touch-icon.
- Preload del logo de cabecera para evitar saltos en la primera carga.
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
- logo de cabecera y pie cargados, con la paleta aplicada
- consola sin errores; solo el aviso esperado del dominio provisional

---

## Despliegue

```bash
npm run build
```

Sube el contenido de `dist/` a cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.). Al ser una página única, no necesita reglas de SPA.

Checklist mínima:

1. Confirmar el dominio y los precios reales.
2. Revisar el copy de FAQ y features con el negocio.
3. Añadir fotos reales si existen y actualizar `image` + `alt`.
4. Regenerar logo, iconos y OG si cambia el dominio o el mensaje principal.
5. Probar el enlace de WhatsApp en un teléfono real.
6. Verificar el sitio en 375, 768, 1024 y 1920 px.
7. Añadir analítica y aviso de cookies solo si el negocio lo requiere.

---

## Antes de publicar

- [ ] Confirmar que el WhatsApp `573044929739` recibe pedidos.
- [ ] Dominio definitivo en los cuatro puntos indicados.
- [ ] Lista de precios COP aprobada.
- [ ] Nombres, presentaciones y disponibilidad del catálogo confirmados.
- [ ] Condiciones de entrega confirmadas.
- [ ] Fotos de producto (opcional; hoy hay ilustraciones SVG).
- [ ] Revisión legal del texto de privacidad y del tratamiento de datos.
- [ ] Regenerar `og-image.png` si cambia el dominio.
- [ ] Prueba del pedido completo desde un dispositivo real.

---

Proyecto privado de QBocados. Todos los derechos reservados.
