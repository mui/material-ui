# ListItem



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| button | bool | false | If `true`, the ListItem will be a button. |
| children | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string<br>&nbsp;func<br> | 'div' | The component used for the root node. Either a string to use a DOM element or a component. |
| dense | bool | false | If `true`, compact vertical padding designed for keyboard and mouse input will be used. |
| disableGutters | bool | false | If `true`, the left and right padding is removed. |
| divider | bool | false | If `true`, a 1px light border is added to the bottom of the list item. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `container`
- `keyboardFocused`
- `default`
- `dense`
- `disabled`
- `divider`
- `gutters`
- `button`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiListItem`.
