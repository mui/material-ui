<!--- This documentation is automatically generated, do not try to edit it. -->

# ListItem



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| button | boolean | false | If `true`, the ListItem will be a button. |
| children | Element |  | The content of the component. |
| classes | Object | {} | Useful to extend the style applied to components. |
| component | union:&nbsp;string<br>&nbsp;Function<br> | 'li' | The component used for the root node. Either a string to use a DOM element or a component. |
| dense | boolean | false | If `true`, compact vertical padding designed for keyboard and mouse input will be used. |
| disableGutters | boolean | false | If `true`, the left and right padding is removed. |
| divider | boolean | false | If `true`, a 1px light border is added to the bottom of the list item. |

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

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiListItem`.

## Demos

- [Lists](/demos/lists)

