---
product: base
title: 无样式的 React 按钮
components: ButtonUnstyled
githubLabel: 'component: button'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#button'
---

# 无样式的按钮

<p class="description">按钮允许用户在单次点击时采取行动和作出选择。</p>

## 基本用法

```js
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
```

{{"demo": "UnstyledButtonsSimple.js"}}

## 自定义根元素

默认情况下， `ButtonUnstyled` 组件会渲染原生的 `button ` HTML 元素。 您可以通过设置`component` 或`components.Root` 属性来覆盖这个组件. 如果您提供了一个非交互元素，如 `span`，则 ` ButtonUnstyled ` 组件将自动添加必要的辅助属性。

{{"demo": "UnstyledButtonsSpan.js"}}

Compare the attributes on the `span` with the `button` from the previous demo.

## 复杂的定制

In addition to HTML elements, you can also use SVGs with the `ButtonUnstyled` component.

{{"demo": "UnstyledButtonCustom.js"}}

## useButton hook

```js
import { useButton } from '@mui/base/ButtonUnstyled';
```

`useButton` hook 允许您在其他组件中使用 `ButtonUnstyled` 的功能。 It returns props to be placed on a custom button element, along with fields representing the internal state of the button.

The `useButton` hook requires the `ref` of the element it's used on. Additionally, you need to provide the `component` prop (unless you intend to use the plain `button`).

{{"demo": "UseButton.js"}}
