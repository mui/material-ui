---
filename: /packages/material-ui/src/Stepper/Stepper.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Stepper API

<p class="description">The API documentation of the Stepper React component. Learn more about the properties and the CSS customization points.</p>

```js
import Stepper from '@material-ui/core/Stepper';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">activeStep</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | Set the active step (zero based index). |
| <span class="prop-name">alternativeLabel</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If set to 'true' and orientation is horizontal, then the step label will be positioned under the icon. |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | Two or more `<Step />` components. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">connector</span> | <span class="prop-type">element</span> | <span class="prop-default">&lt;StepConnector /></span> | A component to be placed between each step. |
| <span class="prop-name">nonLinear</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If set the `Stepper` will not assist in controlling steps for linear flow. |
| <span class="prop-name">orientation</span> | <span class="prop-type">enum:&nbsp;'horizontal'&nbsp;&#124;<br>&nbsp;'vertical'<br></span> | <span class="prop-default">'horizontal'</span> | The stepper orientation (layout flow direction). |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">horizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <span class="prop-name">vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">alternativeLabel</span> | Styles applied to the root element if `alternativeLabel={true}`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Stepper/Stepper.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiStepper`.

## Inheritance

The properties of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Steppers](/components/steppers/)

