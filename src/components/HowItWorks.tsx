import { motion, type Variants } from "framer-motion";

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

const steps = [
  {
    num: "01",
    title: "Elige tus favoritas",
    text: "Explora el catálogo y filtra por categoría para encontrar lo que buscas.",
  },
  {
    num: "02",
    title: "Arma tu cesta",
    text: "Ajusta cantidades, revisa el total y deja tus datos de entrega.",
  },
  {
    num: "03",
    title: "Confirma por WhatsApp",
    text: "Enviamos el resumen del pedido y acordamos disponibilidad, valor final y entrega.",
  },
  {
    num: "04",
    title: "Disfruta cuando quieras",
    text: "Conserva tus pasabocas congeladas y prepáralas siguiendo las indicaciones acordadas.",
  },
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
            Cómo pedir
          </motion.span>
          <motion.h2 variants={item}>De la cesta a tu mesa, en cuatro pasos</motion.h2>
          <motion.p variants={item}>
            Sin formularios interminables ni promesas de entrega que no podamos
            cumplir: todo se confirma contigo por WhatsApp.
          </motion.p>
        </motion.div>

        <motion.ol
          className="steps-panel"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={container}
        >
          {steps.map((step) => (
            <motion.li key={step.num} className="step" variants={item}>
              <span className="step-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
