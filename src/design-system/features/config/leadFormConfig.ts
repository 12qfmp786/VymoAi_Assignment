import type { FieldConfig } from "../types";

export const leadFormConfig: FieldConfig[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full name",
    span: "half",
    validations: { required: true },
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    span: "half",
    validations: { required: true, email: true },
  },
  {
    name: "leadType",
    type: "select",
    label: "Lead type", 
    span: "half",
    options: [
      { value: "Individual", label: "Individual" },
      { value: "Company", label: "Company" },
    ],
    validations: { required: true },
  },
  {
    name: "companyName",
    type: "text",
    label: "Company name",
    span: "half",
    visibleWhen: { field: "leadType", equals: "Company" },
    validations: { required: true },
  },
  {
    name: "phone",
    type: "text",
    label: "Phone",
    hint: "Enter 10 digits",
    span: "half",
    validations: { required: true, digits: 10 },
  },
  {
    name: "notes",
    type: "textarea",
    label: "Notes",
    hint: "Optional, up to 200 characters",
    span: "full",
    validations: { maxLength: 200 },
  },
  {
    name: "consent",
    type: "checkbox",
    label: "Consent",
    hint: "I agree to be contacted about this enquiry",
    span: "full",
    validations: { required: true },
  },
];
