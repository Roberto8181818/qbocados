import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle, Plus } from "lucide-react";
import { business } from "../config/business";
import {
  countProductsByCategory,
  getCategoryLabel,
  productCategories,
  products,
  type CategoryFilter,
} from "../data/products";
import { formatPrice } from "../lib/format";
import { productEnquiryMessage, whatsappLink } from "../lib/whatsapp";
import ProductIllustration from "./ProductIllustration";

interface MenuSectionProps {
  onAdd: (productId: string) => void;
}

export default function MenuSection({ onAdd }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("todos");
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(
    () =>
      activeCategory === "todos"
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    if (!addedId) return;
    const timer = window.setTimeout(() => setAddedId(null), 1600);
    return () => window.clearTimeout(timer);
  }, [addedId]);

  const handleAdd = (productId: string) => {
    onAdd(productId);
    setAddedId(productId);
  };

  const activeLabel =
    productCategories.find((category) => category.id === activeCategory)?.label ??
    "Todos";

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
          <span className="eyebrow">Nuestro catálogo</span>
          <h2>Para picar, compartir y repetir</h2>
          <p>
            Recetas de casa disponibles por encargo. Elige tus favoritas, añádelas
            a la cesta y confirma tu pedido por WhatsApp.
          </p>
        </motion.div>

        <div className="menu-toolbar">
          <div className="filter-list" role="group" aria-label="Filtrar catálogo por categoría">
            {productCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`filter-btn${
                  activeCategory === category.id ? " is-active" : ""
                }`}
                aria-pressed={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
                <span className="filter-count" aria-hidden="true">
                  {countProductsByCategory(category.id)}
                </span>
              </button>
            ))}
          </div>
          <p className="menu-price-note">{business.priceNote}</p>
        </div>

        <p className="sr-only" aria-live="polite">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "producto" : "productos"} en {activeLabel}.
        </p>

        <motion.div
          key={activeCategory}
          className="product-grid"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {filteredProducts.map((product, index) => {
            const added = addedId === product.id;

            return (
              <article className="product" key={product.id}>
                <div className="product-media">
                  <span className="product-num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="product-badge">Por encargo</span>

                  {product.image ? (
                    <img
                      className="product-photo"
                      src={product.image}
                      alt={product.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <ProductIllustration kind={product.kind} className="product-art" />
                  )}
                </div>

                <div className="product-body">
                  <span className="product-cat">{getCategoryLabel(product.category)}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>

                  <dl className="product-meta">
                    <div>
                      <dt>Presentación</dt>
                      <dd>{product.presentation}</dd>
                    </div>
                    <div>
                      <dt>Disponibilidad</dt>
                      <dd>{product.availability}</dd>
                    </div>
                  </dl>

                  <div className="product-foot">
                    <div className="price-block">
                      <span className="price">{formatPrice(product.price)}</span>
                      <span className="price-unit">
                        {business.currency} · referencia
                      </span>
                    </div>

                    <div className="product-actions">
                      <button
                        type="button"
                        className={`btn-add${added ? " is-added" : ""}`}
                        aria-label={
                          added
                            ? `${product.name} añadido a la cesta`
                            : `Añadir ${product.name} a la cesta`
                        }
                        onClick={() => handleAdd(product.id)}
                      >
                        {added ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
                        <span>{added ? "Añadido" : "Añadir"}</span>
                      </button>

                      <a
                        className="icon-btn"
                        href={whatsappLink(productEnquiryMessage(product.name))}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Consultar ${product.name} por WhatsApp`}
                      >
                        <MessageCircle aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>

        <div className="grid-rule" aria-hidden="true" />
      </div>
    </section>
  );
}
