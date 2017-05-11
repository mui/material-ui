Typography
==========



Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| align | union:&nbsp;'left'<br>&nbsp;'center'<br>&nbsp;'right'<br>&nbsp;'justify'<br> |  |  |
| children | Element |  |  |
| className | string |  | The CSS class name of the root element. |
| colorInherit | boolean | false | If `true`, the text will inherit its color. |
| component | union:&nbsp;string<br>&nbsp;Function<br> |  | The component used for the root node. Either a string to use a DOM element or a component. By default we map the type to a good default headline component. |
| gutterBottom | boolean | false | If `true`, the text will have a bottom margin. |
| noWrap | boolean | false | If `true`, the text will not wrap, but instead will truncate with an ellipsis. |
| paragraph | boolean | false | If `true`, the text will have a bottom margin. |
| secondary | boolean | false | If `true`, the secondary color will be applied. |
| type | union:&nbsp;'display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button'<br> | 'body1' | Applies the theme typography styles. |

Any other properties supplied will be spread to the root element.
