---
filename: /packages/material-ui/src/MenuList/MenuList.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# MenuList API

<p class="description">The API documentation of the MenuList React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import MenuList from '@material-ui/core/MenuList';
// or
import { MenuList } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">autoFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, will focus the `[role="menu"]` container and move into tab order |
| <span class="prop-name">autoFocusItem</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, will focus the first menuitem if `variant="menu"` or selected item if `variant="selectedMenu"` |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | MenuList contents, normally `MenuItem`s. |
| <span class="prop-name">disableListWrap</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the menu items will not wrap focus. |
| <span class="prop-name">variant</span> | <span class="prop-type">'menu'<br>&#124;&nbsp;'selectedMenu'</span> | <span class="prop-default">'selectedMenu'</span> | The variant to use. Use `menu` to prevent selected items from impacting the initial focus and the vertical alignment relative to the anchor element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([List](/api/list/)).

## Inheritance

The props of the [List](/api/list/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Menus](/components/menus/)

