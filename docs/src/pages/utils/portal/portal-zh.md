---
title: React Portal 组件
components: Portal
---
# Portal

<p class="description">Portal 组件将其子节点渲染到当前组件层次结构之外的新 "子树" 中。</p>

Portal 组件的子节点将被添加到指定的 `容器` 中。

该组件在被用于 [`Modal`](/utils/modal/) 和 [`Popper`](/utils/popper/) 内部。 在服务端，内容不会被渲染。 You have to wait for the client side hydratation to see the children.

## 简单的 Portal 示例

{{"demo": "pages/utils/portal/SimplePortal.js"}}