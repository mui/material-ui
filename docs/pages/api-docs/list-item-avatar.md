---
filename: /packages/material-ui/src/ListItemAvatar/ListItemAvatar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListItemAvatar API

<p class="description">The API documentation of the ListItemAvatar React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// or
import { ListItemAvatar } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

A simple wrapper to apply `List` styles to an `Avatar`.

## Component name

The `MuiListItemAvatar` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children<abbr title="required">*</abbr></span> | <span class="prop-type">element</span> |  | The content of the component – normally `Avatar`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiListItemAvatar-root</span> | Styles applied to the root element.
| <span class="prop-name">alignItemsFlexStart</span> | <span class="prop-name">.MuiListItemAvatar-alignItemsFlexStart</span> | Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListItemAvatar/ListItemAvatar.js) for more detail.

## Demos

- [Lists](/components/lists/)

