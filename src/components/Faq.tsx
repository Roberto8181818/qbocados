import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "¿Qué son las pasabocas congeladas de QBocados?",
    a: "Es un catálogo de aperitivos elaborados artesanalmente (empanaditas, deditos de queso, salchurrollos, alitas, croquetas…) que congelamos al momento de su fabricación para conservar su frescura y sabor.",
  },
  {
    q: "¿Cuánto tiempo se conservan?",
    a: "Aproximadamente 12 meses en perfectas condiciones. Te recomendamos consumirlas entre los 2 y los 3 meses para disfrutar de la mejor textura y sabor.",
  },
  {
    q: "¿Necesito descongelar las pasabocas antes de comerlas?",
    a: "Sí. Se conservan en nevera (entre 2 y 4 h) o en microondas (aprox. 5 min), dependiendo del producto.",
  },
  {
    q: "¿Qué incluye un pedido?",
    a: "Los pedidos se preparan al momento: congelación previa + cocción. Puedes pedir cantidades para 2, 4 o 6 personas y te lo entregamos listo para calentar o servir.",
  },
  {
    q: "¿Hacen envíos a domicilio?",
    a: "Sí, realizamos envíos en 24-48 h en toda la ciudad. Consulta tu zona para conocer el coste exacto (gratis desde los 35 € de pedido).",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] } },
  };

  const toggle = (i: number) => {
    setOpenIndex((cur) => (cur === i ? null : i));
  };

  return (
    <section className="section" id="faq">
      <div className="container container-narrow">
        <motion.div
          className="section-head section-head--center"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.span className="eyebrow" variants={item}>
            Dudas
          </motion.span>
          <motion.h2 variants={item}>
            Preguntas <span className="accent">frecuentes</span>
          </motion.h2>
          <motion.p variants={item}>Resolvimos las preguntas que nos hacen todos nuestros clientes.</motion.p>
        </motion.div>

        <div className="faq-list">
          {faqs.map((f, i) => {
            const open = openIndex === i;
            return (
              <motion.div
                key={f.q}
                className={`faq-item${open ? " open" : ""}`}
                initial="hidden"
                animate="show"
                variants={item}
              >
                <button
                  type="button"
                  className="faq-q"
                  onClick={() => toggle(i)}
                  aria-expanded={open}
                  aria-controls={`faq-a-${i + 1}`}
                  id={`faq-q-${i + 1}`}
                >
                  <span>{f.q}</span>
                  <ChevronDown className="faq-icon" aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="answer"
                      className="faq-a"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="faq-a-inner">
                        <p>{f.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
