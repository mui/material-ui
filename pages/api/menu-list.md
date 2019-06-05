---
filename: /packages/material-ui/src/MenuList/MenuList.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# MenuList API

<p class="description">The API documentation of the MenuList React component. Learn more about the properties and the CSS customization points.</p>

```js
import MenuList from '@material-ui/core/MenuList';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">autoFocus</span> | <span class="prop-type">bool</span> |  | If `true`, the list will be focused during the first mount. Focus will also be triggered if the value changes from false to true. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | MenuList contents, normally `MenuItem`s. |
| <span class="prop-name">disableListWrap</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the menu items will not wrap focus. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([List](/api/list/)).

## Inheritance

The properties of the [List](/api/list/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Menus](/components/menus/)

