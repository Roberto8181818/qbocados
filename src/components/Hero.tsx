import { motion, type Variants } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { business } from "../config/business";
import { productNames } from "../data/products";
import { genericOrderMessage, whatsappLink } from "../lib/whatsapp";
import ProductIllustration from "./ProductIllustration";

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

function Doodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 84" className={className} aria-hidden="true" fill="none">
      <path
        d="M12 62 A44 40 0 0 1 104 60 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="0.1 5"
        strokeLinecap="round"
      />
      <rect x="18" y="20" width="52" height="15" rx="7" stroke="currentColor" strokeWidth="2" />
      <path d="M96 26 c6 -8 -4 -12 2 -20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <span className={`star ${className ?? ""}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z" />
      </svg>
    </span>
  );
}

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
              Empanaditas, deditos de queso, salchurrollos y más. Recetas de casa
              preparadas por encargo y congeladas para que las disfrutes cuando quieras.
            </motion.p>

            <motion.div className="hero-cta" variants={item}>
              <a href="#menu" className="btn btn-red">
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
              <li>Hecho por encargo</li>
              <li>Precios en {business.currency}</li>
              <li>Trato directo</li>
            </motion.ul>
          </motion.div>

          <motion.figure
            className="hero-visual"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="hero-panel">
              <span className="hero-panel-label">Hecho por encargo</span>
              <span className="hero-seal" aria-hidden="true">
                <span>QBocados</span>
                <small>Pasabocas de casa</small>
              </span>

              <Sparkle className="star-1" />
              <Sparkle className="star-2" />
              <Sparkle className="star-3" />
              <Doodle className="doodle doodle-1" />
              <Doodle className="doodle doodle-2" />

              <div className="hero-platter" aria-hidden="true">
                <span className="hero-platter-ellipse" />
                <ProductIllustration
                  kind="empanada"
                  plate={false}
                  className="hero-piece hero-piece-1"
                />
                <ProductIllustration
                  kind="cheese"
                  plate={false}
                  className="hero-piece hero-piece-2"
                />
                <ProductIllustration
                  kind="croquette"
                  plate={false}
                  className="hero-piece hero-piece-3"
                />
              </div>

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
