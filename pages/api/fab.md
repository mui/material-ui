---
filename: /packages/material-ui/src/Fab/Fab.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Fab API

<p class="description">The API documentation of the Fab React component. Learn more about the properties and the CSS customization points.</p>

```js
import Fab from '@material-ui/core/Fab';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | The content of the button. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'inherit'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'secondary'<br></span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'button'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button will be disabled. |
| <span class="prop-name">disableFocusRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the  keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect will be disabled. |
| <span class="prop-name">href</span> | <span class="prop-type">string</span> |  | The URL to link to when the button is clicked. If defined, an `a` element will be used as the root node. |
| <span class="prop-name">size</span> | <span class="prop-type">enum:&nbsp;'small'&nbsp;&#124;<br>&nbsp;'medium'&nbsp;&#124;<br>&nbsp;'large'<br></span> | <span class="prop-default">'large'</span> | The size of the button. `small` is equivalent to the dense button styling. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'round'&nbsp;&#124;<br>&nbsp;'extended'<br></span> | <span class="prop-default">'round'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">label</span> | Styles applied to the span element that wraps the children.
| <span class="prop-name">primary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">secondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">extended</span> | Styles applied to the root element if `variant="extended"`.
| <span class="prop-name">focusVisible</span> | Styles applied to the ButtonBase root element if the button is keyboard focused.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <span class="prop-name">sizeSmall</span> | Styles applied to the root element if `size="small"``.
| <span class="prop-name">sizeMedium</span> | Styles applied to the root element if `size="medium"``.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Fab/Fab.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiFab`.

## Inheritance

The properties of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Buttons](/components/buttons/)

