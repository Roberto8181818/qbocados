import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ShieldCheck, Snowflake, UtensilsCrossed, Truck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Ingredientes premium",
    text: "Seleccionamos los mejores ingredientes de proveedores locales y artesanos de la zona.",
  },
  {
    icon: Snowflake,
    title: "Congelación express",
    text: "Congelamos al momento para conservar aroma y textura originales durante meses.",
  },
  {
    icon: UtensilsCrossed,
    title: "Elaboración artesanal",
    text: "Recetas tradicionales con el toque propio y casero que solo se enseña en casa.",
  },
  {
    icon: Truck,
    title: "Envío express",
    text: "Entregas en 24-48 h en toda la ciudad, con pedido preparado al momento.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } },
};

export default function Features() {
  return (
    <section className="section" id="porque">
      <div className="container">
        <div className="story">
          <motion.div
            className="story-copy"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={container}
          >
            <motion.span className="eyebrow" variants={item}>
              Por qué QBocados
            </motion.span>
            <motion.h2 className="hero-title" variants={item}>
              Lo casero,
              <br />
              hecho como se debe
            </motion.h2>
            <motion.p className="hero-lead" variants={item}>
              No vendemos simples congelados: conservamos la calidad de una cocina casera
              en tu nevera.
            </motion.p>
            <motion.a href="#menu" className="btn btn-red" variants={item}>
              Conocer el menú
            </motion.a>
          </motion.div>

          <motion.div
            className="story-list"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={container}
          >
            {features.map((f) => (
              <motion.div className="story-item" key={f.title} variants={item}>
                <f.icon aria-hidden="true" strokeWidth={1.5} />
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
