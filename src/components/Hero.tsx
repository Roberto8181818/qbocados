import { motion, type Variants } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { business } from "../config/business";
import { productNames } from "../data/products";
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

export default function Hero() {
  return (
    <>
      <section className="hero" id="inicio">
        <div className="container hero-grid">
          <motion.div className="hero-copy" variants={container} initial="hidden" animate="show">
            <motion.span className="eyebrow" variants={item}>
              Pasabocas congeladas · Hechas por encargo
            </motion.span>

            <motion.h1 className="hero-title" variants={item}>
              De la cocina de casa,
              <br />
              <span className="accent">a tu congelador</span>
            </motion.h1>

            <motion.p className="hero-lead" variants={item}>
              Empanaditas, deditos, salchirrollos y más. Recetas de casa
              preparadas por encargo y congeladas para que las disfrutes cuando quieras.
            </motion.p>

            <motion.div className="hero-cta" variants={item}>
              <a href="#menu" className="btn btn-primary">
                Armar mi pedido
                <ArrowRight aria-hidden="true" />
              </a>
              <a
                href={whatsappLink(genericOrderMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <MessageCircle aria-hidden="true" />
                Consultar por WhatsApp
              </a>
            </motion.div>

            <motion.ul className="hero-assurances" variants={item} aria-label="Información del pedido">
              <li>Precios en {business.currency}</li>
              <li>Domicilios en {business.city}</li>
              <li>Envío gratis en {business.freeDeliveryZone}</li>
            </motion.ul>
          </motion.div>

          <motion.figure
            className="hero-visual"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="hero-panel">
              <img
                className="hero-art"
                src="/hero-cartel.jpg"
                alt=""
                width={1000}
                height={1066}
                fetchPriority="high"
                decoding="async"
              />

              <span className="hero-panel-label">Hecho por encargo</span>
              <span className="hero-seal" aria-hidden="true">
                <span>QBocados</span>
                <small>Pasabocas de casa</small>
              </span>

              <p className="hero-caption">
                <span>01</span>
                Para picar, compartir y repetir.
              </p>
            </div>
          </motion.figure>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-group" key={copy}>
              {productNames.map((name) => (
                <span className="marquee-item" key={`${name}-${copy}`}>
                  {name}
                  <span className="marquee-dot">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="trust" aria-label="Sellos de la casa">
        <div className="container trust-row">
          <p>Un congelador lleno de planes</p>
          <div className="trust-badges">
            <span>Elaboración artesanal</span>
            <span>Pedidos por encargo</span>
            <span>Atención por WhatsApp</span>
          </div>
        </div>
      </section>
    </>
  );
}
