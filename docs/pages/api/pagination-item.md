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
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the item will be disabled. |
| <span class="prop-name">getAriaLabel</span> | <span class="prop-type">func</span> | <span class="prop-default">function defaultGetAriaLabel(type, page, selected) {  if (type === 'page') {    return `${selected ? '' : 'go to '}page ${page}`;  }  return `Go to ${type} page`;}</span> | Accepts a function which returns a string value that provides a user-friendly name for the current page.<br><br>**Signature:**<br>`function(type?: string, page: number, selected: bool) => string`<br>*type:* The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous').<br>*page:* The page number to format.<br>*selected:* If true, the current page is selected. |
| <span class="prop-name">onClick</span> | <span class="prop-type">func</span> |  | Callback fired when the page is changed.<br><br>**Signature:**<br>`function(event: object, page: number) => void`<br>*event:* The event source of the callback.<br>*page:* The page selected. |
| <span class="prop-name">page</span> | <span class="prop-type">number</span> |  | The current page number. |
| <span class="prop-name">selected</span> | <span class="prop-type">bool</span> |  | If `true` the pagination item is selected. |
| <span class="prop-name">shape</span> | <span class="prop-type">'round'<br>&#124;&nbsp;'rounded'</span> | <span class="prop-default">'round'</span> | The shape of the pagination item. |
| <span class="prop-name">size</span> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'large'</span> | <span class="prop-default">'medium'</span> | The size of the pagination item. |
| <span class="prop-name">type</span> | <span class="prop-type">'page'<br>&#124;&nbsp;'first'<br>&#124;&nbsp;'last'<br>&#124;&nbsp;'next'<br>&#124;&nbsp;'previous'<br>&#124;&nbsp;'start-ellipsis'<br>&#124;&nbsp;'end-ellipsis'</span> | <span class="prop-default">'page'</span> |  |
| <span class="prop-name">variant</span> | <span class="prop-type">'text'<br>&#124;&nbsp;'outlined'</span> |  |  |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `PaginationItem`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.root-44</span> | Styles applied to the root element.
| <span class="prop-name">outlined</span> | <span class="prop-name">.outlined-45</span> | Styles applied to the button element if `outlined="true"`.
| <span class="prop-name">textPrimary</span> | <span class="prop-name">.textPrimary-46</span> | Styles applied to the button element if `variant="text"` and `color="primary"`.
| <span class="prop-name">textSecondary</span> | <span class="prop-name">.textSecondary-47</span> | Styles applied to the button element if `variant="text"` and `color="secondary"`.
| <span class="prop-name">outlinedPrimary</span> | <span class="prop-name">.outlinedPrimary-48</span> | Styles applied to the button element if `variant="outlined"` and `color="primary"`.
| <span class="prop-name">outlinedSecondary</span> | <span class="prop-name">.outlinedSecondary-49</span> | Styles applied to the button element if `variant="outlined"` and `color="secondary"`.
| <span class="prop-name">rounded</span> | <span class="prop-name">.rounded-50</span> | Styles applied to the button element if `rounded="true"`.
| <span class="prop-name">ellipsis</span> | <span class="prop-name">.ellipsis-51</span> | Styles applied to the ellipsis element.
| <span class="prop-name">icon</span> | <span class="prop-name">.icon-52</span> | Styles applied to the icon element.
| <span class="prop-name">sizeSmall</span> | <span class="prop-name">.sizeSmall-53</span> | Pseudo-class applied to the root element if `size="small"`.
| <span class="prop-name">sizeLarge</span> | <span class="prop-name">.sizeLarge-54</span> | Pseudo-class applied to the root element if `size="large"`.
| <span class="prop-name">disabled</span> | <span class="prop-name">.disabled-55</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">selected</span> | <span class="prop-name">.selected-56</span> | Pseudo-class applied to the root element if `selected={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/PaginationItem/PaginationItem.js) for more detail.

## Demos

- [Pagination](/components/pagination/)

