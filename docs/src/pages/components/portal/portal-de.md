---
title: Portal React-Komponente
components: Portal
---

# Portal

<p class="description">Die Portalkomponente rendert ihre untergeordneten Elemente in eine neue "Unterstruktur" außerhalb der aktuellen Komponentenhierarchie.</p>

- 📦 [1.3 kB gzipped](/size-snapshot)

The children of the portal component will be appended to the `container` specified. The component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components.

## Beispiel

{{"demo": "pages/components/portal/SimplePortal.js"}}

## Server-side

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. You have to wait for the client-side hydration to see the children.