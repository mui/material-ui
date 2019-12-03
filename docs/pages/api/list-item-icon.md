---
filename: /packages/material-ui/src/ListItemIcon/ListItemIcon.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListItemIcon API

<p class="description">The API documentation of the ListItemIcon React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ListItemIcon from '@material-ui/core/ListItemIcon';
// or
import { ListItemIcon } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">element</span> |  | The content of the component, normally `Icon`, `SvgIcon`, or a `@material-ui/icons` SVG icon element. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiListItemIcon`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiListItemIcon-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--alignItemsFlexStart"></a><a href="#css--alignItemsFlexStart" class="prop-name">alignItemsFlexStart</a> | <span class="prop-name">.MuiListItemIcon-alignItemsFlexStart</span> | Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListItemIcon/ListItemIcon.js) for more detail.

## Demos

- [Lists](/components/lists/)

