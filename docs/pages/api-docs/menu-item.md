---
filename: /packages/material-ui/src/MenuItem/MenuItem.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# MenuItem API

<p class="description">The API documentation of the MenuItem React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import MenuItem from '@material-ui/core/MenuItem';
// or
import { MenuItem } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiMenuItem` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Menu item contents. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'li'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">dense</span> | <span class="prop-type">bool</span> |  | If `true`, compact vertical padding designed for keyboard and mouse input will be used. |
| <span class="prop-name">disableGutters</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the left and right padding is removed. |
| <span class="prop-name">ListItemClasses</span> | <span class="prop-type">object</span> |  | `classes` prop applied to the [`ListItem`](/api/list-item/) element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ListItem](/api/list-item/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiMenuItem-root</span> | Styles applied to the root element.
| <span class="prop-name">gutters</span> | <span class="prop-name">.MuiMenuItem-gutters</span> | Styles applied to the root element if `disableGutters={false}`.
| <span class="prop-name">selected</span> | <span class="prop-name">.Mui-selected</span> | Styles applied to the root element if `selected={true}`.
| <span class="prop-name">dense</span> | <span class="prop-name">.MuiMenuItem-dense</span> | Styles applied to the root element if dense.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/MenuItem/MenuItem.js) for more detail.

## Inheritance

The props of the [ListItem](/api/list-item/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Menus](/components/menus/)

