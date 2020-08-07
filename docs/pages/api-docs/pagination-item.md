---
filename: /packages/material-ui-lab/src/PaginationItem/PaginationItem.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# PaginationItem API

<p class="description">The API documentation of the PaginationItem React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import PaginationItem from '@material-ui/lab/PaginationItem';
// or
import { PaginationItem } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiPaginationItem` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">color</span> | <span class="prop-type">'standard'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'standard'</span> | The active color. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> |  | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the item will be disabled. |
| <span class="prop-name">page</span> | <span class="prop-type">number</span> |  | The current page number. |
| <span class="prop-name">selected</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true` the pagination item is selected. |
| <span class="prop-name">shape</span> | <span class="prop-type">'round'<br>&#124;&nbsp;'rounded'</span> | <span class="prop-default">'round'</span> | The shape of the pagination item. |
| <span class="prop-name">size</span> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'large'</span> | <span class="prop-default">'medium'</span> | The size of the pagination item. |
| <span class="prop-name">type</span> | <span class="prop-type">'page'<br>&#124;&nbsp;'first'<br>&#124;&nbsp;'last'<br>&#124;&nbsp;'next'<br>&#124;&nbsp;'previous'<br>&#124;&nbsp;'start-ellipsis'<br>&#124;&nbsp;'end-ellipsis'</span> | <span class="prop-default">'page'</span> | The type of pagination item. |
| <span class="prop-name">variant</span> | <span class="prop-type">'text'<br>&#124;&nbsp;'outlined'</span> | <span class="prop-default">'text'</span> | The pagination item variant. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiPaginationItem-root</span> | Styles applied to the root element.
| <span class="prop-name">page</span> | <span class="prop-name">.MuiPaginationItem-page</span> | Styles applied to the root element if `type="page"`.
| <span class="prop-name">sizeSmall</span> | <span class="prop-name">.MuiPaginationItem-sizeSmall</span> | Styles applied applied to the root element if `size="small"`.
| <span class="prop-name">sizeLarge</span> | <span class="prop-name">.MuiPaginationItem-sizeLarge</span> | Styles applied applied to the root element if `size="large"`.
| <span class="prop-name">textPrimary</span> | <span class="prop-name">.MuiPaginationItem-textPrimary</span> | Styles applied to the root element if `variant="text"` and `color="primary"`.
| <span class="prop-name">textSecondary</span> | <span class="prop-name">.MuiPaginationItem-textSecondary</span> | Styles applied to the root element if `variant="text"` and `color="secondary"`.
| <span class="prop-name">outlined</span> | <span class="prop-name">.MuiPaginationItem-outlined</span> | Styles applied to the root element if `outlined="true"`.
| <span class="prop-name">outlinedPrimary</span> | <span class="prop-name">.MuiPaginationItem-outlinedPrimary</span> | Styles applied to the root element if `variant="outlined"` and `color="primary"`.
| <span class="prop-name">outlinedSecondary</span> | <span class="prop-name">.MuiPaginationItem-outlinedSecondary</span> | Styles applied to the root element if `variant="outlined"` and `color="secondary"`.
| <span class="prop-name">rounded</span> | <span class="prop-name">.MuiPaginationItem-rounded</span> | Styles applied to the root element if `rounded="true"`.
| <span class="prop-name">ellipsis</span> | <span class="prop-name">.MuiPaginationItem-ellipsis</span> | Styles applied to the root element if `type="start-ellipsis"` or `type="end-ellipsis"`.
| <span class="prop-name">focusVisible</span> | <span class="prop-name">.Mui-focusVisible</span> | Pseudo-class applied to the root element if keyboard focused.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">selected</span> | <span class="prop-name">.Mui-selected</span> | Pseudo-class applied to the root element if `selected={true}`.
| <span class="prop-name">icon</span> | <span class="prop-name">.MuiPaginationItem-icon</span> | Styles applied to the icon element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/PaginationItem/PaginationItem.js) for more detail.

## Demos

- [Pagination](/components/pagination/)

