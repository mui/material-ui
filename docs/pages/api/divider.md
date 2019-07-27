---
filename: /packages/material-ui/src/Divider/Divider.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Divider API

<p class="description">The API documentation of the Divider React component. Learn more about the properties and the CSS customization points.</p>

```js
import { Divider } from '@material-ui/core';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">absolute</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Absolutely position the element. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'hr'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">light</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the divider will have a lighter color. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'fullWidth'&nbsp;&#124;<br>&nbsp;'inset'&nbsp;&#124;<br>&nbsp;'middle'<br></span> | <span class="prop-default">'fullWidth'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiDivider`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiDivider-root</span> | Styles applied to the root element.
| <span class="prop-name">absolute</span> | <span class="prop-name">MuiDivider-absolute</span> | Styles applied to the root element if `absolute={true}`.
| <span class="prop-name">inset</span> | <span class="prop-name">MuiDivider-inset</span> | Styles applied to the root element if `variant="inset"`.
| <span class="prop-name">light</span> | <span class="prop-name">MuiDivider-light</span> | Styles applied to the root element if `light={true}`.
| <span class="prop-name">middle</span> | <span class="prop-name">MuiDivider-middle</span> | Styles applied to the root element if `variant="middle"`.

You can override the style of the component thanks to one of these customizability points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If it's not enough, you can find the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Divider/Divider.js) for more detail.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Dividers](/components/dividers/)
- [Lists](/components/lists/)

