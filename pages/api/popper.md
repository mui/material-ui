---
filename: /packages/material-ui/src/Popper/Popper.js
title: Popper API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Popper

<p class="description">The API documentation of the Popper React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">anchorEl</span> | <span class="prop-type">union:&nbsp;object&nbsp;&#124;<br>&nbsp;func<br> |   | This is the DOM element, or a function that returns the DOM element, that may be used to set the position of the popover. |
| <span class="prop-name">children</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br>&nbsp;func<br> |   | Popper render function or node. |
| <span class="prop-name">container</span> | <span class="prop-type">union:&nbsp;object&nbsp;&#124;<br>&nbsp;func<br> |   | A node, component instance, or function that returns either. The `container` will passed to the Modal component. By default, it uses the body of the anchorEl's top-level document object, so it's simply `document.body` most of the time. |
| <span class="prop-name">disablePortal</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| <span class="prop-name">keepMounted</span> | <span class="prop-type">bool |   | Always keep the children in the DOM. This property can be useful in SEO situation or when you want to maximize the responsiveness of the Popper. |
| <span class="prop-name required">open *</span> | <span class="prop-type">bool |   | If `true`, the popper is visible. |
| <span class="prop-name">placement</span> | <span class="prop-type">enum:&nbsp;'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top'<br> | <span class="prop-default">'bottom'</span> | Popper placement. |
| <span class="prop-name">popperOptions</span> | <span class="prop-type">object |   | Options provided to the [`popper.js`](https://github.com/FezVrasta/popper.js) instance. |
| <span class="prop-name">transition</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | Help supporting a react-transition-group/Transition component. |

Any other properties supplied will be spread to the root element (native element).

## Demos

- [Autocomplete](/demos/autocomplete)
- [Menus](/demos/menus)
- [Popper](/utils/popper)

