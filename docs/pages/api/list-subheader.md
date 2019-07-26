---
filename: /packages/material-ui/src/ListSubheader/ListSubheader.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListSubheader API

<p class="description">The API documentation of the ListSubheader React component. Learn more about the properties and the CSS customization points.</p>

```js
import { ListSubheader } from '@material-ui/core';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'inherit'<br></span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'li'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disableGutters</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the List Subheader will not have gutters. |
| <span class="prop-name">disableSticky</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the List Subheader will not stick to the top during scroll. |
| <span class="prop-name">inset</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the List Subheader will be indented. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiListSubheader`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiListSubheader-root</span> | Styles applied to the root element.
| <span class="prop-name">colorPrimary</span> | <span class="prop-name">MuiListSubheader-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorInherit</span> | <span class="prop-name">MuiListSubheader-colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <span class="prop-name">gutters</span> | <span class="prop-name">MuiListSubheader-gutters</span> | Styles applied to the inner `component` element if `disableGutters={false}`.
| <span class="prop-name">inset</span> | <span class="prop-name">MuiListSubheader-inset</span> | Styles applied to the root element if `inset={true}`.
| <span class="prop-name">sticky</span> | <span class="prop-name">MuiListSubheader-sticky</span> | Styles applied to the root element if `disableSticky={false}`.

You can override the style of the component thanks to one of these customizability points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If it's not enough, you can find the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListSubheader/ListSubheader.js) for more detail.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Grid List](/components/grid-list/)
- [Lists](/components/lists/)

