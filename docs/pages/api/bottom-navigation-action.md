---
filename: /packages/material-ui/src/BottomNavigationAction/BottomNavigationAction.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# BottomNavigationAction API

<p class="description">The API documentation of the BottomNavigationAction React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// or
import { BottomNavigationAction } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">unsupportedProp</span> |  | This prop isn't supported. Use the `component` prop if you need to change the children structure. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--icon"></a><a href="#props--icon" class="prop-name">icon</a> | <span class="prop-type">node</span> |  | The icon element. |
| <a class="anchor-link" id="props--label"></a><a href="#props--label" class="prop-name">label</a> | <span class="prop-type">node</span> |  | The label element. |
| <a class="anchor-link" id="props--showLabel"></a><a href="#props--showLabel" class="prop-name">showLabel</a> | <span class="prop-type">bool</span> |  | If `true`, the `BottomNavigationAction` will show its label. By default, only the selected `BottomNavigationAction` inside `BottomNavigation` will show its label. |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" class="prop-name">value</a> | <span class="prop-type">any</span> |  | You can provide your own value. Otherwise, we fallback to the child position index. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

- Style sheet name: `MuiBottomNavigationAction`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiBottomNavigationAction-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--selected"></a><a href="#css--selected" class="prop-name">selected</a> | <span class="prop-name">.Mui-selected</span> | Pseudo-class applied to the root element if selected.
| <a class="anchor-link" id="css--iconOnly"></a><a href="#css--iconOnly" class="prop-name">iconOnly</a> | <span class="prop-name">.MuiBottomNavigationAction-iconOnly</span> | Pseudo-class applied to the root element if `showLabel={false}` and not selected.
| <a class="anchor-link" id="css--wrapper"></a><a href="#css--wrapper" class="prop-name">wrapper</a> | <span class="prop-name">.MuiBottomNavigationAction-wrapper</span> | Styles applied to the span element that wraps the icon and label.
| <a class="anchor-link" id="css--label"></a><a href="#css--label" class="prop-name">label</a> | <span class="prop-name">.MuiBottomNavigationAction-label</span> | Styles applied to the label's span element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/BottomNavigationAction/BottomNavigationAction.js) for more detail.

## Inheritance

The props of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Bottom Navigation](/components/bottom-navigation/)

