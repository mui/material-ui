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



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" title="link to the prop on this page" class="prop-name">color</a> | <span class="prop-type">'default'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'inherit'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'li'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--disableGutters"></a><a href="#props--disableGutters" title="link to the prop on this page" class="prop-name">disableGutters</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the List Subheader will not have gutters. |
| <a class="anchor-link" id="props--disableSticky"></a><a href="#props--disableSticky" title="link to the prop on this page" class="prop-name">disableSticky</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the List Subheader will not stick to the top during scroll. |
| <a class="anchor-link" id="props--inset"></a><a href="#props--inset" title="link to the prop on this page" class="prop-name">inset</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the List Subheader will be indented. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiListSubheader`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiListSubheader-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorPrimary"></a><a href="#css--colorPrimary" class="prop-name">colorPrimary</a> | <span class="prop-name">.MuiListSubheader-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorInherit"></a><a href="#css--colorInherit" class="prop-name">colorInherit</a> | <span class="prop-name">.MuiListSubheader-colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--gutters"></a><a href="#css--gutters" class="prop-name">gutters</a> | <span class="prop-name">.MuiListSubheader-gutters</span> | Styles applied to the inner `component` element if `disableGutters={false}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--inset"></a><a href="#css--inset" class="prop-name">inset</a> | <span class="prop-name">.MuiListSubheader-inset</span> | Styles applied to the root element if `inset={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--sticky"></a><a href="#css--sticky" class="prop-name">sticky</a> | <span class="prop-name">.MuiListSubheader-sticky</span> | Styles applied to the root element if `disableSticky={false}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListSubheader/ListSubheader.js) for more detail.

## Demos

- [Grid List](/components/grid-list/)
- [Lists](/components/lists/)

