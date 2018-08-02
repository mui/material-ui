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
| <span class="prop-name required">children *</span> | <span class="prop-type">func |   | The render function.<br><br>**Signature:**<br>`function(props: object) => React.Node`<br>*props:* the properties injected by `PopupState`: <ul>   <li>`open(eventOrAnchorEl)`: opens the popup</li>   <li>`close()`: closes the popup</li>   <li>`toggle(eventOrAnchorEl)`: opens the popup if it is closed, or     closes the popup if it is open.   </li>   <li>`setOpen(open, [eventOrAnchorEl])`: sets whether the popup is open.     `eventOrAnchorEl` is required if `open` is truthy.   </li>   <li>`isOpen`: `true`/`false` if the popup is open/closed</li>   <li>`bindTrigger`: properties to pass to a trigger component     <ul>       <li>`aria-owns`: the `popupId` you passed to `PopupState` (when the popup is open)</li>       <li>`aria-haspopup`: true</li>       <li>`onClick(event)`: opens the popup</li>     </ul>   </li>   <li>`bindToggle`: properties to pass to a toggle component     <ul>       <li>`aria-owns`: the `popupId` you passed to `PopupState` (when the popup is open)</li>       <li>`aria-haspopup`: true</li>       <li>`onClick(event)`: toggles the popup</li>     </ul>   </li>   <li>`bindPopup`: properties to pass to the popup component     <ul>       <li>`id`: the `popupId` you passed to `PopupState`</li>       <li>`anchorEl`: the trigger element (when the popup is open)</li>       <li>`open`: `true`/`false` if the popup is open/closed</li>       <li>`onClose()`: closes the popup (`"menu"` and `"popover"` variants only)</li>     </ul>   </li> </ul><br> *returns* (React.Node): the content to display |
| <span class="prop-name">popupId</span> | <span class="prop-type">string |   | The `id` property to use for the popup.  Will be passed to the render function as `bindPopup.id`, and also used for the `aria-owns` property passed to the trigger component via `bindTrigger`. |
| <span class="prop-name required">variant *</span> | <span class="prop-type">enum:&nbsp;'menu'&nbsp;&#124;<br>&nbsp;'popover'&nbsp;&#124;<br>&nbsp;'popper'<br> |   | The type of popup you are controlling. |

Any other properties supplied will be spread to the root element (native element).

## Demos

- [Popup State](/utils/popup-state)

