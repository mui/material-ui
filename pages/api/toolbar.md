---
filename: /packages/material-ui/src/Toolbar/Toolbar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Toolbar API

<p class="description">The API documentation of the Toolbar React component. Learn more about the properties and the CSS customization points.</p>

```js
import Toolbar from '@material-ui/core/Toolbar';
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

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">gutters</span> | Styles applied to the root element if `disableGutters={false}`.
| <span class="prop-name">regular</span> | Styles applied to the root element if `variant="regular"`.
| <span class="prop-name">dense</span> | Styles applied to the root element if `variant="dense"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Toolbar/Toolbar.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiToolbar`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [App Bar](/components/app-bar/)

