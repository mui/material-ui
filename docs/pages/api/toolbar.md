---
filename: /packages/material-ui/src/Toolbar/Toolbar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Toolbar API

<p class="description">The API documentation of the Toolbar React component. Learn more about the properties and the CSS customization points.</p>

```js
import { Toolbar } from '@material-ui/core';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disableGutters</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, disables gutter padding. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'regular'&nbsp;&#124;<br>&nbsp;'dense'<br></span> | <span class="prop-default">'regular'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiToolbar`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiToolbar-root</span> | Styles applied to the root element.
| <span class="prop-name">gutters</span> | <span class="prop-name">MuiToolbar-gutters</span> | Styles applied to the root element if `disableGutters={false}`.
| <span class="prop-name">regular</span> | <span class="prop-name">MuiToolbar-regular</span> | Styles applied to the root element if `variant="regular"`.
| <span class="prop-name">dense</span> | <span class="prop-name">MuiToolbar-dense</span> | Styles applied to the root element if `variant="dense"`.

You can override the style of the component thanks to one of these customizability points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If it's not enough, you can find the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Toolbar/Toolbar.js) for more detail.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [App Bar](/components/app-bar/)

