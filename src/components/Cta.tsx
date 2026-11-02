import { motion, type Variants } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { business } from "../config/business";
import { genericOrderMessage, whatsappLink } from "../lib/whatsapp";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export default function Cta() {
  return (
    <section className="section" id="pedido">
      <div className="container">
        <motion.div
          className="cta-panel"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
        >
          <svg className="cta-doodle" viewBox="0 0 120 84" aria-hidden="true" fill="none">
            <path
              d="M12 62 A44 40 0 0 1 104 60 Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="0.1 5"
              strokeLinecap="round"
            />
            <rect
              x="18"
              y="20"
              width="52"
              height="15"
              rx="7"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>

          <motion.span className="eyebrow" variants={item}>
            Tu próximo pedido
          </motion.span>
          <motion.h2 variants={item}>Llena tu congelador del sabor de siempre</motion.h2>
          <motion.p variants={item}>
            Arma tu cesta y envíanos el resumen por WhatsApp. Confirmamos contigo
            disponibilidad, presentación y entrega antes de preparar el pedido.
          </motion.p>
          <motion.div className="cta-actions" variants={item}>
            <a
              href={whatsappLink(genericOrderMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-cream"
            >
              <MessageCircle aria-hidden="true" />
              Escribir por WhatsApp
            </a>
            <a href="#menu" className="btn btn-outline-light">
              Ver el catálogo
              <ArrowRight aria-hidden="true" />
            </a>
          </motion.div>
          <motion.p className="cta-note" variants={item}>
            {business.priceNote}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
