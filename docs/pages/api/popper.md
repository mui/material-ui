---
filename: /packages/material-ui/src/Popper/Popper.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Popper API

<p class="description">The API documentation of the Popper React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Popper from '@material-ui/core/Popper';
// or
import { Popper } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

Poppers rely on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--anchorEl"></a><a href="#props--anchorEl" class="prop-name">anchorEl</a> | <span class="prop-type">object<br>&#124;&nbsp;func</span> |  | This is the reference element, or a function that returns the reference element, that may be used to set the position of the popover. The return value will passed as the reference object of the Popper instance.<br>The reference element should be an HTML Element instance or a referenceObject: https://popper.js.org/popper-documentation.html#referenceObject. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">node<br>&#124;&nbsp;func</span> |  | Popper render function or node. |
| <a class="anchor-link" id="props--container"></a><a href="#props--container" class="prop-name">container</a> | <span class="prop-type">object<br>&#124;&nbsp;func</span> |  | A node, component instance, or function that returns either. The `container` will passed to the Modal component. By default, it uses the body of the anchorEl's top-level document object, so it's simply `document.body` most of the time. |
| <a class="anchor-link" id="props--disablePortal"></a><a href="#props--disablePortal" class="prop-name">disablePortal</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| <a class="anchor-link" id="props--keepMounted"></a><a href="#props--keepMounted" class="prop-name">keepMounted</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Always keep the children in the DOM. This prop can be useful in SEO situation or when you want to maximize the responsiveness of the Popper. |
| <a class="anchor-link" id="props--modifiers"></a><a href="#props--modifiers" class="prop-name">modifiers</a> | <span class="prop-type">object</span> |  | Popper.js is based on a "plugin-like" architecture, most of its features are fully encapsulated "modifiers".<br>A modifier is a function that is called each time Popper.js needs to compute the position of the popper. For this reason, modifiers should be very performant to avoid bottlenecks. To learn how to create a modifier, [read the modifiers documentation](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object). |
| <a class="anchor-link" id="props--open"></a><a href="#props--open" class="prop-name required">open&nbsp;*</a> | <span class="prop-type">bool</span> |  | If `true`, the popper is visible. |
| <a class="anchor-link" id="props--placement"></a><a href="#props--placement" class="prop-name">placement</a> | <span class="prop-type">'bottom-end'<br>&#124;&nbsp;'bottom-start'<br>&#124;&nbsp;'bottom'<br>&#124;&nbsp;'left-end'<br>&#124;&nbsp;'left-start'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right-end'<br>&#124;&nbsp;'right-start'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'top-end'<br>&#124;&nbsp;'top-start'<br>&#124;&nbsp;'top'</span> | <span class="prop-default">'bottom'</span> | Popper placement. |
| <a class="anchor-link" id="props--popperOptions"></a><a href="#props--popperOptions" class="prop-name">popperOptions</a> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Options provided to the [`popper.js`](https://github.com/FezVrasta/popper.js) instance. |
| <a class="anchor-link" id="props--popperRef"></a><a href="#props--popperRef" class="prop-name">popperRef</a> | <span class="prop-type">ref</span> |  | A ref that points to the used popper instance. |
| <a class="anchor-link" id="props--transition"></a><a href="#props--transition" class="prop-name">transition</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Help supporting a react-transition-group/Transition component. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## Demos

- [Autocomplete](/components/autocomplete/)
- [Menus](/components/menus/)
- [Popper](/components/popper/)

