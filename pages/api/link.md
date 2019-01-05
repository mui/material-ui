---
filename: /packages/material-ui/src/Link/Link.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Link API

<p class="description">The API documentation of the Link React component. Learn more about the properties and the CSS customization points.</p>

```js
import Link from '@material-ui/core/Link';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">string</span> |   | The content of the link. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'default', 'error', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary'<br></span> | <span class="prop-default">'primary'</span> | The color of the link. |
| <span class="prop-name">component</span> | <span class="prop-type">componentPropType</span> | <span class="prop-default">'a'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">TypographyClasses</span> | <span class="prop-type">object</span> |   | `classes` property applied to the [`Typography`](/api/typography/) element. |

Any other properties supplied will be spread to the root element ([Typography](/api/typography/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.

Have a look at [overriding with classes](/customization/overrides/#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Link/Link.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiLink`.

## Inheritance

The properties of the [Typography](/api/typography/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Links](/style/links/)

