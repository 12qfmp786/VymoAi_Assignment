import type { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  invalid?: boolean;
};

export function Checkbox({
  invalid = false,
  disabled,
  className,
  ...rest
}: CheckboxProps) {
  const classes = [styles.checkbox, invalid ? styles.invalid : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <input
      type="checkbox"
      className={classes}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}
