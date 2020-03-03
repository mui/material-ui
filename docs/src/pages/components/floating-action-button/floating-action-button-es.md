---
title: Fab React component
components: Fab
---

# Floating action button

<p class="description">A floating action button (FAB) performs the primary, or most common, action on a screen.</p>

## Floating Action Button

A [floating action button](https://material.io/design/components/buttons-floating-action-button.html) appears in front of all screen content, typically as a circular shape with an icon in its center. Los BAF existen en dos formas: regular, y extendido.

Sólo se recomienda usar un BAF si es la manera más apta para presentar la acción primaria de una pantalla.

Se recomienda solo un botón flotante por pantalla para representar la acción más común.

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Size

Use the `size` prop for larger or smaller floating action buttons.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

## Animation

El botón de acción flotante aparece en la página animado como un pedazo de material en expansión, por defecto.

Un botón de acción flotante que aparece en varias páginas laterales (como páginas en pestañas) debe desaparecer por un momento, y luego aparecer de nuevo si su acción cambia.

La transición Zoom se puede usar para lograr esto. Ten en cuenta que ya que las animaciones de salida y de entrada son desencadenados al mismo tiempo, usamos `enterDelay` para permitir que termine la animación del Botón de Acción Flotante saliente antes de que entre el nuevo.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
