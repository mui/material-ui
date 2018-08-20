---
filename: /packages/material-ui/src/FormGroup/FormGroup.js
title: FormGroup API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormGroup

<p class="description">The API documentation of the FormGroup React component.</p>

`FormGroup` wraps controls such as `Checkbox` and `Switch`.
It provides compact row layout.
For the `Radio`, you should be using the `RadioGroup` component instead of this one.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |   | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">row</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | Display group of elements in a compact row. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">row</span> | Styles applied to the root element if `row={true}`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/FormGroup/FormGroup.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiFormGroup`.

## Demos

- [Selection Controls](/demos/selection-controls)

