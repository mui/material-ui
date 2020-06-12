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

## Component name

The `MuiChip` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">avatar</span> | <span class="prop-type">element</span> |  | Avatar element. |
| <span class="prop-name">children</span> | <span class="prop-type">unsupportedProp</span> |  | This prop isn't supported. Use the `component` prop if you need to change the children structure. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">clickable</span> | <span class="prop-type">bool</span> |  | If `true`, the chip will appear clickable, and will raise when pressed, even if the onClick prop is not defined. If false, the chip will not be clickable, even if onClick prop is defined. This can be used, for example, along with the component prop to indicate an anchor Chip is clickable. |
| <span class="prop-name">color</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> |  | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">deleteIcon</span> | <span class="prop-type">element</span> |  | Override the default delete icon element. Shown only if `onDelete` is set. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the chip should be displayed in a disabled state. |
| <span class="prop-name">icon</span> | <span class="prop-type">element</span> |  | Icon element. |
| <span class="prop-name">label</span> | <span class="prop-type">node</span> |  | The content of the label. |
| <span class="prop-name">onDelete</span> | <span class="prop-type">func</span> |  | Callback function fired when the delete icon is clicked. If set, the delete icon will be shown. |
| <span class="prop-name">size</span> | <span class="prop-type">'medium'<br>&#124;&nbsp;'small'</span> | <span class="prop-default">'medium'</span> | The size of the chip. |
| <span class="prop-name">variant</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'outlined'</span> | <span class="prop-default">'default'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiChip-root</span> | Styles applied to the root element.
| <span class="prop-name">sizeSmall</span> | <span class="prop-name">.MuiChip-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <span class="prop-name">colorPrimary</span> | <span class="prop-name">.MuiChip-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | <span class="prop-name">.MuiChip-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">clickable</span> | <span class="prop-name">.MuiChip-clickable</span> | Styles applied to the root element if `onClick` is defined or `clickable={true}`.
| <span class="prop-name">clickableColorPrimary</span> | <span class="prop-name">.MuiChip-clickableColorPrimary</span> | Styles applied to the root element if `onClick` and `color="primary"` is defined or `clickable={true}`.
| <span class="prop-name">clickableColorSecondary</span> | <span class="prop-name">.MuiChip-clickableColorSecondary</span> | Styles applied to the root element if `onClick` and `color="secondary"` is defined or `clickable={true}`.
| <span class="prop-name">deletable</span> | <span class="prop-name">.MuiChip-deletable</span> | Styles applied to the root element if `onDelete` is defined.
| <span class="prop-name">deletableColorPrimary</span> | <span class="prop-name">.MuiChip-deletableColorPrimary</span> | Styles applied to the root element if `onDelete` and `color="primary"` is defined.
| <span class="prop-name">deletableColorSecondary</span> | <span class="prop-name">.MuiChip-deletableColorSecondary</span> | Styles applied to the root element if `onDelete` and `color="secondary"` is defined.
| <span class="prop-name">outlined</span> | <span class="prop-name">.MuiChip-outlined</span> | Styles applied to the root element if `variant="outlined"`.
| <span class="prop-name">outlinedPrimary</span> | <span class="prop-name">.MuiChip-outlinedPrimary</span> | Styles applied to the root element if `variant="outlined"` and `color="primary"`.
| <span class="prop-name">outlinedSecondary</span> | <span class="prop-name">.MuiChip-outlinedSecondary</span> | Styles applied to the root element if `variant="outlined"` and `color="secondary"`.
| <span class="prop-name">avatar</span> | <span class="prop-name">.MuiChip-avatar</span> | Styles applied to the `avatar` element.
| <span class="prop-name">avatarSmall</span> | <span class="prop-name">.MuiChip-avatarSmall</span> | Styles applied to the `avatar` element if `size="small"`.
| <span class="prop-name">avatarColorPrimary</span> | <span class="prop-name">.MuiChip-avatarColorPrimary</span> | Styles applied to the `avatar` element if `color="primary"`.
| <span class="prop-name">avatarColorSecondary</span> | <span class="prop-name">.MuiChip-avatarColorSecondary</span> | Styles applied to the `avatar` element if `color="secondary"`.
| <span class="prop-name">icon</span> | <span class="prop-name">.MuiChip-icon</span> | Styles applied to the `icon` element.
| <span class="prop-name">iconSmall</span> | <span class="prop-name">.MuiChip-iconSmall</span> | Styles applied to the `icon` element if `size="small"`.
| <span class="prop-name">iconColorPrimary</span> | <span class="prop-name">.MuiChip-iconColorPrimary</span> | Styles applied to the `icon` element if `color="primary"`.
| <span class="prop-name">iconColorSecondary</span> | <span class="prop-name">.MuiChip-iconColorSecondary</span> | Styles applied to the `icon` element if `color="secondary"`.
| <span class="prop-name">label</span> | <span class="prop-name">.MuiChip-label</span> | Styles applied to the label `span` element.
| <span class="prop-name">labelSmall</span> | <span class="prop-name">.MuiChip-labelSmall</span> | Styles applied to the label `span` element if `size="small"`.
| <span class="prop-name">deleteIcon</span> | <span class="prop-name">.MuiChip-deleteIcon</span> | Styles applied to the `deleteIcon` element.
| <span class="prop-name">deleteIconSmall</span> | <span class="prop-name">.MuiChip-deleteIconSmall</span> | Styles applied to the `deleteIcon` element if `size="small"`.
| <span class="prop-name">deleteIconColorPrimary</span> | <span class="prop-name">.MuiChip-deleteIconColorPrimary</span> | Styles applied to the deleteIcon element if `color="primary"` and `variant="default"`.
| <span class="prop-name">deleteIconColorSecondary</span> | <span class="prop-name">.MuiChip-deleteIconColorSecondary</span> | Styles applied to the deleteIcon element if `color="secondary"` and `variant="default"`.
| <span class="prop-name">deleteIconOutlinedColorPrimary</span> | <span class="prop-name">.MuiChip-deleteIconOutlinedColorPrimary</span> | Styles applied to the deleteIcon element if `color="primary"` and `variant="outlined"`.
| <span class="prop-name">deleteIconOutlinedColorSecondary</span> | <span class="prop-name">.MuiChip-deleteIconOutlinedColorSecondary</span> | Styles applied to the deleteIcon element if `color="secondary"` and `variant="outlined"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Chip/Chip.js) for more detail.

## Demos

- [Chips](/components/chips/)

