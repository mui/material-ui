---
title: Componente React para Botão
components: Button, ButtonGroup, Fab, IconButton, ButtonBase, Zoom
---

# Button (botão)

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

You can remove the elevation with the `disableElevation` prop.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

## Botões de Texto

[Text buttons](https://material.io/design/components/buttons.html#text-button) are typically used for less-pronounced actions, including those located:

- Caixas de diálogo
- Cartões

In cards, text buttons help maintain an emphasis on card content.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Botões Delineados

[Outlined buttons](https://material.io/design/components/buttons.html#outlined-button) are medium-emphasis buttons. They contain actions that are important, but aren’t the primary action in an app.

Outlined buttons are also a lower emphasis alternative to contained buttons, or a higher emphasis alternative to text buttons.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Botões Agrupados

The `ButtonGroup` component can be used to group buttons.

{{"demo": "pages/components/buttons/GroupedButtons.js"}}

### Group sizes and colors

{{"demo": "pages/components/buttons/GroupSizesColors.js"}}

### Group orientation

{{"demo": "pages/components/buttons/GroupOrientation.js"}}

### Split Button

ButtonGroup can also be used to create a split button. The dropdown can change the button action (as in this example), or be used to immediately trigger a related action.

{{"demo": "pages/components/buttons/SplitButton.js"}}

## Floating Action Buttons

A [floating action button](https://material.io/design/components/buttons-floating-action-button.html) (FAB) performs the primary, or most common, action on a screen. It appears in front of all screen content, typically as a circular shape with an icon in its center. FABs come in two types: regular, and extended.

Only use a FAB if it is the most suitable way to present a screen’s primary action.

Only one floating action button is recommended per screen to represent the most common action.

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

The floating action button animates onto the screen as an expanding piece of material, by default.

A floating action button that spans multiple lateral screens (such as tabbed screens) should briefly disappear, then reappear if its action changes.

The Zoom transition can be used to achieve this. Note that since both the exiting and entering animations are triggered at the same time, we use `enterDelay` to allow the outgoing Floating Action Button's animation to finish before the new one enters.

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

### Cursor not-allowed

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