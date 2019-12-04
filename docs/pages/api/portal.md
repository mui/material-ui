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
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The children to render into the `container`. |
| <a class="anchor-link" id="props--container"></a><a href="#props--container" title="link to the prop on this page" class="prop-name">container</a> | <span class="prop-type">func<br>&#124;&nbsp;React.Component<br>&#124;&nbsp;Element</span> |  | A node, component instance, or function that returns either. The `container` will have the portal children appended to it. By default, it uses the body of the top-level document object, so it's simply `document.body` most of the time. |
| <a class="anchor-link" id="props--disablePortal"></a><a href="#props--disablePortal" title="link to the prop on this page" class="prop-name">disablePortal</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| <a class="anchor-link" id="props--onRendered"></a><a href="#props--onRendered" title="link to the prop on this page" class="prop-name">onRendered</a> | <span class="prop-type">func</span> |  | Callback fired once the children has been mounted into the `container`.<br>This prop will be deprecated and removed in v5, the ref can be used instead. |

The component cannot hold a ref.


## Demos

- [Portal](/components/portal/)

