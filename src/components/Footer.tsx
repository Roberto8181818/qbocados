import { Mail, MessageCircle, MapPin, Phone } from "lucide-react";
import { genericOrderMessage, whatsappLink } from "../whatsapp";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="footer-logo" aria-label="QBocados">
            QBocados
          </span>
          <p>Pasabocas congeladas caseras, hechas por encargo y congeladas al momento.</p>

          <div className="footer-social">
            <a
              href={whatsappLink(genericOrderMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de QBocados"
            >
              <MessageCircle aria-hidden="true" />
            </a>
            <a href="mailto:hola@qbocados.es" aria-label="Escribir a hola@qbocados.es">
              <Mail aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav className="footer-col" aria-label="Navegación">
          <h4>Navegación</h4>
          <ul>
            <li>
              <a href="#inicio">Inicio</a>
            </li>
            <li>
              <a href="#menu">Menú</a>
            </li>
            <li>
              <a href="#porque">Por qué QBocados</a>
            </li>
            <li>
              <a href="#como">Cómo trabajamos</a>
            </li>
            <li>
              <a href="#faq">Preguntas frecuentes</a>
            </li>
          </ul>
        </nav>

        <div className="footer-col">
          <h4>Contacto</h4>
          <ul className="footer-contact">
            <li>
              <MapPin aria-hidden="true" />
              <span>Calle de la Sabrosía 24, 28001 Madrid</span>
            </li>
            <li>
              <Phone aria-hidden="true" />
              <span>+34 910 000 000</span>
            </li>
            <li>
              <MessageCircle aria-hidden="true" />
              <a
                href={whatsappLink(genericOrderMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedidos por WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <nav className="footer-col" aria-label="Legal">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="#">Privacidad</a>
            </li>
            <li>
              <a href="#">Términos</a>
            </li>
            <li>
              <a href="#">Cookies</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} QBocados</p>
        <p>Hecho con cariño y mucho aceite de oliva</p>
      </div>
    </footer>
  );
}
