---
title: Fab React component
components: Fab
---

# Floating action button

<p class="description">A floating action button (FAB) performs the primary, or most common, action on a screen.</p>

## Floating Action Button

A [floating action button](https://material.io/design/components/buttons-floating-action-button.html) appears in front of all screen content, typically as a circular shape with an icon in its center. BAFs vêm em dois tipos: regular e estendido.

Use apenas um BAF se é a maneira mais adequada para apresentar a ação principal de uma tela.

É recomendado utilizar apenas um botão de ação flutuante por tela, esse botão deve representar a ação mais comum.

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Size

Use the `size` prop for larger or smaller floating action buttons.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

## Animation

O botão de ação flutuante anima na tela como uma parte expansiva do material, por padrão.

Um botão de ação flutuante que abranja várias telas laterais (como telas com guias) deve desaparecer brevemente, então reapareça se sua ação mudar.

A transição de zoom pode ser usada para conseguir isso. Observe que, como as animações de entrada e saída são acionadas ao mesmo tempo, usamos `enterDelay` para permitir que a animação do botão de ação flutuante de saída termine antes que a nova seja inserida.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
