import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CART_STORAGE_KEY,
  addToCart,
  changeCartQty,
  getCartCount,
  getCartDetails,
  getCartSubtotal,
  readCart,
  removeFromCart,
  writeCart,
  type CartLine,
} from "../lib/cart";

export interface UseCartResult {
  lines: CartLine[];
  details: ReturnType<typeof getCartDetails>;
  count: number;
  subtotal: number;
  add: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

export function useCart(): UseCartResult {
  const [lines, setLines] = useState<CartLine[]>(() => readCart());

  useEffect(() => {
    writeCart(lines);
  }, [lines]);

  // Mantiene la cesta sincronizada si se modifica en otra pestaña.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) setLines(readCart());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const details = useMemo(() => getCartDetails(lines), [lines]);
  const count = useMemo(() => getCartCount(lines), [lines]);
  const subtotal = useMemo(() => getCartSubtotal(details), [details]);

  const add = useCallback((productId: string) => {
    setLines((current) => addToCart(current, productId));
  }, []);

  const increment = useCallback((productId: string) => {
    setLines((current) => changeCartQty(current, productId, 1));
  }, []);

  const decrement = useCallback((productId: string) => {
    setLines((current) => changeCartQty(current, productId, -1));
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((current) => removeFromCart(current, productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  return { lines, details, count, subtotal, add, increment, decrement, remove, clear };
}
