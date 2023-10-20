# Working with React Hook form

<p class="description">Learn how to integrate Base UI components with React Hook Form.</p>

The goal of this guide is to teach you how to build a form using all of Base UI's form components, and integrating it with React Hook Form.

Here's what the final product looks like—click on the **<>** icon underneath the demo to see the full source code:

:::warning
TODO: Intro demo
:::

## Getting Started

You'll need to set up a React app – if you need a boilerplate try our [Base UI + Create React App](https://github.com/mui/material-ui/tree/master/examples/base-cra-ts) example.

Next install `@mui/base` with your package manager of choice.

```js
npm install @mui/base // or yarn, pnpm...
```

Finally [install](https://react-hook-form.com/get-started) React Hook Form:

```js
npm install react-hook-form
```

The demos in this guide will use [MUI System](https://mui.com/system/getting-started/usage/) for styling, but Base UI works well with other styling solutions as well!

## Setting up the form

Start by calling `useForm` to initialize React Hook Form, making it the source of truth for the state of the entire form - including the form's values.

That state will be passed down to our Base UI components, making them [controlled components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).

```jsx
import { useForm } from 'react-hook-form';

export default function App() {
  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      domainName: '',
      logLevel: '',
      useHardwareAcceleration: true,
      maxBrightness: 50,
    },
  });

  return <div>Base UI + React Hook Form ✨</div>;
}
```

We'll also pass two parameters to `useForm`:

1. `mode` set to `onBlur` so field-level validations are triggered on `blur`, enabling more immediate feedback
2. The `defaultValues` object, with keys and values that correspond to each field

The returned `control` object will be used to connect fields, while `handleSubmit` will pass form values to our custom submit handler later.

## The Controller component

React Hook Form's `<Controller>` is a wrapper to connect Base UI components (or any component) to the form via a `render` prop. It requires a `name` that matches the corresponding value in `defaultValues` when we initialized the form, and also the `control` object that was returned.

```jsx
import { Controller } from 'react-hook-form';

<Controller
  control={control}
  name="fieldName"
  render={({
    field: { onChange, onBlur, value, name, ref },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { isSubmitting },
  }) => ({
    /* any component */
  })}
/>;
```

The `render` prop – following [the pattern of the same name](https://react.dev/reference/react/Children#calling-a-render-prop-to-customize-rendering) - is a function that needs to return a Base UI component.
Different values related to the form and field state, as well as functions for interacting with it can be extracted from the arguments and attached to our components.

## Integrating Base UI components

Next we'll create a component using Base UI for each field in the form:

### Input

First spread `field` props except for `ref` on the Input component to connect it to React Hook Form.

By default the `ref` is passed to the root slot, instead it needs to be passed to the `input` slot via `slotProps`. This is to make sure focus related features, e.g. [setting focus on the first field with an error upon submit](https://react-hook-form.com/docs/useform#shouldFocusError) work correctly.

```tsx
import { Controller } from 'react-hook-form';
import { Input } from '@mui/base';

<Controller
  name="username"
  control={control}
  render={({ field: { ref, ...field } }) => (
    <Input
      {...field}
      slotProps={{
        input: {
          ref,
          placeholder: 'Your username',
        },
      }}
    />
  )}
/>;
```

Other props, like `placeholder` can be passed in via slotProps as needed.

Here's a complete demo of a text input:

:::warning
TODO: Input demo
:::

### Select

Base UI's Select uses a `<button>` in the root slot, which will receive `field.ref` by default. However React Hook Form cannot autofocus the Select when it causes a submit error, since it only works with `<input>` elements at this time.

Select provides the latest value of the component as the second argument to `onChange`, which needs to be passed directly to `field.onChange` so React Hook Form can keep the form's values up to date:

```tsx
import { Controller } from 'react-hook-form';
import { Select, Option } from '@mui/base';

<Controller
  name="logLevel"
  control={control}
  render={({ field: { onChange, ...field } }) => (
    <Select
      {...field}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
    >
      <Option value="debug">Debug</Option>
      <Option value="info">Info</Option>
      <Option value="warning">Warning</Option>
      <Option value="error">Error</Option>
    </Select>
  )}
/>;
```

Here's a complete demo of a Select:

:::warning
TODO: Select demo
:::

### Switch

Unlike the previous components that correspond to string values in the form, the Switch's value is initialized as a boolean to represent it's two possible states.

To update the value in the form, the checked state – `event.target.checked` – is passed to `field.onChange`.

Additionally, wrap a `<label>` around the component to contain a text label, and use `field.name` to associate the label with the input:

```tsx
import { Controller } from 'react-hook-form';
import { Switch } from '@mui/base';

<Controller
  name="useHardwareAcceleration"
  control={control}
  render={({ field: { onChange, value, ref, name, ...field } }) => (
    <label htmlFor={name}>
      <Switch
        checked={value}
        onChange={(event) => {
          onChange(event.target.checked);
        }}
        slotProps={{
          input: {
            ref,
            id: name,
          },
        }}
        {...field}
      />
      Use hardware acceleration when available
    </label>
  )}
/>;
```

Here's a complete demo of a Switch:

:::warning
TODO: Switch demo
:::

### Slider

Sliders are great for progressively enhancing a number input, especially when it's important to show the immediate effects of the change where the value is a numeric range.

Base UI's Slider component provides two change handlers – `onChange` and `onChangeCommitted` – that can be used to separately update a value before writing to the form.

This snippet shows how to update the corresponding value in React Hook Form using `onChangeCommitted`, which is called when `mouseup` is triggered:

```jsx
import { Controller } from 'react-hook-form';
import { Slider } from '@mui/base';

<Controller
  name="maxBrightness"
  control={control}
  render={({ field: { onChange, value, ...field } }) => (
    <Slider
      value={value}
      max={100}
      min={0}
      onChangeCommitted={(event, newValue) => {
        onChange(newValue);
      }}
    />
  )}
/>;
```

Here's a complete demo that shows how `onChange` and `onChangeCommitted` can be used together:

:::warning
TODO: Slider demo
:::

## Adding validation

Validation rules can be added to fields using the Controller's `rules` prop, which follows the same format as "`register` options" documented [here](https://react-hook-form.com/docs/useform/register#options).

The following snippet adds a rule that makes an Input required with a corresponding error message, and takes `fieldState.error` from the `render` prop to render that error message accordingly:

```diff
 <Controller
   name="username"
   control={control}
-  render={({ field: { ref, ...field } }) => {
+  render={({ field: { ref, ...field }, fieldState: { error } }) => {
     return (
-      <Input
-        {...field}
-        slotProps={{
-          input: {
-            ref,
-            placeholder: 'Your username',
-          },
-        }}
-      />
+      <div role="group">
+        <Input
+          {...field}
+          slotProps={{
+            input: {
+              ref,
+              placeholder: 'Your username',
+            },
+          }}
+        />
+        {error && <p>{error.message}</p>}
+      </div>
     );
   }}
+  rules={{
+    required: 'Username is required',
+  }}
 />;

```

Here's a complete demo of the Select component with field validation:

:::warning
TODO: validated field demo
:::

Here we made some additional components that consume different bits of form and field state to generate dynamic styles:

- A `Label` for each field with a visually distinct "error" state
- A `ErrorMessage` that will display errors for each field

### Label

The `Label` component is explicitely associated with a field by passing the same `id` attribute (on the field) to the `htmlFor` of the label. Additionally it receives `fieldState.invalid` to dynamically style the field's error state:

```jsx
function Label({ htmlFor, invalid, children }) {
  return <label htmlFor={name}>{children}</label>;
}

<Label htmlFor={name} invalid={invalid}>
  Label
</Label>;
```

### Error message

The `ErrorMessage` component receives `fieldState.error`, which that describes the error for each field in an object like this:

```js
{
  "type": "validate",
  "message": "Invalid Email",
  "ref": Object,
}
```

When the field is invalid, the error message is rendered:

```jsx
function ErrorMessage({ error }) {
  if (!error) {
    return null;
  }

  return <span>{error.message}</span>;
}

<ErrorMessage error={error} />;
```

## Submitting the form

Just a few more steps to wire up the UI to the form!

### Form component

The `Form` component contains the layout for our fields, and renders a `<form>` element.

More importantly, it will use the `onSubmit` listener to call a custom submit function that we'll define later.

```jsx
const StyledForm = styled('form')`
  display: flex;
`;

function Form({ children, onSubmit, ...props }) {
  return (
    <StyledForm onSubmit={onSubmit} {...props}>
      {children}
    </StyledForm>
  );
}
```

### Submit button

Set the `type="submit"` attribute on a Button and it will submit the `<Form>` that contains it, as well as enable keyboard actions such as pressing <kbd class="key">Enter</kbd> on an input to submit the form.

```jsx
import Button from '@mui/base/Button';

<Button type="submit">Submit</Button>;
```

### Putting it all together

To retrieve the values of the form on submit, take `handleSubmit` that was returned from `useForm` in the beginning, wrap it around a custom function, and that function will receive the values as an argument.
From there you could for example, `POST` it to a backend:

```jsx
const submitToApi = async (formValues) => {
  await axios.post('/my-backend', formValues);
};

<Form onSubmit={handleSubmit(submitToApi)}>
  {/* all the fields */}

  <Button type="submit">Submit</Button>
</Form>;
```

## Summary

Here's a recap:

- ...

## Next steps

- Learn more about [customization strategies](/base/getting-started/customization/)
- Follow [this GitHub issue](https://github.com/mui/material-ui/issues/27170) to track Base UI components progress
