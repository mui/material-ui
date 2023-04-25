---
product: base
title: React Button component and hook
components: Button
hooks: useButton
githubLabel: 'component: button'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
---

# Button

<p class="description">Buttons let users take actions and make choices with a single tap.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

The Button component replaces the native HTML `<button>` element, and offers expanded options for styling and accessibility.

{{"demo": "UnstyledButtonIntroduction.js", "defaultCodeOpen": false, "bg": "gradient"}}

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Button from '@mui/base/Button';

export default function MyApp() {
  return <Button>{/* button text */}</Button>;
}
```

### Basics

The Button behaves similar to the native HTML `<button>`, so it wraps around the text that will be displayed on its surface.

The following demo shows how to create and style two basic buttons.
Notice that the second button cannot be clicked due to the `disabled` prop:

{{"demo": "UnstyledButtonsSimple.js", "defaultCodeOpen": true}}

### Anatomy

The Button component is composed of a root `<button>` slot with no interior slots:

```html
<button class="BaseButton-root">
  <!-- button text goes here -->
</button>
```

### Slot props

:::info
The following props are available on all non-utility Base components.
See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<Button component="div" />
```

If you provide a non-interactive element such as a `<span>`, the Button component will automatically add the necessary accessibility attributes.

Compare the attributes on the `<span>` in this demo with the Button from the previous demo—try inspecting them both with your browser's dev tools:

{{"demo": "UnstyledButtonsSpan.js"}}

:::warning
If a Button is customized with a non-button element (i.e. `<Button component="span" />`), it will not submit the form it's in when clicked.
Similarly, `<Button component="span" type="reset">` will not reset its parent form.
:::

## Hook

```js
import useButton from '@mui/base/useButton';
```

The `useButton` hook lets you apply the functionality of a button to a fully custom component.
It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

The following demo shows how to build the same buttons as those found in the [Basics](#basics) section above, but with the `useButton` hook:

{{"demo": "UseButton.js", "defaultCodeOpen": true}}

If you use a ref to store a reference to the button, pass it to the `useButton`'s `ref` parameter, as shown in the demo above.
It will get merged with a ref used internally in the hook.

:::warning
Do not add the `ref` parameter to the button element manually, as the correct ref is already a part of the object returned by the `getRootProps` function.
:::

## Customization

:::info
The following features can be used with both components and hooks.
For the sake of simplicity, demos and code snippets primarily feature components.
:::

### Custom elements

The Button accepts a wide range of custom elements beyond HTML elements.
You can even use SVGs, as the following demo illustrates:

{{"demo": "UnstyledButtonCustom.js", "defaultCodeOpen": false}}

### Focus on disabled buttons

Similarly to the native HTML `<button>` element, the Button component can't receive focus when it's disabled.
This may reduce its accessibility, as screen readers won't be able to announce the existence and state of the button.

The `focusableWhenDisabled` prop lets you change this behavior.
When this prop is set, the underlying button does not set the `disabled` prop.
Instead, `aria-disabled` is used, which makes the button focusable.

This should be used whenever the disabled button needs to be read by screen readers.

Base UI uses this prop internally in [menu items](/base/react-menu/), making it possible to use the keyboard to navigate to disabled items (in compliance with [ARIA guidelines](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#x6-7-focusability-of-disabled-controls)).

The following demo shows how the `focusableWhenDisabled` prop works—use the <kbd class="key">Tab</kbd> key to navigate within this document to see that only the second button accepts the focus:

{{"demo": "UnstyledButtonsDisabledFocus.js"}}

The `focusableWhenDisabled` prop works the same when the root slot is customized, except that the `aria-disabled` attribute is used no regardless of the prop's state.
The ability to receive focus is controlled internally by the `tabindex` attribute.

{{"demo": "UnstyledButtonsDisabledFocusCustom.js"}}
