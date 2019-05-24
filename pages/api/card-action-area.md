---
filename: /packages/material-ui/src/CardActionArea/CardActionArea.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# CardActionArea API

<p class="description">The API documentation of the CardActionArea React component. Learn more about the properties and the CSS customization points.</p>

```js
import CardActionArea from '@material-ui/core/CardActionArea';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">focusVisible</span> | Styles applied to the ButtonBase root element if the action area is keyboard focused.
| <span class="prop-name">focusHighlight</span> | Styles applied to the overlay that covers the action area when it is keyboard focused.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/CardActionArea/CardActionArea.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiCardActionArea`.

## Inheritance

The properties of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Cards](/components/cards/)

