---
filename: /packages/material-ui/src/Chip/Chip.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Chip API

<p class="description">The API documentation of the Chip React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Chip from '@material-ui/core/Chip';
// or
import { Chip } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

Chips represent complex entities in small blocks, such as a contact.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--avatar"></a><a href="#props--avatar" class="prop-name">avatar</a> | <span class="prop-type">element</span> |  | Avatar element. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">unsupportedProp</span> |  | This prop isn't supported. Use the `component` prop if you need to change the children structure. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--clickable"></a><a href="#props--clickable" class="prop-name">clickable</a> | <span class="prop-type">bool</span> |  | If `true`, the chip will appear clickable, and will raise when pressed, even if the onClick prop is not defined. If false, the chip will not be clickable, even if onClick prop is defined. This can be used, for example, along with the component prop to indicate an anchor Chip is clickable. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" class="prop-name">color</a> | <span class="prop-type">'default'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">elementType</span> |  | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--deleteIcon"></a><a href="#props--deleteIcon" class="prop-name">deleteIcon</a> | <span class="prop-type">element</span> |  | Override the default delete icon element. Shown only if `onDelete` is set. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the chip should be displayed in a disabled state. |
| <a class="anchor-link" id="props--icon"></a><a href="#props--icon" class="prop-name">icon</a> | <span class="prop-type">element</span> |  | Icon element. |
| <a class="anchor-link" id="props--label"></a><a href="#props--label" class="prop-name">label</a> | <span class="prop-type">node</span> |  | The content of the label. |
| <a class="anchor-link" id="props--onDelete"></a><a href="#props--onDelete" class="prop-name">onDelete</a> | <span class="prop-type">func</span> |  | Callback function fired when the delete icon is clicked. If set, the delete icon will be shown. |
| <a class="anchor-link" id="props--size"></a><a href="#props--size" class="prop-name">size</a> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'</span> | <span class="prop-default">'medium'</span> | The size of the chip. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" class="prop-name">variant</a> | <span class="prop-type">'default'<br>&#124;&nbsp;'outlined'</span> | <span class="prop-default">'default'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiChip`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiChip-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--sizeSmall"></a><a href="#css--sizeSmall" class="prop-name">sizeSmall</a> | <span class="prop-name">.MuiChip-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <a class="anchor-link" id="css--colorPrimary"></a><a href="#css--colorPrimary" class="prop-name">colorPrimary</a> | <span class="prop-name">.MuiChip-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <a class="anchor-link" id="css--colorSecondary"></a><a href="#css--colorSecondary" class="prop-name">colorSecondary</a> | <span class="prop-name">.MuiChip-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <a class="anchor-link" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <a class="anchor-link" id="css--clickable"></a><a href="#css--clickable" class="prop-name">clickable</a> | <span class="prop-name">.MuiChip-clickable</span> | Styles applied to the root element if `onClick` is defined or `clickable={true}`.
| <a class="anchor-link" id="css--clickableColorPrimary"></a><a href="#css--clickableColorPrimary" class="prop-name">clickableColorPrimary</a> | <span class="prop-name">.MuiChip-clickableColorPrimary</span> | Styles applied to the root element if `onClick` and `color="primary"` is defined or `clickable={true}`.
| <a class="anchor-link" id="css--clickableColorSecondary"></a><a href="#css--clickableColorSecondary" class="prop-name">clickableColorSecondary</a> | <span class="prop-name">.MuiChip-clickableColorSecondary</span> | Styles applied to the root element if `onClick` and `color="secondary"` is defined or `clickable={true}`.
| <a class="anchor-link" id="css--deletable"></a><a href="#css--deletable" class="prop-name">deletable</a> | <span class="prop-name">.MuiChip-deletable</span> | Styles applied to the root element if `onDelete` is defined.
| <a class="anchor-link" id="css--deletableColorPrimary"></a><a href="#css--deletableColorPrimary" class="prop-name">deletableColorPrimary</a> | <span class="prop-name">.MuiChip-deletableColorPrimary</span> | Styles applied to the root element if `onDelete` and `color="primary"` is defined.
| <a class="anchor-link" id="css--deletableColorSecondary"></a><a href="#css--deletableColorSecondary" class="prop-name">deletableColorSecondary</a> | <span class="prop-name">.MuiChip-deletableColorSecondary</span> | Styles applied to the root element if `onDelete` and `color="secondary"` is defined.
| <a class="anchor-link" id="css--outlined"></a><a href="#css--outlined" class="prop-name">outlined</a> | <span class="prop-name">.MuiChip-outlined</span> | Styles applied to the root element if `variant="outlined"`.
| <a class="anchor-link" id="css--outlinedPrimary"></a><a href="#css--outlinedPrimary" class="prop-name">outlinedPrimary</a> | <span class="prop-name">.MuiChip-outlinedPrimary</span> | Styles applied to the root element if `variant="outlined"` and `color="primary"`.
| <a class="anchor-link" id="css--outlinedSecondary"></a><a href="#css--outlinedSecondary" class="prop-name">outlinedSecondary</a> | <span class="prop-name">.MuiChip-outlinedSecondary</span> | Styles applied to the root element if `variant="outlined"` and `color="secondary"`.
| <a class="anchor-link" id="css--avatar"></a><a href="#css--avatar" class="prop-name">avatar</a> | <span class="prop-name">.MuiChip-avatar</span> | Styles applied to the `avatar` element.
| <a class="anchor-link" id="css--avatarSmall"></a><a href="#css--avatarSmall" class="prop-name">avatarSmall</a> | <span class="prop-name">.MuiChip-avatarSmall</span> | Styles applied to the `avatar` element if `size="small"`.
| <a class="anchor-link" id="css--avatarColorPrimary"></a><a href="#css--avatarColorPrimary" class="prop-name">avatarColorPrimary</a> | <span class="prop-name">.MuiChip-avatarColorPrimary</span> | Styles applied to the `avatar` element if `color="primary"`.
| <a class="anchor-link" id="css--avatarColorSecondary"></a><a href="#css--avatarColorSecondary" class="prop-name">avatarColorSecondary</a> | <span class="prop-name">.MuiChip-avatarColorSecondary</span> | Styles applied to the `avatar` element if `color="secondary"`.
| <a class="anchor-link" id="css--icon"></a><a href="#css--icon" class="prop-name">icon</a> | <span class="prop-name">.MuiChip-icon</span> | Styles applied to the `icon` element.
| <a class="anchor-link" id="css--iconSmall"></a><a href="#css--iconSmall" class="prop-name">iconSmall</a> | <span class="prop-name">.MuiChip-iconSmall</span> | Styles applied to the `icon` element if `size="small"`.
| <a class="anchor-link" id="css--iconColorPrimary"></a><a href="#css--iconColorPrimary" class="prop-name">iconColorPrimary</a> | <span class="prop-name">.MuiChip-iconColorPrimary</span> | Styles applied to the `icon` element if `color="primary"`.
| <a class="anchor-link" id="css--iconColorSecondary"></a><a href="#css--iconColorSecondary" class="prop-name">iconColorSecondary</a> | <span class="prop-name">.MuiChip-iconColorSecondary</span> | Styles applied to the `icon` element if `color="secondary"`.
| <a class="anchor-link" id="css--label"></a><a href="#css--label" class="prop-name">label</a> | <span class="prop-name">.MuiChip-label</span> | Styles applied to the label `span` element`.
| <a class="anchor-link" id="css--labelSmall"></a><a href="#css--labelSmall" class="prop-name">labelSmall</a> | <span class="prop-name">.MuiChip-labelSmall</span> | 
| <a class="anchor-link" id="css--deleteIcon"></a><a href="#css--deleteIcon" class="prop-name">deleteIcon</a> | <span class="prop-name">.MuiChip-deleteIcon</span> | Styles applied to the `deleteIcon` element.
| <a class="anchor-link" id="css--deleteIconSmall"></a><a href="#css--deleteIconSmall" class="prop-name">deleteIconSmall</a> | <span class="prop-name">.MuiChip-deleteIconSmall</span> | Styles applied to the `deleteIcon` element if `size="small"`.
| <a class="anchor-link" id="css--deleteIconColorPrimary"></a><a href="#css--deleteIconColorPrimary" class="prop-name">deleteIconColorPrimary</a> | <span class="prop-name">.MuiChip-deleteIconColorPrimary</span> | Styles applied to the deleteIcon element if `color="primary"` and `variant="default"`.
| <a class="anchor-link" id="css--deleteIconColorSecondary"></a><a href="#css--deleteIconColorSecondary" class="prop-name">deleteIconColorSecondary</a> | <span class="prop-name">.MuiChip-deleteIconColorSecondary</span> | Styles applied to the deleteIcon element if `color="secondary"` and `variant="default"`.
| <a class="anchor-link" id="css--deleteIconOutlinedColorPrimary"></a><a href="#css--deleteIconOutlinedColorPrimary" class="prop-name">deleteIconOutlinedColorPrimary</a> | <span class="prop-name">.MuiChip-deleteIconOutlinedColorPrimary</span> | Styles applied to the deleteIcon element if `color="primary"` and `variant="outlined"`.
| <a class="anchor-link" id="css--deleteIconOutlinedColorSecondary"></a><a href="#css--deleteIconOutlinedColorSecondary" class="prop-name">deleteIconOutlinedColorSecondary</a> | <span class="prop-name">.MuiChip-deleteIconOutlinedColorSecondary</span> | Styles applied to the deleteIcon element if `color="secondary"` and `variant="outlined"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Chip/Chip.js) for more detail.

## Demos

- [Chips](/components/chips/)

