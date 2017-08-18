<!--- This documentation is automatically generated, do not try to edit it. -->

# ButtonBase



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| centerRipple | boolean | false | If `true`, the ripples will be centered. They won't start at the cursor interaction position. |
| children | Element |  | The content of the component. |
| classes | Object | {} | Useful to extend the style applied to components. |
| component | union:&nbsp;string<br>&nbsp;Function<br> |  | The component used for the root node. Either a string to use a DOM element or a component. The default value is a `button`. |
| disableRipple | boolean | false | If `true`, the ripple effect will be disabled. |
| disabled | boolean |  | If `true`, the base button will be disabled. |
| focusRipple | boolean | false | If `true`, the base button will have a keyboard focus ripple. `disableRipple` must also be `false`. |
| keyboardFocusedClassName | string |  | The CSS class applied while the component is keyboard focused. |
| onKeyboardFocus | Function |  | Callback fired when the component is focused with a keyboard. We trigger a `onFocus` callback too.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `disabled`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiButtonBase`.

## Demos

- [Buttons](/demos/buttons)

