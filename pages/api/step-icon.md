---
filename: /packages/material-ui/src/StepIcon/StepIcon.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepIcon API

<p class="description">The API documentation of the StepIcon React component. Learn more about the properties and the CSS customization points.</p>

```js
import StepIcon from '@material-ui/core/StepIcon';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">active</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Whether this step is active. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">completed</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Mark the step as completed. Is passed to child components. |
| <span class="prop-name">error</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Mark the step as failed. |
| <span class="prop-name required">icon&nbsp;*</span> | <span class="prop-type">node</span> |  | The icon displayed by the step label. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">text</span> | Styles applied to the SVG text element.
| <span class="prop-name">active</span> | Styles applied to the root element if `active={true}`.
| <span class="prop-name">completed</span> | Styles applied to the root element if `completed={true}`.
| <span class="prop-name">error</span> | Styles applied to the root element if `error={true}`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/StepIcon/StepIcon.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiStepIcon`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Steppers](/components/steppers/)

