---
filename: /packages/material-ui/src/Button/Button.js
title: API of Button
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Button

<p class="description">The API documentation of the Button React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node |   | The content of the button. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'inherit'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'secondary'<br> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">'button'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the button will be disabled. |
| <span class="prop-name">disableFocusRipple</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the  keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool |   | If `true`, the ripple effect will be disabled. |
| <span class="prop-name">fullWidth</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the button will take up the full width of its container. |
| <span class="prop-name">href</span> | <span class="prop-type">string |   | The URL to link to when the button is clicked. If defined, an `a` element will be used as the root node. |
| <span class="prop-name">mini</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, and `variant` is `'fab'`, will use mini floating action button styling. |
| <span class="prop-name">size</span> | <span class="prop-type">enum:&nbsp;'small'&nbsp;&#124;<br>&nbsp;'medium'&nbsp;&#124;<br>&nbsp;'large'<br> | <span class="prop-default">'medium'</span> | The size of the button. `small` is equivalent to the dense button styling. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'text', 'flat', 'outlined', 'contained', 'raised', 'fab', 'extendedFab'<br> | <span class="prop-default">'text'</span> | The type of button. |

Any other properties supplied will be spread to the root element ([ButtonBase](/api/button-base)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `label`
- `text`
- `textPrimary`
- `textSecondary`
- `flat`
- `flatPrimary`
- `flatSecondary`
- `outlined`
- `contained`
- `containedPrimary`
- `containedSecondary`
- `raised`
- `raisedPrimary`
- `raisedSecondary`
- `fab`
- `extendedFab`
- `focusVisible`
- `disabled`
- `colorInherit`
- `mini`
- `sizeSmall`
- `sizeLarge`
- `fullWidth`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Button/Button.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiButton`.

## Inheritance

The properties of the [ButtonBase](/api/button-base) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Buttons](/demos/buttons)

