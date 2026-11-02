/**
 * Catálogo de QBocados — única fuente de verdad de productos y precios.
 *
 * ⚠️ PRECIOS DE REFERENCIA: los valores en COP son una conversión de la lista
 * demo anterior (EUR) y NO son la lista de precios definitiva. Antes de
 * publicar, reemplázalos y elimina la nota de "precio de referencia" en
 * `src/config/business.ts`.
 *
 * No se añaden productos, ingredientes, presentaciones ni disponibilidad que
 * no existieran ya en el negocio.
 */

export type ProductCategory = "empanadas" | "quesos" | "aperitivos";
export type CategoryFilter = ProductCategory | "todos";
export type IllustrationKind =
  | "empanada"
  | "cheese"
  | "cheese-bocadillo"
  | "roll"
  | "wings"
  | "croquette";

export interface Product {
  id: string;
  name: string;
  description: string;
  /** Precio de referencia en COP. */
  price: number;
  presentation: string;
  availability: string;
  category: ProductCategory;
  kind: IllustrationKind;
  /** Fotografía real opcional; si existe sustituye a la ilustración. */
  image?: string;
  alt: string;
}

export const productCategories: ReadonlyArray<{
  id: CategoryFilter;
  label: string;
}> = [
  { id: "todos", label: "Todos" },
  { id: "empanadas", label: "Empanadas" },
  { id: "quesos", label: "Quesos" },
  { id: "aperitivos", label: "Aperitivos" },
];

export const products: readonly Product[] = [
  {
    id: "empanaditas-hawaianas-pollo",
    name: "Empanaditas Hawaianas de Pollo",
    description:
      "Empanaditas rellenas de pollo, piña y salsa hawaiana. Se preparan por encargo.",
    price: 51000,
    presentation: "Cantidad a confirmar",
    availability: "Por encargo",
    category: "empanadas",
    kind: "empanada",
    alt: "Ilustración de empanaditas hawaianas de pollo de QBocados",
  },
  {
    id: "deditos-queso",
    name: "Deditos de Queso",
    description:
      "Deditos rebozados con queso fundente en el interior. Se preparan por encargo.",
    price: 38000,
    presentation: "Cantidad a confirmar",
    availability: "Por encargo",
    category: "quesos",
    kind: "cheese",
    alt: "Ilustración de deditos de queso de QBocados",
  },
  {
    id: "deditos-queso-bocadillo",
    name: "Deditos de Queso con Bocadillo",
    description:
      "Deditos de queso con bocadillo para picar y compartir. Se preparan por encargo.",
    price: 43000,
    presentation: "Cantidad a confirmar",
    availability: "Por encargo",
    category: "quesos",
    kind: "cheese-bocadillo",
    alt: "Ilustración de deditos de queso con bocadillo de QBocados",
  },
  {
    id: "salchurrollos",
    name: "Salchurrollos",
    description:
      "Rollos artesanales con salchicha y especias. Se preparan por encargo.",
    price: 34000,
    presentation: "Cantidad a confirmar",
    availability: "Por encargo",
    category: "aperitivos",
    kind: "roll",
    alt: "Ilustración de salchurrollos artesanales de QBocados",
  },
  {
    id: "alitas-bbq",
    name: "Alitas BBQ",
    description:
      "Alitas marinadas a la barbacoa con especias. Se preparan por encargo.",
    price: 55000,
    presentation: "Cantidad a confirmar",
    availability: "Por encargo",
    category: "aperitivos",
    kind: "wings",
    alt: "Ilustración de alitas BBQ de QBocados",
  },
  {
    id: "croquetas-jamon",
    name: "Croquetas de Jamón",
    description:
      "Croquetas con bechamel artesanal e interior cremoso. Se preparan por encargo.",
    price: 47000,
    presentation: "Cantidad a confirmar",
    availability: "Por encargo",
    category: "aperitivos",
    kind: "croquette",
    alt: "Ilustración de croquetas de jamón de QBocados",
  },
];

const productsById = new Map(products.map((product) => [product.id, product]));

export function getProductById(id: string): Product | undefined {
  return productsById.get(id);
}

export function getCategoryLabel(category: ProductCategory): string {
  return productCategories.find((item) => item.id === category)?.label ?? category;
}

export function countProductsByCategory(category: CategoryFilter): number {
  if (category === "todos") return products.length;
  return products.filter((product) => product.category === category).length;
}

/** Nombres de producto para la cinta marquee del hero. */
export const productNames = products.map((product) => product.name);
