import { products, type Product } from "../data/products";

export interface CartLine {
  id: string;
  qty: number;
}

export interface DetailedCartLine {
  product: Product;
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

export const CART_STORAGE_KEY = "qbocados.cart.v1";
export const MIN_QTY = 1;
export const MAX_QTY = 99;

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseQty(value: unknown): number | null {
  if (typeof value !== "number" && typeof value !== "string") return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < MIN_QTY) return null;
  return clampQty(parsed);
}

export function clampQty(value: number): number {
  if (!Number.isFinite(value)) return MIN_QTY;
  return Math.min(MAX_QTY, Math.max(MIN_QTY, Math.floor(value)));
}

/**
 * Convierte datos no confiables (localStorage, versiones antiguas) en un
 * carrito válido: descarta productos inexistentes, fusiona duplicados y
 * limita cantidades.
 */
export function normalizeCart(
  input: unknown,
  catalog: readonly Product[] = products,
): CartLine[] {
  if (!Array.isArray(input)) return [];

  const validIds = new Set(catalog.map((product) => product.id));
  const quantities = new Map<string, number>();

  for (const raw of input) {
    if (!isRecord(raw)) continue;
    if (typeof raw.id !== "string" || !validIds.has(raw.id)) continue;

    const qty = parseQty(raw.qty);
    if (qty === null) continue;

    const merged = (quantities.get(raw.id) ?? 0) + qty;
    quantities.set(raw.id, Math.min(MAX_QTY, merged));
  }

  return Array.from(quantities, ([id, qty]) => ({ id, qty }));
}

export function parseStoredCart(
  raw: string | null,
  catalog: readonly Product[] = products,
): CartLine[] {
  if (!raw) return [];
  try {
    return normalizeCart(JSON.parse(raw), catalog);
  } catch {
    return [];
  }
}

export function serializeCart(lines: readonly CartLine[]): string {
  return JSON.stringify(lines.map(({ id, qty }) => ({ id, qty })));
}

export function getCartDetails(
  lines: readonly CartLine[],
  catalog: readonly Product[] = products,
): DetailedCartLine[] {
  const byId = new Map(catalog.map((product) => [product.id, product]));

  return lines.flatMap((line) => {
    const product = byId.get(line.id);
    if (!product) return [];
    return [
      {
        product,
        qty: line.qty,
        unitPrice: product.price,
        lineTotal: product.price * line.qty,
      },
    ];
  });
}

export function addToCart(
  lines: readonly CartLine[],
  productId: string,
  catalog: readonly Product[] = products,
): CartLine[] {
  if (!catalog.some((product) => product.id === productId)) return [...lines];

  const existing = lines.find((line) => line.id === productId);
  if (!existing) return [...lines, { id: productId, qty: 1 }];

  return lines.map((line) =>
    line.id === productId ? { ...line, qty: clampQty(line.qty + 1) } : line,
  );
}

/**
 * Suma o resta unidades. No elimina la línea al llegar a 1: eliminar es una
 * acción explícita para evitar pérdidas accidentales.
 */
export function changeCartQty(
  lines: readonly CartLine[],
  productId: string,
  delta: number,
): CartLine[] {
  if (!Number.isFinite(delta) || delta === 0) return [...lines];

  return lines.map((line) =>
    line.id === productId
      ? { ...line, qty: clampQty(line.qty + Math.trunc(delta)) }
      : line,
  );
}

export function removeFromCart(
  lines: readonly CartLine[],
  productId: string,
): CartLine[] {
  return lines.filter((line) => line.id !== productId);
}

export function getCartCount(lines: readonly CartLine[]): number {
  return lines.reduce((total, line) => total + line.qty, 0);
}

export function getCartSubtotal(details: readonly DetailedCartLine[]): number {
  return details.reduce((total, line) => total + line.lineTotal, 0);
}

function resolveStorage(storage?: StorageLike): StorageLike | null {
  if (storage) return storage;
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

export function readCart(
  storage?: StorageLike,
  catalog: readonly Product[] = products,
): CartLine[] {
  try {
    const target = resolveStorage(storage);
    return target ? parseStoredCart(target.getItem(CART_STORAGE_KEY), catalog) : [];
  } catch {
    return [];
  }
}

export function writeCart(lines: readonly CartLine[], storage?: StorageLike): boolean {
  try {
    const target = resolveStorage(storage);
    if (!target) return false;
    target.setItem(CART_STORAGE_KEY, serializeCart(lines));
    return true;
  } catch {
    return false;
  }
}

export function clearCartStorage(storage?: StorageLike): boolean {
  try {
    const target = resolveStorage(storage);
    if (!target) return false;
    target.removeItem(CART_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
