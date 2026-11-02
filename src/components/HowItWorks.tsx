import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } },
};

const steps = [
  { num: "01", title: "Elige tus favoritas", text: "Selecciona las pasabocas que más te gusten del catálogo." },
  { num: "02", title: "Añádelas a tu cesta", text: "Arma tu pedido y finalízalo por WhatsApp en un par de toques." },
  { num: "03", title: "Preparamos tu pedido", text: "Se elaboran al momento y se congelan el mismo día para conservar su frescura." },
  { num: "04", title: "Disfruta en casa", text: "Recíbelas congeladas y tenlas listas en minutos. Sin complicaciones." },
];

export default function HowItWorks() {
  return (
    <section className="section" id="como">
      <div className="container">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={container}
        >
          <motion.span className="eyebrow" variants={item}>
            Cómo trabajamos
          </motion.span>
          <motion.h2 variants={item}>De la receta al plato, en 4 pasos</motion.h2>
        </motion.div>

        <motion.ol
          className="steps-panel"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={container}
        >
          {steps.map((s) => (
            <motion.li key={s.num} className="step" variants={item}>
              <span className="step-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
