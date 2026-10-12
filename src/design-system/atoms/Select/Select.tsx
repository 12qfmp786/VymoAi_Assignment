import type { SelectHTMLAttributes } from "react";
import styles from "./Select.module.css";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  options: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
};

export function Select({
  options,
  placeholder = "Select an option",
  invalid = false,
  disabled,
  className,
  ...rest
}: SelectProps) {
  const classes = [styles.select, invalid ? styles.invalid : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <select
      className={classes}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      {...rest}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
