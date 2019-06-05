---
filename: /packages/material-ui/src/Avatar/Avatar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Avatar API

<p class="description">The API documentation of the Avatar React component. Learn more about the properties and the CSS customization points.</p>

```js
import Avatar from '@material-ui/core/Avatar';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">alt</span> | <span class="prop-type">string</span> |  | Used in combination with `src` or `srcSet` to provide an alt attribute for the rendered `img` element. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Used to render icon or text elements inside the Avatar. `src` and `alt` props will not be used and no `img` will be rendered by default.<br>This can be an element, or just a string. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">imgProps</span> | <span class="prop-type">object</span> |  | Attributes applied to the `img` element if the component is used to display an image. |
| <span class="prop-name">sizes</span> | <span class="prop-type">string</span> |  | The `sizes` attribute for the `img` element. |
| <span class="prop-name">src</span> | <span class="prop-type">string</span> |  | The `src` attribute for the `img` element. |
| <span class="prop-name">srcSet</span> | <span class="prop-type">string</span> |  | The `srcSet` attribute for the `img` element. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">colorDefault</span> | Styles applied to the root element if there are children and not `src` or `srcSet`.
| <span class="prop-name">img</span> | Styles applied to the img element if either `src` or `srcSet` is defined.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Avatar/Avatar.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiAvatar`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Avatars](/components/avatars/)

