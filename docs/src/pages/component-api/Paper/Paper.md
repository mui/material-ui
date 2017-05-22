# Paper



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| classes | object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string<br>&nbsp;func<br> | 'div' | The component used for the root node. Either a string to use a DOM element or a component. |
| elevation | number | 2 | Shadow depth, corresponds to `dp` in the spec. It's accepting values between 0 and 24 inclusive. |
| square | bool | false | If `true`, rounded corners are disabled. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `paper`
- `rounded`
- `dp0`
- `dp1`
- `dp2`
- `dp3`
- `dp4`
- `dp5`
- `dp6`
- `dp7`
- `dp8`
- `dp9`
- `dp10`
- `dp11`
- `dp12`
- `dp13`
- `dp14`
- `dp15`
- `dp16`
- `dp17`
- `dp18`
- `dp19`
- `dp20`
- `dp21`
- `dp22`
- `dp23`
- `dp24`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiPaper`.
