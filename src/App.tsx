import { useCallback, useEffect, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { isSiteUrlPlaceholder, isWhatsAppPlaceholder } from "./config/business";
import { getProductById } from "./data/products";
import { useCart } from "./hooks/useCart";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Faq from "./components/Faq";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import CartDrawer from "./components/cart/CartDrawer";
import Toast from "./components/Toast";

interface ToastState {
  id: number;
  message: string;
}

export default function App() {
  const { details, count, add, increment, decrement, remove, clear } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [progress, setProgress] = useState(0);
  const toastId = useRef(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? (window.scrollY / max) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, value)));
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    if (isWhatsAppPlaceholder) {
      console.warn(
        "[QBocados] El número de WhatsApp es un marcador de posición. Edita src/config/business.ts antes de publicar.",
      );
    }
    if (isSiteUrlPlaceholder) {
      console.warn(
        "[QBocados] La URL canónica es un marcador de posición. Edita business.siteUrl, index.html, robots.txt y sitemap.xml al desplegar.",
      );
    }
  }, []);

  const showToast = useCallback((message: string) => {
    toastId.current += 1;
    setToast({ id: toastId.current, message });
  }, []);

  const openCart = useCallback(() => {
    setToast(null);
    setCartOpen(true);
  }, []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const handleAdd = useCallback(
    (productId: string) => {
      add(productId);
      const product = getProductById(productId);
      showToast(
        product ? `Añadido a la cesta: ${product.name}` : "Añadido a la cesta",
      );
    },
    [add, showToast],
  );

  const handleClear = useCallback(() => {
    clear();
    showToast("Cesta vaciada.");
  }, [clear, showToast]);

  const handleSent = useCallback(() => {
    showToast("Pedido preparado en WhatsApp. Confírmalo allí.");
  }, [showToast]);

  const handleGoToMenu = useCallback(() => {
    setCartOpen(false);
    window.setTimeout(() => {
      const menu = document.getElementById("menu");
      if (!menu) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      menu.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, 120);
  }, []);

  const cartLabel =
    count > 0
      ? `Abrir cesta, ${count} ${count === 1 ? "producto" : "productos"}`
      : "Abrir cesta vacía";

  return (
    <MotionConfig reducedMotion="user">
      <a href="#contenido" className="skip-link">
        Saltar al contenido principal
      </a>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <Navbar cartCount={count} cartOpen={cartOpen} onOpenCart={openCart} />

      <main id="contenido" tabIndex={-1}>
        <Hero />
        <MenuSection onAdd={handleAdd} />
        <Features />
        <HowItWorks />
        <Faq />
        <Cta />
      </main>

      <Footer />

      <button
        type="button"
        className="cart-fab"
        onClick={openCart}
        aria-label={cartLabel}
        aria-haspopup="dialog"
        aria-controls="cart-drawer"
        aria-expanded={cartOpen}
      >
        <ShoppingBag aria-hidden="true" />
        {count > 0 ? (
          <span className="cart-fab-count" aria-hidden="true">
            {count > 99 ? "99+" : count}
          </span>
        ) : null}
      </button>

      <CartDrawer
        open={cartOpen}
        items={details}
        onClose={closeCart}
        onIncrement={increment}
        onDecrement={decrement}
        onRemove={remove}
        onClear={handleClear}
        onGoToMenu={handleGoToMenu}
        onSent={handleSent}
      />

      <Toast message={cartOpen ? null : (toast?.message ?? null)} />
    </MotionConfig>
  );
}
