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



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | Alias for the `primary` property. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--disableTypography"></a><a href="#props--disableTypography" title="link to the prop on this page" class="prop-name">disableTypography</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the children won't be wrapped by a Typography component. This can be useful to render an alternative Typography variant by wrapping the `children` (or `primary`) text, and optional `secondary` text with the Typography component. |
| <a class="anchor-link" id="props--inset"></a><a href="#props--inset" title="link to the prop on this page" class="prop-name">inset</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the children will be indented. This should be used if there is no left avatar or left icon. |
| <a class="anchor-link" id="props--primary"></a><a href="#props--primary" title="link to the prop on this page" class="prop-name">primary</a> | <span class="prop-type">node</span> |  | The main content element. |
| <a class="anchor-link" id="props--primaryTypographyProps"></a><a href="#props--primaryTypographyProps" title="link to the prop on this page" class="prop-name">primaryTypographyProps</a> | <span class="prop-type">object</span> |  | These props will be forwarded to the primary typography component (as long as disableTypography is not `true`). |
| <a class="anchor-link" id="props--secondary"></a><a href="#props--secondary" title="link to the prop on this page" class="prop-name">secondary</a> | <span class="prop-type">node</span> |  | The secondary content element. |
| <a class="anchor-link" id="props--secondaryTypographyProps"></a><a href="#props--secondaryTypographyProps" title="link to the prop on this page" class="prop-name">secondaryTypographyProps</a> | <span class="prop-type">object</span> |  | These props will be forwarded to the secondary typography component (as long as disableTypography is not `true`). |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiListItemText`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiListItemText-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--multiline"></a><a href="#css--multiline" class="prop-name">multiline</a> | <span class="prop-name">.MuiListItemText-multiline</span> | Styles applied to the `Typography` components if primary and secondary are set.
| <a class="anchor-link" title="link to the rule name on this page" id="css--dense"></a><a href="#css--dense" class="prop-name">dense</a> | <span class="prop-name">.MuiListItemText-dense</span> | Styles applied to the `Typography` components if dense.
| <a class="anchor-link" title="link to the rule name on this page" id="css--inset"></a><a href="#css--inset" class="prop-name">inset</a> | <span class="prop-name">.MuiListItemText-inset</span> | Styles applied to the root element if `inset={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--primary"></a><a href="#css--primary" class="prop-name">primary</a> | <span class="prop-name">.MuiListItemText-primary</span> | Styles applied to the primary `Typography` component.
| <a class="anchor-link" title="link to the rule name on this page" id="css--secondary"></a><a href="#css--secondary" class="prop-name">secondary</a> | <span class="prop-name">.MuiListItemText-secondary</span> | Styles applied to the secondary `Typography` component.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListItemText/ListItemText.js) for more detail.

## Demos

- [Lists](/components/lists/)

