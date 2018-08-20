---
filename: /packages/material-ui/src/StepButton/StepButton.js
title: StepButton API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepButton

<p class="description">The API documentation of the StepButton React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |   | Can be a `StepLabel` or a node to place inside `StepLabel` as children. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">icon</span> | <span class="prop-type">node |   | The icon displayed by the step label. |
| <span class="prop-name">optional</span> | <span class="prop-type">node |   | The optional node to display. |

Any other properties supplied will be spread to the root element ([ButtonBase](/api/button-base)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">horizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <span class="prop-name">vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">touchRipple</span> | Styles applied to the `ButtonBase` touch-ripple.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/StepButton/StepButton.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiStepButton`.

## Inheritance

The properties of the [ButtonBase](/api/button-base) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Steppers](/demos/steppers)

