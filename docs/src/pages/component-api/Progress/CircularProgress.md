# CircularProgress



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| classes | object |  | Useful to extend the style applied to components. |
| max | number | 100 | The max value of progress in determinate mode. |
| min | number | 0 | The min value of progress in determinate mode. |
| mode | enum:&nbsp;'determinate'<br>&nbsp;'indeterminate'<br> | 'indeterminate' | The mode of show your progress. Indeterminate for when there is no value for progress. Determinate for controlled progress value. |
| size | number | 40 | The size of the circle. |
| value | number | 0 | The value of progress in determinate mode. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `svg`
- `indeterminateSvg`
- `circle`
- `indeterminateCircle`
- `determinateCircle`
- `@keyframes rotate-progress-circle`
- `@keyframes scale-progress-circle`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiCircularProgress`.
