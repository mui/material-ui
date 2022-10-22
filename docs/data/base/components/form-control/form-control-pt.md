---
product: base
title: Componente e Hook do React Form Control não estilizado
components: FormControlUnstyled
githubLabel: 'component: FormControl'
---

# Unstyled Form Control

<p class="description">The FormControlUnstyled component is a utility that lets you associate a form input with auxiliary components, such as labels, error indicators, or helper text.</p>

## Introdução

`FormControlUnstyled` é um utilitário que encapsula um componente de input com outros componentes associados, a fim de tornar o state do input disponível para esses componentes.

Por exemplo, você pode querer mostrar um elemento adicional pedindo ao usuário para inserir um valor se o input estiver vazio ou exibir um ícone de aviso se o valor inserido estiver incorreto.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Componente

### Uso

Após a [installation](/base/getting-started/installation/), você pode começar a construir com este componente usando os elementos básicos a seguir:

```jsx
import FormControlUnstyled from '@mui/base/FormControlUnstyled';

export default function MyApp() {
  return (
    <FormControlUnstyled>
      {/* <input> e/ou outros conteúdos do formulário */}
    </FormControlUnstyled>
  );
}
```

### Essencial

`FormControlUnstyled` encapsula os elementos de um formulário que precisam de acesso ao state de um `<input>`. Por exemplo, se o botão do formulário **Submit** precisa alterar states depois que o usuário inserir informação, então o componente será estruturado assim:

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

:::info Hooks give you the most room for customization, but require more work to implement. With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy). :::

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
