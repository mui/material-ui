---
filename: /packages/material-ui/src/PopupState/PopupState.js
title: PopupState API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# PopupState

<p class="description">The API documentation of the PopupState React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">func |   | The render function.  It will be called with a single object with the following properties: - `open(eventOrAnchorEl)` - calling this will open the popup - `close()` - calling this will close the popup - `isOpen` - `true`/`false` if the menu is open/clpopup - `bindTrigger` - a set of properties to pass to the popup trigger, including   an `onClick` property that will open the popup - `bindPopup` - a set of properties to pass to the popup component |
| <span class="prop-name">popupId</span> | <span class="prop-type">string |   | The `id` property to use for the popup.  Will be passed to the render function as `bindPopup.id`, and also used for the `aria-owns` property passed to the trigger component via `bindTrigger`. |

Any other properties supplied will be spread to the root element (native element).

## Demos

- [Popup State](/utils/popup-state)

