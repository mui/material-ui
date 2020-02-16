---
title: Componente do React Alert
components: Alert
---

# Alert

<p class="description">Um alerta exibe uma mensagem curta e importante de uma forma que atrai a atenção do usuário sem interromper o que ele estiver fazendo.</p>

**Observação:** Este componente não está documentado nos [guias do Material Design](https://material.io/), mas o Material-UI o suporta.

## Alerta simples

Este alerta oferece quatro níveis de severidade que definem diferentes ícones e cores.

{{"demo": "pages/components/alert/SimpleAlerts.js"}}

## Descrição

Você pode usar o componente `AlertTitle` para exibir um título formatado acima do conteúdo.

{{"demo": "pages/components/alert/DescriptionAlerts.js"}}

## Actions

An alert can have an action, such as a close or undo button. It is rendered after the message, at the end of the alert.

If an `onClose` callback is provided and no `action` prop is set, a close icon is displayed. The `action` prop can be used to provide an alternative action, for example using a Button or IconButton.

{{"demo": "pages/components/alert/ActionAlerts.js"}}

### Transition

You can use a [transition component](/components/transitions/) such as `Collapse` to transition the appearance of the alert.

{{"demo": "pages/components/alert/TransitionAlerts.js"}}

## Ícones

The `icon` prop allows you to add an icon to the beginning of the alert component. This will override the default icon for the specified severity.

You can change the default severity to icon mapping with the `iconMapping` prop. This can be defined globally using [theme customization](/customization/globals/#default-props).

Setting the icon prop to false will remove the icon altogether.

{{"demo": "pages/components/alert/IconAlerts.js"}}

## Variantes

Two additional variants are available – outlined, and filled:

### Outlined

{{"demo": "pages/components/alert/OutlinedAlerts.js"}}

### Filled

{{"demo": "pages/components/alert/FilledAlerts.js"}}

## Toast

You can use the Snackbar to [display a toast](/components/snackbars/#customized-snackbars) with the Alert.

## Cor

The `color` prop will override the default color for the specified severity.

{{"demo": "pages/components/alert/ColorAlerts.js"}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#alert)

When the component is dynamically displayed, the content is automatically announced by most screen readers. At this time, screen readers do not inform users of alerts that are present when the page loads.

Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (for example the visible text), or is included through alternative means, such as additional hidden text.

Actions must have a tab index of 0 so that they can be reached by keyboard-only users.
