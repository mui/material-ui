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



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | Menu item contents. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'li'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--dense"></a><a href="#props--dense" class="prop-name">dense</a> | <span class="prop-type">bool</span> |  | If `true`, compact vertical padding designed for keyboard and mouse input will be used. |
| <a class="anchor-link" id="props--disableGutters"></a><a href="#props--disableGutters" class="prop-name">disableGutters</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the left and right padding is removed. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ListItem](/api/list-item/)).

## CSS

- Style sheet name: `MuiMenuItem`.
- Style sheet details:

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

