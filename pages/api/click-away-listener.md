---
filename: /packages/material-ui/src/ClickAwayListener/ClickAwayListener.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ClickAwayListener API

<p class="description">The API documentation of the ClickAwayListener React component. Learn more about the properties and the CSS customization points.</p>

```js
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
```

Listen for click events that occur somewhere in the document, outside of the element itself.
For instance, if you need to hide a menu when people click anywhere else on your page.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">element</span> |  | The wrapped element.<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs). |
| <span class="prop-name">mouseEvent</span> | <span class="prop-type">enum:&nbsp;'onClick'&nbsp;&#124;<br>&nbsp;'onMouseDown'&nbsp;&#124;<br>&nbsp;'onMouseUp'&nbsp;&#124;<br>&nbsp;false<br></span> | <span class="prop-default">'onClick'</span> | The mouse event to listen to. You can disable the listener by providing `false`. |
| <span class="prop-name required">onClickAway&nbsp;*</span> | <span class="prop-type">func</span> |  | Callback fired when a "click away" event is detected. |
| <span class="prop-name">touchEvent</span> | <span class="prop-type">enum:&nbsp;'onTouchStart'&nbsp;&#124;<br>&nbsp;'onTouchEnd'&nbsp;&#124;<br>&nbsp;false<br></span> | <span class="prop-default">'onTouchEnd'</span> | The touch event to listen to. You can disable the listener by providing `false`. |

The component cannot hold a ref.


## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Click Away Listener](/components/click-away-listener/)
- [Menus](/components/menus/)

