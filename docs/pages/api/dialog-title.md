---
filename: /packages/material-ui/src/DialogTitle/DialogTitle.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# DialogTitle API

<p class="description">The API documentation of the DialogTitle React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import DialogTitle from '@material-ui/core/DialogTitle';
// or
import { DialogTitle } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--disableTypography"></a><a href="#props--disableTypography" title="link to the prop on this page" class="prop-name">disableTypography</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the children won't be wrapped by a typography component. For instance, this can be useful to render an h4 instead of the default h2. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiDialogTitle`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiDialogTitle-root</span> | Styles applied to the root element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/DialogTitle/DialogTitle.js) for more detail.

## Demos

- [Dialogs](/components/dialogs/)

