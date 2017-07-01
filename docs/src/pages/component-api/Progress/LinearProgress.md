# LinearProgress



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| classes | object |  | Useful to extend the style applied to components. |
| mode | enum:&nbsp;'determinate'<br>&nbsp;'indeterminate'<br>&nbsp;'buffer'<br>&nbsp;'query'<br> | 'indeterminate' | The mode of show your progress, indeterminate for when there is no value for progress. |
| value | number | 0 | The value of progress, only works in determinate and buffer mode. Value between 0 and 100. |
| valueBuffer | number |  | The value of buffer, only works in buffer mode. Value between 0 and 100. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `rootBuffer`
- `rootQuery`
- `bar`
- `dashed`
- `indeterminateBar1`
- `indeterminateBar2`
- `determinateBar1`
- `determinateBar2`
- `bufferBar1`
- `bufferBar2`
- `@keyframes indeterminate-1`
- `@keyframes indeterminate-2`
- `@keyframes buffer`
- `@keyframes query`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiLinearProgress`.
