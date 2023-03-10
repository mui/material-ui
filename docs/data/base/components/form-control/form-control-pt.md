---
product: base
title: Unstyled React Form Control component and hook
components: FormControlUnstyled
githubLabel: 'component: FormControl'
---

# Unstyled form control

<p class="description">The FormControlUnstyled component is a utility that lets you associate a form input with auxiliary components, such as labels, error indicators, or helper text.</p>

## Introduction

`FormControlUnstyled` is a utility that wraps an input component with other associated components in order to make the state of the input available to those components.

For instance, you may want to show an additional element asking the user to enter a value if the input is empty, or display a warning icon if the entered value is incorrect.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import FormControlUnstyled from '@mui/base/FormControlUnstyled';

export default function MyApp() {
  return (
    <FormControlUnstyled>
      {/* <input> and/or other contents of the form */}
    </FormControlUnstyled>
  );
}
```

### Basics

`FormControlUnstyled` wraps around the elements of a form that need access to the state of an `<input>`. For instance, if the form's **Submit** button needs to change states after the user enters information, then the component will be structured like this:

```jsx
<FormControlUnstyled>
  <input>
  <button>Submit</button>
</FormControlUnstyled>
```

The following demo shows how to create and style a form that uses `FormControlUnstyled` to wrap the elements of the form. Note that it also uses the `useFormControlUnstyledContext` hook in order to pass props to the custom `InputUnstyled`—see the [Hook section](#hook) below for more details.

{{"demo": "BasicFormControl.js"}}

## Hook

```jsx
import { useFormControlUnstyledContext } from '@mui/base/FormControlUnstyled';
```

The `useFormControlUnstyledContext` hook reads the context provided by `FormControlUnstyled`. This hook lets you work with custom input components inside of the form control. You can also use it to read the form control's state and react to its changes in a custom component.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement. With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#component-slots).
:::

The demo below shows how to integrate this hook with its component counterpart:

- `CustomInput` is a wrapper around a native HTML `<input>` that adds `FormControlUnstyled` integration.
- `ControlStateDisplay` reads the state of the form control and displays it as text.

{{"demo": "UseFormControl.js", "defaultCodeOpen": false}}

Note that even though `FormControlUnstyled` supports both controlled and uncontrolled-style APIs (i.e. it accepts `value` and `defaultValue` props), `useFormControlUnstyledContext` returns only the controlled `value`. This way, you don't have to implement both in your custom input—`FormControlUnstyled` does this for you.

`useFormControlUnstyledContext` returns an object with the following fields:

| Name       | Type    | Description                                                                                                                                                                         |
| ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | boolean | Represents the value of the FormControlUnstyled's `disabled` prop.                                                                                                                  |
| `error`    | boolean | Represents the value of the `FormControlUnstyled` component's `error` prop. Note that it is not calculated automatically (i.e. it's not set when `required: true` and `value: ''`). |
| `filled`   | boolean | Set to `true` if `value` is not empty.                                                                                                                                              |
| `focused`  | boolean | Set to `true` if the wrapped input has received focus.                                                                                                                              |
| `required` | boolean | Represents the value of the `FormControlUnstyled` component's `required` prop.                                                                                                      |
| `value`    | unknown | The current value of the form control.                                                                                                                                              |

The following callbacks are also part of the returned object—they are meant to be used when creating custom inputs:

| Name       | Type                      | Description                                                   |
| ---------- | ------------------------- | ------------------------------------------------------------- |
| `onChange` | React.ChangeEvent => void | Value change handler. Should be forwarded to the inner input. |
| `onBlur`   | () => void                | Focus change handler. Should be forwarded to the inner input. |
| `onFocus`  | () => void                | Focus change handler. Should be forwarded to the inner input. |

## Customization

:::info
The following features can be used with both components and hooks.
For the sake of simplicity, demos and code snippets primarily feature components.
:::

### Accessing the form control state

You can access the state of the form control by providing a function as a child of the `FormControlUnstyled`. The state will be provided as a parameter to this function.

The following demo shows how to access the state of the form control in an `InputUnstyled` component nested inside of `FormControlUnstyled`:

{{"demo": "FormControlFunctionChild.js"}}
