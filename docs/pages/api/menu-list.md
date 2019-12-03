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

A permanently displayed menu following https://www.w3.org/TR/wai-aria-practices/#menubutton
It's exposed to help customization of the [`Menu`](/api/menu/) component. If you
use it separately you need to move focus into the component manually. Once
the focus is placed inside the component it is fully keyboard accessible.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--autoFocus"></a><a href="#props--autoFocus" class="prop-name">autoFocus</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, will focus the `[role="menu"]` container and move into tab order |
| <a class="anchor-link" id="props--autoFocusItem"></a><a href="#props--autoFocusItem" class="prop-name">autoFocusItem</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, will focus the first menuitem if `variant="menu"` or selected item if `variant="selectedMenu"` |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | MenuList contents, normally `MenuItem`s. |
| <a class="anchor-link" id="props--disableListWrap"></a><a href="#props--disableListWrap" class="prop-name">disableListWrap</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the menu items will not wrap focus. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" class="prop-name">variant</a> | <span class="prop-type">'menu'<br>&#124;&nbsp;'selectedMenu'</span> | <span class="prop-default">'selectedMenu'</span> | The variant to use. Use `menu` to prevent selected items from impacting the initial focus and the vertical alignment relative to the anchor element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([List](/api/list/)).

## Inheritance

The props of the [List](/api/list/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Menus](/components/menus/)

