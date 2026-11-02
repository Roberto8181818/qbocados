import { business } from "../config/business";

export interface FaqEntry {
  q: string;
  a: string;
}

/**
 * Respuestas deliberadamente prudentes: no prometen plazos ni condiciones
 * distintas a las confirmadas por el negocio.
 */
export const faqs: readonly FaqEntry[] = [
  {
    q: "¿Qué son las pasabocas de QBocados?",
    a: "Son aperitivos de casa —empanaditas, deditos de queso y salchirrollos— que se preparan por encargo. Cada pedido se congela para que puedas cocinarlo cuando quieras.",
  },
  {
    q: "¿Cómo hago un pedido?",
    a: "Elige tus productos, añádelos a la cesta, completa tus datos y envía el resumen por WhatsApp. Allí confirmamos disponibilidad, presentación y entrega.",
  },
  {
    q: "¿Los precios son definitivos?",
    a: `Sí. Los precios del catálogo están en ${business.currency} y son los vigentes. La disponibilidad y la entrega se confirman por WhatsApp antes de preparar el pedido.`,
  },
  {
    q: "¿Cómo se conservan y preparan?",
    a: "Mantén la cadena de frío y sigue las indicaciones de conservación y preparación que acordemos contigo. Si tienes dudas, escríbenos antes de cocinarlas.",
  },
  {
    q: "¿Hacen domicilios y cuánto cuestan?",
    a: `Hacemos domicilios en ${business.city}. En ${business.freeDeliveryZone} son gratis; para otros sectores coordinamos el costo y el horario por WhatsApp antes de preparar el pedido.`,
  },
  {
    q: "¿Tienen opciones para alergias o restricciones?",
    a: "Escríbenos antes de pedir y revisamos contigo los ingredientes de cada producto. No podemos garantizar la ausencia de alérgenos sin revisar cada receta.",
  },
];
