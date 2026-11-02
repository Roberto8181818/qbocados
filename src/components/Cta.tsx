import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { genericOrderMessage, whatsappLink } from "../whatsapp";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } },
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
          <svg
            className="cta-doodle"
            viewBox="0 0 120 84"
            aria-hidden="true"
            fill="none"
          >
            <path
              d="M12 62 A44 40 0 0 1 104 60 Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="0.1 5"
              strokeLinecap="round"
            />
            <rect x="18" y="20" width="52" height="15" rx="7" stroke="currentColor" strokeWidth="2" />
          </svg>

          <motion.span className="eyebrow" variants={item}>
            Próximo pedido
          </motion.span>
          <motion.h2 variants={item}>Llena tu congelador del sabor de siempre</motion.h2>
          <motion.p variants={item}>
            Arma tu cesta con las pasabocas que más te encantan y envíanos tu pedido
            directamente por WhatsApp. Nosotros lo preparamos con el mismo cariño de siempre.
          </motion.p>
          <motion.a
            href={whatsappLink(genericOrderMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-cream"
            variants={item}
          >
            <MessageCircle aria-hidden="true" />
            Enviar mi pedido por WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
