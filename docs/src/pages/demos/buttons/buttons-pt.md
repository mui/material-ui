---
title: Component React para Botão
components: Button, Fab, IconButton, ButtonBase, Zoom
---
# Botões

<p class="description">Botões permitem que os usuários tomem ações e decisões com um simples toque.</p>

[Botões](https://material.io/design/components/buttons.html) comunicam ações que os usuários podem tomar. Eles normalmente são colocados em toda a sua interface do usuário, em lugares como:

- Diálogos
- Janelas modais
- Formulários
- Cartões
- Barras de ferramentas

## Contained Buttons

[Contained buttons](https://material.io/design/components/buttons.html#contained-button) are high-emphasis, distinguished by their use of elevation and fill. They contain actions that are primary to your app.

The last example of this demo show how to use an upload button.

{{"demo": "pages/demos/buttons/ContainedButtons.js"}}

## Text Buttons

[Text buttons](https://material.io/design/components/buttons.html#text-button) are typically used for less-pronounced actions, including those located:

- Diálogos
- Cartões

In cards, text buttons help maintain an emphasis on card content.

{{"demo": "pages/demos/buttons/TextButtons.js"}}

## Outlined Buttons

[Outlined buttons](https://material.io/design/components/buttons.html#outlined-button) are medium-emphasis buttons. They contain actions that are important, but aren’t the primary action in an app.

### Alternativas

Outlined buttons are also a lower emphasis alternative to contained buttons, or a higher emphasis alternative to text buttons.

{{"demo": "pages/demos/buttons/OutlinedButtons.js"}}

## Botões de ação flutuantes

Um [Botões de ação flutuantes](https://material.io/design/components/buttons-floating-action-button.html) (BAF) executa a ação principal, ou mais comum, em uma tela. Ele aparece na frente de todos os conteúdos da tela, normalmente como uma forma circular com um ícone em seu centro. FABs come in two types: regular, and extended.

Use apenas um FAB se é a maneira mais adequada para apresentar a ação principal de uma tela.

É recomendado utilizar apenas um botão de ação flutuante por tela, esse botão deve representar a ação mais comum.

{{"demo": "pages/demos/buttons/FloatingActionButtons.js"}}

O botão de ação flutuante é exibido na tela como uma peça de "material" em expansão, por padrão.

Um botão de ação flutuante que abranja várias telas laterais (como telas com guias) deve desaparecer brevemente, então reapareça se sua ação mudar.

A transição de zoom pode ser usada para conseguir isso. Observe que, como as animações de entrada e saída são acionadas ao mesmo tempo, usamos `enterDelay` para permitir que a animação do botão de ação flutuante de saída termine antes que a nova seja inserida.

{{"demo": "pages/demos/buttons/FloatingActionButtonZoom.js"}}

## Sizes

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/demos/buttons/ButtonSizes.js"}}

## Buttons with icons and label

Sometimes you might want to have icons for certain button to enhance the UX of the application as we recognize logos more easily than plain text. For example, if you have a delete button you can label it with a dustbin icon.

{{"demo": "pages/demos/buttons/IconLabelButtons.js"}}

## Icon Buttons

Icon buttons are commonly found in app bars and toolbars.

Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected, such as adding or removing a star to an item.

{{"demo": "pages/demos/buttons/IconButtons.js"}}

## Customized Buttons

Se você leu a [a pagina de documentação de sobescrita](/customization/overrides/), mas você não está confiante, para seguir em frente aqui tem exemplos de como você pode alterar a cor principal de um botão usando classes, e usando um tema; e um exemplo de botão utilizando Bootstrap.

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/buttons/CustomizedButtons.js"}}

## Complex Buttons

The Text Buttons, Contained Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the `ButtonBase`. You can take advantage of this lower level component to build custom interactions.

{{"demo": "pages/demos/buttons/ButtonBases.js"}}

## Third-party routing library

One common use case is to use the button to trigger a navigation to a new page. The `ButtonBase` component provides a property to handle this use case: `component`. Given that a lot of our interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

<Button component={Link} to="/open-collective">
  Link
</Button>
```

or if you want to avoid properties collisions:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const MyLink = props => <Link to="/open-collective" {...props} />

<Button component={MyLink}>
  Link
</Button>
```

*Note: Creating `MyLink` is necessary to prevent unexpected unmounting. You can read more about it in our [composition guide](/guides/composition/#component-property).*