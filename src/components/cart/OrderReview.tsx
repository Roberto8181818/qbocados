import { MessageCircle } from "lucide-react";
import { business } from "../../config/business";
import type { DetailedCartLine } from "../../lib/cart";
import { formatPrice } from "../../lib/format";
import type { CustomerData } from "../../lib/validation";

interface OrderReviewProps {
  items: readonly DetailedCartLine[];
  subtotal: number;
  customer: CustomerData;
  onEditCart: () => void;
  onEditCustomer: () => void;
  onSend: () => void;
}

export default function OrderReview({
  items,
  subtotal,
  customer,
  onEditCart,
  onEditCustomer,
  onSend,
}: OrderReviewProps) {
  return (
    <div className="review">
      <p className="cart-step-intro">
        Revisa el pedido y tus datos antes de abrir WhatsApp.
      </p>

      <div className="summary-head">
        <h3>Tu pedido</h3>
        <button type="button" className="text-link" onClick={onEditCart}>
          Editar cesta
        </button>
      </div>

      <ul className="summary-list">
        {items.map(({ product, qty, unitPrice, lineTotal }) => (
          <li key={product.id}>
            <span className="summary-qty" aria-hidden="true">
              {qty}×
            </span>
            <span className="summary-name">
              {product.name}
              <small>{formatPrice(unitPrice)} c/u</small>
            </span>
            <strong>{formatPrice(lineTotal)}</strong>
          </li>
        ))}
      </ul>

      <div className="summary-total">
        <span>Total de referencia</span>
        <strong>{formatPrice(subtotal)}</strong>
      </div>

      <div className="review-block">
        <div className="summary-head">
          <h3>Datos de entrega</h3>
          <button type="button" className="text-link" onClick={onEditCustomer}>
            Editar
          </button>
        </div>
        <dl className="review-data">
          <div>
            <dt>Nombre</dt>
            <dd>{customer.name}</dd>
          </div>
          <div>
            <dt>Teléfono</dt>
            <dd>{customer.phone}</dd>
          </div>
          <div>
            <dt>Dirección</dt>
            <dd>{customer.address}</dd>
          </div>
          {customer.references ? (
            <div>
              <dt>Referencias</dt>
              <dd>{customer.references}</dd>
            </div>
          ) : null}
          {customer.notes ? (
            <div>
              <dt>Notas</dt>
              <dd>{customer.notes}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      <div className="review-note" role="note">
        {business.orderNote}
      </div>

      <button type="button" className="btn btn-primary btn-block" onClick={onSend}>
        <MessageCircle aria-hidden="true" />
        Abrir WhatsApp y enviar pedido
      </button>
      <p className="form-legal">
        Se abrirá WhatsApp con el pedido escrito. Debes pulsar enviar allí para
        que lo recibamos.
      </p>
    </div>
  );
}
