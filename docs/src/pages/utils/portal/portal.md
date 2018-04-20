---
components: Portal
---

# Portal

The portal component renders its children into a new "subtree"
outside of current component hierarchy.
The children of the portal component will be appended to the `container` specified.

The component is used internally by the [`Modal`](/utils/modals) component.
On the server, the content won't be rendered.
You have to wait for the client side reconciliation to see the children.

## Simple Portal

{{"demo": "pages/utils/portal/SimplePortal.js"}}

## Portal & tests

The portal behavior can be challenging for testing libraries, like [enzyme](https://github.com/airbnb/enzyme/issues/252), to handle.
We provide a global option to disable the behavior: `global.__MUI_PORTAL_DISABLE__`.
When set to `true`, the portal will behave as a pass-through component.
