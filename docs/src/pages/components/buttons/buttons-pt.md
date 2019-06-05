---
title: Componente React para Botão
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

## Botões Contidos

[Botões Contidos](https://material.io/design/components/buttons.html#contained-button) tem alta ênfase, distinguem-se pelo uso de elevação e preenchimento. Eles contém as principais ações da sua aplicação.

O último exemplo desta demonstração mostra como usar um botão de upload.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

## Botões de Texto

[Botões de Texto](https://material.io/design/components/buttons.html#text-button) são utilizados tipicamente para ações menos-pronunciadas, incluindo aquelas localizadas em:

- Diálogos
- Cartões

Em cartões, os botões de texto ajudam a manter a ênfase no conteúdo do cartão.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Botões Delineados

[Botões Delineados](https://material.io/design/components/buttons.html#outlined-button) são botões com ênfase média. Eles contém ações que são importantes, mas não são as ações primárias de um aplicativo.

### Alternativas

Botões delineados são uma alternativa de menor ênfase comparado com botões contidos, ou uma uma alternativa de maior ênfase comparado com botões de texto.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Botões de Ação Flutuante

Um [Botão de Ação Flutuante](https://material.io/design/components/buttons-floating-action-button.html) (BAF) executa a ação principal, ou mais comum, em uma tela. Ele aparece na frente de todos os conteúdos da tela, normalmente como uma forma circular com um ícone em seu centro. BAFs vêm em dois tipos: regular e estendido.

Use apenas um BAF se é a maneira mais adequada para apresentar a ação principal de uma tela.

É recomendado utilizar apenas um botão de ação flutuante por tela, esse botão deve representar a ação mais comum.

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

O botão de ação flutuante anima na tela como uma parte expansiva do material, por padrão.

Um botão de ação flutuante que abranja várias telas laterais (como telas com guias) deve desaparecer brevemente, então reapareça se sua ação mudar.

A transição de zoom pode ser usada para conseguir isso. Observe que, como as animações de entrada e saída são acionadas ao mesmo tempo, usamos `enterDelay` para permitir que a animação do botão de ação flutuante de saída termine antes que a nova seja inserida.

{{"demo": "pages/components/buttons/FloatingActionButtonZoom.js"}}

## Tamanhos

Botões extravagantes ou menores? Use a propriedade `size`.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Botões com ícones e rótulo

Às vezes você pode querer ter ícones para determinado botão para melhorar o UX do aplicativo pois reconhecemos logotipos mais facilmente do que o texto sem formatação. Por exemplo, se você tem um botão deletar você pode rotulá-lo com um ícone de lixeira.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Botões de Ícone

Botões de Ícones são comumente encontrados em barras de aplicativos e barras de ferramentas.

Ícones são também adequados para botões de alternância que permitem uma escolha única para ser selecionado ou desselecionado, como adicionar ou remover uma estrela para um item.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Botões Personalizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de substituições](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js"}}



## Botões Complexos

Os Botões de Texto, Botões Contidos, Botões de Ação Flutuante e Botões de Ícone são construídos em cima do mesmo componente: O componente `ButtonBase`. Você pode tirar vantagem deste componente de nível mais abastrato para construir interações personalizadas.

{{"demo": "pages/components/buttons/ButtonBases.js"}}

## Biblioteca de roteamento de terceiros

Um caso de uso comum é usar o botão para acionar uma navegação para uma nova página. O componente `ButtonBase` fornece uma propriedade para lidar com este caso de uso: `component`. No entanto, para alguns polyfills de foco `ButtonBase` requer o nó DOM do componente fornecido. Isso é obtido anexando-se uma referência ao componente e esperando que o componente envie essa referência para o nó DOM subjacente. Dado que vários de nossos componentes interativos dependem do `ButtonBase`, você deve ser capaz de tirar vantagem disto em qualquer lugar:

{{"demo": "pages/components/buttons/ButtonRouter.js", "defaultCodeOpen": true}}

*Nota: A criação do componente Botão é necessária para impedir uma desmontagem inesperada. Você pode ler mais sobre isso em nosso [guia de propriedades de componentes](/guides/composition/#component-property).*