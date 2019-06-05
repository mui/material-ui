---
filename: /packages/material-ui/src/StepConnector/StepConnector.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepConnector API

<p class="description">The API documentation of the StepConnector React component. Learn more about the properties and the CSS customization points.</p>

```js
import StepConnector from '@material-ui/core/StepConnector';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">horizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <span class="prop-name">vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">alternativeLabel</span> | Styles applied to the root element if `alternativeLabel={true}`.
| <span class="prop-name">active</span> | Styles applied to the root element if `active={true}`.
| <span class="prop-name">completed</span> | Styles applied to the root element if `completed={true}`.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">line</span> | Styles applied to the line element.
| <span class="prop-name">lineHorizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <span class="prop-name">lineVertical</span> | Styles applied to the root element if `orientation="vertical"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/StepConnector/StepConnector.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiStepConnector`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Steppers](/components/steppers/)

