---
filename: /packages/material-ui/src/Step/Step.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Step API

<p class="description">The API documentation of the Step React component. Learn more about the properties and the CSS customization points.</p>

```js
import { Step } from '@material-ui/core';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">active</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Sets the step as active. Is passed to child components. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Should be `Step` sub-components such as `StepLabel`, `StepContent`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">completed</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Mark the step as completed. Is passed to child components. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Mark the step as disabled, will also disable the button if `StepButton` is a child of `Step`. Is passed to child components. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiStep`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiStep-root</span> | Styles applied to the root element.
| <span class="prop-name">horizontal</span> | <span class="prop-name">MuiStep-horizontal</span> | Styles applied to the root element if `orientation="horizontal"`.
| <span class="prop-name">vertical</span> | <span class="prop-name">MuiStep-vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">alternativeLabel</span> | <span class="prop-name">MuiStep-alternativeLabel</span> | Styles applied to the root element if `alternativeLabel={true}`.
| <span class="prop-name">completed</span> | <span class="prop-name">MuiStep-completed</span> | Pseudo-class applied to the root element if `completed={true}`.

You can override the style of the component thanks to one of these customizability points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If it's not enough, you can find the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Step/Step.js) for more detail.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Steppers](/components/steppers/)

