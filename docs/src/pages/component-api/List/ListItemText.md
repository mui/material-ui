# ListItemText



## Properties
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| classes | object |  | Useful to extend the style applied to components. |
| disableTypography | bool | false | If `true`, the children won't be wrapped by a typography component. For instance, that can be usefull to can render an h4 instead of a |
| inset | bool | false | If `true`, the children will be indented. This should be used if there is no left avatar or left icon. |
| primary | node | false |  |
| secondary | node | false |  |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `inset`
- `dense`
- `text`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiListItemText`.
