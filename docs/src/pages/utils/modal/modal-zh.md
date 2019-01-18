---
title: React Paper 组件
components: Modal
---
# Modal

<p class="description">模态框组件可以用来快速创建对话框、弹出窗口，灯箱等任何你所需的组件。</p>

The component renders its `children` node in front of a backdrop component. The `Modal` offers a few helpful features over using just a [`Portal`](/utils/portal/) component and some styles:

- Manages modal stacking when one-at-a-time just isn't enough.
- Creates a backdrop, for disabling interaction below the modal.
- It disables scrolling of the page content while open.
- ♿️ It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
- ♿️ Adds the appropriate ARIA roles automatically.

Modal is a lower-level construct that is leveraged by the following components:

- [Dialog](/demos/dialogs/)
- [抽屉](/demos/drawers/)
- [Menu](/demos/menus/)
- [气泡卡片](/utils/popover/)

If you are creating a modal dialog, you probably want to use the [Dialog](/demos/dialogs/) component rather than directly using Modal.

## Simple modal

{{"demo": "pages/utils/modal/SimpleModal.js"}}

## Performance

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