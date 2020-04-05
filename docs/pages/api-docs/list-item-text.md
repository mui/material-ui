---
filename: /packages/material-ui/src/ListItemText/ListItemText.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListItemText API

<p class="description">The API documentation of the ListItemText React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ListItemText from '@material-ui/core/ListItemText';
// or
import { ListItemText } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiListItemText` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Alias for the `primary` prop. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disableTypography</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the children won't be wrapped by a Typography component. This can be useful to render an alternative Typography variant by wrapping the `children` (or `primary`) text, and optional `secondary` text with the Typography component. |
| <span class="prop-name">inset</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the children will be indented. This should be used if there is no left avatar or left icon. |
| <span class="prop-name">primary</span> | <span class="prop-type">node</span> |  | The main content element. |
| <span class="prop-name">primaryTypographyProps</span> | <span class="prop-type">object</span> |  | These props will be forwarded to the primary typography component (as long as disableTypography is not `true`). |
| <span class="prop-name">secondary</span> | <span class="prop-type">node</span> |  | The secondary content element. |
| <span class="prop-name">secondaryTypographyProps</span> | <span class="prop-type">object</span> |  | These props will be forwarded to the secondary typography component (as long as disableTypography is not `true`). |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiListItemText-root</span> | Styles applied to the root element.
| <span class="prop-name">multiline</span> | <span class="prop-name">.MuiListItemText-multiline</span> | Styles applied to the `Typography` components if primary and secondary are set.
| <span class="prop-name">dense</span> | <span class="prop-name">.MuiListItemText-dense</span> | Styles applied to the `Typography` components if dense.
| <span class="prop-name">inset</span> | <span class="prop-name">.MuiListItemText-inset</span> | Styles applied to the root element if `inset={true}`.
| <span class="prop-name">primary</span> | <span class="prop-name">.MuiListItemText-primary</span> | Styles applied to the primary `Typography` component.
| <span class="prop-name">secondary</span> | <span class="prop-name">.MuiListItemText-secondary</span> | Styles applied to the secondary `Typography` component.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListItemText/ListItemText.js) for more detail.

## Demos

- [Lists](/components/lists/)

