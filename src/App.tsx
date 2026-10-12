
import './App.css'
import { Button } from './design-system/atoms/Button/Button'
import { Checkbox } from './design-system/atoms/checkbox/Checkbox'
import { Select } from './design-system/atoms/Select/Select'
import { Textarea } from './design-system/atoms/Textarea/Textarea'
import { TextInput } from './design-system/atoms/TextInput/TextInput'
import { Field } from './design-system/Field/Field'

function App() {

  return (
    <>
      <h1>Lead Capture Form</h1>
      <br />

      <Field id="full_name" label="Full Name" layout="stack">
        <TextInput id="email" />
      </Field>

      <Field id="email" label="Email" layout="stack">
        <TextInput id="email" />
      </Field>

      <Select
        options={[
          { value: "frontend", label: "Individual" },
          { value: "backend", label: "Company" },
        ]}
        placeholder="Select an option"
        className='max-w-[30px]'
      />

      <Field id="Phone" label="Phone" layout="stack">
        <TextInput id="email" />
      </Field>

      <Field id="Notes" label="Notes" layout="stack">
        <Textarea />
      </Field>

      <Checkbox />

      <br />
      <Button>
        Submit
      </Button>

    </>
  )
}

export default App
