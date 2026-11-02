import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data/faq";

const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
}).replace(/</g, "\\u003c");

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="section" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
      <div className="container container-narrow">
        <motion.div
          className="section-head section-head--center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={container}
        >
          <motion.span className="eyebrow" variants={item}>
            Dudas
          </motion.span>
          <motion.h2 variants={item}>
            Preguntas <span className="accent">frecuentes</span>
          </motion.h2>
          <motion.p variants={item}>
            Lo que conviene saber antes de armar tu pedido.
          </motion.p>
        </motion.div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <motion.div
                key={faq.q}
                className={`faq-item${open ? " open" : ""}`}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-20px" }}
                variants={item}
              >
                <button
                  type="button"
                  className="faq-q"
                  onClick={() => toggle(index)}
                  aria-expanded={open}
                  aria-controls={`faq-a-${index + 1}`}
                  id={`faq-q-${index + 1}`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className="faq-icon" aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key="answer"
                      id={`faq-a-${index + 1}`}
                      className="faq-a"
                      role="region"
                      aria-labelledby={`faq-q-${index + 1}`}
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="faq-a-inner">
                        <p>{faq.a}</p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
