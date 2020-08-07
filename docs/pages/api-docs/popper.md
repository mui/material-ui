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

Poppers rely on the 3rd party library [Popper.js](https://popper.js.org/docs/v1/) for positioning.



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">anchorEl</span> | <span class="prop-type">HTML element<br>&#124;&nbsp;object<br>&#124;&nbsp;func</span> |  | A HTML element, [referenceObject](https://popper.js.org/docs/v1/#referenceObject), or a function that returns either. It's used to set the position of the popper. The return value will passed as the reference object of the Popper instance. |
| <span class="prop-name required">children<abbr title="required">*</abbr></span> | <span class="prop-type">node<br>&#124;&nbsp;func</span> |  | Popper render function or node. |
| <span class="prop-name">container</span> | <span class="prop-type">HTML element<br>&#124;&nbsp;React.Component<br>&#124;&nbsp;func</span> |  | A HTML element, component instance, or function that returns either. The `container` will have the portal children appended to it.<br>By default, it uses the body of the top-level document object, so it's simply `document.body` most of the time. |
| <span class="prop-name">disablePortal</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| <span class="prop-name">keepMounted</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Always keep the children in the DOM. This prop can be useful in SEO situation or when you want to maximize the responsiveness of the Popper. |
| <span class="prop-name">modifiers</span> | <span class="prop-type">object</span> |  | Popper.js is based on a "plugin-like" architecture, most of its features are fully encapsulated "modifiers".<br>A modifier is a function that is called each time Popper.js needs to compute the position of the popper. For this reason, modifiers should be very performant to avoid bottlenecks. To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v1/#modifiers). |
| <span class="prop-name required">open<abbr title="required">*</abbr></span> | <span class="prop-type">bool</span> |  | If `true`, the popper is visible. |
| <span class="prop-name">placement</span> | <span class="prop-type">'bottom-end'<br>&#124;&nbsp;'bottom-start'<br>&#124;&nbsp;'bottom'<br>&#124;&nbsp;'left-end'<br>&#124;&nbsp;'left-start'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right-end'<br>&#124;&nbsp;'right-start'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'top-end'<br>&#124;&nbsp;'top-start'<br>&#124;&nbsp;'top'</span> | <span class="prop-default">'bottom'</span> | Popper placement. |
| <span class="prop-name">popperOptions</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Options provided to the [`popper.js`](https://popper.js.org/docs/v1/) instance. |
| <span class="prop-name">popperRef</span> | <span class="prop-type">ref</span> |  | A ref that points to the used popper instance. |
| <span class="prop-name">transition</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Help supporting a react-transition-group/Transition component. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## Demos

- [Autocomplete](/components/autocomplete/)
- [Menus](/components/menus/)
- [Popper](/components/popper/)

