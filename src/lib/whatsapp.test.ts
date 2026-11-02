import { describe, expect, it } from "vitest";
import { business } from "../config/business";
import { genericOrderMessage, productEnquiryMessage, whatsappLink } from "./whatsapp";

const number = business.whatsappNumber.replace(/\D/g, "");

describe("whatsappLink", () => {
  it("codifica el mensaje y usa el número configurado", () => {
    const message = "Hola, quiero pedir empanaditas & deditos";
    const link = whatsappLink(message);

    expect(link.startsWith(`https://wa.me/${number}?text=`)).toBe(true);
    expect(decodeURIComponent(link.split("text=")[1] ?? "")).toBe(message);
  });
});

describe("mensajes de WhatsApp", () => {
  it("genera un saludo genérico con el nombre del negocio", () => {
    expect(genericOrderMessage).toContain(business.name);
    expect(genericOrderMessage).toContain("pedido");
  });

  it("menciona el producto en la consulta", () => {
    expect(productEnquiryMessage("Croquetas de Jamón")).toContain(
      "Croquetas de Jamón",
    );
    expect(productEnquiryMessage("Croquetas de Jamón")).toContain("disponibilidad");
  });
});
