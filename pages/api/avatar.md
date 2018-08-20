---
filename: /packages/material-ui/src/Avatar/Avatar.js
title: Avatar API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Avatar

<p class="description">The API documentation of the Avatar React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">alt</span> | <span class="prop-type">string |   | Used in combination with `src` or `srcSet` to provide an alt attribute for the rendered `img` element. |
| <span class="prop-name">children</span> | <span class="prop-type">node |   | Used to render icon or text elements inside the Avatar. `src` and `alt` props will not be used and no `img` will be rendered by default.<br>This can be an element, or just a string. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">imgProps</span> | <span class="prop-type">object |   | Attributes applied to the `img` element if the component is used to display an image. |
| <span class="prop-name">sizes</span> | <span class="prop-type">string |   | The `sizes` attribute for the `img` element. |
| <span class="prop-name">src</span> | <span class="prop-type">string |   | The `src` attribute for the `img` element. |
| <span class="prop-name">srcSet</span> | <span class="prop-type">string |   | The `srcSet` attribute for the `img` element. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">colorDefault</span> | Styles applied to the root element if `color="default"`.
| <span class="prop-name">img</span> | Styles applied to the img element if either `src` or `srcSet` is defined.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Avatar/Avatar.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiAvatar`.

## Demos

- [Avatars](/demos/avatars)

