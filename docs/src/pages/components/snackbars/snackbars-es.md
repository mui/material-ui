---
title: React Snackbar component
components: Snackbar, SnackbarContent
---

# Snackbar

<p class="description">Las Snackbars proporcionan mensajes breves sobre los procesos de la aplicación. El componente también es conocido como un toast.</p>

[Snackbars](https://material.io/design/components/snackbars.html) informa a los usuarios de un proceso que una aplicación ha realizado o realizará. Aparecen temporalmente, hacia la parte inferior de la pantalla. No deberían interrumpir la experiencia del usuario, y no requieren que el usuario ingrese para desaparecer.

Snackbars contienen una sola línea de texto directamente relacionados con la operación realizada. Pueden contener una acción de texto, pero sin iconos. Puedes usarlos para mostrar notificaciones.

#### Frecuencia

Sólo se puede mostrar un snackbar a la vez.

## Snackbars simples

A basic snackbar that aims to reproduce Google Keep's snackbar behavior.

{{"demo": "pages/components/snackbars/SimpleSnackbar.js"}}

## Snackbars personalizadas

Here are some examples of customizing the component. Here are some examples of customizing the component.

{{"demo": "pages/components/snackbars/CustomizedSnackbars.js"}}

## Snackbars posicionadas

In wide layouts, snackbars can be left-aligned or center-aligned if they are consistently placed on the same spot at the bottom of the screen, however there may be circumstances where the placement of the snackbar needs to be more flexible. You can control the position of the snackbar by specifying the `anchorOrigin` prop.

{{"demo": "pages/components/snackbars/PositionedSnackbar.js"}}

## Longitud del mensaje

Some snackbars with varying message length.

{{"demo": "pages/components/snackbars/LongTextSnackbar.js"}}

## Transiciones

### Snackbars consecutivos

When multiple snackbar updates are necessary, they should appear one at a time.

{{"demo": "pages/components/snackbars/ConsecutiveSnackbars.js"}}

### Snackbars y botones de acción flotantes (FABs)

Snackbars should appear above FABs (on mobile).

{{"demo": "pages/components/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 400}}

### Cambiar transición

[Grow](/components/transitions/#grow) is the default transition but you can use a different one.

{{"demo": "pages/components/snackbars/TransitionsSnackbar.js"}}

### Controla la dirección de diapositiva

Puedes cambiar la dirección de la transición de [Slide](/components/transitions/#slide).

{{"demo": "pages/components/snackbars/DirectionSnackbar.js"}}

## Proyectos relacionados

Para usos más avanzados tal vez puedas aprovercharte de:

### notistack

![estrellas](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![descargas npm](https://img.shields.io/npm/dm/notistack.svg)

Este ejemplo demuestra cómo usar [notistack](https://github.com/iamhosseindhv/notistack). notistack has an **imperative API** that makes it easy to display snackbars, without having to handle their open/close state. It also enables you to **stack** them on top of one another (although this is discouraged by the Material Design specification).

{{"demo": "pages/components/snackbars/IntegrationNotistack.js", "defaultCodeOpen": false}}

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-1.1/#alert)

- De forma predeterminada, la barra snackbar no se ocultará automáticamente. However, if you decide to use the `autoHideDuration` prop, it's recommended to give the user [sufficient time](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits.html) to respond.