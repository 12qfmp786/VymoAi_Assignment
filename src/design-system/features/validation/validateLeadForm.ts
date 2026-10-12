import type { FieldConfig, FormErrors, FormValue, FormValues } from "../types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isFieldVisible(field: FieldConfig, values: FormValues): boolean {
  if (!field.visibleWhen) {
    return true;
  }

  return values[field.visibleWhen.field] === field.visibleWhen.equals;
}

function isEmpty(value: FormValue | undefined): boolean {
  return value === undefined || value === "" || value === false;
}

function validateFieldValue(field: FieldConfig, value: FormValue | undefined): string | undefined {
  const { validations, label } = field;

  if (validations.required && isEmpty(value)) {
    return `${label} is required`;
  }

  if (isEmpty(value) || typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  if (validations.email && !EMAIL_PATTERN.test(trimmed)) {
    return "Please enter a valid email";
  }

  if (validations.digits !== undefined) {
    const hasExactDigits = /^\d+$/.test(trimmed) && trimmed.length === validations.digits;
    if (!hasExactDigits) {
      return `${label} must contain exactly ${validations.digits} digits`;
    }
  }

  if (validations.maxLength !== undefined && value.length > validations.maxLength) {
    return `${label} must be ${validations.maxLength} characters or fewer`;
  }

  return undefined;
}

export function validateLeadForm(config: FieldConfig[], values: FormValues): FormErrors {
  const errors: FormErrors = {};

  for (const field of config) {
    if (!isFieldVisible(field, values)) {
      continue;
    }

    const message = validateFieldValue(field, values[field.name]);
    if (message) {
      errors[field.name] = message;
    }
  }

  return errors;
}

export function getInitialValues(config: FieldConfig[]): FormValues {
  const values: FormValues = {};

  for (const field of config) {
    values[field.name] = field.type === "checkbox" ? false : "";
  }

  return values;
}

export function getVisibleValues(config: FieldConfig[], values: FormValues): FormValues {
  const visible: FormValues = {};

  for (const field of config) {
    if (isFieldVisible(field, values)) {
      visible[field.name] = values[field.name] ?? (field.type === "checkbox" ? false : "");
    }
  }

  return visible;
}
