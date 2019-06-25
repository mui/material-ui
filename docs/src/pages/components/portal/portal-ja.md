---
title: Portal React component
components: Portal
---

# Portal

<p class="description">The portal component renders its children into a new "subtree" outside of current component hierarchy.</p>

- 

The children of the portal component will be appended to the `container` specified.

The component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components. On the server, the content won't be rendered. You have to wait for the client side hydratation to see the children.

## Simple Portal

{{"demo": "pages/components/portal/SimplePortal.js"}}