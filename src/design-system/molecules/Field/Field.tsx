import type { ReactNode } from "react";
import styles from "./Field.module.css";

export type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  layout?: "stack" | "inline";
  children: ReactNode;
};

export function Field({
  id,
  label,
  required = false,
  hint,
  error,
  layout = "stack",
  children,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const labelEl = (
    <label className={styles.label} htmlFor={id}>
      {label}
      {required ? (
        <span className={styles.required} aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );

  return (
    <div className={styles.field}>
      {layout === "stack" ? labelEl : null}
      {layout === "inline" ? (
        <div className={styles.inline}>
          {children}
          {labelEl}
        </div>
      ) : (
        children
      )}
      {hint ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
