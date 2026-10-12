import type { InputHTMLAttributes } from "react";
import styles from "./TextInput.module.css";

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  type?: "text" | "email";
  invalid?: boolean;
};

export function TextInput({
  type = "text",
  invalid = false,
  disabled,
  className,
  ...rest
}: TextInputProps) {
  const classes = [styles.input, invalid ? styles.invalid : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <input
      type={type}
      className={classes}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}
