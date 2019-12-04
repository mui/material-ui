---
filename: /packages/material-ui/src/FormGroup/FormGroup.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormGroup API

<p class="description">The API documentation of the FormGroup React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import FormGroup from '@material-ui/core/FormGroup';
// or
import { FormGroup } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

`FormGroup` wraps controls such as `Checkbox` and `Switch`.
It provides compact row layout.
For the `Radio`, you should be using the `RadioGroup` component instead of this one.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--row"></a><a href="#props--row" title="link to the prop on this page" class="prop-name">row</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Display group of elements in a compact row. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiFormGroup`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiFormGroup-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--row"></a><a href="#css--row" class="prop-name">row</a> | <span class="prop-name">.MuiFormGroup-row</span> | Styles applied to the root element if `row={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormGroup/FormGroup.js) for more detail.

## Demos

- [Checkboxes](/components/checkboxes/)
- [Switches](/components/switches/)

