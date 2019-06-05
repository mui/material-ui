---
title: Modal React component
components: Modal
---

# Modal

<p class="description">The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.</p>

The component renders its `children` node in front of a backdrop component. The `Modal` offers important features:

- 
- 
- 
- ♿️ It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
- ♿️ Adds the appropriate ARIA roles automatically.
- 

> **Terminology note**. The term "modal" is sometimes used to mean "dialog", but this is a misnomer. A Modal window describes parts of a UI. An element is considered modal if [it blocks interaction with the rest of the application](https://en.wikipedia.org/wiki/Modal_window).

If you are creating a modal dialog, you probably want to use the [Dialog](/components/dialogs/) component rather than directly using Modal. Modal is a lower-level construct that is leveraged by the following components:

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Simple modal

{{"demo": "pages/components/modal/SimpleModal.js"}}

## Rendimiento

The content of the modal is **lazily mounted** into the DOM. It ensures that having many closed modal in your React tree won't slow down your page.

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

We create a lot of React elements that will never be mounted. It's wasteful 

```jsx
<Modal open={false}>
  <TableComponent />
</Modal>
```

This way, you take advantage of [React render laziness evaluation](https://overreacted.io/react-as-a-ui-runtime/#lazy-evaluation). The `TableComponent` render method will only be evaluated when opening the modal.

## Accesibilidad

- Be sure to add `aria-labelledby="id..."`, referencing the modal title, to the `Modal`. Additionally, you may give a description of your modal with the `aria-describedby="id..."` property on the `Modal`.

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

- The [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) can help you set the initial focus on the most relevant element, based on your modal content.