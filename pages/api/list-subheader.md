---
filename: /src/List/ListSubheader.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListSubheader



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |
| color | enum:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'inherit'<br> | 'default' | The color of the component. It's using the theme palette when that makes sense. |
| component | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | 'li' | The component used for the root node. Either a string to use a DOM element or a component. |
| disableSticky | bool | false | If `true`, the List Subheader will not stick to the top during scroll. |
| inset | bool | false | If `true`, the List Subheader will be indented. |

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
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/List/ListSubheader.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiListSubheader`.

## Demos

- [Grid List](/demos/grid-list)
- [Lists](/demos/lists)

