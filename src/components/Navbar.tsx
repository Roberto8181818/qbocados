import { useEffect, useState } from "react";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#menu", label: "Menú" },
  { href: "#porque", label: "Por qué QBocados" },
  { href: "#como", label: "Cómo trabajamos" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
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
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="announce">
        <p>Envío gratis a domicilio en pedidos desde 35&nbsp;€ · Pedidos antes de las 14:00, entregamos el mismo día</p>
      </div>

      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container header-inner">
          <a href="#inicio" className="logo" aria-label="QBocados · Inicio">
            <span className="logo-text">
              QBoca<em>dos</em>
            </span>
          </a>

          <nav
            id="mainNav"
            className={`main-nav${open ? " open" : ""}`}
            aria-label="Navegación principal"
          >
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={active === l.href ? "active" : undefined}
                    aria-current={active === l.href ? "true" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <a href="#pedido" className="btn btn-red btn-sm header-cta">
              Ordenar ahora
            </a>
            <button
              type="button"
              className={`nav-toggle${open ? " open" : ""}`}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mainNav"
              aria-label="Abrir menú de navegación"
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
