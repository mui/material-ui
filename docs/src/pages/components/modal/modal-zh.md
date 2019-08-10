---
title: 模态框 React 组件
components: Modal
---

# 模态

<p class="description">模态框组件可以用来快速创建对话框、弹出窗口，灯箱等任何你所需的组件。</p>

组件会在背景组件前渲染其`children`节点。 The `Modal` offers important features:

- 💄 Manages modal stacking when one-at-a-time just isn't enough.
- 🔐 Creates a backdrop, for disabling interaction below the modal.
- 🔐 It disables scrolling of the page content while open.
- ♿️它妥善管理焦点;移动到模态内容， 并保持它直到模态关闭。
- ♿️自动添加适当的ARIA角色。
- 📦 [5 kB gzipped](/size-snapshot).

> **术语注释**。 “模态框”（Modal）这个词有时也被用来指代“对话框”，但是这种用法属于误用。 模态框的窗口可以描述用户界面的一部分。 如果一个元素[阻挡了用户与应用的其它部分的互动](https://en.wikipedia.org/wiki/Modal_window)，这个元素就是模态的。

当你创建一个模态对话框时，使用[对话框（Dialog）](/components/dialogs/)组件比直接使用模态框更佳。 以下的组件将将模态框作为一个低级别的组件运用：

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## 简单的模态

{{"demo": "pages/components/modal/SimpleModal.js"}}

Notice that you can disable the outline (often blue or gold) with the `outline: 0` CSS property.

## 性能

The content of the modal is **lazily mounted** into the DOM. It ensures that having many closed modals in your React tree won't slow down your page.

However, creating React elements has a cost too. Consider the following case:

```jsx
<Modal open={false}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Dessert (100g serving)</TableCell>
        <TableCell align="right">Calories</TableCell>
        <TableCell align="right">Fat&nbsp;(g)</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map(row => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Modal>
```

We create a lot of React elements that will never be mounted. It's wasteful 🐢. You can **speed up** the rendering by moving the modal body into its own component.

```jsx
<Modal open={false}>
  <TableComponent />
</Modal>
```

上面的代码利用了[React 懒加载](https://overreacted.io/react-as-a-ui-runtime/#lazy-evaluation)机制. 使得`TabComponent`的`render`方法只在模态框打开的时候才被执行.

## 无障碍设计

- 记得用 `aria-labelledby="id..."` 属性来指向`Modal` 的标题. 另外, 你还可以使用 `aria-describedby="id..."` 属性来为 `Modal`增加描述.

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

- 这篇 [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) 里的方法可以根据你的模态窗口里的内容, 为最合适的元素设置初始焦点.

## Server-side modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. In order to make it work, you need to disable this feature with the `disablePortal` prop:

{{"demo": "pages/components/modal/ServerModal.js"}}