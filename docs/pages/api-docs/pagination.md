---
filename: /packages/material-ui-lab/src/Pagination/Pagination.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Pagination API

<p class="description">The API documentation of the Pagination React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Pagination from '@material-ui/lab/Pagination';
// or
import { Pagination } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiPagination` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">boundaryCount</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | Number of always visible pages at the beginning and end. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'<br>&#124;&nbsp;'standard'</span> | <span class="prop-default">'standard'</span> | The active color. |
| <span class="prop-name">count</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | The total number of pages. |
| <span class="prop-name">defaultPage</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | The page selected by default when the component is uncontrolled. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the pagination component will be disabled. |
| <span class="prop-name">getItemAriaLabel</span> | <span class="prop-type">func</span> |  | Accepts a function which returns a string value that provides a user-friendly name for the current page.<br>For localization purposes, you can use the provided [translations](/guides/localization/).<br><br>**Signature:**<br>`function(type: string, page: number, selected: bool) => string`<br>*type:* The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.<br>*page:* The page number to format.<br>*selected:* If true, the current page is selected. |
| <span class="prop-name">hideNextButton</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, hide the next-page button. |
| <span class="prop-name">hidePrevButton</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, hide the previous-page button. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the page is changed.<br><br>**Signature:**<br>`function(event: object, page: number) => void`<br>*event:* The event source of the callback.<br>*page:* The page selected. |
| <span class="prop-name">page</span> | <span class="prop-type">number</span> |  | The current page. |
| <span class="prop-name">renderItem</span> | <span class="prop-type">func</span> | <span class="prop-default">(item) => &lt;PaginationItem {...item} /></span> | Render the item.<br><br>**Signature:**<br>`function(params: PaginationRenderItemParams) => ReactNode`<br>*params:* The props to spread on a PaginationItem. |
| <span class="prop-name">shape</span> | <span class="prop-type">'round'<br>&#124;&nbsp;'rounded'</span> | <span class="prop-default">'round'</span> | The shape of the pagination items. |
| <span class="prop-name">showFirstButton</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, show the first-page button. |
| <span class="prop-name">showLastButton</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, show the last-page button. |
| <span class="prop-name">siblingCount</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | Number of always visible pages before and after the current page. |
| <span class="prop-name">size</span> | <span class="prop-type">'large'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'small'</span> | <span class="prop-default">'medium'</span> | The size of the pagination component. |
| <span class="prop-name">variant</span> | <span class="prop-type">'outlined'<br>&#124;&nbsp;'text'</span> | <span class="prop-default">'text'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiPagination-root</span> | Styles applied to the root element.
| <span class="prop-name">ul</span> | <span class="prop-name">.MuiPagination-ul</span> | Styles applied to the ul element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Pagination/Pagination.js) for more detail.

## Demos

- [Pagination](/components/pagination/)

