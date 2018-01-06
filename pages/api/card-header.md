---
filename: /src/Card/CardHeader.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# CardHeader



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| action | node |  | The action to display in the card header. |
| avatar | node |  | The Avatar for the Card Header. |
| classes | object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | 'div' | The component used for the root node. Either a string to use a DOM element or a component. |
| subheader | node |  | The content of the component. |
| title | node |  | The content of the Card Title. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `avatar`
- `action`
- `content`
- `title`
- `subheader`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Card/CardHeader.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiCardHeader`.

## Demos

- [Cards](/demos/cards)

