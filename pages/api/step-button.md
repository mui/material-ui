---
filename: /packages/material-ui/src/StepButton/StepButton.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepButton API

<p class="description">The API documentation of the StepButton React component. Learn more about the properties and the CSS customization points.</p>

```js
import StepButton from '@material-ui/core/StepButton';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Can be a `StepLabel` or a node to place inside `StepLabel` as children. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |  | The icon displayed by the step label. |
| <span class="prop-name">optional</span> | <span class="prop-type">node</span> |  | The optional node to display. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">horizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <span class="prop-name">vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">touchRipple</span> | Styles applied to the `ButtonBase` touch-ripple.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/StepButton/StepButton.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiStepButton`.

## Inheritance

The properties of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Steppers](/components/steppers/)

