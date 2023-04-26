---
product: base
title: Unstyled React Button component and hook
components: ButtonUnstyled
githubLabel: 'component: button'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
---

# 无样式的按钮

<p class="description">Buttons let users take actions and make choices with a single tap.</p>

## Introduction

`ButtonUnstyled` replaces the native HTML `<button>` element.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

export default function MyApp() {
  return <ButtonUnstyled>{/* button text */}</ButtonUnstyled>;
}
```

### Basics

`ButtonUnstyled` behaves similarly to the native HTML `<button>`, so it wraps around the text that will be displayed on its surface.

The following demo shows how to create and style two basic buttons. Notice that the second button cannot be clicked due to the `disabled` prop:

{{"demo": "UnstyledButtonsSimple.js", "defaultCodeOpen": true}}

### Anatomy

The `ButtonUnstyled` component is composed of a root `<button>` slot with no interior slots:

```html
<button class="BaseButton-root">
  <!-- button text goes here -->
</button>
```

### Slot props

:::info
The following props are available on all non-utility Base components. See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<ButtonUnstyled component="div" />
```

If you provide a non-interactive element such as a `<span>`, the `ButtonUnstyled` component will automatically add the necessary accessibility attributes.

Use the `components` prop to override any interior slots in addition to the root:

```jsx
<ButtonUnstyled components={{ Root: 'div' }} />
```

:::warning
If the root element is customized with both the `component` and `components` props, then `component` will take precedence.
:::

Use the `componentsProps` prop to pass custom props to internal slots. The following code snippet applies a CSS class called `my-button` to the root slot:

```jsx
<ButtonUnstyled componentsProps={{ root: { className: 'my-button' } }} />
```

:::warning
Note that `componentsProps` slot names are written in lowercase (`root`) while `components` slot names are capitalized (`Root`).
:::

Compare the attributes on the `<span>` in this demo with the `ButtonUnstyled` from the previous demo:

{{"demo": "UnstyledButtonsSpan.js"}}

:::warning
If a `ButtonUnstyled` is customized with a non-button element (i.e. `<ButtonUnstyled component="span" />`), it will not submit the form it's in when clicked. Similarly, `<ButtonUnstyled component="span" type="reset">` will not reset its parent form.
:::

## Hook

```js
import { useButton } from '@mui/base/ButtonUnstyled';
```

The `useButton` hook lets you apply the functionality of `ButtonUnstyled` to a fully custom component. It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement. With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#component-slots).
:::

The `useButton` hook requires the `ref` of the element it's used on.

The following demo shows how to build the same buttons as those found in the [Basic usage section](#basic-usage), but with the `useButton` hook:

{{"demo": "UseButton.js", "defaultCodeOpen": true}}

## Customization

:::info
The following features can be used with both components and hooks.
For the sake of simplicity, demos and code snippets primarily feature components.
:::

### Custom elements

`ButtonUnstyled` accepts a wide range of custom elements beyond HTML elements. You can even use SVGs, as the following demo illustrates:

{{"demo": "UnstyledButtonCustom.js", "defaultCodeOpen": false}}

### Focus on disabled buttons

Similarly to the native HTML `<button>` element, the `ButtonUnstyled` component can't receive focus when it's disabled. This may reduce its accessibility, as screen readers won't be able to announce the existence and state of the button.

The `focusableWhenDisabled` prop lets you change this behavior. When this prop is set, the underlying button does not set the `disabled` prop. Instead, `aria-disabled` is used, which makes the button focusable.

This should be used whenever the disabled button needs to be read by screen readers.

Base UI uses this prop internally in [menu items](/base/react-menu/), making it possible to use the keyboard to navigate to disabled items (in compliance with [ARIA guidelines](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#x6-7-focusability-of-disabled-controls)).

The following demo shows how the `focusableWhenDisabled` prop works—use the <kbd class="key">Tab</kbd> key to navigate within this document to see that only the second button accepts the focus:

{{"demo": "UnstyledButtonsDisabledFocus.js"}}

The `focusableWhenDisabled` prop works the same when the root slot is customized, except that the `aria-disabled` attribute is used no regardless of the prop's state. The ability to receive focus is controlled internally by the `tabindex` attribute.

{{"demo": "UnstyledButtonsDisabledFocusCustom.js"}}
