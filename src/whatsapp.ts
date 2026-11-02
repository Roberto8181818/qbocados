export const WHATSAPP_NUMBER = "34600000000";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const genericOrderMessage = "Hola QBocados, me gustaría hacer un pedido.";

export const productOrderMessage = (name: string) =>
  `Hola QBocados, me gustaría encargar: ${name}.`;
