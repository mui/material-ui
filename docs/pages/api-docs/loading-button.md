---
filename: /packages/material-ui-lab/src/LoadingButton/LoadingButton.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# LoadingButton API

<p class="description">The API documentation of the LoadingButton React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import LoadingButton from '@material-ui/lab/LoadingButton';
// or
import { LoadingButton } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiLoadingButton` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the button. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button will be disabled. |
| <span class="prop-name">pending</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the pending indicator will be shown. |
| <span class="prop-name">pendingIndicator</span> | <span class="prop-type">node</span> | <span class="prop-default">&lt;CircularProgress color="inherit" size={16} /></span> | Element placed before the children if the button is in pending state. |
| <span class="prop-name">pendingPosition</span> | <span class="prop-type">'start'<br>&#124;&nbsp;'end'<br>&#124;&nbsp;'center'</span> | <span class="prop-default">'center'</span> | The pending indicator can be positioned on the start, end, or the center of the button. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Button](/api/button/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiLoadingButton-root</span> | Styles applied to the root element.
| <span class="prop-name">pending</span> | <span class="prop-name">.MuiLoadingButton-pending</span> | Styles applied to the root element if `pending={true}`.
| <span class="prop-name">pendingIndicator</span> | <span class="prop-name">.MuiLoadingButton-pendingIndicator</span> | Styles applied to the pendingIndicator element.
| <span class="prop-name">pendingIndicatorCenter</span> | <span class="prop-name">.MuiLoadingButton-pendingIndicatorCenter</span> | Styles applied to the pendingIndicator element if `pendingPosition="center"`.
| <span class="prop-name">pendingIndicatorStart</span> | <span class="prop-name">.MuiLoadingButton-pendingIndicatorStart</span> | Styles applied to the pendingIndicator element if `pendingPosition="start"`.
| <span class="prop-name">pendingIndicatorEnd</span> | <span class="prop-name">.MuiLoadingButton-pendingIndicatorEnd</span> | Styles applied to the pendingIndicator element if `pendingPosition="end"`.
| <span class="prop-name">endIconPendingEnd</span> | <span class="prop-name">.MuiLoadingButton-endIconPendingEnd</span> | Styles applied to the endIcon element if `pending={true}` and `pendingPosition="end"`.
| <span class="prop-name">startIconPendingStart</span> | <span class="prop-name">.MuiLoadingButton-startIconPendingStart</span> | Styles applied to the startIcon element if `pending={true}` and `pendingPosition="start"`.
| <span class="prop-name">labelPendingCenter</span> | <span class="prop-name">.MuiLoadingButton-labelPendingCenter</span> | Styles applied to the label element if `pending={true}` and `pendingPosition="center"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/next/packages/material-ui-lab/src/LoadingButton/LoadingButton.js) for more detail.

## Inheritance

The props of the [Button](/api/button/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Buttons](/components/buttons/)

