import { useEffect, useRef, useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";

interface OrderSentProps {
  whatsappUrl: string;
  onClear: () => void;
  onKeepShopping: () => void;
  onReviewCart: () => void;
}

export default function OrderSent({
  whatsappUrl,
  onClear,
  onKeepShopping,
  onReviewCart,
}: OrderSentProps) {
  const [confirmingClear, setConfirmingClear] = useState(false);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (confirmingClear) confirmButtonRef.current?.focus();
  }, [confirmingClear]);

  return (
    <div className="sent-panel">
      <span className="sent-icon" aria-hidden="true">
        <CheckCircle2 />
      </span>
      <h3>Tu pedido está listo en WhatsApp</h3>
      <p>
        Revisa el mensaje y pulsa <strong>enviar</strong> en WhatsApp. Te
        responderemos para confirmar disponibilidad, valor final y entrega.
      </p>

      <a
        className="btn btn-red btn-block"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle aria-hidden="true" />
        Volver a abrir WhatsApp
      </a>

      <button type="button" className="btn btn-outline btn-block" onClick={onKeepShopping}>
        Seguir explorando
      </button>

      <p className="sent-note">
        Tu cesta sigue guardada hasta que decidas vaciarla.
      </p>

      {confirmingClear ? (
        <div className="confirm-clear" role="group" aria-label="Confirmar vaciado de cesta">
          <p>¿Seguro que quieres vaciar la cesta? No se puede deshacer.</p>
          <div>
            <button
              ref={confirmButtonRef}
              type="button"
              className="btn btn-red btn-sm"
              onClick={onClear}
            >
              Sí, vaciar
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => setConfirmingClear(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="text-link"
          onClick={() => setConfirmingClear(true)}
        >
          Ya envié mi pedido · Vaciar cesta
        </button>
      )}

      <button type="button" className="text-link sent-review" onClick={onReviewCart}>
        Revisar mi cesta
      </button>
    </div>
  );
}
