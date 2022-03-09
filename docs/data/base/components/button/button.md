---
product: base
title: React button unstyled component and hook
components: ButtonUnstyled
githubLabel: 'component: button'
---

# Button unstyled

<p class="description">Buttons allow users to take actions, and make choices, with a single tap.</p>

## Basic usage

```js
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
```

{{"demo": "UnstyledButtonsSimple.js", "defaultCodeOpen": false }}

## Customization

### Slots

The ButtonUnstyled has one slot, the root.
It renders native `button` element by default.
Can be customized by using the `component` or `components.Root` props. If a non-interactive element (such as a span) is provided this way, the `ButtonUnstyled` will take care of adding accessibility attributes.

{{"demo": "UnstyledButtonsSpan.js", "defaultCodeOpen": false}}

Compare the attributes on the span with the button from the previous demo.

### CSS classes

The ButtonUnstyled can set the following class:

- `Mui-active` - set when the Button is pressed.
- `Mui-disabled` - set when the Button has the `disabled` prop.
- `Mui-focusVisible` - set when the ButtonUnstyled is highligthed via keyboard navigation.
  This is a polyfill for the native `:focus-visible` pseudoclass as it's not available in Safari.

## Complex customization

You are not limited to using HTML elements for the button structure.
SVG elements, even with complex structure, are equally acceptable.

{{"demo": "UnstyledButtonCustom.js", "defaultCodeOpen": false}}

## `useButton` hook

If you need to use Button's functionality in another component, you can use the `useButton` hook.
It returns props to be placed on a custom button element and fields representing the internal state of the button.

The `useButton` hook requires the ref of the element it'll be used on.
Additionally, you need to provide the `component` prop (unless you intend to use the plain `button`).

{{"demo": "UseButton.js", "defaultCodeOpen": false}}
