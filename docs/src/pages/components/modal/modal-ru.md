---
title: Modal React component
components: Modal
---

# Modal

<p class="description">The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.</p>

The component renders its `children` node in front of a backdrop component. The `Modal` offers important features:

- 💄 Manages modal stacking when one-at-a-time just isn't enough.
- 🔐 Creates a backdrop, for disabling interaction below the modal.
- 🔐 It disables scrolling of the page content while open.
- ♿️ It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
- ♿️ Adds the appropriate ARIA roles automatically.
- 5 [1 кБ в сжатом виде](/size-snapshot).

> **примечание по терминологии**. Термин «modal» иногда используется для обозначения «dialog», но это неверно. Модальное окно описывает части UI. An element is considered modal if [it blocks interaction with the rest of the application](https://en.wikipedia.org/wiki/Modal_window).

If you are creating a modal dialog, you probably want to use the [Dialog](/components/dialogs/) component rather than directly using Modal. Modal - это конструкция нижнего уровня, которая используется следующими компонентами:

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Simple modal

{{"demo": "pages/components/modal/SimpleModal.js"}}

Notice that you can disable the outline (often blue or gold) with the `outline: 0` CSS property.

## Производительность

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

Таким образом, вы получаете преимущество [ленивых вычислений React render](https://overreacted.io/react-as-a-ui-runtime/#lazy-evaluation). The `TableComponent` render method will only be evaluated when opening the modal.

## Доступность

- Be sure to add `aria-labelledby="id..."`, referencing the modal title, to the `Modal`. Additionally, you may give a description of your modal with the `aria-describedby="id..."` property on the `Modal`.

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

- The [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) can help you set the initial focus on the most relevant element, based on your modal content.

## Server-side modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. In order to make it work, you need to disable this feature with the `disablePortal` prop:

{{"demo": "pages/components/modal/ServerModal.js"}}