---
productId: base-ui
title: React Button component and hook
components: Button
hooks: useButton
githubLabel: 'component: button'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
---

# Button

<p class="description">Buttons let users take actions and make choices with a single tap.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

The Button component replaces the native HTML `<button>` element, and offers expanded options for styling and accessibility.

{{"demo": "UnstyledButtonIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

## Component

```jsx
import { Button } from '@mui/base/Button';
```

The Button behaves similar to the native HTML `<button>`, so it wraps around the text that will be displayed on its surface.

The following demo shows how to create and style two basic buttons.
Notice that the second button cannot be clicked due to the `disabled` prop:

{{"demo": "UnstyledButtonsSimple.js"}}

### Anatomy

The Button component is composed of a root `<button>` slot with no interior slots:

```html
<button class="base-Button-root">
  <!-- button text goes here -->
</button>
```

### Custom structure

Use the `slots.root` prop to override the root slot with a custom element:

```jsx
<Button slots={{ root: 'div' }} />
```

:::info
The `slots` prop is available on all non-utility Base components.
See [Overriding component structure](/base-ui/guides/overriding-component-structure/) for full details.
:::

If you provide a non-interactive element such as a `<span>`, the Button component will automatically add the necessary accessibility attributes.

Compare the attributes on the `<span>` in this demo with the Button from the previous demo—try inspecting them both with your browser's dev tools:

{{"demo": "UnstyledButtonsSpan.js"}}

:::warning
If a Button is customized with a non-button element (for instance, `<Button slots={{ root: "span" }} />`), it will not submit the form it's in when clicked.
Similarly, `<Button slots={{ root: "span" }} type="reset">` will not reset its parent form.
:::

### Usage with TypeScript

In TypeScript, you can specify the custom component type used in the `slots.root` as a generic parameter of the unstyled component. This way, you can safely provide the custom root's props directly on the component:

```tsx
<Button<typeof CustomComponent> slots={{ root: CustomComponent }} customProp />
```

The same applies for props specific to custom primitive elements:

```tsx
<Button<'img'> slots={{ root: 'img' }} src="button.png" />
```

## Hook

```js
import { useButton } from '@mui/base/useButton';
```

The `useButton` hook lets you apply the functionality of a Button to a fully custom component.
It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#custom-structure), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

The following demo shows how to build the same buttons as those found in the [Component](#component) section above, but with the `useButton` hook:

{{"demo": "UseButton.js", "defaultCodeOpen": true}}

If you use a ref to store a reference to the button, pass it to the `useButton`'s `ref` parameter, as shown in the demo above.
It will get merged with a ref used internally in the hook.

:::warning
Do not add the `ref` parameter to the button element manually, as the correct ref is already a part of the object returned by the `getRootProps` function.
:::

## Customization

:::info
The following features can be used with both components and hooks.
For the sake of simplicity, demos, and code snippets primarily feature components.
:::

### Custom elements

The Button accepts a wide range of custom elements beyond HTML elements.
You can even use SVGs, as shown in the demo below:

{{"demo": "UnstyledButtonCustom.js", "defaultCodeOpen": false}}

### Using with links

The following demo illustrates how to use the Button as a link, whether using the Base UI Button itself for the `href`, or with the [Next.js Link component](https://nextjs.org/docs/pages/api-reference/components/link):

{{"demo": "UnstyledLinkButton.js", "defaultCodeOpen": true}}

### Focus on disabled buttons

Similarly to the native HTML `<button>` element, the Button component can't receive focus when it's disabled.
This may reduce its accessibility, as screen readers won't be able to announce the existence and state of the button.

The `focusableWhenDisabled` prop lets you change this behavior.
When this prop is set, the underlying Button does not set the `disabled` prop.
Instead, `aria-disabled` is used, which makes the Button focusable.

This should be used whenever the disabled Button needs to be read by screen readers.

Base UI uses this prop internally in [menu items](/base-ui/react-menu/), making it possible to use the keyboard to navigate to disabled items (in compliance with [ARIA guidelines](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#x6-7-focusability-of-disabled-controls)).

The following demo shows how the `focusableWhenDisabled` prop works—use the <kbd class="key">Tab</kbd> key to navigate within this document to see that only the second Button accepts the focus:

{{"demo": "UnstyledButtonsDisabledFocus.js"}}

The `focusableWhenDisabled` prop works the same when the root slot is customized, except that the `aria-disabled` attribute is used no regardless of the prop's state.
The ability to receive focus is controlled internally by the `tabindex` attribute.

{{"demo": "UnstyledButtonsDisabledFocusCustom.js"}}
