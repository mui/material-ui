---
filename: /packages/material-ui/src/SwipeableDrawer/SwipeableDrawer.js
title: SwipeableDrawer API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SwipeableDrawer

<p class="description">The API documentation of the SwipeableDrawer React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">disableBackdropTransition</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | Disable the backdrop transition. This can improve the FPS on low-end devices. |
| <span class="prop-name">disableDiscovery</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit to promote accidental discovery of the swipe gesture. |
| <span class="prop-name">disableSwipeToOpen</span> | <span class="prop-type">bool | <span class="prop-default">typeof navigator !== 'undefined' && /iPad\|iPhone\|iPod/.test(navigator.userAgent)</span> | If `true`, swipe to open is disabled. This is useful in browsers where swiping triggers navigation actions. Swipe to open is disabled on iOS browsers by default. |
| <span class="prop-name required">onClose *</span> | <span class="prop-type">func |   | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name required">onOpen *</span> | <span class="prop-type">func |   | Callback fired when the component requests to be opened.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name required">open *</span> | <span class="prop-type">bool |   | If `true`, the drawer is open. |
| <span class="prop-name">swipeAreaWidth</span> | <span class="prop-type">number | <span class="prop-default">20</span> | The width of the left most (or right most) area in pixels where the drawer can be swiped open from. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }<br> | <span class="prop-default">{ enter: duration.enteringScreen, exit: duration.leavingScreen }</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be spread to the root element ([Drawer](/api/drawer)).

## Inheritance

The properties of the [Drawer](/api/drawer) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Drawers](/demos/drawers)

