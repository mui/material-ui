---
product: base
title: Unstyled React Button component and hook
components: ButtonUnstyled
githubLabel: 'component: button'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
---

# Unstyled button

<p class="description">Buttons allow users to take actions and make choices with a single tap.</p>

## Introduction

`ButtonUnstyled` replaces the native HTML `<button>` element.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Anatomy

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

export default function MyApp() {
  return <ButtonUnstyled>{/* button text */}</ButtonUnstyled>;
}
```

### Basic usage

The following demo shows how to create and style two basic buttons.
Notice that the second button cannot be clicked due to the `disabled` prop:

{{"demo": "UnstyledButtonsSimple.js", "defaultCodeOpen": true}}

### Customizing the root element

By default, the `ButtonUnstyled` component renders a native `button` HTML element.
You can override this by setting the `component` or `components.Root` prop.

If you provide a non-interactive element such as a `<span>`, the `ButtonUnstyled` component will automatically add the necessary accessibility attributes.

Compare the attributes on the `<span>` in this demo with the `ButtonUnstyled` from the previous demo:

{{"demo": "UnstyledButtonsSpan.js"}}

### Complex customization

`ButtonUnstyled` accepts a wide range of custom elements beyond HTML elements.
You can even use SVGs, as the following demo illustrates:

{{"demo": "UnstyledButtonCustom.js", "defaultCodeOpen": false}}

### Focus on disabled buttons

Similarly to the native HTML `<button>` element, the `ButtonUnstyled` component can't receive focus when it's disabled.
This may reduce its accessibility, as screen readers won't be able to announce the existence and state of the button.

The `focusableWhenDisabled` prop lets you change this behavior.
When this prop is set, the underlying button does not set the `disabled` prop.
Instead, `aria-disabled` is used, which makes the button focusable.

This should be used whenever the disabled button needs to be read by screen readers.

MUI Base uses this prop internally in [menu items](/base/react-menu/), making it possible to use the keyboard to navigate to disabled items (in compliance with [ARIA guidelines](https://www.w3.org/TR/wai-aria-practices-1.2/#h-note-17)).

The following demo shows how the `focusableWhenDisabled` prop works—use the <kbd class="key">Tab</kbd> key to navigate within this document to see that only the second button accepts the focus:

{{"demo": "UnstyledButtonsDisabledFocus.js"}}

The `focusableWhenDisabled` prop works the same when the root slot is customized, except that the `aria-disabled` attribute is used no regardless of the prop's state.
The ability to receive focus is controlled internally by the `tabindex` attribute.

{{"demo": "UnstyledButtonsDisabledFocusCustom.js"}}

### Limitations

If a `ButtonUnstyled` is customized with a non-button element (i.e. `<ButtonUnstyled component="span" />`), it will not submit the form it's in when clicked.
Similarly, `<ButtonUnstyled component="span" type="reset">` will not reset its parent form.

## Hook

```js
import { useButton } from '@mui/base/ButtonUnstyled';
```

The `useButton` hook lets you use the functionality of `ButtonUnstyled` in other components.
It returns props to be placed on a custom button element, along with fields representing the internal state of the button.

The `useButton` hook requires the `ref` of the element it's used on.
Additionally, you need to provide the `component` prop (unless you intend to use the native HTML `<button>`).

The following demo shows how to build the same buttons from the [Basic usage section](#basic-usage) with the `useButton` hook:

{{"demo": "UseButton.js", "defaultCodeOpen": true}}
