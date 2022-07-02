---
product: base
title: Unstyled React Button component and hook
components: ButtonUnstyled
githubLabel: 'component: button'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
---

# 无样式的按钮

<p class="description">按钮允许用户在单次点击时采取行动和作出选择。</p>

## Basic button

```js
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

<ButtonUnstyled>Button</ButtonUnstyled>;
```

{{"demo": "UnstyledButtonsSimple.js", "defaultCodeOpen": true}}

## 自定义根元素

默认情况下， `ButtonUnstyled` 组件会渲染原生的 `button ` HTML 元素。 您可以通过设置`component` 或`components.Root` 属性来覆盖这个组件.

If you provide a non-interactive element such as a `<span>`, the `ButtonUnstyled` component will automatically add the necessary accessibility attributes.

Compare the attributes on the `<span>` in this demo with the `ButtonUnstyled` from the previous demo:

{{"demo": "UnstyledButtonsSpan.js"}}

### Complex customization

`ButtonUnstyled` accepts a wide range of custom elements beyond HTML elements. You can even use SVGs, as the following demo illustrates:

{{"demo": "UnstyledButtonCustom.js", "defaultCodeOpen": false}}

## Focus on disabled buttons

Similarly to the native HTML `<button>` element, the `ButtonUnstyled` component can't receive focus when it's disabled. This may reduce its accessibility, as screen readers won't be able to announce the existence and state of the button.

The `focusableWhenDisabled` prop lets you change this behavior. When this prop is set, the underlying button does not set the `disabled` prop. Instead, `aria-disabled` is used, which makes the button focusable.

This should be used whenever the disabled button needs to be read by screen readers.

MUI Base uses this prop internally in [menu items](/base/react-menu/), making it possible to use the keyboard to navigate to disabled items (in compliance with [ARIA guidelines](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#x6-7-focusability-of-disabled-controls)).

{{"demo": "UnstyledButtonsDisabledFocus.js"}}

The `focusWhenDisabled` prop works the same when the root slot is customized, except that the `aria-disabled` attribute is used no regardless of the prop's state. The ability to receive focus is controlled internally by the `tabindex` attribute.

{{"demo": "UnstyledButtonsDisabledFocusCustom.js"}}

## The useButton hook

```js
import { useButton } from '@mui/base/ButtonUnstyled';
```

The `useButton` hook lets you use the functionality of `ButtonUnstyled` in other components. It returns props to be placed on a custom button element, along with fields representing the internal state of the button.

The `useButton` hook requires the `ref` of the element it's used on. Additionally, you need to provide the `component` prop (unless you intend to use the native HTML `<button>`).

{{"demo": "UseButton.js", "defaultCodeOpen": true}}

## Limitations

If a `ButtonUnstyled` is customized with a non-button element (i.e. `<ButtonUnstyled component="span" />`), it will not submit the form it's in when clicked. Similarly, `<ButtonUnstyled component="span" type="reset">` will not reset its parent form.
