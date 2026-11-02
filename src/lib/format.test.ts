import { describe, expect, it } from "vitest";
import { formatPrice, formatQuantity } from "./format";

describe("formatPrice", () => {
  it("formatea valores en COP sin decimales", () => {
    expect(formatPrice(51000)).toBe("$ 51.000");
    expect(formatPrice(0)).toBe("$ 0");
    expect(formatPrice(143000)).toBe("$ 143.000");
  });

  it("redondea valores con decimales", () => {
    expect(formatPrice(51999.6)).toBe("$ 52.000");
  });

  it("devuelve un guion para valores inválidos o negativos", () => {
    expect(formatPrice(-1)).toBe("—");
    expect(formatPrice(Number.NaN)).toBe("—");
    expect(formatPrice(Number.POSITIVE_INFINITY)).toBe("—");
  });
});

describe("formatQuantity", () => {
  it("formatea enteros con separador de miles", () => {
    expect(formatQuantity(0)).toBe("0");
    expect(formatQuantity(12)).toBe("12");
    expect(formatQuantity(1234)).toBe("1.234");
  });

  it("redondea y nunca devuelve negativos", () => {
    expect(formatQuantity(2.6)).toBe("3");
    expect(formatQuantity(-4)).toBe("0");
  });

  it("devuelve 0 para valores no finitos", () => {
    expect(formatQuantity(Number.NaN)).toBe("0");
    expect(formatQuantity(Number.NEGATIVE_INFINITY)).toBe("0");
  });
});
