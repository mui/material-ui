---
filename: /packages/material-ui/src/Card/Card.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Card API

<p class="description">The API documentation of the Card React component. Learn more about the properties and the CSS customization points.</p>

```js
import Card from '@material-ui/core/Card';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">raised</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the card will use raised styling. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Card/Card.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiCard`.

## Inheritance

The properties of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Cards](/components/cards/)

