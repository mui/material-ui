---
title: React Portal 组件
components: Portal
---

# Portal 传送门

<p class="description">The portal component renders its children into a new "subtree" outside of current DOM hierarchy.</p>

- 📦 [1.3kB 已压缩的包](/size-snapshot)

Portal 组件的子节点将被添加到指定的 `容器` 中。 The component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components.

## 示例

{{"demo": "pages/components/portal/SimplePortal.js"}}

## 服务器端

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. You have to wait for the client-side hydration to see the children.