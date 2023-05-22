---
product: material-ui
title: Componente React Modal
components: Modal
githubLabel: 'component: modal'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
unstyled: /base/react-modal/
---

# Modal

<p class="description">O componente modal fornece uma base sólida para criar diálogos, popovers, lightboxes ou qualquer outra coisa.</p>

O componente renderiza o conteúdo de seu `children` sobre um componente backdrop. O `Modal` oferece recursos importantes:

- 💄 Gerencia o empilhamento de chamadas quando ter um de cada vez não for suficiente.
- 🔐 Cria um plano de fundo para desabilitar a interação abaixo do modal.
- 🔐 Desativa a rolagem do conteúdo da página enquanto estiver aberto.
- ♿️ Gerencia adequadamente o foco; movendo para o conteúdo modal, e mantendo-o lá até que o modal seja fechado.
- ♿️ Adiciona as funções ARIA apropriadas automaticamente.

[A paleta](/system/palette/) com funções de estilo.

:::info
**Terminology note**.

The term "modal" is sometimes used to mean "dialog", but this is a misnomer. A modal window describes parts of a UI. An element is considered modal if [it blocks interaction with the rest of the application](https://en.wikipedia.org/wiki/Modal_window).
:::

If you are creating a modal dialog, you probably want to use the [Dialog](/material-ui/react-dialog/) component rather than directly using Modal. Modal is a lower-level construct that is leveraged by the following components:

- [Dialog](/material-ui/react-dialog/)
- [Drawer](/material-ui/react-drawer/)
- [Menu](/material-ui/react-menu/)
- [Popover](/material-ui/react-popover/)

## Basic modal

{{"demo": "BasicModal.js"}}

Notice that you can disable the outline (often blue or gold) with the `outline: 0` CSS property.

## Nested modal

Modals can be nested, for example a select within a dialog, but stacking of more than two modals, or any two modals with a backdrop is discouraged.

{{"demo": "NestedModal.js"}}

## Transitions

The open/close state of the modal can be animated with a transition component. This component should respect the following conditions:

- Be a direct child descendent of the modal.
- Have an `in` prop. This corresponds to the open/close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow the modal to unmount the child content when closed and fully transitioned.

Modal has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "TransitionsModal.js"}}

Alternatively, you can use [react-spring](https://github.com/pmndrs/react-spring).

{{"demo": "SpringModal.js"}}

## Performance

The content of modal is unmounted when closed. If you need to make the content available to search engines or render expensive component trees inside your modal while optimizing for interaction responsiveness it might be a good idea to change this default behavior by enabling the `keepMounted` prop:

```jsx
<Modal keepMounted />
```

{{"demo": "KeepMountedModal.js", "defaultCodeOpen": false}}

As with any performance optimization, this is not a silver bullet. Be sure to identify bottlenecks first, and then try out these optimization strategies.

## Server-side modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://react.dev/reference/react-dom/createPortal) API on the server. In order to display the modal, you need to disable the portal feature with the `disablePortal` prop:

{{"demo": "ServerModal.js"}}

## Limitations

### Captura do foco

The modal moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes. However, it might create issues. In the event the users need to interact with another part of the page, e.g. with a chatbot window, you can disable the behavior:

```jsx
<Modal disableEnforceFocus />
```

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

- Be sure to add `aria-labelledby="id..."`, referencing the modal title, to the `Modal`. Additionally, you may give a description of your modal with the `aria-describedby="id..."` prop on the `Modal`.

  ```jsx
  <Modal aria-labelledby="modal-title" aria-describedby="modal-description">
    <h2 id="modal-title">My Title</h2>
    <p id="modal-description">My Description</p>
  </Modal>
  ```

- The [WAI-ARIA authoring practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/) can help you set the initial focus on the most relevant element, based on your modal content.
- Keep in mind that a "modal window" overlays on either the primary window or another modal window. Windows under a modal are **inert**. That is, users cannot interact with content outside an active modal window. This might create [conflicting behaviors](#focus-trap).
