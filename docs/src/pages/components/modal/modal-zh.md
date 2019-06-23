---
title: 模态框 React 组件
components: Modal
---

# 模态

<p class="description">模态框组件可以用来快速创建对话框、弹出窗口，灯箱等任何你所需的组件。</p>

该组件在背景组件之上渲染其children节点, 并提供如下重要功能:

- 
- 
- 
- ♿️它妥善管理焦点;移动到模态内容， 并保持它直到模态关闭。
- ♿️自动添加适当的ARIA角色。
- 

> **术语注释**。 “模态框”（Modal）这个词有时也被用来指代“对话框”，但是这种用法属于误用。 模态框的窗口可以描述用户界面的一部分。 如果一个元素[阻挡了用户与应用的其它部分的互动](https://en.wikipedia.org/wiki/Modal_window)，这个元素就是模态的。

当你创建一个模态对话框时，使用[对话框（Dialog）](/components/dialogs/)组件比直接使用模态框更佳。 以下的组件将将模态框作为一个低级别的组件运用：

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## 简单的模态

{{"demo": "pages/components/modal/SimpleModal.js"}}

## 性能

模态框的内容是用 **延迟加载**的方式加载到DOM中的。 以此确保即使你的React树中有许多关闭的模态框， 你的页面速度也不会减慢。

然而， 创建一个React组件也会有成本。考虑一下以下的情况：

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

We create a lot of React elements that will never be mounted. It's wasteful 

```jsx
<Modal open={false}>
  <TableComponent />
</Modal>
```

上面的代码利用了[React 懒加载](https://overreacted.io/react-as-a-ui-runtime/#lazy-evaluation)机制. 使得`TabComponent`的`render`方法只在模态框打开的时候才被执行.

## 无障碍功能

- 记得用 `aria-labelledby="id..."` 属性来指向`Modal` 的标题. 另外, 你还可以使用 `aria-describedby="id..."` 属性来为 `Modal`增加描述.

```jsx
<Modal
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>
  <Typography variant="h6" id="modal-title">
    My Title
  </Typography>
  <Typography variant="subtitle1" id="simple-modal-description">
    My Description
  </Typography>
</Modal>
```

- 这篇 [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) 里的方法可以根据你的模态窗口里的内容, 为最合适的元素设置初始焦点.