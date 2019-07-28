---
filename: /packages/material-ui/src/Stepper/Stepper.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Stepper API

<p class="description">The API documentation of the Stepper React component. Learn more about the properties and the CSS customization points.</p>

```js
import { Stepper } from '@material-ui/core';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">activeStep</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | Set the active step (zero based index). |
| <span class="prop-name">alternativeLabel</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If set to 'true' and orientation is horizontal, then the step label will be positioned under the icon. |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | Two or more `<Step />` components. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">connector</span> | <span class="prop-type">element</span> | <span class="prop-default">&lt;StepConnector /></span> | An element to be placed between each step. |
| <span class="prop-name">nonLinear</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If set the `Stepper` will not assist in controlling steps for linear flow. |
| <span class="prop-name">orientation</span> | <span class="prop-type">'horizontal'<br>&#124;&nbsp;'vertical'</span> | <span class="prop-default">'horizontal'</span> | The stepper orientation (layout flow direction). |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

- Style sheet name: `MuiStepper`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiStepper-root</span> | Styles applied to the root element.
| <span class="prop-name">horizontal</span> | <span class="prop-name">MuiStepper-horizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <span class="prop-name">vertical</span> | <span class="prop-name">MuiStepper-vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">alternativeLabel</span> | <span class="prop-name">MuiStepper-alternativeLabel</span> | Styles applied to the root element if `alternativeLabel={true}`.

You can override the style of the component thanks to one of these customizability points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If it's not enough, you can find the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Stepper/Stepper.js) for more detail.

## Inheritance

The properties of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Steppers](/components/steppers/)

