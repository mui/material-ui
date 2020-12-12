---
title: Componente React Modal
components: Modal
---

# Modal

<p class="description">O componente modal fornece uma base sólida para criar diálogos, popovers, lightboxes ou qualquer outra coisa.</p>

O componente renderiza o conteúdo de seu `children` sobre um componente backdrop. O `Modal` oferece recursos importantes:

- 💄 Gerencia o empilhamento de chamadas quando ter um de cada vez não for suficiente.
- 🔐 Cria um plano de fundo para desabilitar a interação abaixo do modal.
- 🔐 Desativa a rolagem do conteúdo da página enquanto estiver aberto.
- ♿️ Gerencia adequadamente o foco; movendo para o conteúdo modal, e mantendo-o lá até que o modal seja fechado.
- ♿️ Adiciona as funções ARIA apropriadas automaticamente.
- 📦 [5 kB gzipped](/size-snapshot).

> **Nota sobre a terminologia**. O termo "modal" algumas vezes é usado com o sentido de "diálogo", mas isto é um equívoco. Uma janela modal descreve partes de uma UI. Um elemento é considerado modal se [ele bloqueia interações com o resto da aplicação](https://en.wikipedia.org/wiki/Modal_window).

Se você está criando um diálogo modal, você provavelmente quer usar o componente [Dialog](/components/dialogs/) em vez de diretamente um Modal. Modal é uma estrutura de baixo-nível que é aproveitada pelos seguintes componentes:

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Modal simples

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

React [não suporta](https://github.com/facebook/react/issues/13097) a API [`createPortal()`](https://pt-br.reactjs.org/docs/portals.html) no servidor. Para exibir o modal, você precisa desativar o recurso portal com a propriedade `disablePortal`:

{{"demo": "pages/components/modal/ServerModal.js"}}

## Limitações

### Captura do foco

O modal move o foco de volta para o corpo do componente se o foco tentar escapar dele.

No entanto, isso é feito para fins de acessibilidade, e pode criar problemas. No caso de os usuários precisarem interagir com outra parte da página, por exemplo, com uma janela de chatbot, você pode desabilitar o comportamento:

```jsx
<Modal disableEnforceFocus />
```

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#dialog_modal)

- Certifique-se de adicionar `aria-labelledby="id..."`, referenciando o título modal, ao `Modal`. Adicionalmente, você pode dar uma descrição do seu modal com a propriedade `aria-describedby = "id..."` no `Modal`.
    
    ```jsx
    <Modal
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    >
    <h2 id="modal-title">
      Meu Título
    </h2>
    <p id="modal-description">
      Minha Descrição
    </p>
    </Modal>
    ```

- O [WAI-ARIA authoring practices ](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) pode ajudá-lo a definir o foco inicial no elemento mais relevante, com base no seu conteúdo modal.
- Esteja ciente que uma "janela modal" sobrepõe a janela primária ou qualquer outra janela modal. As janelas sob um modal são **inertes**. Ou seja, os usuários não podem interagir com o conteúdo fora de uma janela modal ativa. Isso pode criar [comportamentos conflitantes](#focus-trap).