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

## Focus of disabled buttons

Similarly to the native `<button>`, the `ButtonUnstyled` component can't receive focus when it's disabled. This may reduce its accessibility, as screen readers won't be able to announce the existence and state of the button. The `focusableWhenDisabled` prop lets you change this behavior.  
When this prop is set, the underlying button does not set the `disabled` prop. Instead, `aria-disabled` is used, which makes the button focusable.

It should be used whenever the disabled buttons need to be read by screen readers.  
MUI Base uses this prop internally in [menu items](/base/react-menu). It makes the keyboard navigation to disabled items possible (in compliance with [ARIA guidelines](https://www.w3.org/TR/wai-aria-practices-1.2/#h-note-17)).

{{"demo": "UnstyledButtonsDisabledFocus.js"}}

It works the same when the root slot is customized. In this case, however, the `aria-disabled` attribute is used no matter the state of the `focusableWhenDisabled` prop. The ability to receive focus is controlled internally by the `tabindex` attribute.

{{"demo": "UnstyledButtonsDisabledFocusCustom.js"}}

## useButton hook

```js
import { useButton } from '@mui/base/ButtonUnstyled';
```

The `useButton` hook lets you use the functionality of `ButtonUnstyled` in other components. It returns props to be placed on a custom button element, along with fields representing the internal state of the button.

The `useButton` hook requires the `ref` of the element it's used on. Additionally, you need to provide the `component` prop (unless you intend to use the plain `button`).

{{"demo": "UseButton.js"}}
