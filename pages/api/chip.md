---
filename: /packages/material-ui/src/Chip/Chip.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Chip API

<p class="description">The API documentation of the Chip React component. Learn more about the properties and the CSS customization points.</p>

```js
import Chip from '@material-ui/core/Chip';
```

Chips represent complex entities in small blocks, such as a contact.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">avatar</span> | <span class="prop-type">element</span> |  | Avatar element. |
| <span class="prop-name">children</span> | <span class="prop-type">unsupportedProp</span> |  | This property isn't supported. Use the `component` property if you need to change the children structure. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">clickable</span> | <span class="prop-type">bool</span> |  | If true, the chip will appear clickable, and will raise when pressed, even if the onClick property is not defined. If false, the chip will not be clickable, even if onClick property is defined. This can be used, for example, along with the component property to indicate an anchor Chip is clickable. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'secondary'<br></span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">deleteIcon</span> | <span class="prop-type">element</span> |  | Override the default delete icon element. Shown only if `onDelete` is set. |
| <span class="prop-name">icon</span> | <span class="prop-type">element</span> |  | Icon element. |
| <span class="prop-name">label</span> | <span class="prop-type">node</span> |  | The content of the label. |
| <span class="prop-name">onDelete</span> | <span class="prop-type">func</span> |  | Callback function fired when the delete icon is clicked. If set, the delete icon will be shown. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'outlined'<br></span> | <span class="prop-default">'default'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">clickable</span> | Styles applied to the root element if `onClick` is defined or `clickable={true}`.
| <span class="prop-name">clickableColorPrimary</span> | Styles applied to the root element if `onClick` and `color="primary"` is defined or `clickable={true}`.
| <span class="prop-name">clickableColorSecondary</span> | Styles applied to the root element if `onClick` and `color="secondary"` is defined or `clickable={true}`.
| <span class="prop-name">deletable</span> | Styles applied to the root element if `onDelete` is defined.
| <span class="prop-name">deletableColorPrimary</span> | Styles applied to the root element if `onDelete` and `color="primary"` is defined.
| <span class="prop-name">deletableColorSecondary</span> | Styles applied to the root element if `onDelete` and `color="secondary"` is defined.
| <span class="prop-name">outlined</span> | Styles applied to the root element if `variant="outlined"`.
| <span class="prop-name">outlinedPrimary</span> | Styles applied to the root element if `variant="outlined"` and `color="primary"`.
| <span class="prop-name">outlinedSecondary</span> | Styles applied to the root element if `variant="outlined"` and `color="secondary"`.
| <span class="prop-name">avatar</span> | Styles applied to the `avatar` element.
| <span class="prop-name">avatarColorPrimary</span> | Styles applied to the `avatar` element if `color="primary"`.
| <span class="prop-name">avatarColorSecondary</span> | Styles applied to the `avatar` element if `color="secondary"`.
| <span class="prop-name">avatarChildren</span> | Styles applied to the `avatar` elements children.
| <span class="prop-name">icon</span> | Styles applied to the `icon` element.
| <span class="prop-name">iconColorPrimary</span> | Styles applied to the `icon` element if `color="primary"`.
| <span class="prop-name">iconColorSecondary</span> | Styles applied to the `icon` element if `color="secondary"`.
| <span class="prop-name">label</span> | Styles applied to the label `span` element`.
| <span class="prop-name">deleteIcon</span> | Styles applied to the `deleteIcon` element.
| <span class="prop-name">deleteIconColorPrimary</span> | Styles applied to the deleteIcon element if `color="primary"` and `variant="default"`.
| <span class="prop-name">deleteIconColorSecondary</span> | Styles applied to the deleteIcon element if `color="secondary"` and `variant="default"`.
| <span class="prop-name">deleteIconOutlinedColorPrimary</span> | Styles applied to the deleteIcon element if `color="primary"` and `variant="outlined"`.
| <span class="prop-name">deleteIconOutlinedColorSecondary</span> | Styles applied to the deleteIcon element if `color="secondary"` and `variant="outlined"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Chip/Chip.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiChip`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Chips](/components/chips/)

