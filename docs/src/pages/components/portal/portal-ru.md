---
title: Portal React component
components: Portal
---

# Portal

<p class="description">Компонент Portal отображает свои дочерние элементы в новом «поддереве» вне текущей иерархии компонентов.</p>

- 📦 [1.3 kB gzipped](/size-snapshot)

Дочерние элементы портала будут добавлены внутрь элемента, указанного в свойстве `container`. The component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components.

## Пример

{{"demo": "pages/components/portal/SimplePortal.js"}}

## Server-side

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. You have to wait for the client-side hydration to see the children.