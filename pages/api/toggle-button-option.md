<!--- This documentation is automatically generated, do not try to edit it. -->

# ToggleButtonOption



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | If specified, renders a dropdown of Options of type 'MenuItem'. |
| classes | object |  | Useful to extend the style applied to components. |
| color | enum:&nbsp;'default'<br>&nbsp;'primary'<br>&nbsp;'accent'<br>&nbsp;'contrast'<br> | 'default' | The color of the component. It's using the theme palette when that makes sense. |
| disabled | bool | false | Determines if a toggle icon is disabled or not. |
| divider | bool | false | Set a divider to the right of the option. |
| icon | node |  | Sets the icon of the tab, you can pass `FontIcon` or `SvgIcon` elements. |
| label | string |  | Sets the text value of the option to the string specified. |
| onChange | function |  | Fired when an option is either selected or deselected. Use this event to specify any functionality when an option gets changed. |
| selected | bool | false | Defines if the current option is selected or not. The ToggleButton component is responsible for setting this property. |
| value | union:&nbsp;string<br>&nbsp;number<br>&nbsp;bool<br> |  | Sets the value of the option which may be one of the primitive types. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `rootButton`
- `rootToggle`
- `buttonBase`
- `button`
- `dropDownButton`
- `textSelected`
- `buttonSelected`
- `iconAndText`
- `divided`
- `colorDefault`
- `colorPrimary`
- `colorAccent`
- `colorContrast`
- `colorInherit`
- `togglePrimary`
- `toggleAccent`
- `toggleContrast`
- `toggleDefault`
- `toggleInherit`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiToggleButtonOption`.

