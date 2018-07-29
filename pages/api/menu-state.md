---
filename: /packages/material-ui/src/MenuState/MenuState.js
title: MenuState API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# MenuState

<p class="description">The API documentation of the MenuState React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">func |   | The render function.  It will be called with a single object with the following properties: * `open(eventOrAnchorEl)` - calling this will open the menu * `close()` - calling this will close the menu * `isOpen` - `true`/`false` if the menu is open/closed * `bindTrigger` - a set of properties to pass to the menu trigger, including   an `onClick` property that will open the menu * `bindMenu` - a set of properties to pass to the `Menu` component |
| <span class="prop-name">menuId</span> | <span class="prop-type">string |   | The `id` property to use for the `Menu`.  Will be passed to the render function as `bindMenu.id`, and also used for the `aria-owns` property passed to the trigger component via `bindTrigger`. |
| <span class="prop-name">render</span> | <span class="prop-type">func |   | If you don't want to pass a `children` function, you can pass it as `render` instead. |

Any other properties supplied will be spread to the root element (native element).

## Demos

- [Menu State](/utils/menu-state)

