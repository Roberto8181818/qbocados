import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { business } from "../../config/business";
import type { DetailedCartLine } from "../../lib/cart";
import { formatPrice } from "../../lib/format";
import { buildOrderMessage } from "../../lib/order";
import {
  cleanCustomer,
  emptyCustomer,
  validateCustomer,
  type CustomerData,
  type CustomerErrors,
  type CustomerField,
} from "../../lib/validation";
import { whatsappLink } from "../../lib/whatsapp";
import CartLine from "./CartLine";
import CheckoutForm from "./CheckoutForm";
import OrderReview from "./OrderReview";
import OrderSent from "./OrderSent";
import ProductIllustration from "../ProductIllustration";

type CartStep = "cart" | "details" | "review" | "sent";

interface CartDrawerProps {
  open: boolean;
  items: readonly DetailedCartLine[];
  onClose: () => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
  onGoToMenu: () => void;
  onSent: () => void;
}

const stepTitles: Record<CartStep, string> = {
  cart: "Tu cesta",
  details: "Tus datos",
  review: "Revisa tu pedido",
  sent: "Pedido en WhatsApp",
};

const stepSubtitles: Record<CartStep, string> = {
  cart: "Paso 1 de 3 · Revisa cantidades y total.",
  details: "Paso 2 de 3 · Datos de entrega",
  review: "Paso 3 de 3 · Confirma antes de enviar",
  sent: "Último paso: pulsar enviar en WhatsApp",
};

const checkoutSteps = [
  { id: "cart", label: "Cesta" },
  { id: "details", label: "Datos" },
  { id: "review", label: "Revisión" },
] as const;

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function CartDrawer({
  open,
  items,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
  onGoToMenu,
  onSent,
}: CartDrawerProps) {
  const [step, setStep] = useState<CartStep>("cart");
  const [customer, setCustomer] = useState<CustomerData>(emptyCustomer);
  const [errors, setErrors] = useState<CustomerErrors>({});

  const panelRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const count = items.reduce((total, item) => total + item.qty, 0);
  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);

  const whatsappUrl = useMemo(() => {
    const lines = items.map(({ product, qty }) => ({ id: product.id, qty }));
    return whatsappLink(buildOrderMessage({ lines, customer }));
  }, [items, customer]);

  useEffect(() => {
    if (!open) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const panel = panelRef.current;

    const getFocusable = () => {
      if (!panel) return [];
      return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (element) => element.offsetParent !== null,
      );
    };

    const frame = window.requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) {
        event.preventDefault();
        return;
      }

      if (!panel?.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === first || document.activeElement === headingRef.current) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    headingRef.current?.focus({ preventScroll: true });
    bodyRef.current?.scrollTo({ top: 0 });
  }, [step, open]);

  useEffect(() => {
    if (open) return;
    const timer = window.setTimeout(() => {
      setStep("cart");
      setErrors({});
    }, 450);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (items.length === 0 && step !== "cart") {
      setStep("cart");
      setErrors({});
    }
  }, [items.length, step]);

  const handleChange = (field: CustomerField, value: string) => {
    setCustomer((current) => ({ ...current, [field]: value }));
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current,
    );
  };

  const handleDetailsSubmit = (): CustomerErrors => {
    const clean = cleanCustomer(customer);
    const nextErrors = validateCustomer(clean);

    setCustomer(clean);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) setStep("review");
    return nextErrors;
  };

  const handleSend = () => {
    const opened = window.open(whatsappUrl, "_blank");
    if (opened) {
      opened.opener = null;
    } else {
      window.location.assign(whatsappUrl);
    }

    setStep("sent");
    onSent();
  };

  const handleClear = () => {
    onClear();
    setStep("cart");
  };

  const stepIndex = step === "cart" ? 0 : step === "details" ? 1 : 2;

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="cart-overlay"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />

          <motion.aside
            id="cart-drawer"
            className="cart"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ duration: 0.38, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <header className="cart-head">
              <div className="cart-head-title">
                {step === "details" || step === "review" ? (
                  <button
                    type="button"
                    className="cart-back"
                    onClick={() => setStep(step === "review" ? "details" : "cart")}
                    aria-label="Volver al paso anterior"
                  >
                    <ArrowLeft aria-hidden="true" />
                  </button>
                ) : null}
                <div>
                  <h2 id="cart-title" ref={headingRef} tabIndex={-1}>
                    {stepTitles[step]}
                  </h2>
                  <p className="cart-subtitle">{stepSubtitles[step]}</p>
                </div>
              </div>

              <button
                type="button"
                className="cart-close"
                onClick={onClose}
                aria-label="Cerrar cesta"
              >
                <X aria-hidden="true" />
              </button>
            </header>

            {step !== "sent" ? (
              <ol className="checkout-steps" aria-label="Progreso del pedido">
                {checkoutSteps.map((checkoutStep, index) => {
                  const state =
                    index < stepIndex ? "done" : index === stepIndex ? "current" : "todo";
                  return (
                    <li
                      key={checkoutStep.id}
                      className={`checkout-step ${state}`}
                      aria-current={state === "current" ? "step" : undefined}
                    >
                      <span className="checkout-step-num" aria-hidden="true">
                        {state === "done" ? <Check /> : index + 1}
                      </span>
                      {checkoutStep.label}
                    </li>
                  );
                })}
              </ol>
            ) : null}

            <div className="cart-body" ref={bodyRef}>
              {step === "cart" ? (
                items.length === 0 ? (
                  <div className="cart-empty">
                    <ProductIllustration kind="empanada" className="cart-empty-art" />
                    <h3>Tu cesta está vacía</h3>
                    <p>Elige tus pasabocas favoritas y vuelve cuando quieras.</p>
                    <button type="button" className="btn btn-primary" onClick={onGoToMenu}>
                      Ver el catálogo
                    </button>
                  </div>
                ) : (
                  <ul className="cart-lines">
                    {items.map((item) => (
                      <CartLine
                        key={item.product.id}
                        item={item}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                        onRemove={onRemove}
                      />
                    ))}
                  </ul>
                )
              ) : null}

              {step === "details" ? (
                <CheckoutForm
                  value={customer}
                  errors={errors}
                  onChange={handleChange}
                  onSubmit={handleDetailsSubmit}
                  onBack={() => setStep("cart")}
                />
              ) : null}

              {step === "review" ? (
                <OrderReview
                  items={items}
                  subtotal={subtotal}
                  customer={customer}
                  onEditCart={() => setStep("cart")}
                  onEditCustomer={() => setStep("details")}
                  onSend={handleSend}
                />
              ) : null}

              {step === "sent" ? (
                <OrderSent
                  whatsappUrl={whatsappUrl}
                  onClear={handleClear}
                  onKeepShopping={onGoToMenu}
                  onReviewCart={() => setStep("cart")}
                />
              ) : null}
            </div>

            {step === "cart" && items.length > 0 ? (
              <footer className="cart-foot">
                <div className="cart-subtotal">
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <p className="cart-foot-note">
                  {count} {count === 1 ? "producto" : "productos"} · {business.orderNote}
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => setStep("details")}
                >
                  Continuar con mis datos
                  <ArrowRight aria-hidden="true" />
                </button>
              </footer>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
