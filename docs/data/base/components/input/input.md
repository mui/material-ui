---
productId: base-ui
title: React Input component and hook
components: Input
hooks: useInput
githubLabel: 'component: input'
---

# Input

<p class="description">The Input component provides users with a field to enter and edit text.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

An input is a UI element that accepts text data from the user.
The Input component replaces the native HTML `<input>` tag, and offers expanded customization and accessibility features.
It can also be transformed into a `<textarea>` as needed.

{{"demo": "UnstyledInputIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

## Component

```jsx
import { Input } from '@mui/base/Input';
```

Input behaves similarly to the native HTML `<input>`, except that it's nested inside of a root `<div>`—see [Anatomy](#anatomy) for details.

The following demo shows how to create and style an input component, including `placeholder` text:

{{"demo": "UnstyledInputBasic", "defaultCodeOpen": false}}

### Anatomy

The Input component is composed of a root `<div>` slot that houses one interior `<input>` slot:

```html
<div class="base-Input-root">
  <input class="base-Input-input" />
</div>
```

### Custom structure

Use the `slots` prop to override the root or any other interior slot:

```jsx
<Input slots={{ root: 'aside', input: CustomInput }} />
```

:::info
The `slots` prop is available on all non-utility Base components.
See [Overriding component structure](/base-ui/guides/overriding-component-structure/) for full details.
:::

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-input` to the input slot:

```jsx
<Input slotProps={{ input: { className: 'my-input' } }} />
```

### Usage with TypeScript

In TypeScript, you can specify the custom component type used in the `slots.root` as a generic parameter of the unstyled component.
This way, you can safely provide the custom root's props directly on the component:

```tsx
<Input<typeof CustomComponent> slots={{ root: CustomComponent }} customProp />
```

The same applies for props specific to custom primitive elements:

```tsx
<Input<'textarea'> slots={{ root: 'textarea' }} rows={2} />
```

## Hook

```js
import { useInput } from '@mui/base/useInput';
```

The `useInput` hook lets you apply the functionality of an Input to a fully custom component.
It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#custom-structure), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

The demo below shows how to use the `useInput` hook to create a custom input component that receives all the necessary props:

{{"demo": "UseInput.js", "defaultCodeOpen": false}}

## Customization

:::info
The following features can be used with both components and hooks.
For the sake of simplicity, demos, and code snippets primarily feature components.
:::

### Adornments

You can use the `startAdornment` and `endAdornment` props to add a prefix, suffix, or an action to an Input.
Common use cases of adornments include:

- when an Input receives a specific unit of measure (like weight or currency)
- when an icon button toggles hiding/showing a password

The following demo shows examples of both of these use cases:

{{"demo": "InputAdornments.js", "defaultCodeOpen": false}}

### Multiline

The `multiline` prop transforms the `<input>` field into a `<textarea>` element, as shown below:

{{"demo": "InputMultiline.js"}}

If you want the `<textarea>` to grow with the content, you can use the [Textarea Autosize](/base-ui/react-textarea-autosize/) component within the input.

When using Textarea Autosize, the height of the `<textarea>` element dynamically matches its content unless you set the `rows` prop.
To set minimum and maximum sizes, add the `minRows` and `maxRows` props.

The following demo shows how to insert a Textarea Autosize component into an Input so that its height grows with the length of the content:

{{"demo": "InputMultilineAutosize.js"}}

## Common examples

### OTP Input

The following demo shows how to build a one-time password component using `Input`.

{{"demo": "OTPInput.js"}}
