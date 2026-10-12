import type { TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.css";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export function Textarea({
  invalid = false,
  disabled,
  className,
  rows = 4,
  ...rest
}: TextareaProps) {
  const classes = [styles.textarea, invalid ? styles.invalid : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <textarea
      className={classes}
      disabled={disabled}
      rows={rows}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}
