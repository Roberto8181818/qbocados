import { business } from "../config/business";
import { products, type Product } from "../data/products";
import { getCartDetails, type CartLine } from "./cart";
import { formatPrice } from "./format";
import { cleanCustomer, type CustomerData } from "./validation";

export interface OrderMessageInput {
  lines: readonly CartLine[];
  customer: CustomerData;
  catalog?: readonly Product[];
}

/**
 * Construye el mensaje que se abre en WhatsApp. Incluye productos, cantidades,
 * precios, total y datos de entrega. No afirma que el pedido esté confirmado:
 * deja claro que disponibilidad y entrega se acuerdan allí.
 */
export function buildOrderMessage({
  lines,
  customer,
  catalog = products,
}: OrderMessageInput): string {
  const details = getCartDetails(lines, catalog);

  if (details.length === 0) {
    return `Hola ${business.name}, quiero hacer un pedido.`;
  }

  const total = details.reduce((sum, line) => sum + line.lineTotal, 0);
  const clean = cleanCustomer(customer);

  const itemLines = details.map(
    ({ product, qty, unitPrice, lineTotal }) =>
      `• ${qty} × ${product.name} — ${formatPrice(lineTotal)} (${formatPrice(unitPrice)} c/u)`,
  );

  const customerLines = [
    `Nombre: ${clean.name}`,
    `Teléfono: ${clean.phone}`,
    `Dirección: ${clean.address}`,
    clean.references ? `Referencias: ${clean.references}` : null,
    clean.notes ? `Notas: ${clean.notes}` : null,
  ].filter((line): line is string => line !== null);

  return [
    `Hola ${business.name}, quiero hacer este pedido:`,
    "",
    ...itemLines,
    "",
    `Total de productos: ${formatPrice(total)} ${business.currency}`,
    "",
    business.deliveryNote,
    "",
    "Datos de entrega:",
    ...customerLines,
    "",
    "Entiendo que la disponibilidad y la entrega se confirman por WhatsApp antes de preparar el pedido.",
  ].join("\n");
}
