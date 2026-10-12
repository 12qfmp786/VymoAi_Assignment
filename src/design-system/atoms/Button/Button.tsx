import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ type = "button", className, ...rest }: ButtonProps) {
  const classes = [styles.button, className].filter(Boolean).join(" ");

  return <button type={type} className={classes} {...rest} />;
}
