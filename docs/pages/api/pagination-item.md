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



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">color</span> | <span class="prop-type">'standard'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'standard'</span> | The active color. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> |  | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |  | If `true`, the item will be disabled. |
| <span class="prop-name">getAriaLabel</span> | <span class="prop-type">func</span> |  | Accepts a function which returns a string value that provides a user-friendly name for the current page.<br><br>**Signature:**<br>`function(type?: string, page: number, selected: bool) => string`<br>*type:* The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous').<br>*page:* The page number to format.<br>*selected:* If true, the current page is selected. |
| <span class="prop-name">onClick</span> | <span class="prop-type">func</span> |  | Callback fired when the page is changed.<br><br>**Signature:**<br>`function(event: object, page: number) => void`<br>*event:* The event source of the callback.<br>*page:* The page selected. |
| <span class="prop-name">page</span> | <span class="prop-type">number</span> |  | The current page number. |
| <span class="prop-name">selected</span> | <span class="prop-type">bool</span> |  | If `true` the pagination item is selected. |
| <span class="prop-name">shape</span> | <span class="prop-type">'round'<br>&#124;&nbsp;'rounded'</span> | <span class="prop-default">'round'</span> | The shape of the pagination item. |
| <span class="prop-name">size</span> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'large'</span> | <span class="prop-default">'medium'</span> | The size of the pagination item. |
| <span class="prop-name">type</span> | <span class="prop-type">'page'<br>&#124;&nbsp;'ellipsis'<br>&#124;&nbsp;'first'<br>&#124;&nbsp;'last'<br>&#124;&nbsp;'next'<br>&#124;&nbsp;'previous'</span> | <span class="prop-default">'page'</span> |  |
| <span class="prop-name">variant</span> | <span class="prop-type">'text'<br>&#124;&nbsp;'outlined'</span> |  |  |

The component cannot hold a ref.

Any other props supplied will be provided to the root element (native element).

## Demos

- [Pagination](/components/pagination/)

