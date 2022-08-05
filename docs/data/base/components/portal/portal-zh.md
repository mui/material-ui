---
product: base
title: React Portal（传送门）组件
components: Portal
githubLabel: 'component: Portal'
---

# Portal

<p class="description">传送门组件将其子节点渲染到当前 DOM 结构之外的新 "子类树" 当中。</p>

传送门组件的子节点将被添加到指定的 `container` 中。 [`Modal`](/material-ui/react-modal/) 和 [`Popper`](/material-ui/react-popper/) 组件内部都是用了该组件。

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## 示例

{{"demo": "SimplePortal.js"}}

## 服务器端

React [不支持](https://github.com/facebook/react/issues/13097)服务端渲染的 [`createPortal()`](https://reactjs.org/docs/portals.html) API。 您必须等到客户端的注水渲染（hydration）之后才能见到子节点。
