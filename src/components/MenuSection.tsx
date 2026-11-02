import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle, Plus } from "lucide-react";
import { products, type Product } from "../data/products";
import { productOrderMessage, whatsappLink } from "../whatsapp";

interface MenuSectionProps {
  onAdd: (name: string, price: number) => void;
}

export default function MenuSection({ onAdd }: MenuSectionProps) {
  const [added, setAdded] = useState<string | null>(null);

  const handleAdd = (p: Product) => {
    onAdd(p.name, p.price);
    setAdded(p.name);
    window.setTimeout(() => {
      setAdded((cur) => (cur === p.name ? null : cur));
    }, 1200);
  };

  return (
    <section className="section" id="menu">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <span className="eyebrow">Nuestro menú</span>
          <h2>Los favoritos de la casa</h2>
          <p>
            Recetas pensadas para compartir. Elige tus pasabocas favoritas, agrégalas a tu
            cesta o pídelas directamente por WhatsApp.
          </p>
        </motion.div>

        <div className="product-grid">
          {products.map((p, i) => (
            <motion.article
              key={p.name}
              className="product"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.08 * (i % 3), ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="product-media">
                {p.tag && <span className="chip">{p.tag}</span>}
                <span className="product-icon" role="img" aria-label={p.alt}>
                  {p.icon}
                </span>
              </div>
              <div className="product-body">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="product-foot">
                  <span className="price">{p.price.toFixed(2).replace(".", ",")}&nbsp;€</span>
                  <div className="product-actions">
                    <button
                      type="button"
                      className={`icon-btn${added === p.name ? " added" : ""}`}
                      aria-label={added === p.name ? "Añadido a la cesta" : `Añadir ${p.name} a la cesta`}
                      onClick={() => handleAdd(p)}
                    >
                      {added === p.name ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
                    </button>
                    <a
                      className="icon-btn"
                      href={whatsappLink(productOrderMessage(p.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Pedir ${p.name} por WhatsApp`}
                    >
                      <MessageCircle aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="grid-rule" aria-hidden="true" />
      </div>
    </section>
  );
}
