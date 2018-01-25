---
filename: /src/Button/Button.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Button



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | node |  | The content of the button. |
| classes | object |  | Useful to extend the style applied to components. |
| color | enum:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'inherit'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'secondary'<br> | 'default' | The color of the component. It's using the theme palette when that makes sense. |
| component | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> |  | The component used for the root node. Either a string to use a DOM element or a component. The default value is a `button`. |
| disabled | bool | false | If `true`, the button will be disabled. |
| disableFocusRipple | bool | false | If `true`, the  keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| disableRipple | bool | false | If `true`, the ripple effect will be disabled. |
| fab | bool | false | If `true`, will use floating action button styling. |
| fullWidth | bool | false | If `true`, the button will take up the full width of its container. |
| href | string |  | The URL to link to when the button is clicked. If defined, an `a` element will be used as the root node. |
| mini | bool | false | If `true`, and `fab` is `true`, will use mini floating action button styling. |
| raised | bool | false | If `true`, the button will use raised styling. |
| size | enum:&nbsp;'small'&nbsp;&#124;<br>&nbsp;'medium'&nbsp;&#124;<br>&nbsp;'large'<br> | 'medium' | The size of the button. `small` is equivalent to the dense button styling. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `label`
- `flatPrimary`
- `flatSecondary`
- `colorInherit`
- `raised`
- `keyboardFocused`
- `raisedPrimary`
- `raisedSecondary`
- `disabled`
- `fab`
- `mini`
- `sizeSmall`
- `sizeLarge`
- `fullWidth`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Button/Button.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiButton`.

## Inheritance

The properties of the [&lt;ButtonBase /&gt;](/api/button-base) component are also available.

## Demos

- [Buttons](/demos/buttons)

