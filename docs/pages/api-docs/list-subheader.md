---
filename: /packages/material-ui/src/ListSubheader/ListSubheader.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListSubheader API

<p class="description">The API documentation of the ListSubheader React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ListSubheader from '@material-ui/core/ListSubheader';
// or
import { ListSubheader } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiListSubheader` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'inherit'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'li'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">disableGutters</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the List Subheader will not have gutters. |
| <span class="prop-name">disableSticky</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the List Subheader will not stick to the top during scroll. |
| <span class="prop-name">inset</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the List Subheader will be indented. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiListSubheader-root</span> | Styles applied to the root element.
| <span class="prop-name">colorPrimary</span> | <span class="prop-name">.MuiListSubheader-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorInherit</span> | <span class="prop-name">.MuiListSubheader-colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <span class="prop-name">gutters</span> | <span class="prop-name">.MuiListSubheader-gutters</span> | Styles applied to the inner `component` element if `disableGutters={false}`.
| <span class="prop-name">inset</span> | <span class="prop-name">.MuiListSubheader-inset</span> | Styles applied to the root element if `inset={true}`.
| <span class="prop-name">sticky</span> | <span class="prop-name">.MuiListSubheader-sticky</span> | Styles applied to the root element if `disableSticky={false}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListSubheader/ListSubheader.js) for more detail.

## Demos

- [Grid List](/components/grid-list/)
- [Lists](/components/lists/)

