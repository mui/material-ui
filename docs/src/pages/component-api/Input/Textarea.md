# Textarea



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| className | string |  |  |
| classes | object |  | Useful to extend the style applied to components. |
| defaultValue | any |  |  |
| disabled | bool |  |  |
| hintText | string |  |  |
| onChange | function |  |  |
| onHeightChange | function |  |  |
| rows | union:&nbsp;string<br>&nbsp;number<br> | 1 | Number of rows to display when multiline option is set to true. |
| rowsMax | union:&nbsp;string<br>&nbsp;number<br> |  | Maxium number of rows to display when multiline option is set to true. |
| textareaRef | function |  | Use that property to pass a ref callback to the native textarea component. |
| value | string |  |  |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `textarea`
- `shadow`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTextarea`.
