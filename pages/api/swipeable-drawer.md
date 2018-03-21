---
filename: /src/SwipeableDrawer/SwipeableDrawer.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SwipeableDrawer



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">disableDiscovery</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit to promote accidental discovery of the swipe gesture. |
| <span class="prop-name required">onClose *</span> | <span class="prop-type">func |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name required">onOpen *</span> | <span class="prop-type">func |  | Callback fired when the component requests to be opened.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name required">open *</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the drawer is open. |
| <span class="prop-name">swipeAreaWidth</span> | <span class="prop-type">number | <span class="prop-default">20</span> | The width of the left most (or right most) area in pixels where the drawer can be swiped open from. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## Inheritance

The properties of the [Drawer](/api/drawer) component are also available.

