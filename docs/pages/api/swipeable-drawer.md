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
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--disableBackdropTransition"></a><a href="#props--disableBackdropTransition" title="link to the prop on this page" class="prop-name">disableBackdropTransition</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the backdrop transition. This can improve the FPS on low-end devices. |
| <a class="anchor-link" id="props--disableDiscovery"></a><a href="#props--disableDiscovery" title="link to the prop on this page" class="prop-name">disableDiscovery</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit to promote accidental discovery of the swipe gesture. |
| <a class="anchor-link" id="props--disableSwipeToOpen"></a><a href="#props--disableSwipeToOpen" title="link to the prop on this page" class="prop-name">disableSwipeToOpen</a> | <span class="prop-type">bool</span> | <span class="prop-default">typeof navigator !== 'undefined' && /iPad\|iPhone\|iPod/.test(navigator.userAgent)</span> | If `true`, swipe to open is disabled. This is useful in browsers where swiping triggers navigation actions. Swipe to open is disabled on iOS browsers by default. |
| <a class="anchor-link" id="props--hysteresis"></a><a href="#props--hysteresis" title="link to the prop on this page" class="prop-name">hysteresis</a> | <span class="prop-type">number</span> | <span class="prop-default">0.52</span> | Affects how far the drawer must be opened/closed to change his state. Specified as percent (0-1) of the width of the drawer |
| <a class="anchor-link" id="props--minFlingVelocity"></a><a href="#props--minFlingVelocity" title="link to the prop on this page" class="prop-name">minFlingVelocity</a> | <span class="prop-type">number</span> | <span class="prop-default">450</span> | Defines, from which (average) velocity on, the swipe is defined as complete although hysteresis isn't reached. Good threshold is between 250 - 1000 px/s |
| <a class="anchor-link" id="props--onClose"></a><a href="#props--onClose" title="link to the prop on this page" class="prop-name required">onClose&nbsp;*</a> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <a class="anchor-link" id="props--onOpen"></a><a href="#props--onOpen" title="link to the prop on this page" class="prop-name required">onOpen&nbsp;*</a> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be opened.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <a class="anchor-link" id="props--open"></a><a href="#props--open" title="link to the prop on this page" class="prop-name required">open&nbsp;*</a> | <span class="prop-type">bool</span> |  | If `true`, the drawer is open. |
| <a class="anchor-link" id="props--SwipeAreaProps"></a><a href="#props--SwipeAreaProps" title="link to the prop on this page" class="prop-name">SwipeAreaProps</a> | <span class="prop-type">object</span> |  | Props applied to the swipe area element. |
| <a class="anchor-link" id="props--swipeAreaWidth"></a><a href="#props--swipeAreaWidth" title="link to the prop on this page" class="prop-name">swipeAreaWidth</a> | <span class="prop-type">number</span> | <span class="prop-default">20</span> | The width of the left most (or right most) area in pixels where the drawer can be swiped open from. |
| <a class="anchor-link" id="props--transitionDuration"></a><a href="#props--transitionDuration" title="link to the prop on this page" class="prop-name">transitionDuration</a> | <span class="prop-type">number<br>&#124;&nbsp;{ enter?: number, exit?: number }</span> | <span class="prop-default">{ enter: duration.enteringScreen, exit: duration.leavingScreen }</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Drawer](/api/drawer/)).

## Inheritance

The props of the [Drawer](/api/drawer/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Drawers](/components/drawers/)

