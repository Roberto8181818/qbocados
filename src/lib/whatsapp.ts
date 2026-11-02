import { business } from "../config/business";

export function whatsappLink(message: string): string {
  const number = business.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const genericOrderMessage = `Hola ${business.name}, quiero hacer un pedido.`;

export function productEnquiryMessage(productName: string): string {
  return `Hola ${business.name}, quiero consultar por ${productName}. ¿Me confirman disponibilidad, presentación y precio?`;
}
