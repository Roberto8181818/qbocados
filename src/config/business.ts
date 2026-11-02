/**
 * Configuración central de QBocados.
 *
 * MARCADOR DE POSICIÓN: la URL pública sigue siendo provisional. Antes de
 * publicar, reemplázala por el dominio real.
 */

const city = "Barranquilla";
const currency = "COP";
const freeDeliveryZone = "Alameda del Río";
const deliveryNote = `Domicilios en ${city} · Envío gratis en ${freeDeliveryZone}`;

export const business = {
  name: "QBocados",
  tagline: "Pasabocas congeladas por encargo",
  description:
    "Pasabocas congeladas artesanales preparadas por encargo: empanaditas, deditos de queso y salchirrollos.",

  /** Solo dígitos, con indicativo de país. */
  whatsappNumber: "573044929739",

  /** URL canónica provisional. Reemplazar por el dominio real al desplegar. */
  siteUrl: "https://qbocados.com",

  city,
  locale: "es-CO",
  currency,
  freeDeliveryZone,
  deliveryNote,

  /** Copy comercial honesto: sin plazos ni promesas no confirmadas. */
  announcement: `Pedidos por encargo · Domicilios en ${city}`,
  priceNote: `Precios en ${currency} · ${deliveryNote}.`,
  orderNote: `${deliveryNote}. Confirmamos disponibilidad y entrega por WhatsApp antes de preparar el pedido.`,
  privacyNote:
    "Usamos tus datos únicamente para coordinar este pedido por WhatsApp. No se guardan en esta web.",
} as const;

/** Marcador de ejemplo: la app avisa en desarrollo si vuelve a ese valor. */
const whatsappPlaceholder: string = "573000000000";

export const isWhatsAppPlaceholder =
  business.whatsappNumber === whatsappPlaceholder;
export const isSiteUrlPlaceholder = business.siteUrl === "https://qbocados.com";
