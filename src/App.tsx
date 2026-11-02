import { useCallback, useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { whatsappLink } from "./whatsapp";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import CartDrawer, { type CartItem } from "./components/CartDrawer";
import Toast from "./components/Toast";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const addItem = useCallback((name: string, price: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing) {
        return prev.map((i) => (i.name === name ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { name, price, qty: 1 }];
    });
    setToast("Añadido a tu cesta");
  }, []);

  const inc = useCallback((name: string) => {
    setCart((prev) => prev.map((i) => (i.name === name ? { ...i, qty: i.qty + 1 } : i)));
  }, []);

  const dec = useCallback((name: string) => {
    setCart((prev) =>
      prev.map((i) => (i.name === name ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0)
    );
  }, []);

  const checkout = useCallback(() => {
    const lines = cart.map((i) => `- ${i.qty}× ${i.name}`);
    const message = `Hola QBocados, me gustaría hacer un pedido:\n${lines.join("\n")}`;
    window.open(whatsappLink(message), "_blank");
    setCart([]);
    setCartOpen(false);
    setToast("¡Gracias por tu pedido! Te llevamos al WhatsApp.");
  }, [cart]);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      <a href="#inicio" className="skip-link">
        Saltar al contenido principal
      </a>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <Navbar />
      <main>
        <Hero />
        <MenuSection onAdd={addItem} />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />

      <button type="button" className="cart-fab" onClick={() => setCartOpen(true)} aria-label="Abrir carrito">
        <ShoppingCart aria-hidden="true" />
        <span className="cart-fab-count">{cartCount}</span>
      </button>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onInc={inc}
        onDec={dec}
        onCheckout={checkout}
      />

      <Toast message={toast} />
    </>
  );
}
