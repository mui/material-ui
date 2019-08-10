---
title: Componente React Modal
components: Modal
---

# Modal

<p class="description">O componente modal fornece uma base sólida para criar diálogos, popovers, lightboxes ou qualquer outra coisa.</p>

O componente renderiza o conteúdo de seu `children` sobre um componente backdrop. O `Modal` oferece recursos importantes:

- 💄 Gerencia o empilhamento de chamadas um por vez não é suficiente.
- 🔐 Cria um backdrop para desabilitar a interação abaixo do modal.
- 🔐 Quando aberto, desabilita a rolagem da página.
- ♿️ Gerencia adequadamente o foco; movendo para o conteúdo modal, e mantendo-o lá até que o modal seja fechado.
- ♿️ Adiciona as funções ARIA apropriadas automaticamente.
- 📦 [5 kB gzipped](/size-snapshot).

> **Nota sobre a terminologia**. O termo "modal" algumas vezes é usado com o sentido de "diálogo", mas isto é um equívoco. Uma janela Modal descreve partes de uma UI. Um elemento é considerado modal se [ele bloqueia interações com o resto da aplicação](https://en.wikipedia.org/wiki/Modal_window).

Se você está criando um diálogo Modal, você provavelmente quer usar o componente [Dialog](/components/dialogs/) em vez de diretamente um Modal. Modal é uma estrutura de baixo-nível que é alavancada pelos seguintes componentes:

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Modal Simples

{{"demo": "pages/components/modal/SimpleModal.js"}}

Notice that you can disable the outline (often blue or gold) with the `outline: 0` CSS property.

## Performance

O conteúdo do modal é **montado preguiçosamente** no DOM. Isso garante que ter muitos modais fechados na sua árvore React não atrapalha sua página.

No entanto, a criação de elementos React também tem um custo. Considere o seguinte caso:

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

Criamos muitos elementos React que nunca serão montados. É um desperdício 🐢. Você pode **acelerar** a renderização movendo o corpo do modal para seu próprio componente.

```jsx
<Modal open={false}>
  <TableComponent />
</Modal>
```

Desta forma, você tem a vantagem do [React render laziness evaluation](https://overreacted.io/react-as-a-ui-runtime/#lazy-evaluation). A renderização do `TableComponent` só irá ocorrer quando a janela modal for aberta.

## Acessibilidade

- Certifique-se de adicionar `aria-labelledby="id..."`, referenciando o título modal, ao `Modal`. Adicionalmente, você pode dar uma descrição do seu modal com a propriedade `aria-describedby = "id..."` no `Modal`.

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

- O [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) pode ajudá-lo a definir o foco inicial no elemento mais relevante, com base no seu conteúdo modal.

## Server-side modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. In order to make it work, you need to disable this feature with the `disablePortal` prop:

{{"demo": "pages/components/modal/ServerModal.js"}}