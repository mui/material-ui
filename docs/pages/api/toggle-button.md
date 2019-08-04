---
filename: /packages/material-ui-lab/src/ToggleButton/ToggleButton.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ToggleButton API

<p class="description">The API documentation of the ToggleButton React component. Learn more about the props and the CSS customization points.</p>

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

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

- Style sheet name: `MuiToggleButton`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiToggleButton-root</span> | Styles applied to the root element.
| <span class="prop-name">disabled</span> | <span class="prop-name">Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">selected</span> | <span class="prop-name">Mui-selected</span> | Pseudo-class applied to the root element if `selected={true}`.
| <span class="prop-name">label</span> | <span class="prop-name">MuiToggleButton-label</span> | Styles applied to the `label` wrapper element.
| <span class="prop-name">sizeSmall</span> | <span class="prop-name">MuiToggleButton-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <span class="prop-name">sizeLarge</span> | <span class="prop-name">MuiToggleButton-sizeLarge</span> | Styles applied to the root element if `size="large"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/ToggleButton/ToggleButton.js) for more detail.

## Inheritance

The props of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Toggle Button](/components/toggle-button/)

