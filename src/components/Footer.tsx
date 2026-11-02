import { Clock, MapPin, MessageCircle } from "lucide-react";
import { business } from "../config/business";
import { genericOrderMessage, whatsappLink } from "../lib/whatsapp";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#menu", label: "Catálogo" },
  { href: "#porque", label: "Nosotros" },
  { href: "#como", label: "Cómo pedir" },
  { href: "#faq", label: "Preguntas frecuentes" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="footer-logo">QBocados</span>
          <p>
            Pasabocas congeladas de casa, preparadas por encargo y pensadas para
            compartir cuando tú quieras.
          </p>

          <a
            href={whatsappLink(genericOrderMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="Escribir a QBocados por WhatsApp"
          >
            <MessageCircle aria-hidden="true" />
            Escribir por WhatsApp
          </a>
        </div>

        <nav className="footer-col" aria-label="Navegación del pie">
          <h4>Navegación</h4>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h4>Pedidos</h4>
          <ul className="footer-contact">
            <li>
              <Clock aria-hidden="true" />
              <span>Preparación por encargo</span>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <span>{business.country} · Entrega a coordinar</span>
            </li>
            <li>
              <MessageCircle aria-hidden="true" />
              <a
                href={whatsappLink(genericOrderMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Confirmar disponibilidad
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} QBocados · Precios de referencia en{" "}
          {business.currency}
        </p>
        <p>{business.privacyNote}</p>
      </div>
    </footer>
  );
}
