---
filename: /packages/material-ui/src/Portal/Portal.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Portal API

<p class="description">The API documentation of the Portal React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Portal from '@material-ui/core/Portal';
// or
import { Portal } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

Portals provide a first-class way to render children into a DOM node
that exists outside the DOM hierarchy of the parent component.



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The children to render into the `container`. |
| <span class="prop-name">container</span> | <span class="prop-type">HTML element<br>&#124;&nbsp;React.Component<br>&#124;&nbsp;func</span> |  | A HTML element, component instance, or function that returns either. The `container` will have the portal children appended to it.<br>By default, it uses the body of the top-level document object, so it's simply `document.body` most of the time. |
| <span class="prop-name">disablePortal</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| <span class="prop-name">onRendered</span> | <span class="prop-type">func</span> |  | Callback fired once the children has been mounted into the `container`.<br>This prop will be deprecated and removed in v5, the ref can be used instead. |

The component cannot hold a ref.


## Demos

- [Portal](/components/portal/)

