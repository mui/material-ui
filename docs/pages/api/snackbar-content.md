---
filename: /packages/material-ui/src/SnackbarContent/SnackbarContent.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SnackbarContent API

<p class="description">The API documentation of the SnackbarContent React component. Learn more about the properties and the CSS customization points.</p>

```js
import SnackbarContent from '@material-ui/core/SnackbarContent';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">action</span> | <span class="prop-type">node</span> |  | The action to display. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">message</span> | <span class="prop-type">node</span> |  | The message to display. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">message</span> | Styles applied to the message wrapper element.
| <span class="prop-name">action</span> | Styles applied to the action wrapper element if `action` is provided.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/SnackbarContent/SnackbarContent.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiSnackbarContent`.

## Inheritance

The properties of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Snackbars](/components/snackbars/)

