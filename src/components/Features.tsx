import { motion, type Variants } from "framer-motion";
import { Home, MessageCircle, Snowflake, UtensilsCrossed } from "lucide-react";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Elaboración artesanal",
    text: "Recetas de casa preparadas por encargo.",
  },
  {
    icon: Snowflake,
    title: "Congeladas para después",
    text: "Congelamos cada pedido para que lo tengas a mano y lo cocines cuando quieras.",
  },
  {
    icon: MessageCircle,
    title: "Trato directo",
    text: "Confirmas disponibilidad, presentación y entrega por WhatsApp.",
  },
  {
    icon: Home,
    title: "A tu ritmo",
    text: "Te indicamos cómo conservar y preparar cada producto cuando lo vayas a disfrutar.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
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
            <motion.h2 className="story-title" variants={item}>
              Lo casero,
              <br />
              con calma
            </motion.h2>
            <motion.p className="hero-lead" variants={item}>
              Cada pedido se prepara por encargo. Tú eliges qué quieres, nosotros
              lo congelamos y tú decides cuándo ponerlo en la mesa.
            </motion.p>
            <motion.a href="#menu" className="btn btn-primary" variants={item}>
              Ver el catálogo
            </motion.a>
          </motion.div>

          <motion.div
            className="story-list"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={container}
          >
            {features.map((feature) => (
              <motion.div className="story-item" key={feature.title} variants={item}>
                <feature.icon aria-hidden="true" strokeWidth={1.5} />
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
