---
filename: /packages/material-ui/src/SnackbarContent/SnackbarContent.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SnackbarContent API

<p class="description">The API documentation of the SnackbarContent React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import SnackbarContent from '@material-ui/core/SnackbarContent';
// or
import { SnackbarContent } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--action"></a><a href="#props--action" title="link to the prop on this page" class="prop-name">action</a> | <span class="prop-type">node</span> |  | The action to display. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--message"></a><a href="#props--message" title="link to the prop on this page" class="prop-name">message</a> | <span class="prop-type">node</span> |  | The message to display. |
| <a class="anchor-link" id="props--role"></a><a href="#props--role" title="link to the prop on this page" class="prop-name">role</a> | <span class="prop-type">'alert'<br>&#124;&nbsp;'alertdialog'</span> | <span class="prop-default">'alert'</span> | The role of the SnackbarContent. If the Snackbar requires focus to be closed, the `alertdialog` role should be used instead. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

- Style sheet name: `MuiSnackbarContent`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiSnackbarContent-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--message"></a><a href="#css--message" class="prop-name">message</a> | <span class="prop-name">.MuiSnackbarContent-message</span> | Styles applied to the message wrapper element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--action"></a><a href="#css--action" class="prop-name">action</a> | <span class="prop-name">.MuiSnackbarContent-action</span> | Styles applied to the action wrapper element if `action` is provided.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/SnackbarContent/SnackbarContent.js) for more detail.

## Inheritance

The props of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Snackbars](/components/snackbars/)

