---
filename: /packages/material-ui/src/Button/Button.js
title: Button API
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
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'text', 'flat', 'outlined', 'contained', 'raised', 'fab', 'extendedFab'<br> | <span class="prop-default">'text'</span> | The variant to use. |

Any other properties supplied will be spread to the root element ([ButtonBase](/api/button-base)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">label</span> | Styles applied to the span element that wraps the children.
| <span class="prop-name">text</span> | Styles applied to the root element if `variant="text"`.
| <span class="prop-name">textPrimary</span> | Styles applied to the root element if `variant="text"` and `color="primary"`.
| <span class="prop-name">textSecondary</span> | Styles applied to the root element if `variant="text"` and `color="secondary"`.
| <span class="prop-name">flat</span> | Styles applied to the root element for backwards compatibility with legacy variant naming.
| <span class="prop-name">flatPrimary</span> | Styles applied to the root element for backwards compatibility with legacy variant naming.
| <span class="prop-name">flatSecondary</span> | Styles applied to the root element for backwards compatibility with legacy variant naming.
| <span class="prop-name">outlined</span> | Styles applied to the root element if `variant="outlined"`.
| <span class="prop-name">contained</span> | Styles applied to the root element if `variant="[contained \| fab]"`.
| <span class="prop-name">containedPrimary</span> | Styles applied to the root element if `variant="[contained \| fab]"` and `color="primary"`.
| <span class="prop-name">containedSecondary</span> | Styles applied to the root element if `variant="[contained \| fab]"` and `color="secondary"`.
| <span class="prop-name">raised</span> | Styles applied to the root element for backwards compatibility with legacy variant naming.
| <span class="prop-name">raisedPrimary</span> | Styles applied to the root element for backwards compatibility with legacy variant naming.
| <span class="prop-name">raisedSecondary</span> | Styles applied to the root element for backwards compatibility with legacy variant naming.
| <span class="prop-name">fab</span> | Styles applied to the root element if `variant="[fab \| extendedFab]"`.
| <span class="prop-name">extendedFab</span> | Styles applied to the root element if `variant="extendedFab"`.
| <span class="prop-name">focusVisible</span> | Styles applied to the ButtonBase root element if the button is keyboard focused.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <span class="prop-name">mini</span> | Styles applied to the root element if `size="mini"` & `variant="[fab \| extendedFab]"`.
| <span class="prop-name">sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <span class="prop-name">sizeLarge</span> | Styles applied to the root element if `size="large"`.
| <span class="prop-name">fullWidth</span> | Styles applied to the root element if `fullWidth={true}`.

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

