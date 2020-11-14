---
title: React Portal component
components: Portal
---

# Portal

<p class="description">El componente portal renderiza sus hijos en un nuevo "subárbol" fuera de la jerarquía actual de DOM.</p>

- 📦 [1.3 kB comprimido](/size-snapshot)

Los hijos del componente portal se añadirán al `container` especificado. El componente es utilizado internamente por los componentes [`Modal`](/components/modal/) y [`Popper`](/components/popper/).

## Ejemplo

{{"demo": "pages/components/portal/SimplePortal.js"}}

## Lado del servidor

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. Hay que esperar a que la hidratación del lado del cliente vea a los children.