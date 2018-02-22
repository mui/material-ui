---
filename: /src/List/List.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# List



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | <span class="prop-default">'ul'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">dense</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, compact vertical padding designed for keyboard and mouse input will be used for the list and list items. The property is available to descendant components as the `dense` context. |
| <span class="prop-name">disablePadding</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, vertical padding will be removed from the list. |
| <span class="prop-name">subheader</span> | <span class="prop-type">node |  | The content of the subheader, normally `ListSubheader`. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `padding`
- `dense`
- `subheader`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/List/List.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiList`.

## Demos

- [Lists](/demos/lists)

