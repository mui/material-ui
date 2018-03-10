---
filename: /src/ButtonBase/ButtonBase.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ButtonBase

`ButtonBase` contains as few styles as possible.
It aims to be a simple building block for creating a button.
It contains a load of style reset and some focus/ripple logic.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">buttonRef</span> | <span class="prop-type">func |  | Use that property to pass a ref callback to the native button component. |
| <span class="prop-name">centerRipple</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the ripples will be centered. They won't start at the cursor interaction position. |
| <span class="prop-name">children</span> | <span class="prop-type">node |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> |  | The component used for the root node. Either a string to use a DOM element or a component. The default value is a `button`. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool |  | If `true`, the base button will be disabled. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the ripple effect will be disabled. |
| <span class="prop-name">focusRipple</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the base button will have a keyboard focus ripple. `disableRipple` must also be `false`. |
| <span class="prop-name">onKeyboardFocus</span> | <span class="prop-type">func |  | Callback fired when the component is focused with a keyboard. We trigger a `onFocus` callback too. |
| <span class="prop-name">TouchRippleProps</span> | <span class="prop-type">object |  | Properties applied to the `TouchRipple` element. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `disabled`
- `keyboardFocused`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/ButtonBase/ButtonBase.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiButtonBase`.

## Demos

- [Buttons](/demos/buttons)

