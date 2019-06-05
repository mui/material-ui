---
filename: /packages/material-ui/src/FormGroup/FormGroup.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormGroup API

<p class="description">The API documentation of the FormGroup React component. Learn more about the properties and the CSS customization points.</p>

```js
import FormGroup from '@material-ui/core/FormGroup';
```

`FormGroup` wraps controls such as `Checkbox` and `Switch`.
It provides compact row layout.
For the `Radio`, you should be using the `RadioGroup` component instead of this one.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">row</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Display group of elements in a compact row. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">row</span> | Styles applied to the root element if `row={true}`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormGroup/FormGroup.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiFormGroup`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Checkboxes](/components/checkboxes/)
- [Switches](/components/switches/)

