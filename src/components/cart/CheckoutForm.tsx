import { useRef, type ChangeEvent, type FormEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { business } from "../../config/business";
import {
  firstErrorField,
  type CustomerData,
  type CustomerErrors,
  type CustomerField,
} from "../../lib/validation";

interface CheckoutFormProps {
  value: CustomerData;
  errors: CustomerErrors;
  onChange: (field: CustomerField, value: string) => void;
  onSubmit: () => CustomerErrors;
  onBack: () => void;
}

interface TextFieldProps {
  id: string;
  name: CustomerField;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  optional?: boolean;
  type?: "text" | "tel" | "email";
  inputMode?: "text" | "tel" | "email";
  autoComplete?: string;
  maxLength?: number;
  placeholder?: string;
  multiline?: boolean;
}

function TextField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  hint,
  optional = false,
  type = "text",
  inputMode,
  autoComplete,
  maxLength,
  placeholder,
  multiline = false,
}: TextFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const shared = {
    id,
    name,
    value,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(event.target.value),
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    "aria-required": optional ? undefined : true,
    maxLength,
    placeholder,
    autoComplete,
  } as const;

  return (
    <div className={`form-field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {optional ? <span className="field-optional">Opcional</span> : null}
      </label>

      {multiline ? (
        <textarea {...shared} rows={3} />
      ) : (
        <input {...shared} type={type} inputMode={inputMode} />
      )}

      {hint ? (
        <p className="field-hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="field-error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function CheckoutForm({
  value,
  errors,
  onChange,
  onSubmit,
  onBack,
}: CheckoutFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = onSubmit();
    const firstInvalid = firstErrorField(nextErrors);

    if (firstInvalid) {
      const field = formRef.current?.elements.namedItem(firstInvalid);
      if (field instanceof HTMLElement) field.focus();
    }
  };

  return (
    <form className="checkout-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      <p className="cart-step-intro">
        Déjanos los datos de entrega. Los usaremos solo para coordinar tu pedido
        por WhatsApp.
      </p>

      {hasErrors ? (
        <div className="form-alert" role="alert">
          Revisa los campos marcados para continuar.
        </div>
      ) : null}

      <TextField
        id="checkout-name"
        name="name"
        label="Nombre y apellido"
        value={value.name}
        onChange={(next) => onChange("name", next)}
        error={errors.name}
        autoComplete="name"
        maxLength={80}
        placeholder="Ej. María Pérez"
      />

      <TextField
        id="checkout-phone"
        name="phone"
        label="Teléfono / WhatsApp"
        type="tel"
        inputMode="tel"
        value={value.phone}
        onChange={(next) => onChange("phone", next)}
        error={errors.phone}
        hint="Incluye el indicativo si estás fuera del país."
        autoComplete="tel"
        maxLength={30}
        placeholder="Ej. 300 123 4567"
      />

      <TextField
        id="checkout-address"
        name="address"
        label="Dirección de entrega"
        value={value.address}
        onChange={(next) => onChange("address", next)}
        error={errors.address}
        autoComplete="street-address"
        maxLength={200}
        placeholder="Calle, número, barrio y ciudad"
      />

      <TextField
        id="checkout-references"
        name="references"
        label="Referencias"
        optional
        value={value.references}
        onChange={(next) => onChange("references", next)}
        error={errors.references}
        autoComplete="address-line2"
        maxLength={200}
        placeholder="Torre, apartamento, punto de referencia…"
      />

      <TextField
        id="checkout-notes"
        name="notes"
        label="Notas del pedido"
        optional
        multiline
        value={value.notes}
        onChange={(next) => onChange("notes", next)}
        error={errors.notes}
        maxLength={300}
        placeholder="Cantidades especiales, ocasión o alguna indicación…"
      />

      <p className="form-legal">{business.privacyNote}</p>

      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={onBack}>
          <ArrowLeft aria-hidden="true" />
          Volver
        </button>
        <button type="submit" className="btn btn-red">
          Revisar pedido
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
