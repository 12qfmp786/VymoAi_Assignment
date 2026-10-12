# Lead Capture Form

A small React + TypeScript app that renders a lead capture form from a typed configuration array. The UI is a minimal design system built with plain CSS. There is no backend and no third-party form or component library.

## Installation

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Folder layout

```text
src/
├── design-system/     Reusable tokens, atoms, and the Field molecule
├── features/lead/     Lead form config, validation, and page
├── App.tsx
├── main.tsx
└── index.css
```

`src/design-system` is generic UI. `src/features/lead` owns lead-specific config and validation.

## Design system

### Tokens

CSS custom properties live in:

- `src/design-system/tokens/colors.css`
- `src/design-system/tokens/spacing.css`
- `src/design-system/tokens/typography.css`
- `src/design-system/tokens/breakpoints.css`

They are imported from `src/index.css`.

### Atoms

Generic controls in `src/design-system/atoms/`:

- `TextInput`
- `Select`
- `Textarea`
- `Checkbox`
- `Button`

Atoms accept value, events, disabled, and invalid state. They do not contain lead business rules.

### Field molecule

`src/design-system/molecules/Field/Field.tsx` renders label, control, hint, and error.

## Lead feature

- Config: `src/features/lead/config/leadFormConfig.ts`
- Validation: `src/features/lead/validation/validateLeadForm.ts`
- Form: `src/features/lead/LeadForm.tsx`

The form maps over the config and chooses an atom from `field.type`. Adding a normal field is a config change, not new JSX for that field name.

Validation is a pure function: `validateLeadForm(config, values)` returns an errors object. Rules are read from config (`required`, `email`, `digits`, `maxLength`). Company name is only validated when it is visible (`leadType === "Company"`).

Validation runs on field blur and on submit. Submit is blocked while errors exist. A successful submit prints the visible values on the page.

## Responsive layout

Layout CSS is in `src/features/lead/LeadForm.css`.

- Default / tablet / mobile (`< 1025px`): one column, full-width inputs, sticky submit at the bottom (`.form`, `.actions`)
- Desktop (`min-width: 1025px`): two columns. Half-width fields sit side by side (full name and email on the first row). Notes, consent, and the submit row use `.spanFull`.

Breakpoint values are documented in `src/design-system/tokens/breakpoints.css`.

## Build

```bash
npm run build
npm run preview
```

`npm run build` type-checks and creates a production bundle. `npm run preview` serves that bundle locally.
