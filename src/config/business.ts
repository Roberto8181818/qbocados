/**
 * Configuración central de QBocados.
 *
 * MARCADOR DE POSICIÓN: la URL pública sigue siendo provisional. Antes de
 * publicar, reemplázala por el dominio real. El número de WhatsApp ya es el
 * definitivo y no se muestra como dato provisional.
 */
export const business = {
  name: "QBocados",
  tagline: "Pasabocas congeladas por encargo",
  description:
    "Pasabocas congeladas artesanales preparadas por encargo: empanaditas, deditos de queso y salchirrollos.",

  /** Solo dígitos, con indicativo de país. */
  whatsappNumber: "573044929739",

  /** URL canónica provisional. Reemplazar por el dominio real al desplegar. */
  siteUrl: "https://qbocados.com",

  city: "Barranquilla",
  locale: "es-CO",
  currency: "COP",

  /** Copy comercial honesto: sin plazos, envíos gratis ni precios definitivos. */
  announcement: "Pedidos por encargo · Atención directa por WhatsApp",
  priceNote:
    "Precios de referencia en COP. Confirmamos el valor final, la presentación y la entrega por WhatsApp.",
  orderNote:
    "La disponibilidad, el valor final y la entrega se confirman por WhatsApp antes de preparar el pedido.",
  privacyNote:
    "Usamos tus datos únicamente para coordinar este pedido por WhatsApp. No se guardan en esta web.",
} as const;

/** Marcador de ejemplo: la app avisa en desarrollo si vuelve a ese valor. */
const whatsappPlaceholder: string = "573000000000";

export const isWhatsAppPlaceholder =
  business.whatsappNumber === whatsappPlaceholder;
export const isSiteUrlPlaceholder = business.siteUrl === "https://qbocados.com";
