---
title: React Portal 组件
components: Portal
---

# Portal 传送门

<p class="description">Portal 组件将其子节点渲染到当前 DOM 层次结构之外的新 "子树" 中。</p>

- 📦 [1.3 kB gzipped](/size-snapshot)

Portal 组件的子节点将被添加到指定的 `container` 中。 该组件在 [`Modal`](/components/modal/) 和 [`Popper`](/components/popper/) 组件内部中被使用。

## 示例

{{"demo": "pages/components/portal/SimplePortal.js"}}

## 服务器端

React API [不支持](https://github.com/facebook/react/issues/13097) 在服务器上的 [`createPortal()`](https://reactjs.org/docs/portals.html)。 你必须等到客户端协调完成才能见到子节点。