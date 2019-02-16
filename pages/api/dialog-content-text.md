---
filename: /packages/material-ui/src/DialogContentText/DialogContentText.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# DialogContentText API

<p class="description">The API documentation of the DialogContentText React component. Learn more about the properties and the CSS customization points.</p>

```js
import DialogContentText from '@material-ui/core/DialogContentText';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |   | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |   | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

Any other properties supplied will be spread to the root element ([Typography](/api/typography/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.

Have a look at [overriding with classes](/customization/overrides/#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/DialogContentText/DialogContentText.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiDialogContentText`.

## Inheritance

The properties of the [Typography](/api/typography/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Dialogs](/demos/dialogs/)

