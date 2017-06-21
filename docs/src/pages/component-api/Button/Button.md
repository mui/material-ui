# Button



## Properties
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | node |  | The content of the button. |
| classes | object |  | Useful to extend the style applied to components. |
| color | enum:&nbsp;'default', 'inherit', 'primary', 'accent', 'contrast'<br> | 'default' | The color of the component. It's using the theme palette when that makes sense. |
| component | union:&nbsp;string<br>&nbsp;func<br> |  | The component used for the root node. Either a string to use a DOM element or a component. The default value is a `button`. |
| dense | bool | false | Uses a smaller minWidth, ideal for things like card actions. |
| disabled | bool | false | If `true`, the button will be disabled. |
| disableFocusRipple | bool | false | If `true`, the  keyboard focus ripple will be disabled. `ripple` must also be true. |
| disableRipple | bool | false | If `true`, the ripple effect will be disabled. |
| fab | bool | false | If `true`, well use floating action button styling. |
| href | string |  | The URL to link to when the button is clicked. If defined, an `a` element will be used as the root node. |
| raised | bool | false | If `true`, the button will use raised styling. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `dense`
- `label`
- `flatPrimary`
- `flatAccent`
- `flatContrast`
- `colorInherit`
- `raised`
- `keyboardFocused`
- `raisedPrimary`
- `raisedAccent`
- `raisedContrast`
- `disabled`
- `fab`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiButton`.
