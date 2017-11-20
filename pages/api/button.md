---
filename: /src/Button/Button.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Button



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | Node |  | The content of the button. |
| classes | Object |  | Useful to extend the style applied to components. |
| <span style="color: #31a148">color *</span> | union:&nbsp;'default', 'inherit', 'primary', 'accent', 'contrast'<br> | 'default' | The color of the component. It's using the theme palette when that makes sense. |
| component | ElementType |  | The component used for the root node. Either a string to use a DOM element or a component. The default value is a `button`. |
| <span style="color: #31a148">dense *</span> | boolean | false | Uses a smaller minWidth, ideal for things like card actions. |
| <span style="color: #31a148">disableFocusRipple *</span> | boolean | false | If `true`, the  keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| <span style="color: #31a148">disableRipple *</span> | boolean | false | If `true`, the ripple effect will be disabled. |
| <span style="color: #31a148">disabled *</span> | boolean | false | If `true`, the button will be disabled. |
| <span style="color: #31a148">fab *</span> | boolean | false | If `true`, will use floating action button styling. |
| href | string |  | The URL to link to when the button is clicked. If defined, an `a` element will be used as the root node. |
| <span style="color: #31a148">raised *</span> | boolean | false | If `true`, the button will use raised styling. |
| theme | Object |  |  |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `dense`
- `label`
- `flatPrimary`
- `flatAccent`
- `flatContrast`
- `colorInherit`
- `raised`
- `keyboardFocused`
- `raisedPrimary`
- `raisedAccent`
- `raisedContrast`
- `disabled`
- `fab`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/callemall/material-ui/tree/v1-beta/src/Button/Button.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiButton`.

## Inheritance

The properties of the [&lt;ButtonBase /&gt;](/api/button-base) component are also available.

## Demos

- [Buttons](/demos/buttons)

