---
filename: /src/Progress/CircularProgress.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# CircularProgress

## ARIA
If the progress bar is describing the loading progress of a particular region of a page,
you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
attribute to `true` on that region until it has finished loading.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| classes | object |  | Useful to extend the style applied to components. |
| color | enum:&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'secondary'&nbsp;&#124;<br>&nbsp;'inherit'<br> | 'primary' | The color of the component. It supports those theme colors that make sense for this component. |
| max | number | 100 | The max value of progress in determinate variant. |
| min | number | 0 | The min value of progress in determinate variant. |
| size | union:&nbsp;number&nbsp;&#124;<br>&nbsp;string<br> | 40 | The size of the circle. |
| thickness | number | 3.6 | The thickness of the circle. |
| value | number | 0 | The value of the progress indicator for the determinate variant. Value between 0 and 100. |
| variant | enum:&nbsp;'determinate'&nbsp;&#124;<br>&nbsp;'indeterminate'<br> | 'indeterminate' | The variant of progress indicator. Use indeterminate when there is no progress value. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `colorPrimary`
- `colorSecondary`
- `svgIndeterminate`
- `svgDeterminate`
- `circle`
- `circleIndeterminate`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Progress/CircularProgress.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiCircularProgress`.

## Demos

- [Progress](/demos/progress)

