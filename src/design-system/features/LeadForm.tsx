import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "../../design-system/atoms/Button/Button";
import { Checkbox } from "../../design-system/atoms/checkbox/Checkbox";
import { Select } from "../../design-system/atoms/Select/Select";
import { TextInput } from "../../design-system/atoms/TextInput/TextInput";
import { Textarea } from "../../design-system/atoms/Textarea/Textarea";
import { Field } from "../../design-system/molecules/Field/Field";
import { leadFormConfig } from "./config/leadFormConfig";
import type { FieldConfig, FormErrors, FormValues } from "./types";
import {
  getInitialValues,
  getVisibleValues,
  isFieldVisible,
  validateLeadForm,
} from "./validation/validateLeadForm";
import "./LeadForm.css";

function describedBy(id: string, hint?: string, error?: string): string | undefined {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

function renderControl(
  field: FieldConfig,
  value: string | boolean,
  error: string | undefined,
  onChange: (name: string, value: string | boolean) => void,
  onBlur: (name: string) => void,
) {
  const id = field.name;
  const invalid = Boolean(error);
  const described = describedBy(id, field.hint, error);
  const common = {
    id,
    name: field.name,
    onBlur: () => onBlur(field.name),
    "aria-describedby": described,
  };

  switch (field.type) {
    case "text":
    case "email":
      return (
        <TextInput
          {...common}
          type={field.type}
          value={String(value)}
          invalid={invalid}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChange(field.name, event.target.value);
          }}
        />
      );
    case "select":
      return (
        <Select
          {...common}
          options={field.options}
          value={String(value)}
          invalid={invalid}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            onChange(field.name, event.target.value);
          }}
        />
      );
    case "textarea":
      return (
        <Textarea
          {...common}
          value={String(value)}
          invalid={invalid}
          maxLength={field.validations.maxLength}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            onChange(field.name, event.target.value);
          }}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          {...common}
          checked={Boolean(value)}
          invalid={invalid}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChange(field.name, event.target.checked);
          }}
        />
      );
  }
}

export function LeadForm() {
  const [values, setValues] = useState<FormValues>(() => getInitialValues(leadFormConfig));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(null);

  function fieldsDependingOn(name: string): string[] {
    return leadFormConfig
      .filter((field) => field.visibleWhen?.field === name)
      .map((field) => field.name);
  }

  function updateFieldError(name: string, nextValues: FormValues) {
    const nextErrors = validateLeadForm(leadFormConfig, nextValues);
    const relatedNames = [name, ...fieldsDependingOn(name)];

    setErrors((current) => {
      const updated = { ...current };
      for (const key of relatedNames) {
        if (nextErrors[key]) {
          updated[key] = nextErrors[key];
        } else {
          delete updated[key];
        }
      }
      return updated;
    });
  }

  function handleChange(name: string, value: string | boolean) {
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    setSubmittedValues(null);

    const hasDependentErrors = fieldsDependingOn(name).some((key) => errors[key]);
    if (errors[name] || hasDependentErrors) {
      updateFieldError(name, nextValues);
    }
  }

  function handleBlur(name: string) {
    updateFieldError(name, values);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLeadForm(leadFormConfig, values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmittedValues(null);
      return;
    }

    setSubmittedValues(getVisibleValues(leadFormConfig, values));
  }

  return (
    <div className="page">
      <header className="header">
        <h1 className="title">Lead capture</h1>
        <p className="subtitle">Fields are rendered from configuration, not hardcoded JSX.</p>
      </header>

      <section className="card">
        <form className="form" onSubmit={handleSubmit} noValidate>
          {leadFormConfig.map((field) => {
            if (!isFieldVisible(field, values)) {
              return null;
            }

            const error = errors[field.name];
            const spanClass = field.span === "full" ? "spanFull" : "spanHalf";

            return (
              <div className={spanClass} key={field.name}>
                <Field
                  id={field.name}
                  label={field.label}
                  required={Boolean(field.validations.required)}
                  hint={field.hint}
                  error={error}
                  layout={field.type === "checkbox" ? "inline" : "stack"}
                >
                  {renderControl(
                    field,
                    values[field.name] ?? (field.type === "checkbox" ? false : ""),
                    error,
                    handleChange,
                    handleBlur,
                  )}
                </Field>
              </div>
            );
          })}

          <div className="actions">
            <Button type="submit">Submit</Button>
          </div>
        </form>

        {submittedValues ? (
          <div className="success">
            <h2 className="successTitle">Submitted successfully</h2>
            <pre className="payload">{JSON.stringify(submittedValues, null, 2)}</pre>
          </div>
        ) : null}
      </section>
    </div>
  );
}
