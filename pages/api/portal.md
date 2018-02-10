---
filename: /src/Portal/Portal.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Portal

This component shares many concepts with
[react-overlays](https://react-bootstrap.github.io/react-overlays/#portals)
But has been forked in order to fix some bugs, reduce the number of dependencies
and take the control of our destiny.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | node |  | The children to render into the `container`. |
| container | union:&nbsp;object&nbsp;&#124;<br>&nbsp;func<br> |  | A node, component instance, or function that returns either. The `container` will have the portal children appended to it. By default, it's using the body of the top-level document object, so it's simply `document.body` most of the time. |
| onRendered | func |  | Callback fired once the children has been mounted into the `container`. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## Demos

- [Portal](/utils/portal)

