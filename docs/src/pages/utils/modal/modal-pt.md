---
title: Componente React Modal
components: Modal
---
# Modal

<p class="description">O componente modal fornece uma base sólida para criar diálogos, popovers, lightboxes ou qualquer outra coisa.</p>

O componente renderiza o conteúdo de seu `children` sobre um backdrop. O `Modal` fornece alguns recursos úteis quando utilizado sobre um componente [`Portal`](/utils/portal/) e alguns estilos:

- Gerencia o empilhamento de chamadas 'um a cada vez'.
- Cria um backdrop para desabilitar a interação abaixo do modal.
- Quando aberto, desabilita o scroll da página.
- ♿️ It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
- ♿️ Adds the appropriate ARIA roles automatically.

> **Terminology note**. The term "modal" is sometimes used to mean "dialog", but this is a misnomer. A Modal window describes parts of a UI. An element is considered modal if [it blocks interaction with the rest of the application](https://en.wikipedia.org/wiki/Modal_window).

If you are creating a modal dialog, you probably want to use the [Dialog](/demos/dialogs/) component rather than directly using Modal. Modal is a lower-level construct that is leveraged by the following components:

- [Dialog](/demos/dialogs/)
- [Drawer](/demos/drawers/)
- [Menu](/demos/menus/)
- [Popover](/utils/popover/)

## Modal Simples

{{"demo": "pages/utils/modal/SimpleModal.js"}}

## Performance

O conteúdo dos modais são **montados lentamente** dentro do DOM. Isso garante que, mesmo tendo muitos modais fechados em sua árvore React, o carregamento da sua página não será afetado.

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