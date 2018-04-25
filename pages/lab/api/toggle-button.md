---
filename: /src/ToggleButton/ToggleButton.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ToggleButton



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | node |  | The content of the button. |
| classes | object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> |  | The component used for the root node. Either a string to use a DOM element or a component. The default value is a `button`. |
| disabled | bool | false | If `true`, the button will be disabled. |
| disableFocusRipple | bool | false | If `true`, the  keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| disableRipple | bool | false | If `true`, the ripple effect will be disabled. |
| selected | bool |  | If `true`, the button will be rendered in an active state. |
| value | any |  | The value to associate with the button when selected in a ToggleButtonGroup. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `label`
- `disabled`
- `selected`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/ToggleButton/ToggleButton.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiToggleButton`.

## Inheritance

The properties of the [&lt;ButtonBase /&gt;](/api/button-base) component are also available.

## Demos

- [Buttons](/demos/buttons)

