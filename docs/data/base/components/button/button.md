---
product: base
title: Unstyled React button
components: ButtonUnstyled
githubLabel: 'component: button'
waiAria: https://www.w3.org/TR/wai-aria-practices/#button
---

# Unstyled button

<p class="description">Buttons allow users to take actions and make choices with a single tap.</p>

## Basic usage

```js
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
```

{{"demo": "UnstyledButtonsSimple.js"}}

## Customizing the root element

By default, the `ButtonUnstyled` component renders a native `button` HTML element.
You can override this by setting the `component` or `components.Root` prop.
If you provide a non-interactive element, such as a `span`, the `ButtonUnstyled` component will automatically add the necessary accessibility attributes.

{{"demo": "UnstyledButtonsSpan.js"}}

Compare the attributes on the `span` with the `button` from the previous demo.

## Complex customization

In addition to HTML elements, you can also use SVGs with the `ButtonUnstyled` component.

{{"demo": "UnstyledButtonCustom.js"}}

## Focus of disabled buttons

Similarly to the native `<button>`, the `ButtonUnstyled` component can't receive focus when it's disabled.
This may reduce its accessibility, as screen readers won't be able to announce the existence and state of the button.
The `focusableWhenDisabled` prop lets you change this behavior.  
When this prop is set, the underlying button does not set the `disabled` prop.
Instead, `aria-disabled` is used, which makes the button focusable.

It should be used whenever the disabled buttons need to be read by screen readers.  
MUI Base uses this prop internally in [menu items](/base/react-menu).
It makes the keyboard navigation to disabled items possible (in compliance with [ARIA guidelines](https://www.w3.org/TR/wai-aria-practices-1.2/#h-note-17)).

{{"demo": "UnstyledButtonsDisabledFocus.js"}}

It works the same when the root slot is customized.
In this case, however, the `aria-disabled` attribute is used no matter the state of the `focusableWhenDisabled` prop.
The ability to receive focus is controlled internally by the `tabindex` attribute.

{{"demo": "UnstyledButtonsDisabledFocusCustom.js"}}

## useButton hook

```js
import { useButton } from '@mui/base/ButtonUnstyled';
```

The `useButton` hook lets you use the functionality of `ButtonUnstyled` in other components.
It returns props to be placed on a custom button element, along with fields representing the internal state of the button.

The `useButton` hook requires the `ref` of the element it's used on.
Additionally, you need to provide the `component` prop (unless you intend to use the plain `button`).

{{"demo": "UseButton.js"}}
