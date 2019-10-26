---
title: Componente React Modal
components: Modal
---

# Modal

<p class="description">O componente modal fornece uma base sólida para criar diálogos, popovers, lightboxes ou qualquer outra coisa.</p>

O componente renderiza o conteúdo de seu `children` sobre um componente backdrop. O `Modal` oferece recursos importantes:

- 💄 Gerencia o empilhamento de chamadas quando ter um de cada vez não for suficiente.
- 🔐 Cria um pano de fundo para desabilitar a interação abaixo do modal.
- 🔐 Desativa a rolagem do conteúdo da página enquanto estiver aberta.
- ♿️ Gerencia adequadamente o foco; movendo para o conteúdo modal, e mantendo-o lá até que o modal seja fechado.
- ♿️ Adiciona as funções ARIA apropriadas automaticamente.
- 📦 [5 kB gzipado](/size-snapshot).

> **Nota sobre a terminologia**. O termo "modal" algumas vezes é usado com o sentido de "diálogo", mas isto é um equívoco. Uma janela modal descreve partes de uma UI. Um elemento é considerado modal se [ele bloqueia interações com o resto da aplicação](https://en.wikipedia.org/wiki/Modal_window).

Se você está criando um diálogo Modal, você provavelmente quer usar o componente [Dialog](/components/dialogs/) em vez de diretamente um Modal. Modal é uma estrutura de baixo-nível que é alavancada pelos seguintes componentes:

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Modal Simples

{{"demo": "pages/components/modal/SimpleModal.js"}}

Você pode desativar o contorno (muitas vezes azul ou ouro) com a propriedade CSS `outline: 0`.

## Transições

O estado de aberto/fechado do modal pode ser animado com um componente de transição. Este componente deve respeitar as seguintes condições:

- Seja um filho direto descendente do modal.
- Tenha uma propriedade `in`. Isso corresponde ao estado de aberto/fechado.
- Chamar a propriedade de callback `onEnter` quando a transição de entrada iniciar.
- Chamar a propriedade de callback `onExited` quando a transição de saída for concluída. Esses dois callbacks permitem que o modal desmonte o conteúdo filho quando fechado e seja totalmente transitado.

O modal possui suporte interno para [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/modal/TransitionsModal.js"}}

Como alternativa, você pode usar [react-spring](https://github.com/react-spring/react-spring).

{{"demo": "pages/components/modal/SpringModal.js"}}

## Modal do lado do servidor

React [não suporta](https://github.com/facebook/react/issues/13097) a API [`createPortal()`](https://reactjs.org/docs/portals.html) no servidor. Para exibir o modal, você precisa desativar o recurso portal com a propriedade `disablePortal`:

{{"demo": "pages/components/modal/ServerModal.js"}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#dialog_modal)

- Be sure to add `aria-labelledby="id..."`, referencing the modal title, to the `Modal`. Additionally, you may give a description of your modal with the `aria-describedby="id..."` prop on the `Modal`.
    
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

- The [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) can help you set the initial focus on the most relevant element, based on your modal content.
- A modal window overlys on either the primary window or another modal window. Windows under a modal are **inert**. That is, users cannot interact with content outside an active modal window.