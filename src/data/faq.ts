import { business } from "../config/business";

export interface FaqEntry {
  q: string;
  a: string;
}

/**
 * Respuestas deliberadamente prudentes: no prometen plazos, envíos gratis,
 * conservación exacta ni precios definitivos que el negocio no haya confirmado.
 */
export const faqs: readonly FaqEntry[] = [
  {
    q: "¿Qué son las pasabocas de QBocados?",
    a: "Son aperitivos de casa —empanaditas, deditos de queso y salchirrollos— que se preparan por encargo. Cada pedido se congela para que puedas cocinarlo cuando quieras.",
  },
  {
    q: "¿Cómo hago un pedido?",
    a: "Elige tus productos, añádelos a la cesta, completa tus datos y envía el resumen por WhatsApp. Allí confirmamos disponibilidad, presentación, valor final y entrega.",
  },
  {
    q: "¿Los precios son definitivos?",
    a: `Los precios que ves son de referencia en ${business.currency}. El valor final se confirma por WhatsApp según la presentación y la cantidad que necesites.`,
  },
  {
    q: "¿Cómo se conservan y preparan?",
    a: "Mantén la cadena de frío y sigue las indicaciones de conservación y preparación que acordemos contigo. Si tienes dudas, escríbenos antes de cocinarlas.",
  },
  {
    q: "¿Hacen entregas y cuánto cuestan?",
    a: "La entrega se coordina por WhatsApp según tu ubicación. Allí te confirmamos si está disponible, el costo y el horario antes de preparar el pedido.",
  },
  {
    q: "¿Tienen opciones para alergias o restricciones?",
    a: "Escríbenos antes de pedir y revisamos contigo los ingredientes de cada producto. No podemos garantizar la ausencia de alérgenos sin revisar cada receta.",
  },
];
