import { describe, expect, it } from "vitest";
import {
  cleanCustomer,
  customerFieldLimits,
  emptyCustomer,
  firstErrorField,
  isValidCustomer,
  normalizePhone,
  validateCustomer,
  type CustomerData,
} from "./validation";

const validCustomer: CustomerData = {
  name: "María Pérez",
  phone: "+57 300 123 4567",
  address: "Calle 10 # 20-30, Bogotá",
  references: "Torre 2, apartamento 301",
  notes: "Cantidades para 8 personas",
};

describe("validateCustomer", () => {
  it("exige nombre, teléfono y dirección", () => {
    const errors = validateCustomer(emptyCustomer);

    expect(errors.name).toBeTruthy();
    expect(errors.phone).toBeTruthy();
    expect(errors.address).toBeTruthy();
    expect(errors.references).toBeUndefined();
    expect(errors.notes).toBeUndefined();
  });

  it("acepta un cliente completo y válido", () => {
    expect(validateCustomer(validCustomer)).toEqual({});
    expect(isValidCustomer(validCustomer)).toBe(true);
  });

  it("valida la longitud del nombre", () => {
    expect(validateCustomer({ ...validCustomer, name: "Al" }).name).toBeTruthy();
    expect(
      validateCustomer({ ...validCustomer, name: "a".repeat(customerFieldLimits.name + 1) })
        .name,
    ).toBeTruthy();
  });

  it("valida el formato y la longitud del teléfono", () => {
    expect(validateCustomer({ ...validCustomer, phone: "abc" }).phone).toBeTruthy();
    expect(validateCustomer({ ...validCustomer, phone: "12345" }).phone).toBeTruthy();
    expect(
      validateCustomer({ ...validCustomer, phone: "1".repeat(16) }).phone,
    ).toBeTruthy();
    expect(validateCustomer({ ...validCustomer, phone: "300 123 4567" }).phone).toBeUndefined();
  });

  it("valida la dirección de entrega", () => {
    expect(validateCustomer({ ...validCustomer, address: "Calle 1" }).address).toBeTruthy();
    expect(
      validateCustomer({
        ...validCustomer,
        address: "a".repeat(customerFieldLimits.address + 1),
      }).address,
    ).toBeTruthy();
  });

  it("limita la longitud de los campos opcionales", () => {
    expect(
      validateCustomer({
        ...validCustomer,
        references: "a".repeat(customerFieldLimits.references + 1),
      }).references,
    ).toBeTruthy();
    expect(
      validateCustomer({
        ...validCustomer,
        notes: "a".repeat(customerFieldLimits.notes + 1),
      }).notes,
    ).toBeTruthy();
  });

  it("detecta el primer campo con error en el orden del formulario", () => {
    expect(
      firstErrorField({
        notes: "Error en notas",
        phone: "Error en teléfono",
        name: "Error en nombre",
      }),
    ).toBe("name");
    expect(firstErrorField({})).toBeNull();
  });
});

describe("utilidades de cliente", () => {
  it("recorta espacios antes de validar y en el mensaje", () => {
    const padded: CustomerData = {
      name: "  María Pérez  ",
      phone: " 300 123 4567 ",
      address: "  Calle 10 # 20-30, Bogotá  ",
      references: "  Torre 2  ",
      notes: "  Sin cebolla  ",
    };

    expect(cleanCustomer(padded)).toEqual({
      name: "María Pérez",
      phone: "300 123 4567",
      address: "Calle 10 # 20-30, Bogotá",
      references: "Torre 2",
      notes: "Sin cebolla",
    });
    expect(validateCustomer(padded)).toEqual({});
  });

  it("extrae solo los dígitos del teléfono", () => {
    expect(normalizePhone("+57 (300) 123-4567")).toBe("573001234567");
  });
});
