import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Las croquetas de jamón son las mejores que hemos probado en toda la región. Nuestros clientes no paran de pedirlas.",
    name: "Marta F.",
    role: "Restaurante Casa Fuego",
    initials: "MF",
  },
  {
    quote:
      "Pedimos las alitas cada semana. El proceso de congelación y la cocción al momento marcan la diferencia.",
    name: "Carlos R.",
    role: "Hostelería El Rincón",
    initials: "CR",
  },
  {
    quote:
      "Desde que probamos los combos congelados no hemos vuelto a hacer nada casero. Rápido, sabroso y muy profesional.",
    name: "Ana L.",
    role: "Dueña de Bar La Tasca",
    initials: "AL",
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

export default function Testimonials() {
  return (
    <section className="section" id="opiniones">
      <div className="container">
        <motion.div
          className="section-head section-head--center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={container}
        >
          <motion.span className="eyebrow" variants={item}>
            Opiniones
          </motion.span>
          <motion.h2 variants={item}>Lo que dicen nuestros comensales</motion.h2>
        </motion.div>

        <motion.div
          className="testi-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={container}
        >
          {testimonials.map((t) => (
            <motion.figure key={t.name} className="testi" variants={item}>
              <div className="testi-stars" role="img" aria-label="Valoración de 5 de 5">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="avatar" aria-hidden="true">
                  {t.initials}
                </span>
                <span className="who">
                  <strong>{t.name}</strong>
                  <small>{t.role}</small>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
