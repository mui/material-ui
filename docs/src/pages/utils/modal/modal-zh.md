---
title: 模态框 React 组件
components: 语气
---
# 模态

<p class="description">模态框组件可以用来快速创建对话框、弹出窗口，灯箱等任何你所需的组件。</p>

组件会在背景组件前渲染其`children`节点。 与仅使用 [`Portal`](/utils/portal/) 组件和一些样式相比， `Modal` 提供了一些有用的功能：

- 管理模态堆叠时，一次一个是不够的。
- 创建一个背景，用于禁用模态下的交互。
- 它会在打开时禁用页面内容的滚动。
- ♿️它妥善管理焦点;移动到模态内容， 并保持它直到模态关闭。
- ♿️自动添加适当的ARIA角色。

> **Terminology note**. The term "modal" is sometimes used to mean "dialog", but this is a misnomer. A Modal window describes parts of a UI. An element is considered modal if [it blocks interaction with the rest of the application](https://en.wikipedia.org/wiki/Modal_window).

If you are creating a modal dialog, you probably want to use the [Dialog](/demos/dialogs/) component rather than directly using Modal. Modal is a lower-level construct that is leveraged by the following components:

- [Dialog](/demos/dialogs/)
- [Drawer](/demos/drawers/)
- [Menu](/demos/menus/)
- [Popover](/utils/popover/)

## 简单的模态

{{"demo": "pages/utils/modal/SimpleModal.js"}}

## 性能

The content of the modal is **lazily mounted** into the DOM. It ensures that having many closed modal in your React tree won't slow down your page.

However, creating React elements has a cost too. Consider the following case:

```jsx
<Modal open={false}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Dessert (100g serving)</TableCell>
        <TableCell align="right">Calories</TableCell>
        <TableCell align="right">Fat (g)</TableCell>
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

We create a lot of React elements that will never be mounted. It's wasteful 

```jsx
<Modal open={false}>
  <TableComponent />
</Modal>
```

This way, you take advantage of React render laziness evaluation. The `TableComponent` render method will only be evaluated when opening the modal