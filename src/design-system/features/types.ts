export type FieldType = "text" | "email" | "select" | "textarea" | "checkbox";

export type ValidationRules = {
  required?: boolean;
  email?: boolean;
  digits?: number;
  maxLength?: number;
};

export type SelectOption = {
  value: string;
  label: string;
};

export type VisibleWhen = {
  field: string;
  equals: string;
};

export type FieldSpan = "half" | "full";

type BaseFieldConfig = {
  name: string;
  label: string;
  hint?: string;
  validations: ValidationRules;
  visibleWhen?: VisibleWhen;
  span?: FieldSpan;
};

export type TextFieldConfig = BaseFieldConfig & {
  type: "text" | "email";
};

export type TextareaFieldConfig = BaseFieldConfig & {
  type: "textarea";
};

export type CheckboxFieldConfig = BaseFieldConfig & {
  type: "checkbox";
};

export type SelectFieldConfig = BaseFieldConfig & {
  type: "select";
  options: SelectOption[];
};

export type FieldConfig =
  | TextFieldConfig
  | TextareaFieldConfig
  | CheckboxFieldConfig
  | SelectFieldConfig;

export type FormValue = string | boolean;

export type FormValues = Record<string, FormValue>;

export type FormErrors = Record<string, string>;
