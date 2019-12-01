---
title: Componente React para Botão
components: Button, ButtonGroup, Fab, IconButton, ButtonBase, Zoom
---

# Botões

<p class="description">Botões permitem que os usuários tomem ações e decisões com um simples toque.</p>

[Botões](https://material.io/design/components/buttons.html) comunicam ações que os usuários podem realizar. Eles são normalmente colocados em toda a interface do usuário, em lugares como:

- Caixa de diálogo
- Janelas modais
- Formulários
- Cartões
- Barras de ferramentas

## Botões Contidos

[Botões Contidos](https://material.io/design/components/buttons.html#contained-button) tem alta ênfase, distinguem-se pelo uso de elevação e preenchimento. Eles contém as principais ações da sua aplicação.

O último exemplo desta demonstração mostra como usar um botão de upload.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

## Botões de Texto

[Botões de Texto](https://material.io/design/components/buttons.html#text-button) são utilizados tipicamente para ações menos-pronunciadas, incluindo aquelas localizadas em:

- Caixas de diálogo
- Cartões

Em cartões, os botões de texto ajudam a manter a ênfase no conteúdo do cartão.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Botões Delineados

[Botões Delineados](https://material.io/design/components/buttons.html#outlined-button) são botões com ênfase média. Eles contém ações que são importantes, mas não são as ações primárias de um aplicativo.

### Alternativas

Botões delineados são uma alternativa de menor ênfase comparado com botões contidos, ou uma uma alternativa de maior ênfase comparado com botões de texto.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Botões Agrupados

O componente ButtonGroup pode ser usado para agrupar os botões delineados (o padrão) ou contidos.

{{"demo": "pages/components/buttons/GroupedButtons.js"}}

## Botão Dividido

O ButtonGroup também pode ser usado para criar um botão dividido. A lista suspensa pode alterar a ação do botão (como neste exemplo), ou ser usada para acionar imediatamente uma ação relacionada.

{{"demo": "pages/components/buttons/SplitButton.js"}}

## Botões de Ação Flutuante

Um [Botão de Ação Flutuante](https://material.io/design/components/buttons-floating-action-button.html) (BAF) executa a ação principal, ou mais comum, em uma tela. Ele aparece na frente de todos os conteúdos da tela, normalmente como uma forma circular com um ícone em seu centro. BAFs vêm em dois tipos: regular e estendido.

Use apenas um BAF se é a maneira mais adequada para apresentar a ação principal de uma tela.

É recomendado utilizar apenas um botão de ação flutuante por tela, esse botão deve representar a ação mais comum.

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

O botão de ação flutuante anima na tela como uma parte expansiva do material, por padrão.

Um botão de ação flutuante que abranja várias telas laterais (como telas com guias) deve desaparecer brevemente, então reapareça se sua ação mudar.

A transição de zoom pode ser usada para conseguir isso. Observe que, como as animações de entrada e saída são acionadas ao mesmo tempo, usamos `enterDelay` para permitir que a animação do botão de ação flutuante de saída termine antes que a nova seja inserida.

{{"demo": "pages/components/buttons/FloatingActionButtonZoom.js", "bg": true}}

## Upload button

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Tamanhos

Gosta de botões maiores ou menores? Use a propriedade `size`.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Buttons with icons and label

Sometimes you might want to have icons for certain button to enhance the UX of the application as we recognize logos more easily than plain text. For example, if you have a delete button you can label it with a dustbin icon.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Icon Buttons

Icon buttons are commonly found in app bars and toolbars.

Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected, such as adding or removing a star to an item.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Customized buttons

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

👑 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/button).

## Complex Buttons

The Text Buttons, Contained Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the `ButtonBase`. You can take advantage of this lower level component to build custom interactions.

{{"demo": "pages/components/buttons/ButtonBases.js"}}

## Biblioteca de roteamento de terceiros

One common use case is to use the button to trigger navigation to a new page. The `ButtonBase` component provides a property to handle this use case: `component`. However for certain focus polyfills `ButtonBase` requires the DOM node of the provided component. This is achieved by attaching a ref to the component and expecting that the component forwards this ref to the underlying DOM node. Given that many of the interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere.

Here is an [integration example with react-router](/guides/composition/#button).

## Limitações

### Cursor não permitido

The ButtonBase component sets `pointer-events: none;` on disabled buttons, which prevents the appearance of a disabled cursor.

If you wish to use `not-allowed`, you have two options:

1. ** apenas CSS**. Você pode remover o estilo dos eventos do ponteiro no estado "desabilitado" do elemento `<button>` :

  ```css
  .MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
  ```

However:

- Você deve adicionar `eventos-ponteiro: nenhum;` novamente quando você precisa exibir dicas [ ferramentas em elementos desabilitados](/components/tooltips/#disabled-elements)</li> 
    
    - O cursor não muda se você renderizar algum outro elemento de botão, por exemplo, um elemento link `<a>`.</ul> 
    
    2. ** Alteração no DOM** Você pode encapsular o botão:
    
      ```jsx
      <span style={{ cursor: 'not-allowed' }}>
        <Button component={Link} disabled>
          disabled
        </Button>
      </span>
      ```
    
    This has the advantage of supporting any element, for instance, a link `<a>` element.