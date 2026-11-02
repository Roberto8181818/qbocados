import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { business } from "../config/business";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#menu", label: "Catálogo" },
  { href: "#porque", label: "Nosotros" },
  { href: "#como", label: "Cómo pedir" },
  { href: "#faq", label: "Preguntas" },
];

interface NavbarProps {
  cartCount: number;
  cartOpen: boolean;
  onOpenCart: () => void;
}

export default function Navbar({ cartCount, cartOpen, onOpenCart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: marca como activa la sección visible en la navegación.
  useEffect(() => {
    const ids = links.map((link) => link.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 961px)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const cartLabel =
    cartCount > 0
      ? `Abrir cesta, ${cartCount} ${cartCount === 1 ? "producto" : "productos"}`
      : "Abrir cesta vacía";

  return (
    <>
      <div className="announce">
        <p>{business.announcement}</p>
      </div>

      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container header-inner">
          <a href="#inicio" className="logo" aria-label={`${business.name} · Inicio`}>
            <img
              src="../../public/logo.png"
              alt=""
              width={480}
              height={150}
              fetchPriority="high"
              decoding="async"
            />
          </a>

          <nav
            id="mainNav"
            className={`main-nav${open ? " open" : ""}`}
            aria-label="Navegación principal"
          >
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={active === link.href ? "active" : undefined}
                    aria-current={active === link.href ? "true" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="nav-mobile-cta">
                <a
                  href="#menu"
                  className="btn btn-primary btn-sm"
                  onClick={() => setOpen(false)}
                >
                  Ver catálogo
                </a>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="header-cart"
              onClick={onOpenCart}
              aria-label={cartLabel}
              aria-haspopup="dialog"
              aria-controls="cart-drawer"
              aria-expanded={cartOpen}
            >
              <ShoppingBag aria-hidden="true" />
              <span className="header-cart-label">Cesta</span>
              {cartCount > 0 ? (
                <span className="header-cart-count" aria-hidden="true">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              ) : null}
            </button>

            <a href="#menu" className="btn btn-primary btn-sm header-cta">
              Ordenar
            </a>

            <button
              type="button"
              className={`nav-toggle${open ? " open" : ""}`}
              onClick={() => setOpen((current) => !current)}
              aria-expanded={open}
              aria-controls="mainNav"
              aria-label={open ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
