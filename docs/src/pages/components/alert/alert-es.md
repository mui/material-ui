---
title: React Alert component
components: Alert, AlertTitle
---

# Alerta

<p class="description">Una Alerta (alert) muestra un mensaje corto e importante de una manera que atrae la atención del usuario sin interrumpir la tarea del usuario.</p>

**Nota:** Este componente no está documentado en las [ pautas de Material Design](https://material.io/), pero Material-UI lo soporta.

## Alertas simples

La alerta ofrece cuatro niveles de severidad que distintivamente establecen un icono y un color.

{{"demo": "pages/components/alert/SimpleAlerts.js"}}

## Descripción

Puedes utilizar el componente `AlertTitle` para mostrar un título formateado encima del contenido.

{{"demo": "pages/components/alert/DescriptionAlerts.js"}}

## Acciones

Una alerta puede tener una acción, como un botón para cerrar o deshacer. Es renderizado después del mensaje, al final de la alerta.

Si se proporciona un callback `onClose` y no se establece una propiedad `action`, se muestra un icono de cierre. La propiedad `action` puede ser usada para proveer una acción alternativa, por ejemplo, usando un Button o un IconButton.

{{"demo": "pages/components/alert/ActionAlerts.js"}}

### Transición

Puedes utilizar un [ componente de transition ](/components/transitions/) como `Collapse` para transicionar la apariencia de una alerta.

{{"demo": "pages/components/alert/TransitionAlerts.js"}}

## Iconos

La propiedad `icon` te permite añadir un icono al inicio del componente alerta. Esto anulará el icono por defecto para la severidad especificada.

Puedes cambiar el mapeo por defecto de severidad a ícono con la propiedad  `iconMapping`. Esto puede ser definido globalmente usando [la personalización del tema](/customization/globals/#default-props).

Al establecer la propiedad `icono` a falso, el icono se removerá completamente.

{{"demo": "pages/components/alert/IconAlerts.js"}}

## Variantes

Dos variantes adicionales están disponibles – delineada y rellena:

### Delineada

{{"demo": "pages/components/alert/OutlinedAlerts.js"}}

### Rellenada

{{"demo": "pages/components/alert/FilledAlerts.js"}}

## Mensaje emergente

Puedes usar el Snackbar para [mostrar un mensaje emergente](/components/snackbars/#customized-snackbars) con la alerta.

## Color

La propiedad `color` anulará el color por defecto para la severidad especificada.

{{"demo": "pages/components/alert/ColorAlerts.js"}}

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#alert)

Cuando el componente se muestra dinámicamente, el contenido es anunciado automáticamente por la mayoría de los lectores de pantalla. En este momento, los lectores de pantallas no informan a los usuarios de las alertas que están presentes cuando la página carga.

El uso del color para agregar significado sólo proporciona una indicación visual, que no será transmitida a los usuarios de tecnologías de asistencia como lectores de pantalla. Asegurate que la información denotada por el color es u obvia por el contenido en sí mismo (por ejemplo, el texto visible), o es incluida a través de medios alternativos, tales como un texto oculto adicional.

Las acciones deben tener un índice de pestañas de 0 para que puedan ser alcanzadas por usuarios con sólo teclado.
