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

Modal是一个较低级别的构造，由以下组件利用：

- [Dialog](/demos/dialogs/)
- [Drawer](/demos/drawers/)
- [Menu](/demos/menus/)
- [Popover](/utils/popover/)

如果要创建模式对话框，则可能需要使用 [Dialog](/demos/dialogs/) 组件而不是直接使用Modal。

## 简单的模态

{{"demo": "pages/utils/modal/SimpleModal.js"}}

## 性能

模态的含量为 **懒惰地安装** 到DOM。 它确保在React树中拥有许多闭合模态不会减慢页面速度。

但是，创建React元素也会产生成本。考虑以下情况：

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

我们创建了许多永远不会安装的React元素。这很浪费 

```jsx
<Modal open={false}>
  <TableComponent />
</Modal>
```

这样，您就可以利用React渲染惰性评估。 只有在打开模态时才会计算 `TableComponent` 渲染方法