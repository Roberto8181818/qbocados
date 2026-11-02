import { Minus, Plus, Trash2 } from "lucide-react";
import ProductIllustration from "../ProductIllustration";
import { MAX_QTY, type DetailedCartLine } from "../../lib/cart";
import { formatPrice } from "../../lib/format";

interface CartLineProps {
  item: DetailedCartLine;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export default function CartLine({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartLineProps) {
  const { product, qty, unitPrice, lineTotal } = item;

  return (
    <li className="cart-line">
      <span className="cart-line-art" aria-hidden="true">
        <ProductIllustration kind={product.kind} plate={false} />
      </span>

      <div className="cart-line-body">
        <div className="cart-line-top">
          <div>
            <h3>{product.name}</h3>
            <p>{product.presentation}</p>
          </div>
          <button
            type="button"
            className="cart-remove"
            onClick={() => onRemove(product.id)}
            aria-label={`Eliminar ${product.name} de la cesta`}
          >
            <Trash2 aria-hidden="true" />
          </button>
        </div>

        <div className="cart-line-bottom">
          <div className="qty" role="group" aria-label={`Cantidad de ${product.name}`}>
            <button
              type="button"
              onClick={() => onDecrement(product.id)}
              disabled={qty <= 1}
              aria-label={`Quitar una unidad de ${product.name}`}
            >
              <Minus aria-hidden="true" />
            </button>
            <span aria-live="polite" aria-atomic="true">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => onIncrement(product.id)}
              disabled={qty >= MAX_QTY}
              aria-label={`Añadir una unidad de ${product.name}`}
            >
              <Plus aria-hidden="true" />
            </button>
          </div>

          <div className="cart-line-total">
            <strong>{formatPrice(lineTotal)}</strong>
            <small>{formatPrice(unitPrice)} c/u</small>
          </div>
        </div>
      </div>
    </li>
  );
}
