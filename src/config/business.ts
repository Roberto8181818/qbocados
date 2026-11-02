/**
 * Configuración central de QBocados.
 *
 * MARCADORES DE POSICIÓN: el número de WhatsApp y la URL pública son
 * provisionales. Antes de publicar, reemplázalos por los datos reales.
 * No se muestran al usuario como si fueran datos confirmados.
 */
export const business = {
  name: "QBocados",
  tagline: "Pasabocas congeladas por encargo",
  description:
    "Pasabocas congeladas artesanales preparadas por encargo: empanaditas, deditos de queso, salchrrollos, alitas y croquetas.",

  /** Solo dígitos, con indicativo de país. Reemplazar antes de publicar. */
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

/** Número de ejemplo: la app avisa en desarrollo y el README lo documenta. */
export const isWhatsAppPlaceholder = business.whatsappNumber === "573044929739";
export const isSiteUrlPlaceholder = business.siteUrl === "https://qbocados.com";
