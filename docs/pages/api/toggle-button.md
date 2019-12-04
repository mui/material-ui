---
filename: /packages/material-ui-lab/src/ToggleButton/ToggleButton.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ToggleButton API

<p class="description">The API documentation of the ToggleButton React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ToggleButton from '@material-ui/lab/ToggleButton';
// or
import { ToggleButton } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">node</span> |  | The content of the button. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" title="link to the prop on this page" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button will be disabled. |
| <a class="anchor-link" id="props--disableFocusRipple"></a><a href="#props--disableFocusRipple" title="link to the prop on this page" class="prop-name">disableFocusRipple</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the  keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| <a class="anchor-link" id="props--disableRipple"></a><a href="#props--disableRipple" title="link to the prop on this page" class="prop-name">disableRipple</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the ripple effect will be disabled. |
| <a class="anchor-link" id="props--selected"></a><a href="#props--selected" title="link to the prop on this page" class="prop-name">selected</a> | <span class="prop-type">bool</span> |  | If `true`, the button will be rendered in an active state. |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" title="link to the prop on this page" class="prop-name required">value&nbsp;*</a> | <span class="prop-type">any</span> |  | The value to associate with the button when selected in a ToggleButtonGroup. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

- Style sheet name: `MuiToggleButton`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiToggleButton-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--selected"></a><a href="#css--selected" class="prop-name">selected</a> | <span class="prop-name">.Mui-selected</span> | Pseudo-class applied to the root element if `selected={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--label"></a><a href="#css--label" class="prop-name">label</a> | <span class="prop-name">.MuiToggleButton-label</span> | Styles applied to the `label` wrapper element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--sizeSmall"></a><a href="#css--sizeSmall" class="prop-name">sizeSmall</a> | <span class="prop-name">.MuiToggleButton-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--sizeLarge"></a><a href="#css--sizeLarge" class="prop-name">sizeLarge</a> | <span class="prop-name">.MuiToggleButton-sizeLarge</span> | Styles applied to the root element if `size="large"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/ToggleButton/ToggleButton.js) for more detail.

## Inheritance

The props of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Toggle Button](/components/toggle-button/)

