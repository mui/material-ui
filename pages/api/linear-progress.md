<!--- This documentation is automatically generated, do not try to edit it. -->

# LinearProgress



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| classes | object |  | Useful to extend the style applied to components. |
| color | enum:&nbsp;'primary'<br>&nbsp;'accent'<br> | 'primary' | The color of the component. It's using the theme palette when that makes sense. |
| mode | enum:&nbsp;'determinate'<br>&nbsp;'indeterminate'<br>&nbsp;'buffer'<br>&nbsp;'query'<br> | 'indeterminate' | The mode of show your progress, indeterminate for when there is no value for progress. |
| value | number | 0 | The value of progress, only works in determinate and buffer mode. Value between 0 and 100. |
| valueBuffer | number |  | The value of buffer, only works in buffer mode. Value between 0 and 100. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `primaryColor`
- `primaryColorBar`
- `primaryDashed`
- `accentColor`
- `accentColorBar`
- `accentDashed`
- `bar`
- `dashed`
- `bufferBar2`
- `rootBuffer`
- `rootQuery`
- `indeterminateBar1`
- `indeterminateBar2`
- `determinateBar1`
- `bufferBar1`
- `bufferBar2Primary`
- `bufferBar2Accent`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiLinearProgress`.

## Demos

- [Progress](/demos/progress)

