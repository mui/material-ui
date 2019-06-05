---
filename: /packages/material-ui/src/DialogContent/DialogContent.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# DialogContent API

<p class="description">The API documentation of the DialogContent React component. Learn more about the properties and the CSS customization points.</p>

```js
import DialogContent from '@material-ui/core/DialogContent';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">dividers</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Display the top and bottom dividers. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">dividers</span> | Styles applied to the root element if `dividers={true}`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/DialogContent/DialogContent.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiDialogContent`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Dialogs](/components/dialogs/)

