---
product: base
title: React Portal component
components: Portal
githubLabel: 'component: Portal'
packageName: '@mui/base'
---

# Portal

<p class="description">The <code>Portal</code> component lets you render its children into a DOM node that exists outside of its own DOM hierarchy.</p>

`Portal` is a utility component built around [React's `createPortal()` API](https://reactjs.org/docs/portals.html).
It gives you the functionality of `createPortal()` in a convenient component form.

:::info
💡 According to [the React docs](https://reactjs.org/docs/portals.html), portals are useful when "you need the child element to visually 'break out' of its container."
:::

The `Portal` component is used internally by Material UI's [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components.

## Basic usage

Normally, children of a component are rendered within that component's DOM tree.
But sometimes it's necessary to mount a child to a different location in the DOM.

The `Portal` component accepts a `container` prop that passes a `ref` to the DOM node where its children will be mounted.

The following demo shows how a `<span>` nested within a `Portal` can be appended to a node outside of its own DOM hierarchy—click **Mount children** to see how it behaves:

{{"demo": "SimplePortal.js"}}

:::warning
⚠️ **Note:** React [does not support](https://github.com/facebook/react/issues/13097) the [`createPortal()` API on the server](https://reactjs.org/docs/portals.html)—client-side hydration is necessary to render the child elements.
:::