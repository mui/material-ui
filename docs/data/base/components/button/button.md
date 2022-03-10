---
product: base
title: React button unstyled
components: ButtonUnstyled
githubLabel: 'component: button'
waiAria: https://www.w3.org/TR/wai-aria-practices/#button
---

# Button unstyled

<p class="description">Buttons allow users to take actions, and make choices, with a single tap.</p>

## Basic usage

```js
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
```

{{"demo": "UnstyledButtonsSimple.js"}}

## Customizing the root element

By default, the `ButtonUnstyled` renders a native `button` element.
You are free to override this by setting the `component` or `components.Root` prop.
If a non-interactive element (such as a span) is provided this way, the `ButtonUnstyled` will take care of adding accessibility attributes.

{{"demo": "UnstyledButtonsSpan.js"}}

Compare the attributes on the span with the button from the previous demo.

## Complex customization

You are not limited to using HTML elements for the button structure.
SVG elements, even with complex structure, are equally acceptable.

{{"demo": "UnstyledButtonCustom.js"}}

## useButton hook

```js
import { useButton } from '@mui/base/ButtonUnstyled';
```

If you need to use Button's functionality in another component, you can use the `useButton` hook.
It returns props to be placed on a custom button element and fields representing the internal state of the button.

The `useButton` hook requires the ref of the element it'll be used on.
Additionally, you need to provide the `component` prop (unless you intend to use the plain `button`).

{{"demo": "UseButton.js"}}
