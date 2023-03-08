---
product: material-ui
title: Componente React para Alertas
components: Alert, AlertTitle
githubLabel: 'component: Alert'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
---

# Alerta

<p class="description">Um alerta exibe uma mensagem curta e importante de uma forma que atrai a atenção do usuário sem interromper o que ele estiver fazendo.</p>

**Nota:** Este componente não está documentado nas [diretrizes do Material Design](https://m2.material.io/), mas MUI o suporta.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Alertas básicos

O alerta oferece quatro níveis de severidade que se distinguem em diferentes ícones e cores.

{{"demo": "BasicAlerts.js"}}

## Descrição

Você pode usar o componente `AlertTitle` para exibir um título formatado acima do conteúdo.

{{"demo": "DescriptionAlerts.js"}}

## Ações

Um alerta pode conter uma ação, como um botão de fechar ou desfazer. A ação é renderizada depois da mensagem, na parte final do alerta.

Se um callback `onClose` é fornecido e a propriedade `action` não é definida, um ícone de fechar será exibido. A propriedade `action` pode ser usada para fornecer uma ação alternativa, por exemplo, usando um Button ou IconButton.

{{"demo": "ActionAlerts.js"}}

### Transição

You can use a [transition component](/material-ui/transitions/) such as `Collapse` to transition the appearance of the alert.

{{"demo": "TransitionAlerts.js"}}

## Ícones

A propriedade `icon` permite que você adicione um ícone no início do componente de alerta. Isto substituirá o ícone padrão de acordo com a severidade especificada.

Você pode alterar a severidade padrão e o mapeamento do ícone com a propriedade `iconMapping`. This can be defined globally using [theme customization](/material-ui/customization/theme-components/#default-props).

Definir a propriedade `icon` como falso removerá o ícone completamente.

{{"demo": "IconAlerts.js"}}

## Variantes

Duas variantes adicionais estão disponíveis – delineado e preenchido:

### Delineado

{{"demo": "OutlinedAlerts.js"}}

When using an outlined alert with the [`Snackbar` component](/material-ui/react-snackbar/#customization), background content will be visible and bleed through the alert by default. You can prevent this by adding `bgcolor: 'background.paper'` to the[`sx` prop](/material-ui/customization/how-to-customize/#the-sx-prop) on the `Alert` component.

### Preenchido

{{"demo": "FilledAlerts.js"}}

## Toast

You can use the Snackbar to [display a toast](/material-ui/react-snackbar/#customization) with the Alert.

## Cor

The `color` prop will override the default color for the specified severity.

{{"demo": "ColorAlerts.js"}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

When the component is dynamically displayed, the content is automatically announced by most screen readers. At this time, screen readers do not inform users of alerts that are present when the page loads.

Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (for example the visible text), or is included through alternative means, such as additional hidden text.

Actions must have a tab index of 0 so that they can be reached by keyboard-only users.
