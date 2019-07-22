---
title: Componente React Modal
components: Modal
---

# Modal

<p class="description">O componente modal fornece uma base sólida para criar diálogos, popovers, lightboxes ou qualquer outra coisa.</p>

O componente torna seus nós `children` na frente de um componente de plano de fundo. O `Modal` oferece recursos importantes:

- 
- 
- 
- ♿️ Gerencia adequadamente o foco; movendo para o conteúdo modal, e mantendo-o lá até que o modal seja fechado.
- ♿️ Adiciona as funções ARIA apropriadas automaticamente.
- 

> **Nota sobre a terminologia**. O termo "modal" algumas vezes é usado com o sentido de "diálogo", mas isto é um equívoco. Uma janela Modal descreve partes de uma UI. Um elemento é considerado modal se [ele bloqueia interações com o resto da aplicação](https://en.wikipedia.org/wiki/Modal_window).

Se você está criando um diálogo Modal, você provavelmente quer usar o componente [Dialog](/components/dialogs/) em vez de diretamente um Modal. Modal é uma estrutura de baixo-nível que é alavancada pelos seguintes componentes:

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Modal Simples

{{"demo": "pages/components/modal/SimpleModal.js"}}

## Performance

O conteúdo dos modais são **montados lentamente** dentro do DOM. Isso garante que, mesmo tendo muitos modais fechados em sua árvore React, o carregamento da sua página não será afetado.

Porém, criar elementos React tem um preço também. Considere o caso a seguir:

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

Criamos muitos elementos React que nunca serão montados. É um desperdício 🐢. Você pode ** acelerar ** a renderização movendo o corpo do modal para seu próprio componente. 

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
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>
  <h2 id="modal-title">
    Meu título
  </h2>
  <p id="simple-modal-description">
    Minha descrição
  </p>
</Modal>
```

- O [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) pode ajudá-lo a definir o foco inicial no elemento mais relevante, com base no seu conteúdo modal.