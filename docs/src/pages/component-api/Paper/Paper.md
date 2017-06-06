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
- `dp-0`
- `dp-1`
- `dp-2`
- `dp-3`
- `dp-4`
- `dp-5`
- `dp-6`
- `dp-7`
- `dp-8`
- `dp-9`
- `dp-10`
- `dp-11`
- `dp-12`
- `dp-13`
- `dp-14`
- `dp-15`
- `dp-16`
- `dp-17`
- `dp-18`
- `dp-19`
- `dp-20`
- `dp-21`
- `dp-22`
- `dp-23`
- `dp-24`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiPaper`.
