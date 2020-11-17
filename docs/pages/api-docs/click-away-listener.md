---
filename: /packages/material-ui/src/ClickAwayListener/ClickAwayListener.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ClickAwayListener API

<p class="description">The API documentation of the ClickAwayListener React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// or
import { ClickAwayListener } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

Listen for click events that occur somewhere in the document, outside of the element itself.
For instance, if you need to hide a menu when people click anywhere else on your page.



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children<abbr title="required">*</abbr></span> | <span class="prop-type">element</span> |  | The wrapped element.<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs). |
| <span class="prop-name">disableReactTree</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the React tree is ignored and only the DOM tree is considered. This prop changes how portaled elements are handled. |
| <span class="prop-name">mouseEvent</span> | <span class="prop-type">'onClick'<br>&#124;&nbsp;'onMouseDown'<br>&#124;&nbsp;'onMouseUp'<br>&#124;&nbsp;false</span> | <span class="prop-default">'onClick'</span> | The mouse event to listen to. You can disable the listener by providing `false`. |
| <span class="prop-name required">onClickAway<abbr title="required">*</abbr></span> | <span class="prop-type">func</span> |  | Callback fired when a "click away" event is detected. |
| <span class="prop-name">touchEvent</span> | <span class="prop-type">'onTouchEnd'<br>&#124;&nbsp;'onTouchStart'<br>&#124;&nbsp;false</span> | <span class="prop-default">'onTouchEnd'</span> | The touch event to listen to. You can disable the listener by providing `false`. |

The component cannot hold a ref.


## Demos

- [Click Away Listener](/components/click-away-listener/)
- [Menus](/components/menus/)

