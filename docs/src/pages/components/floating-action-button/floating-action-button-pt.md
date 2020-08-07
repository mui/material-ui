---
title: Componente React para Botões de ação flutuante
components: Fab
---

# Botão de ação flutuante

<p class="description">Um botão de ação flutuante (BAF) realiza a principal, ou mais comum, ação na tela.</p>

## Botão de ação flutuante

Um [botão de ação flutuante](https://material.io/design/components/buttons-floating-action-button.html) aparece na frente de todo conteúdo da tela, tipicamente em uma forma circular com um ícone em seu centro. BAFs podem ser de dois tipos: regular e estendido.

Use um BAF apenas se for a maneira mais adequada para apresentar a ação principal de uma tela.

É recomendado utilizar apenas um botão de ação flutuante por tela, esse botão deve representar a ação mais comum.

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Tamanho

Use a propriedade `size` para aumentar ou diminuir botões de ação flutuante.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

## Animação

O botão de ação flutuante anima na tela como uma parte expansiva do material, por padrão.

Um botão de ação flutuante que abranja várias telas laterais (como telas com abas) deve desaparecer brevemente, então reaparecer se sua ação mudar.

A transição com Zoom pode ser usada para esta finalidade. Observe que, como as animações de entrada e saída são acionadas ao mesmo tempo, usamos `enterDelay` para permitir que a animação do botão de ação flutuante de saída termine antes que a nova seja inserida.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
