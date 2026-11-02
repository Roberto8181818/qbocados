export interface CustomerData {
  name: string;
  phone: string;
  address: string;
  references: string;
  notes: string;
}

export type CustomerField = keyof CustomerData;
export type CustomerErrors = Partial<Record<CustomerField, string>>;

export const customerFieldOrder: readonly CustomerField[] = [
  "name",
  "phone",
  "address",
  "references",
  "notes",
];

export const customerFieldLimits = {
  name: 80,
  phone: 30,
  address: 200,
  references: 200,
  notes: 300,
} as const;

export const emptyCustomer: CustomerData = {
  name: "",
  phone: "",
  address: "",
  references: "",
  notes: "",
};

export function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

export function cleanCustomer(data: CustomerData): CustomerData {
  return {
    name: data.name.trim(),
    phone: data.phone.trim(),
    address: data.address.trim(),
    references: data.references.trim(),
    notes: data.notes.trim(),
  };
}

export function validateCustomer(data: CustomerData): CustomerErrors {
  const errors: CustomerErrors = {};
  const clean = cleanCustomer(data);

  if (!clean.name) {
    errors.name = "Escribe tu nombre.";
  } else if (clean.name.length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres.";
  } else if (clean.name.length > customerFieldLimits.name) {
    errors.name = `Máximo ${customerFieldLimits.name} caracteres.`;
  }

  const digits = normalizePhone(clean.phone);
  if (!clean.phone) {
    errors.phone = "Escribe un número de teléfono.";
  } else if (!/^[\d\s+()-]+$/.test(clean.phone)) {
    errors.phone = "Usa solo números, espacios, +, guiones o paréntesis.";
  } else if (digits.length < 7 || digits.length > 15) {
    errors.phone = "El teléfono debe tener entre 7 y 15 dígitos.";
  } else if (clean.phone.length > customerFieldLimits.phone) {
    errors.phone = `Máximo ${customerFieldLimits.phone} caracteres.`;
  }

  if (!clean.address) {
    errors.address = "Escribe la dirección de entrega.";
  } else if (clean.address.length < 10) {
    errors.address = "Incluye calle, número y ciudad.";
  } else if (clean.address.length > customerFieldLimits.address) {
    errors.address = `Máximo ${customerFieldLimits.address} caracteres.`;
  }

  if (clean.references.length > customerFieldLimits.references) {
    errors.references = `Máximo ${customerFieldLimits.references} caracteres.`;
  }

  if (clean.notes.length > customerFieldLimits.notes) {
    errors.notes = `Máximo ${customerFieldLimits.notes} caracteres.`;
  }

  return errors;
}

export function firstErrorField(errors: CustomerErrors): CustomerField | null {
  return customerFieldOrder.find((field) => errors[field]) ?? null;
}

export function isValidCustomer(data: CustomerData): boolean {
  return Object.keys(validateCustomer(data)).length === 0;
}
