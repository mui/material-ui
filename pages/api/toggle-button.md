---
filename: /packages/material-ui-lab/src/ToggleButton/ToggleButton.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ToggleButton API

<p class="description">The API documentation of the ToggleButton React component. Learn more about the properties and the CSS customization points.</p>

```js
import ToggleButton from '@material-ui/lab/ToggleButton';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | The content of the button. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button will be disabled. |
| <span class="prop-name">disableFocusRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the  keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the ripple effect will be disabled. |
| <span class="prop-name">selected</span> | <span class="prop-type">bool</span> |  | If `true`, the button will be rendered in an active state. |
| <span class="prop-name required">value&nbsp;*</span> | <span class="prop-type">any</span> |  | The value to associate with the button when selected in a ToggleButtonGroup. |

The component cannot hold a ref.

Any other properties supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">selected</span> | Styles applied to the root element if `selected={true}`.
| <span class="prop-name">label</span> | Styles applied to the `label` wrapper element.
| <span class="prop-name">sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <span class="prop-name">sizeLarge</span> | Styles applied to the root element if `size="large"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/ToggleButton/ToggleButton.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiToggleButton`.

## Inheritance

The properties of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Toggle Button](/components/toggle-button/)

