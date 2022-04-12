---
product: material-ui
title: React Portal component
components: Portal
githubLabel: 'component: Portal'
---

# Portal

<p class="description">The portal component renders its children into a new "subtree" outside of current DOM hierarchy.</p>

The children of the portal component will be appended to the `container` specified.
The component is used internally by the [`Modal`](/material-ui/react-modal/) and [`Popper`](/material-ui/react-popper/) components.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Example

{{"demo": "SimplePortal.js"}}

## Server-side

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server.
You have to wait for the client-side hydration to see the children.

## Unstyled

- 📦 [970 B gzipped](https://bundlephobia.com/package/@mui/base@latest)

As the component does not have any styles, it also comes with the Base package.

```js
import Portal from '@mui/base/Portal';
```
