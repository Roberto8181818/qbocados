import { motion, type Variants } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { genericOrderMessage, whatsappLink } from "../whatsapp";
import { productNames } from "../data/products";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } },
};

/** Empanada ilustrada (media luna con costura repulgada punteada). */
function Empanada({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 130" className={className} aria-hidden="true" fill="none">
      {/* cuerpo */}
      <path d="M16 112 A104 96 0 0 1 224 112 Z" fill="currentColor" />
      {/* costura repulgada */}
      <path
        d="M38 104 A84 76 0 0 1 202 104"
        stroke="#f1e0b8"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="0.1 11"
      />
      {/* base crujiente */}
      <path d="M16 112 H224" stroke="#8a5a24" strokeWidth="5" strokeLinecap="round" />
      {/* vapor */}
      <path
        d="M104 22 C100 14 108 10 104 2 M124 26 C120 18 128 14 124 6"
        stroke="#3e3325"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.28"
      />
    </svg>
  );
}

/** Línea-art decorativa: empanadita y dedito en trazo fino. */
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
              Del horno de casa,
              <br />
              a tu congelador
            </motion.h1>

            <motion.p className="hero-lead" variants={item}>
              Recetas artesanales elaboradas con ingredientes de primera calidad y congeladas
              al momento. Cocínalas cuando tú quieras y disfruta del verdadero sabor de casa
              en minutos.
            </motion.p>

            <motion.div className="hero-cta" variants={item}>
              <a
                href={whatsappLink(genericOrderMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-red"
              >
                <MessageCircle aria-hidden="true" />
                Pedir por WhatsApp
              </a>
              <a href="#menu" className="btn btn-outline">
                Ver el menú
              </a>
            </motion.div>

            <motion.a href="#menu" className="hero-pill" variants={item}>
              <span className="hero-pill-art" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="currentColor">
                  <path d="M8 44 A24 20 0 0 1 56 44 Z" />
                </svg>
              </span>
              Los favoritos de la casa
            </motion.a>
          </motion.div>

          <motion.div className="hero-visual" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}>
            <div className="hero-panel">
              <Sparkle className="star-1" />
              <Sparkle className="star-2" />
              <Sparkle className="star-3" />
              <Doodle className="doodle doodle-1" />
              <div className="hero-art">
                <Empanada className="hero-plate" />
              </div>
              <Empanada className="hero-plate-sm" />
              <span className="hero-shadow" aria-hidden="true" />
            </div>
            <Doodle className="doodle doodle-2" />
          </motion.div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-group" key={copy}>
              {productNames.map((name) => (
                <span className="marquee-item" key={name + copy}>
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
          <p>Mucho más que un congelador: un auténtico punto de sabor</p>
          <div className="trust-badges">
            <span>Ingredientes premium</span>
            <span>Elaboración artesanal</span>
            <span>Envío express</span>
          </div>
        </div>
      </section>
    </>
  );
}
