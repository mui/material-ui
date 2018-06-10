---
filename: /packages/material-ui/src/ClickAwayListener/ClickAwayListener.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ClickAwayListener

Listen for click events that occur somewhere in the document, outside of the element itself.
For instance, if you need to hide a menu when people click anywhere else on your page.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node |   |  |
| <span class="prop-name">mouseEvent</span> | <span class="prop-type">enum:&nbsp;'onClick'&nbsp;&#124;<br>&nbsp;'onMouseDown'&nbsp;&#124;<br>&nbsp;'onMouseUp'&nbsp;&#124;<br>&nbsp;false<br> | <span class="prop-default">'onMouseUp'</span> |  |
| <span class="prop-name required">onClickAway *</span> | <span class="prop-type">func |   |  |
| <span class="prop-name">touchEvent</span> | <span class="prop-type">enum:&nbsp;'onTouchStart'&nbsp;&#124;<br>&nbsp;'onTouchEnd'&nbsp;&#124;<br>&nbsp;false<br> | <span class="prop-default">'onTouchEnd'</span> |  |

Any other properties supplied will be spread to the root element ([EventListener](https://github.com/oliviertassinari/react-event-listener)).

## Inheritance

The properties of the [EventListener](https://github.com/oliviertassinari/react-event-listener) component, from react-event-listener, are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Menus](/demos/menus)
- [Click Away Listener](/utils/click-away-listener)

