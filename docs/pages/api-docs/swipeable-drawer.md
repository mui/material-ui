---
filename: /packages/material-ui/src/SwipeableDrawer/SwipeableDrawer.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SwipeableDrawer API

<p class="description">The API documentation of the SwipeableDrawer React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// or
import { SwipeableDrawer } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).





## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">disableBackdropTransition</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the backdrop transition. This can improve the FPS on low-end devices. |
| <span class="prop-name">disableDiscovery</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit to promote accidental discovery of the swipe gesture. |
| <span class="prop-name">disableSwipeToOpen</span> | <span class="prop-type">bool</span> | <span class="prop-default">typeof navigator !== 'undefined' && /iPad\|iPhone\|iPod/.test(navigator.userAgent)</span> | If `true`, swipe to open is disabled. This is useful in browsers where swiping triggers navigation actions. Swipe to open is disabled on iOS browsers by default. |
| <span class="prop-name">hysteresis</span> | <span class="prop-type">number</span> | <span class="prop-default">0.52</span> | Affects how far the drawer must be opened/closed to change his state. Specified as percent (0-1) of the width of the drawer |
| <span class="prop-name">minFlingVelocity</span> | <span class="prop-type">number</span> | <span class="prop-default">450</span> | Defines, from which (average) velocity on, the swipe is defined as complete although hysteresis isn't reached. Good threshold is between 250 - 1000 px/s |
| <span class="prop-name required">onClose<abbr title="required">*</abbr></span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <span class="prop-name required">onOpen<abbr title="required">*</abbr></span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be opened.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <span class="prop-name required">open<abbr title="required">*</abbr></span> | <span class="prop-type">bool</span> |  | If `true`, the drawer is open. |
| <span class="prop-name">SwipeAreaProps</span> | <span class="prop-type">object</span> |  | The element is used to intercept the touch events on the edge. |
| <span class="prop-name">swipeAreaWidth</span> | <span class="prop-type">number</span> | <span class="prop-default">20</span> | The width of the left most (or right most) area in pixels where the drawer can be swiped open from. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">number<br>&#124;&nbsp;{ enter?: number, exit?: number }</span> | <span class="prop-default">{ enter: duration.enteringScreen, exit: duration.leavingScreen }</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Drawer](/api/drawer/)).

## Inheritance

The props of the [Drawer](/api/drawer/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Drawers](/components/drawers/)

