import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";

export interface CartItem {
  name: string;
  price: number;
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onInc: (name: string) => void;
  onDec: (name: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  open,
  items,
  onClose,
  onInc,
  onDec,
  onCheckout,
}: CartDrawerProps) {
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="cart-overlay open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />
          <motion.aside
            className="cart open"
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ duration: 0.38, ease: [0.22, 0.61, 0.36, 1] }}
            aria-label="Carrito de la compra"
          >
            <div className="cart-head">
              <h3>Tu cesta</h3>
              <button type="button" className="cart-close" onClick={onClose} aria-label="Cerrar carrito">
                <X aria-hidden="true" />
              </button>
            </div>

            <div className="cart-items">
              {items.length === 0 ? (
                <div className="cart-empty">
                  Tu cesta está vacía.
                  <br />
                  Añade tus pasabocas favoritas.
                </div>
              ) : (
                items.map((item) => (
                  <div className="cart-item" key={item.name}>
                    <span className="cart-item-icon">
                      <ShoppingCart aria-hidden="true" />
                    </span>
                    <div className="cart-item-info">
                      <strong>{item.name}</strong>
                      <span>{item.price.toFixed(2).replace(".", ",")} € / unidad</span>
                    </div>
                    <div className="qty">
                      <button type="button" onClick={() => onDec(item.name)} aria-label="Quitar una unidad">
                        <Minus size={13} aria-hidden="true" />
                      </button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => onInc(item.name)} aria-label="Añadir una unidad">
                        <Plus size={13} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="cart-foot">
              <div className="cart-total">
                <span>Total</span>
                <strong>{total.toFixed(2).replace(".", ",")} €</strong>
              </div>
              <button type="button" className="btn btn-red btn-block" onClick={onCheckout}>
                Finalizar pedido
              </button>
              <p className="cart-note">Envío gratis en pedidos desde 35&nbsp;€</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
