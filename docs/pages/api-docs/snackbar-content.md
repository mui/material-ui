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



## Component name

The `MuiSnackbarContent` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">action</span> | <span class="prop-type">node</span> |  | The action to display. It renders after the message, at the end of the snackbar. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">message</span> | <span class="prop-type">node</span> |  | The message to display. |
| <span class="prop-name">role</span> | <span class="prop-type">string</span> | <span class="prop-default">'alert'</span> | The ARIA role attribute of the element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiSnackbarContent-root</span> | Styles applied to the root element.
| <span class="prop-name">message</span> | <span class="prop-name">.MuiSnackbarContent-message</span> | Styles applied to the message wrapper element.
| <span class="prop-name">action</span> | <span class="prop-name">.MuiSnackbarContent-action</span> | Styles applied to the action wrapper element if `action` is provided.

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

