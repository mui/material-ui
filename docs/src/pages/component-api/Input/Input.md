<!--- This documentation is automatically generated, do not try to edit it. -->

# Input



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| className | string |  | The CSS class name of the wrapper element. |
| classes | Object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string<br>&nbsp;Function<br> |  | The component used for the root node. Either a string to use a DOM element or a component. It's an `input` by default. |
| defaultValue | union:&nbsp;string<br>&nbsp;number<br> |  | The default input value, useful when not controlling the component. |
| disableUnderline | boolean | false | If `true`, the input will not have an underline. |
| error | boolean |  | If `true`, the input will indicate an error. |
| fullWidth | boolean | false | If `true`, the input will take up the full width of its container. |
| id | string |  |  |
| inputProps | Object |  | Properties applied to the `input` element. |
| inputRef | Function |  | Use that property to pass a ref callback to the native input component. |
| multiline | boolean | false | If `true`, a textarea element will be rendered. |
| rows | union:&nbsp;string<br>&nbsp;number<br> |  | Number of rows to display when multiline option is set to true. |
| rowsMax | union:&nbsp;string<br>&nbsp;number<br> |  | Maxium number of rows to display when multiline option is set to true. |
| type | string | 'text' | Type of the input element. It should be a valid HTML5 input type. |
| value | union:&nbsp;string<br>&nbsp;number<br> |  | The input value, required for a controlled component. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `formControl`
- `inkbar`
- `error`
- `input`
- `inputDense`
- `disabled`
- `focused`
- `underline`
- `multiline`
- `inputDisabled`
- `inputSingleline`
- `inputMultiline`
- `fullWidth`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiInput`.
