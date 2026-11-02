/**
 * Catálogo de productos de QBocados — única fuente de verdad del menú.
 * La fotografía real de producto se debe añadir a /public/productos y
 * referenciarla en el campo `image`; mientras no exista, la tarjeta usa
 * la lámina SVG de la marca.
 *
 * Nota: extensión .tsx porque `icon` contiene JSX.
 */
import type { ReactNode } from "react";

export interface Product {
  name: string;
  description: string;
  price: number;
  tag?: string;
  g1: string;
  g2: string;
  icon: ReactNode;
  /** URL (o ruta /public) de la fotografía real cuando exista. */
  image?: string;
  alt: string;
}

export const products: Product[] = [
  {
    name: "Empanaditas Hawaianas de Pollo",
    description: "Producto por encargo relleno de pollo, piña y salsa hawaiana.",
    price: 11.9,
    tag: "Por encargo",
    g1: "#FFE066",
    g2: "#FF9F45",
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        <path d="M8 44 A24 20 0 0 1 56 44 Z" />
        <path
          d="M15 40 A17 15 0 0 1 49 40"
          fill="none"
          stroke="rgba(255,255,255,.6)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.1 6"
        />
      </svg>
    ),
    alt: "Lámina editorial de empanaditas hawaianas de pollo QBocados",
  },
  {
    name: "Deditos de Queso",
    description: "Producto por encargo rebozado con queso fundente en el interior.",
    price: 8.9,
    g1: "#FFF3B0",
    g2: "#FFB25E",
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        <rect x="14" y="24" width="36" height="16" rx="8" />
      </svg>
    ),
    alt: "Lámina editorial de deditos de queso QBocados",
  },
  {
    name: "Deditos de Queso con Bocadillo",
    description: "Producto por encargo de queso con bocadillo para picoteo.",
    price: 9.9,
    g1: "#FFD97D",
    g2: "#FF8C42",
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        <path d="M16 30h28v10a8 8 0 0 1-8 8h-12a8 8 0 0 1-8-8z" />
        <rect x="16" y="34" width="32" height="5" rx="2.5" fill="rgba(0,0,0,.18)" />
      </svg>
    ),
    alt: "Lámina editorial de deditos de queso con bocadillo QBocados",
  },
  {
    name: "Salchurrollos",
    description: "Producto por encargo artesanal con salchicha y especias.",
    price: 7.9,
    tag: "Por encargo",
    g1: "#FFE08A",
    g2: "#FF9A3C",
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        <ellipse cx="32" cy="22" rx="14" ry="6" />
        <path d="M18 22v20c0 3.3 6.3 6 14 6s14-2.7 14-6V22" />
      </svg>
    ),
    alt: "Lámina editorial de salchurrollos QBocados",
  },
  {
    name: "Alitas BBQ",
    description: "Producto por encargo marinado a la barbacoa con especias.",
    price: 12.9,
    tag: "Bestseller",
    g1: "#FFC48C",
    g2: "#FF7A3C",
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        <path d="M6 34c0-12 8-20 20-22 8-1.5 15 1 17 8 2 6 6 11 12 13 8 2.5 10 9.5 8 17-2 7.5-8 12-17 12-7 0-13-3.5-16-9z" />
      </svg>
    ),
    alt: "Lámina editorial de alitas BBQ QBocados",
  },
  {
    name: "Croquetas de Jamón",
    description: "Producto por encargo con bechamel artesanal e interior cremoso.",
    price: 10.9,
    g1: "#FFE3A3",
    g2: "#FFB266",
    icon: (
      <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        <rect x="12" y="20" width="40" height="26" rx="7" />
        <path d="M18 31h28M18 39h28" stroke="rgba(0,0,0,.2)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    alt: "Lámina editorial de croquetas de jamón QBocados",
  },
];

/** Nombres de producto para la cinta marquee del hero. */
export const productNames = products.map((p) => p.name);
