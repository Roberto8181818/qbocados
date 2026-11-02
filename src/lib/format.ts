import { business } from "../config/business";

const priceFormatter = new Intl.NumberFormat(business.locale, {
  style: "currency",
  currency: business.currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Formatea un valor monetario en COP.
 * Normaliza el espacio duro de Intl para que el texto sea estable en UI,
 * tests y mensajes de WhatsApp.
 */
export function formatPrice(value: number): string {
  if (!Number.isFinite(value) || value < 0) return "—";
  return priceFormatter.format(Math.round(value)).replace(/\u00a0/g, " ");
}

/** Formatea una cantidad entera sin decimales. */
export function formatQuantity(value: number): string {
  if (!Number.isFinite(value)) return "0";
  return new Intl.NumberFormat(business.locale, {
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)));
}
