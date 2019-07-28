---
filename: /packages/material-ui/src/ListItemIcon/ListItemIcon.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListItemIcon API

<p class="description">The API documentation of the ListItemIcon React component. Learn more about the props and the CSS customization points.</p>

```js
import { ListItemIcon } from '@material-ui/core';
```

A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">element</span> |  | The content of the component, normally `Icon`, `SvgIcon`, or a `@material-ui/icons` SVG icon element. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiListItemIcon`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiListItemIcon-root</span> | Styles applied to the root element.
| <span class="prop-name">alignItemsFlexStart</span> | <span class="prop-name">MuiListItemIcon-alignItemsFlexStart</span> | Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`.

You can override the style of the component thanks to one of these customizability points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If it's not enough, you can find the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListItemIcon/ListItemIcon.js) for more detail.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Lists](/components/lists/)

