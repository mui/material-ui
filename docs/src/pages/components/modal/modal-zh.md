---
title: 模态框 React 组件
components: Modal
---

# Modal 模态框

<p class="description">模态框组件可以用来快速创建对话框、弹出窗口，灯箱等任何你所需的组件。</p>

组件会在背景组件前渲染其`children`节点。 `Modal` 提供了一些重要的功能：

- 💄 Manages modal stacking when one-at-a-time just isn't enough.
- 🔐 创建一个 backdrop 来禁用在模态框外的交互。
- 🔐 在模态框打开时禁用页面内容的滚动。
- ♿️它妥善管理焦点;移动到模态内容， 并保持它直到模态关闭。
- ♿️自动添加适当的ARIA角色。
- 📦 [5kB 已压缩的包](/size-snapshot)。

> **术语注释**。 “模态框”（Modal）这个词有时也被用来指代“对话框”，但是这种用法属于误用。 模态框的窗口可以描述为 UI 的一部分。 如果一个元素[阻挡了用户与应用的其它部分的互动](https://en.wikipedia.org/wiki/Modal_window)，这个元素就是模态的。

当你创建一个模态对话框时，使用[对话框（Dialog）](/components/dialogs/)组件比直接使用模态框更佳。 以下的组件将将模态框作为一个低级别的组件运用：

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## 简单的模态框

{{"demo": "pages/components/modal/SimpleModal.js"}}

请注意，您可以使用 `outline: 0` 属性来禁用模态框的 outline (通常为蓝色或金色)。

## 过渡动画

模态框的 打开/关闭 可以使用一个过渡组件进行动画化处理。 此组件应遵守以下条件：

- 成为模态框的直接子组件。
- 在 prop 中应该有一个 `in` 属性。 这对应于 打开/关闭 状态。
- 在进入过渡开始时调用 prop 中的 `onEnter` 回调。
- 在退出过渡完成后调用 prop 中的 `onExited` 回调。 这两个回调允许模态框在关闭并完全过渡 (when closed and fully transitioned) 时卸载子内容。

模态框已经内嵌支持 [react-transition-group](https://github.com/reactjs/react-transition-group)。

{{"demo": "pages/components/modal/TransitionsModal.js"}}

或者，您可以使用 [react-spring](https://github.com/react-spring/react-spring)。

{{"demo": "pages/components/modal/SpringModal.js"}}

## 模态框 SSR

React API [不支持](https://github.com/facebook/react/issues/13097) 在服务器上的 [`createPortal()`](https://reactjs.org/docs/portals.html)。 为了显示模态框，您需要使用 prop 上的 `disablePortal` 来禁用 protal 功能：

{{"demo": "pages/components/modal/ServerModal.js"}}

## 局限性

### 焦点陷阱

如果失去焦点，则模态框会将焦点移回到组件的主体 (body of the component)。

这样做是为了可访问性，但可能会造成问题。 如果用户需要与页面的另一部分进行交互，例如使用聊天窗口，您可以禁用该行为：

```jsx
<Modal disableEnforceFocus />
```

## 无障碍设计

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#dialog_modal)

- 记得用 `aria-labelledby="id..."` 属性来指向`Modal` 的标题. 另外, 你还可以使用 prop 上的 `aria-describedby="id..."` 属性来为 `Modal` 增加一段描述。
    
    ```jsx
    <Modal
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    >
    <h2 id="modal-title">
      My Title
    </h2>
    <p id="modal-description">
      My Description
    </p>
    </Modal>
    ```

- 这篇 [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) 里的方法可以根据你的模态窗口里的内容, 为最合适的元素设置初始焦点.
- 请记住，“模态窗口” 叠加在主窗口或另一个模态窗口上。 模态框层下的所有层级都是 **inert** 的。 也就是说，用户不能与活跃的模态框外的内容交互。 这可能会产生 [冲突行为](#focus-trap)。