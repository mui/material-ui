---
filename: /packages/material-ui/src/Divider/Divider.js
title: Divider API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Divider

<p class="description">The API documentation of the Divider React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">absolute</span> | <span class="prop-type">bool | <span class="prop-default">false</span> |  |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">'hr'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">inset</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the divider will be indented. |
| <span class="prop-name">light</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the divider will have a lighter color. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">absolute</span> | Styles applied to the root element if `absolute={true}`.
| <span class="prop-name">inset</span> | Styles applied to the root element if `inset={true}`.
| <span class="prop-name">light</span> | Styles applied to the root element if `light={true}`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Divider/Divider.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiDivider`.

## Demos

- [Dividers](/demos/dividers)
- [Lists](/demos/lists)

