---
title: Componente de React Button
components: Button, Fab, IconButton, ButtonBase, Zoom
---

# Botones

<p class="description">Los botones permiten a los usuarios ejecutar acciones, y tomar decisiones, con un simple toque.</p>

Los [botones](https://material.io/design/components/buttons.html) indican acciones que los usuarios pueden tomar. Suelen ponerse a lo largo de la interfaz, en lugares como:

- Diálogos
- Ventanas modal
- Formularios
- Tarjetas
- Barras de herramientas

## Botones contenidos

Los [Botones contenidos](https://material.io/design/components/buttons.html#contained-button) son de alto énfasis, distinguidos por el uso de elevación y relleno. Contienen acciones que son primarias para la aplicación.

El último ejemplo de esta demostración muestra cómo usar un botón de subir archivos.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

## Botones de texto

Los [Botones de texto](https://material.io/design/components/buttons.html#text-button) se suelen usar para acciones menos notables, incluyendo las que se encuentran:

- En diálogos
- En tarjetas

En las tarjetas, los botones de texto ayudan a mantener un énfasis en el contenido de la tarjeta.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Botones con Contorno

[Botones con contorno (outlined)](https://material.io/design/components/buttons.html#outlined-button) son de énfasis medio. Contienen acciones que son importantes, pero no primarias en la app.

### Alternativos

Los botones delineados también son una alternativa de menos énfasis que los botones contenidos, o de mayor énfasis que los botones de texto.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Botones de acción flotantes

Un [botón de acción flotante](https://material.io/design/components/buttons-floating-action-button.html) (BAF) desempeña la acción principal, o más común, en una pantalla. Aparece en frente de todo el contenido de la pantalla, normalmente como una forma circular con un icono en el centro. Los BAF existen en dos formas: regular, y extendido.

Sólo se recomienda usar un BAF si es la manera más apta para presentar la acción primaria de una pantalla.

Se recomienda solo un botón flotante por pantalla para representar la acción más común.

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

El botón de acción flotante aparece en la página animado como un pedazo de material en expansión, por defecto.

Un botón de acción flotante que aparece en varias páginas laterales (como páginas en pestañas) debe desaparecer por un momento, y luego aparecer de nuevo si su acción cambia.

La transición Zoom se puede usar para lograr esto. Ten en cuenta que ya que las animaciones de salida y de entrada son desencadenados al mismo tiempo, usamos `enterDelay` para permitir que termine la animación del Botón de Acción Flotante saliente antes de que entre el nuevo.

{{"demo": "pages/components/buttons/FloatingActionButtonZoom.js"}}

## Tamaños

¿Te gustan botones más grandes o más pequeños? Usa el atributo `size`.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Botones con iconos y títulos

Tal vez se necesita tener iconos para un botón en particular para mejorar la experiencia del usuario de la aplicación porque se reconocen más fácilmente los logos que el texto. Por ejemplo, si se crea un botón para borrar se le puede poner un icono de papelera.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Botones con Iconos

Los botones de iconos suelen encontrarse en las barras de aplicaciones y las barras de herramientas.

Los iconos son también apropiados para botones toggle que permiten marcar o desmarcar una sola opción, tal como poner o quitar una estrella de un elemento.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Customized buttons

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js"}}



## Botones Complejos

Los Botones de Texto, los Botones Contenidos, los Botones de Acción Flotantes y los Botones con Iconos se construyen sobre el mismo componente: el `ButtonBase`. Se puede sacar partido de este componente básico para construir interacciones personalizadas.

{{"demo": "pages/components/buttons/ButtonBases.js"}}

## Librería externa de routing

Un uso común es usar el botón para empezar la navegación hacia una página nueva. El componente `ButtonBase` provee un atributo para tratar este uso: `component`. Sin embargo, para ciertos rellenos `ButtonBase` requiere el nodo DOM del componente proporcionado. Esto se logra adjuntando una referencia al componente y esperando que el componente reenvíe esta referencia al nodo DOM subyacente. Ya que muchos de nuestros componentes interactivos dependen de `ButtonBase`, puede ser aprovechado en todas partes:

{{"demo": "pages/components/buttons/ButtonRouter.js", "defaultCodeOpen": true}}

*Note: Creating the Button components is necessary to prevent unexpected unmounting. You can read more about it in our [component property guide](/guides/composition/#component-property).*