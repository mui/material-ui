# Typography



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| align | union:&nbsp;'left'<br>&nbsp;'center'<br>&nbsp;'right'<br>&nbsp;'justify'<br> |  |  |
| children | Element |  |  |
| classes | any |  | Useful to extend the style applied to components. |
| colorInherit | boolean | false | If `true`, the text will inherit its color. |
| component | union:&nbsp;string<br>&nbsp;Function<br> |  | The component used for the root node. Either a string to use a DOM element or a component. By default we map the type to a good default headline component. |
| gutterBottom | boolean | false | If `true`, the text will have a bottom margin. |
| noWrap | boolean | false | If `true`, the text will not wrap, but instead will truncate with an ellipsis. |
| paragraph | boolean | false | If `true`, the text will have a bottom margin. |
| secondary | boolean | false | If `true`, the secondary color will be applied. |
| type | union:&nbsp;'display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button'<br> | 'body1' | Applies the theme typography styles. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `text`
- `display4`
- `display3`
- `display2`
- `display1`
- `headline`
- `title`
- `subheading`
- `body2`
- `body1`
- `caption`
- `button`
- `align-left`
- `align-center`
- `align-right`
- `align-justify`
- `noWrap`
- `gutterBottom`
- `paragraph`
- `colorInherit`
- `secondary`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTypography`.
