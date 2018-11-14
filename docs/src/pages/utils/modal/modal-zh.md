---
title: 模态框 React 组件
components: Modal
---
# Modal

<p class="description">模态框组件可以用来快速创建对话框、弹出窗口，灯箱等任何你所需的组件。</p>

组件会在背景组件前渲染其`children`节点。

The `Modal` offers a few helpful features over using just a [`Portal`](/utils/portal/) component and some styles:

- Manages dialog stacking when one-at-a-time just isn't enough.
- Creates a backdrop, for disabling interaction below the modal.
- It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
- It disables scrolling of the page content while open.
- Adds the appropriate ARIA roles automatically.

This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).

## Simple modal

{{"demo": "pages/utils/modal/SimpleModal.js"}}