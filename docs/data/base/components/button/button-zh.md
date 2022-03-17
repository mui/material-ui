---
product: base
title: 未风格React按钮
components: ButtonUnstyled
githubLabel: '组件：按钮'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#button'
---

# 未风格按钮

<p class="description">按钮允许用户在单次点击时采取行动和作出选择。</p>

## Basic usage

```js
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
```

{{"demo": "UnstyledButtonsSimple.js"}}

## Customizing the root element

By default, the `ButtonUnstyled` component renders a native `button` HTML element. You can override this by setting the `component` or `components.Root` prop. If you provide a non-interactive element, such as a `span`, the `ButtonUnstyled` component will automatically add the necessary accessibility attributes.

{{"demo": "UnstyledButtonsSpan.js"}}

Compare the attributes on the `span` with the `button` from the previous demo.

## Complex customization

In addition to HTML elements, you can also use SVGs with the `ButtonUnstyled` component.

{{"demo": "UnstyledButtonCustom.js"}}

## useButton hook

```js
import { useButton } from '@mui/base/ButtonUnstyled';
```

The `useButton` hook lets you use the functionality of `ButtonUnstyled` in other components. It returns props to be placed on a custom button element, along with fields representing the internal state of the button.

The `useButton` hook requires the `ref` of the element it's used on. Additionally, you need to provide the `component` prop (unless you intend to use the plain `button`).

{{"demo": "UseButton.js"}}
