---
filename: /packages/material-ui/src/MobileStepper/MobileStepper.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# MobileStepper API

<p class="description">The API documentation of the MobileStepper React component. Learn more about the properties and the CSS customization points.</p>

```js
import MobileStepper from '@material-ui/core/MobileStepper';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">activeStep</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | Set the active step (zero based index). Defines which dot is highlighted when the variant is 'dots'. |
| <span class="prop-name">backButton</span> | <span class="prop-type">node</span> |  | A back button element. For instance, it can be a `Button` or an `IconButton`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">LinearProgressProps</span> | <span class="prop-type">object</span> |  | Properties applied to the `LinearProgress` element. |
| <span class="prop-name">nextButton</span> | <span class="prop-type">node</span> |  | A next button element. For instance, it can be a `Button` or an `IconButton`. |
| <span class="prop-name">position</span> | <span class="prop-type">enum:&nbsp;'bottom'&nbsp;&#124;<br>&nbsp;'top'&nbsp;&#124;<br>&nbsp;'static'<br></span> | <span class="prop-default">'bottom'</span> | Set the positioning type. |
| <span class="prop-name required">steps&nbsp;*</span> | <span class="prop-type">number</span> |  | The total steps. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'text'&nbsp;&#124;<br>&nbsp;'dots'&nbsp;&#124;<br>&nbsp;'progress'<br></span> | <span class="prop-default">'dots'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">positionBottom</span> | Styles applied to the root element if `position="bottom"`.
| <span class="prop-name">positionTop</span> | Styles applied to the root element if `position="top"`.
| <span class="prop-name">positionStatic</span> | Styles applied to the root element if `position="static"`.
| <span class="prop-name">dots</span> | Styles applied to the dots container if `variant="dots"`.
| <span class="prop-name">dot</span> | Styles applied to each dot if `variant="dots"`.
| <span class="prop-name">dotActive</span> | Styles applied to a dot if `variant="dots"` and this is the active step.
| <span class="prop-name">progress</span> | Styles applied to the Linear Progress component if `variant="progress"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/MobileStepper/MobileStepper.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiMobileStepper`.

## Inheritance

The properties of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Steppers](/components/steppers/)

