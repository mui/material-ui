---
filename: /packages/material-ui/src/StepLabel/StepLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepLabel API

<p class="description">The API documentation of the StepLabel React component. Learn more about the properties and the CSS customization points.</p>

```js
import StepLabel from '@material-ui/core/StepLabel';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | In most cases will simply be a string containing a title for the label. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Mark the step as disabled, will also disable the button if `StepLabelButton` is a child of `StepLabel`. Is passed to child components. |
| <span class="prop-name">error</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Mark the step as failed. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |  | Override the default icon. |
| <span class="prop-name">optional</span> | <span class="prop-type">node</span> |  | The optional node to display. |
| <span class="prop-name">StepIconComponent</span> | <span class="prop-type">elementType</span> |  | The component to render in place of the [`StepIcon`](/api/step-icon/). |
| <span class="prop-name">StepIconProps</span> | <span class="prop-type">object</span> |  | Properties applied to the [`StepIcon`](/api/step-icon/) element. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">horizontal</span> | Styles applied to the root element if `orientation="horizontal".
| <span class="prop-name">vertical</span> | Styles applied to the root element if `orientation="vertical".
| <span class="prop-name">label</span> | Styles applied to the `Typography` component which wraps `children`.
| <span class="prop-name">active</span> | Styles applied to the `Typography` component if `active={true}`.
| <span class="prop-name">completed</span> | Styles applied to the `Typography` component if `completed={true}`.
| <span class="prop-name">error</span> | Styles applied to the root element and `Typography` component if `error={true}`.
| <span class="prop-name">disabled</span> | Styles applied to the root element and `Typography` component if `disabled={true}`.
| <span class="prop-name">iconContainer</span> | Styles applied to the `icon` container element.
| <span class="prop-name">alternativeLabel</span> | Styles applied to the root & icon container and `Typography` if `alternativeLabel={true}`.
| <span class="prop-name">labelContainer</span> | Styles applied to the container element which wraps `Typography` and `optional`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/StepLabel/StepLabel.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiStepLabel`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Steppers](/components/steppers/)

