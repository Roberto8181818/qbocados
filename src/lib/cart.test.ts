import { describe, expect, it } from "vitest";
import type { Product } from "../data/products";
import {
  CART_STORAGE_KEY,
  addToCart,
  changeCartQty,
  clampQty,
  clearCartStorage,
  getCartCount,
  getCartDetails,
  getCartSubtotal,
  normalizeCart,
  parseStoredCart,
  readCart,
  removeFromCart,
  serializeCart,
  writeCart,
  type CartLine,
} from "./cart";

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

class MemoryStorage {
  private values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }
}

class BrokenStorage extends MemoryStorage {
  override getItem(): never {
    throw new Error("storage no disponible");
  }
  override setItem(): never {
    throw new Error("storage lleno");
  }
  override removeItem(): never {
    throw new Error("storage no disponible");
  }
}

describe("clampQty", () => {
  it("limita las cantidades al rango permitido", () => {
    expect(clampQty(0)).toBe(1);
    expect(clampQty(-8)).toBe(1);
    expect(clampQty(4.9)).toBe(4);
    expect(clampQty(100)).toBe(99);
  });

  it("usa el mínimo para valores no finitos", () => {
    expect(clampQty(Number.NaN)).toBe(1);
    expect(clampQty(Number.POSITIVE_INFINITY)).toBe(1);
  });
});

describe("normalizeCart", () => {
  it("descarta entradas que no son una lista", () => {
    expect(normalizeCart(null)).toEqual([]);
    expect(normalizeCart("no-es-un-carrito")).toEqual([]);
    expect(normalizeCart({ id: "a", qty: 1 })).toEqual([]);
  });

  it("limpia datos corruptos, fusiona duplicados y limita cantidades", () => {
    const result = normalizeCart(
      [
        { id: "a", qty: 2 },
        { id: "a", qty: 3 },
        { id: "b", qty: "4" },
        { id: "b", qty: 200 },
        { id: "desconocido", qty: 1 },
        { id: "a", qty: -2 },
        { id: "b", qty: 0 },
        { id: "a", qty: "muchas" },
        null,
        12,
      ],
      catalog,
    );

    expect(result).toEqual([
      { id: "a", qty: 5 },
      { id: "b", qty: 99 },
    ]);
  });

  it("no supera el máximo al fusionar duplicados", () => {
    expect(normalizeCart([{ id: "a", qty: 60 }, { id: "a", qty: 60 }], catalog)).toEqual([
      { id: "a", qty: 99 },
    ]);
  });
});

describe("parseStoredCart", () => {
  it("devuelve una lista vacía si no hay datos o están corruptos", () => {
    expect(parseStoredCart(null, catalog)).toEqual([]);
    expect(parseStoredCart("{no-es-json", catalog)).toEqual([]);
    expect(parseStoredCart('"texto"', catalog)).toEqual([]);
  });

  it("normaliza el JSON guardado", () => {
    expect(
      parseStoredCart('[{"id":"a","qty":2},{"id":"x","qty":1}]', catalog),
    ).toEqual([{ id: "a", qty: 2 }]);
  });
});

describe("operaciones del carrito", () => {
  it("serializa solo id y cantidad, nunca precios", () => {
    expect(serializeCart([{ id: "a", qty: 2 }])).toBe('[{"id":"a","qty":2}]');
  });

  it("añade productos y aumenta la cantidad si ya existen", () => {
    const first = addToCart([], "a", catalog);
    const second = addToCart(first, "a", catalog);

    expect(first).toEqual([{ id: "a", qty: 1 }]);
    expect(second).toEqual([{ id: "a", qty: 2 }]);
  });

  it("ignora productos que no están en el catálogo", () => {
    const lines: CartLine[] = [{ id: "a", qty: 2 }];
    expect(addToCart(lines, "desconocido", catalog)).toEqual(lines);
  });

  it("suma y resta sin eliminar la línea al llegar al mínimo", () => {
    expect(changeCartQty([{ id: "a", qty: 1 }], "a", -1)).toEqual([{ id: "a", qty: 1 }]);
    expect(changeCartQty([{ id: "a", qty: 99 }], "a", 1)).toEqual([{ id: "a", qty: 99 }]);
    expect(changeCartQty([{ id: "a", qty: 2 }], "a", 1.9)).toEqual([{ id: "a", qty: 3 }]);
    expect(changeCartQty([{ id: "a", qty: 2 }], "a", 0)).toEqual([{ id: "a", qty: 2 }]);
  });

  it("elimina líneas de forma explícita", () => {
    expect(removeFromCart([{ id: "a", qty: 1 }, { id: "b", qty: 2 }], "a")).toEqual([
      { id: "b", qty: 2 },
    ]);
  });

  it("calcula cantidades, detalles y subtotal", () => {
    const lines: CartLine[] = [
      { id: "a", qty: 2 },
      { id: "b", qty: 3 },
      { id: "desconocido", qty: 9 },
    ];
    const details = getCartDetails(lines, catalog);

    expect(getCartCount(lines)).toBe(14);
    expect(details).toHaveLength(2);
    expect(details[0]).toMatchObject({ qty: 2, unitPrice: 1000, lineTotal: 2000 });
    expect(details[1]).toMatchObject({ qty: 3, unitPrice: 2500, lineTotal: 7500 });
    expect(getCartSubtotal(details)).toBe(9500);
  });
});

describe("persistencia", () => {
  it("guarda, lee y elimina el carrito", () => {
    const storage = new MemoryStorage();

    expect(writeCart([{ id: "a", qty: 2 }], storage)).toBe(true);
    expect(storage.getItem(CART_STORAGE_KEY)).toBe('[{"id":"a","qty":2}]');
    expect(readCart(storage, catalog)).toEqual([{ id: "a", qty: 2 }]);

    expect(clearCartStorage(storage)).toBe(true);
    expect(readCart(storage, catalog)).toEqual([]);
  });

  it("tolera almacenamiento no disponible o con errores", () => {
    const broken = new BrokenStorage();

    expect(readCart(broken, catalog)).toEqual([]);
    expect(writeCart([{ id: "a", qty: 1 }], broken)).toBe(false);
    expect(clearCartStorage(broken)).toBe(false);
  });
});
