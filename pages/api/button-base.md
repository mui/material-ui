---
filename: /src/ButtonBase/ButtonBase.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ButtonBase



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| centerRipple | boolean | false | If `true`, the ripples will be centered. They won't start at the cursor interaction position. |
| children | Node |  | The content of the component. |
| classes | Object |  | Useful to extend the style applied to components. |
| component | ElementType |  | The component used for the root node. Either a string to use a DOM element or a component. The default value is a `button`. |
| disableRipple | boolean | false | If `true`, the ripple effect will be disabled. |
| disabled | boolean |  | If `true`, the base button will be disabled. |
| focusRipple | boolean | false | If `true`, the base button will have a keyboard focus ripple. `disableRipple` must also be `false`. |
| keyboardFocusedClassName | string |  | The CSS class applied while the component is keyboard focused. |
| onKeyboardFocus | signature |  | Callback fired when the component is focused with a keyboard. We trigger a `onFocus` callback too. |
| rootRef | Function |  | Use that property to pass a ref callback to the root component. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `disabled`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/callemall/material-ui/tree/v1-beta/src/ButtonBase/ButtonBase.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiButtonBase`.

## Demos

- [Buttons](/demos/buttons)

