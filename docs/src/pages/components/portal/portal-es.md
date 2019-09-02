---
title: Portal React component
components: Portal
---

# Portal

<p class="description">El componente del portal hace que sus hijos se conviertan en un nuevo "subtree" fuera de la jerarquía actual de componentes.</p>

- 📦 [1.3 kB gzipped](/size-snapshot)

The children of the portal component will be appended to the `container` specified.

The component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components. On the server, the content won't be rendered. You have to wait for the client-side hydration to see the children.

## Simple Portal

{{"demo": "pages/components/portal/SimplePortal.js"}}