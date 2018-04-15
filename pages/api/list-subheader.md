---
filename: /packages/material-ui/src/List/ListSubheader.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListSubheader



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'inherit'<br> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | <span class="prop-default">'li'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disableSticky</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the List Subheader will not stick to the top during scroll. |
| <span class="prop-name">inset</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the List Subheader will be indented. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `colorPrimary`
- `colorInherit`
- `inset`
- `sticky`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/packages/material-ui/src/List/ListSubheader.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiListSubheader`.

## Demos

- [Grid List](/demos/grid-list)
- [Lists](/demos/lists)

