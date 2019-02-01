---
title: Component React para Botão
components: Button, Fab, IconButton, ButtonBase, Zoom
---
# Buttons (Botões)

<p class="description">Botões permitem que os usuários tomem ações e decisões com um simples toque.</p>

[Botões](https://material.io/design/components/buttons.html) comunicam ações que os usuários podem tomar. Eles normalmente são colocados em toda a sua interface do usuário, em lugares como:

- Diálogos
- Janelas modais
- Formulários
- Cartões
- Barras de ferramentas

## Botões contidos

[Botões contidos](https://material.io/design/components/buttons.html#contained-button) tem alta ênfase, distinguem-se pelo uso de elevação e preenchimento. Eles contém as principais ações da sua aplicação.

O último exemplo desta demonstração mostra como usar um botão de upload.

{{"demo": "pages/demos/buttons/ContainedButtons.js"}}

## Botões de texto

[Botões de texto](https://material.io/design/components/buttons.html#text-button) são utilizados tipicamente para ações menos-pronunciadas, incluindo aquelas localizadas em:

- Diálogos
- Cartões

Em cartões, os botões de texto ajudam a manter a ênfase no conteúdo do cartão.

{{"demo": "pages/demos/buttons/TextButtons.js"}}

## Botões delineados

[Botões delineados](https://material.io/design/components/buttons.html#outlined-button) são botões com ênfase média. Eles contém ações que são importantes, mas não são as ações primárias de um aplicativo.

### Alternativas

Botões delineados são uma alternativa de menor ênfase comparado com botões contidos, ou uma uma alternativa de maior ênfase comparado com botões de texto.

{{"demo": "pages/demos/buttons/OutlinedButtons.js"}}

## Botões de ação flutuantes

Um [Botões de ação flutuantes](https://material.io/design/components/buttons-floating-action-button.html) (BAF) executa a ação principal, ou mais comum, em uma tela. Ele aparece na frente de todos os conteúdos da tela, normalmente como uma forma circular com um ícone em seu centro. FABs vêm em dois tipos: regular e estendido.

Use apenas um FAB se é a maneira mais adequada para apresentar a ação principal de uma tela.

É recomendado utilizar apenas um botão de ação flutuante por tela, esse botão deve representar a ação mais comum.

{{"demo": "pages/demos/buttons/FloatingActionButtons.js"}}

O botão de ação flutuante é exibido na tela como uma peça de "material" em expansão, por padrão.

Um botão de ação flutuante que abranja várias telas laterais (como telas com guias) deve desaparecer brevemente, então reapareça se sua ação mudar.

A transição de zoom pode ser usada para conseguir isso. Observe que, como as animações de entrada e saída são acionadas ao mesmo tempo, usamos `enterDelay` para permitir que a animação do botão de ação flutuante de saída termine antes que a nova seja inserida.

{{"demo": "pages/demos/buttons/FloatingActionButtonZoom.js"}}

## Tamanhos

Fantasia maior ou menor botões? Use o `tamanho` propriedade.

{{"demo": "pages/demos/buttons/ButtonSizes.js"}}

## Botões com ícones e "Label"

Às vezes você pode querer ter ícones para determinados botão para melhorar o UX do aplicativo como reconhecemos logotipos mais facilmente do que o texto sem formatação. Por exemplo, se você tem um botão com a açõo de "deletar" você pode rotulá-lo com um ícone do caixote de lixo.

{{"demo": "pages/demos/buttons/IconLabelButtons.js"}}

## Botões de Icone

Botões de ícones são comumente encontrados em barras de aplicativos e barras de ferramentas.

Ícones são também adequadas para botões de alternância que permitem uma escolha única para ser selecionado ou desmarcada, como adicionar ou remover uma estrela para um item.

{{"demo": "pages/demos/buttons/IconButtons.js"}}

## Botões custumizados

Se você leu a [a pagina de documentação de sobescrita](/customization/overrides/), mas você não está confiante, para seguir em frente aqui tem exemplos de como você pode alterar a cor principal de um botão usando classes, e usando um tema; e um exemplo de botão utilizando Bootstrap.

⚠️ Embora a especificação do design do material incentive o tema, esses exemplos estão fora do caminho comum.

{{"demo": "pages/demos/buttons/CustomizedButtons.js"}}

## Botões complexos

O botões de texto, botões contidos, botões de ação flutuante e ícone botões são construídos em cima do mesmo componente: O componente `ButtonBase`. Você pode tirar vantagem deste componente de nível mais abastrato para construir interações personalizadas.

{{"demo": "pages/demos/buttons/ButtonBases.js"}}

## Biblioteca de roteamento de terceiros

Um caso de uso comum é usar o botão para acionar uma navegação para uma nova página. O componente `ButtonBase` fornece uma propriedade para lidar com este caso de uso: `componente`. Dado que um monte de nossos componentes interativos dependem do `ButtonBase`, você deve estar capaz de tirar vantagem em todos os lugares:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

<Button component={Link} to="/open-collective">
  Link
</Button>
```

ou se você quiser evitar colisões de propriedades:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const MyLink = props => <Link to="/open-collective" {...props} />

<Button component={MyLink}>
  Link
</Button>
```

*Nota: A criação de `MyLink` é necessário para impedir uma desmontagem inesperada. Você pode ler mais sobre isso em nosso [guia de propriedades de componentes](/guides/composition/#component-property).*