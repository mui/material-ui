---
filename: /packages/material-ui/src/StepLabel/StepLabel.js
title: StepLabel API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepLabel

<p class="description">The API documentation of the StepLabel React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |   | In most cases will simply be a string containing a title for the label. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | Mark the step as disabled, will also disable the button if `StepLabelButton` is a child of `StepLabel`. Is passed to child components. |
| <span class="prop-name">error</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | Mark the step as failed. |
| <span class="prop-name">icon</span> | <span class="prop-type">node |   | Override the default icon. |
| <span class="prop-name">optional</span> | <span class="prop-type">node |   | The optional node to display. |
| <span class="prop-name">StepIconProps</span> | <span class="prop-type">object |   | Properties applied to the [`StepIcon`](/api/step-icon) element. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">horizontal</span> | Styles applied to the root element if `orientation="horiizontal".
| <span class="prop-name">vertical</span> | Styles applied to the root element if `orientation="vertical".
| <span class="prop-name">label</span> | Styles applied to the `Typography` component which wraps `children`.
| <span class="prop-name">active</span> | Styles applied to the `Typography` component if `active={true}`.
| <span class="prop-name">completed</span> | Styles applied to the `Typography` component if `completed={true}`.
| <span class="prop-name">error</span> | Styles applied to the root element and `Typography` component if `error={true}`.
| <span class="prop-name">disabled</span> | Styles applied to the root element and `Typography` component if `disabled={true}`.
| <span class="prop-name">iconContainer</span> | Styles applied to the `icon` container element.
| <span class="prop-name">alternativeLabel</span> | Styles applied to the root & icon container and `Typography` if `alternativeLabel={true}`.
| <span class="prop-name">labelContainer</span> | Styles applied to the container element which wraps `Typography` and `optional`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/StepLabel/StepLabel.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiStepLabel`.

## Demos

- [Steppers](/demos/steppers)

