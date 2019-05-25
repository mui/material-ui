---
filename: /packages/material-ui/src/StepContent/StepContent.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# StepContent API

<p class="description">The API documentation of the StepContent React component. Learn more about the properties and the CSS customization points.</p>

```js
import StepContent from '@material-ui/core/StepContent';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Step content. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Collapse</span> | The component used for the transition. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }&nbsp;&#124;<br>&nbsp;enum:&nbsp;'auto'<br><br></span> | <span class="prop-default">'auto'</span> | Adjust the duration of the content expand transition. Passed as a property to the transition component.<br>Set to 'auto' to automatically calculate transition time based on height. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object</span> |  | Properties applied to the `Transition` element. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">last</span> | Styles applied to the root element if `last={true}` (controlled by `Step`).
| <span class="prop-name">transition</span> | Styles applied to the Transition component.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/StepContent/StepContent.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiStepContent`.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Steppers](/components/steppers/)

