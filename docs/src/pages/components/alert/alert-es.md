---
title: Componente Alert React
components: Alert
---

# Alert

<p class="description">Un Alert muestra un breve mensaje importante de una forma que atrae la atención del usuario sin necesidad de interrumpir el trabajo al usuario.</p>

**Nota:** Este componente no está documentado en la pautas [Material Design](https://material.io/), pero Material-UI lo soporta.

## Alert simples

El componente Alert ofrece cuatro niveles de gravedad que establecen un icono y un color distintivos.

{{"demo": "pages/components/alert/SimpleAlerts.js"}}

## Descripción

Puede utilizar el componente `AlertTitle` para mostrar un título formateado por encima del contenido.

{{"demo": "pages/components/alert/DescriptionAlerts.js"}}

## Acciones

El componente Alert puede tener una acción, como un botón cerrar o deshacer. Es rendereado después del mensaje, al final del Alert.

Si se proporciona una devolución de llamada `onClose` y no se establece ningún accesorio de `action`, se muestra un icono de cierre. El accesorio de `action` se puede usar para proporcionar una acción alternativa, por ejemplo, usando un Button o un IconButton.

{{"demo": "pages/components/alert/ActionAlerts.js"}}

### Transición

Puede utilizar el componente de [ transition ](/components/transitions/) como `Colapse` para la transición del componente Alert.

{{"demo": "pages/components/alert/TransitionAlerts.js"}}

## Iconos

El `icon` prop permite añadir un icono para el inicio del componente Alert. This will override the default icon for the specified severity.

You can change the default severity to icon mapping with the `iconMapping` prop. This can be defined globally using [theme customization](/customization/globals/#default-props).

Setting the icon prop to false will remove the icon altogether.

{{"demo": "pages/components/alert/IconAlerts.js"}}

## Variants

Two additional variants are available – outlined, and filled:

### Outlined

{{"demo": "pages/components/alert/OutlinedAlerts.js"}}

### Filled

{{"demo": "pages/components/alert/FilledAlerts.js"}}

## Toast

You can use the Snackbar to [display a toast](/components/snackbars/#customized-snackbars) with the Alert.

## Color

The `color` prop will override the default color for the specified severity.

{{"demo": "pages/components/alert/ColorAlerts.js"}}

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#alert)

When the component is dynamically displayed, the content is automatically announced by most screen readers. At this time, screen readers do not inform users of alerts that are present when the page loads.

Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (for example the visible text), or is included through alternative means, such as additional hidden text.

Actions must have a tab index of 0 so that they can be reached by keyboard-only users.
