---
filename: /src/ButtonBase/ButtonBase.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ButtonBase

`ButtonBase` contains as few styles as possible.
It aims to be a building block for people who want to create a simple button.
It contains a load of style reset and some focus/ripple logic.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| centerRipple | bool | false | If `true`, the ripples will be centered. They won't start at the cursor interaction position. |
| children | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> |  | The component used for the root node. Either a string to use a DOM element or a component. The default value is a `button`. |
| disabled | bool |  | If `true`, the base button will be disabled. |
| disableRipple | bool | false | If `true`, the ripple effect will be disabled. |
| focusRipple | bool | false | If `true`, the base button will have a keyboard focus ripple. `disableRipple` must also be `false`. |
| keyboardFocusedClassName | string |  | The CSS class applied while the component is keyboard focused. |
| onKeyboardFocus | func |  | Callback fired when the component is focused with a keyboard. We trigger a `onFocus` callback too. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `disabled`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/ButtonBase/ButtonBase.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiButtonBase`.

## Demos

- [Buttons](/demos/buttons)

