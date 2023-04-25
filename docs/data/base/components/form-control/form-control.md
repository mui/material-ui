---
product: base
title: React Form Control component and hook
components: FormControl
hooks: useFormControlContext
githubLabel: 'component: FormControl'
---

# Form Control

<p class="description">The Form Control component is a utility that lets you associate a form input with auxiliary components, such as labels, error indicators, or helper text.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

Form Control is a utility that wraps an input component with other associated components in order to make the state of the input available to those components.

For instance, you may want to show an additional element asking the user to enter a value if the input is empty, or display a warning icon if the entered value is incorrect.

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import FormControl from '@mui/base/FormControl';

export default function MyApp() {
  return (
    <FormControl>{/* <input> and/or other contents of the form */}</FormControl>
  );
}
```

### Basics

Form Control wraps around the elements of a form that need access to the state of an `<input>`.
For instance, if the form's **Submit** button needs to change states after the user enters information, then the component will be structured like this:

```jsx
<FormControl>
  <input>
  <button>Submit</button>
</FormControl>
```

The following demo shows how to create and style a form that uses Form Control to wrap the elements of the form.
Note that it also uses the `useFormControlContext` hook in order to pass props to the custom Input—see the [Hook](#hook) section below for more details.

{{"demo": "BasicFormControl.js"}}

## Hook

```jsx
import { useFormControlContext } from '@mui/base/FormControl';
```

The `useFormControlContext` hook reads the context provided by Form Control.
This hook lets you work with custom input components inside of the Form Control.
You can also use it to read the form control's state and react to its changes in a custom component.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

The demo below shows how to integrate this hook with its component counterpart:

- `CustomInput` is a wrapper around a native HTML `<input>` that adds Form Control integration.
- `ControlStateDisplay` reads the state of the form control and displays it as text.

{{"demo": "UseFormControl.js", "defaultCodeOpen": false}}

Note that even though Form Control supports both controlled and uncontrolled-style APIs
(i.e. it accepts `value` and `defaultValue` props), `useFormControlContext` returns only the controlled `value`.
This way, you don't have to implement both in your custom input—Form Control does this for you.

`useFormControlContext` returns an object with the following fields:

| Name       | Type    | Description                                                                                                                                                                |
| :--------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | boolean | Represents the value of the FormControl's `disabled` prop.                                                                                                                 |
| `error`    | boolean | Represents the value of the Form Control component's `error` prop. Note that it is not calculated automatically (i.e. it's not set when `required: true` and `value: ''`). |
| `filled`   | boolean | Set to `true` if `value` is not empty.                                                                                                                                     |
| `focused`  | boolean | Set to `true` if the wrapped input has received focus.                                                                                                                     |
| `required` | boolean | Represents the value of the Form Control component's `required` prop.                                                                                                      |
| `value`    | unknown | The current value of the form control.                                                                                                                                     |

The following callbacks are also part of the returned object—they are meant to be used when creating custom inputs:

| Name       | Type                      | Description                                                   |
| :--------- | :------------------------ | :------------------------------------------------------------ |
| `onChange` | React.ChangeEvent => void | Value change handler. Should be forwarded to the inner input. |
| `onBlur`   | () => void                | Focus change handler. Should be forwarded to the inner input. |
| `onFocus`  | () => void                | Focus change handler. Should be forwarded to the inner input. |

## Customization

:::info
The following features can be used with both components and hooks.
For the sake of simplicity, demos and code snippets primarily feature components.
:::

### Accessing the form control state

You can access the state of the form control by providing a function as a child of the Form Control.
The state will be provided as a parameter to this function.

The following demo shows how to access the state of the form control in an Input component nested inside of the Form Control:

{{"demo": "FormControlFunctionChild.js"}}
