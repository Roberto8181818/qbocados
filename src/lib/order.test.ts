import { describe, expect, it } from "vitest";
import type { Product } from "../data/products";
import type { CartLine } from "./cart";
import { buildOrderMessage } from "./order";
import type { CustomerData } from "./validation";

function makeProduct(id: string, price: number): Product {
  return {
    id,
    name: `Producto ${id}`,
    description: "Descripción de prueba",
    price,
    presentation: "Por encargo",
    availability: "Disponible",
    category: "empanadas",
    kind: "empanada",
    alt: "Ilustración de prueba",
  };
}

const catalog: readonly Product[] = [makeProduct("a", 1000), makeProduct("b", 2500)];

const customer: CustomerData = {
  name: "María Pérez",
  phone: "300 123 4567",
  address: "Calle 10 # 20-30, Bogotá",
  references: "Torre 2, apartamento 301",
  notes: "Cantidades para 8 personas",
};

const lines: CartLine[] = [
  { id: "a", qty: 2 },
  { id: "b", qty: 3 },
];

describe("buildOrderMessage", () => {
  it("incluye productos, cantidades, precios y total", () => {
    const message = buildOrderMessage({ lines, customer, catalog });

    expect(message).toContain("• 2 × Producto a — $ 2.000 ($ 1.000 c/u)");
    expect(message).toContain("• 3 × Producto b — $ 7.500 ($ 2.500 c/u)");
    expect(message).toContain("Total de productos: $ 9.500 COP");
  });

  it("incluye los datos de entrega y las notas", () => {
    const message = buildOrderMessage({ lines, customer, catalog });

    expect(message).toContain("Domicilios en Barranquilla · Gratis en Alameda del Río");
    expect(message).toContain("Nombre: María Pérez");
    expect(message).toContain("Teléfono: 300 123 4567");
    expect(message).toContain("Dirección: Calle 10 # 20-30, Bogotá");
    expect(message).toContain("Referencias: Torre 2, apartamento 301");
    expect(message).toContain("Notas: Cantidades para 8 personas");
  });

  it("omite referencias y notas cuando están vacías", () => {
    const message = buildOrderMessage({
      lines,
      customer: { ...customer, references: "", notes: "" },
      catalog,
    });

    expect(message).not.toContain("Referencias:");
    expect(message).not.toContain("Notas:");
  });

  it("aclara que el pedido se confirma por WhatsApp", () => {
    const message = buildOrderMessage({ lines, customer, catalog });

    expect(message).toContain(
      "la disponibilidad y la entrega se confirman por WhatsApp",
    );
    expect(message.toLowerCase()).not.toContain("pedido confirmado");
  });

  it("devuelve un mensaje genérico si la cesta está vacía", () => {
    expect(buildOrderMessage({ lines: [], customer, catalog })).toBe(
      "Hola QBocados, quiero hacer un pedido.",
    );
  });

  it("ignora líneas de productos que ya no existen", () => {
    const message = buildOrderMessage({
      lines: [...lines, { id: "desconocido", qty: 1 }],
      customer,
      catalog,
    });

    expect(message).toContain("Producto a");
    expect(message).not.toContain("desconocido");
  });
});
