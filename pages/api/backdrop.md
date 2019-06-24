---
filename: /packages/material-ui/src/Backdrop/Backdrop.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Backdrop API

<p class="description">The API documentation of the Backdrop React component. Learn more about the properties and the CSS customization points.</p>

```js
import Backdrop from '@material-ui/core/Backdrop';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">invisible</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the backdrop is invisible. It can be used when rendering a popover or a custom select component. |
| <span class="prop-name required">open&nbsp;*</span> | <span class="prop-type">bool</span> |  | If `true`, the backdrop is open. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }<br></span> |  | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">invisible</span> | Styles applied to the root element if `invisible={true}`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Backdrop/Backdrop.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiBackdrop`.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

