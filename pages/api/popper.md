---
filename: /packages/material-ui/src/Popper/Popper.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Popper API

<p class="description">The API documentation of the Popper React component. Learn more about the properties and the CSS customization points.</p>

```js
import Popper from '@material-ui/core/Popper';
```

Poppers rely on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">anchorEl</span> | <span class="prop-type">union:&nbsp;object&nbsp;&#124;<br>&nbsp;func<br></span> |  | This is the DOM element, or a function that returns the DOM element, that may be used to set the position of the popover. The return value will passed as the reference object of the Popper instance. |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br>&nbsp;func<br></span> |  | Popper render function or node. |
| <span class="prop-name">container</span> | <span class="prop-type">union:&nbsp;object&nbsp;&#124;<br>&nbsp;func<br></span> |  | A node, component instance, or function that returns either. The `container` will passed to the Modal component. By default, it uses the body of the anchorEl's top-level document object, so it's simply `document.body` most of the time. |
| <span class="prop-name">disablePortal</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| <span class="prop-name">keepMounted</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Always keep the children in the DOM. This property can be useful in SEO situation or when you want to maximize the responsiveness of the Popper. |
| <span class="prop-name">modifiers</span> | <span class="prop-type">object</span> |  | Popper.js is based on a "plugin-like" architecture, most of its features are fully encapsulated "modifiers".<br>A modifier is a function that is called each time Popper.js needs to compute the position of the popper. For this reason, modifiers should be very performant to avoid bottlenecks. To learn how to create a modifier, [read the modifiers documentation](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object). |
| <span class="prop-name required">open&nbsp;*</span> | <span class="prop-type">bool</span> |  | If `true`, the popper is visible. |
| <span class="prop-name">placement</span> | <span class="prop-type">enum:&nbsp;'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top'<br></span> | <span class="prop-default">'bottom'</span> | Popper placement. |
| <span class="prop-name">popperOptions</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Options provided to the [`popper.js`](https://github.com/FezVrasta/popper.js) instance. |
| <span class="prop-name">transition</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Help supporting a react-transition-group/Transition component. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Autocomplete](/components/autocomplete/)
- [Menus](/components/menus/)
- [Popper](/components/popper/)

