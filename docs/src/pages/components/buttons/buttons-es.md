---
title: Componente de React Button
components: Button, ButtonGroup, Fab, IconButton, ButtonBase, Zoom
---

# Button (botón)

<p class="description">Los botones permiten a los usuarios ejecutar acciones, y tomar decisiones, con un simple toque.</p>

[Los botones](https://material.io/design/components/buttons.html) comunican acciones que los usuarios pueden realizar. Usualmente están ubicados dentro de tu interfaz, en lugares como:

- Diálogos
- Ventanas modal
- Formularios
- Tarjetas
- Barras de herramientas

## Botones contenidos

Los [Botones contenidos](https://material.io/design/components/buttons.html#contained-button) son de alto énfasis, distinguidos por el uso de elevación y relleno. Contienen acciones que son primarias para la aplicación.

El último ejemplo de esta demostración muestra cómo usar un botón de subir archivos.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

You can remove the elevation with the `disableElevation` prop.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

## Botones de texto

Los [Botones de texto](https://material.io/design/components/buttons.html#text-button) se suelen usar para acciones menos notables, incluyendo las que se encuentran:

- En diálogos
- En tarjetas

En las tarjetas, los botones de texto ayudan a mantener un énfasis en el contenido de la tarjeta.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Botones con Contorno

[Los botones con contorno](https://material.io/design/components/buttons.html#outlined-button) son botones de énfasis intermedio. Estos contienen acciones que son importantes, sin ser primarias, dentro de una aplicación.

Los botones con contorno tambien son una alternativa de énfasis más bajo que los botones contenidos, y de énfasis más alto que los botones de texto.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Botones Agrupados

Los `ButtonGroup` pueden ser usados para agrupar botones.

{{"demo": "pages/components/buttons/GroupedButtons.js"}}

### Group sizes and colors

{{"demo": "pages/components/buttons/GroupSizesColors.js"}}

### Group orientation

{{"demo": "pages/components/buttons/GroupOrientation.js"}}

### Split Button

ButtonGroup can also be used to create a split button. The dropdown can change the button action (as in this example), or be used to immediately trigger a related action.

{{"demo": "pages/components/buttons/SplitButton.js"}}

## Botones de acción flotantes

Un [botón de acción flotante](https://material.io/design/components/buttons-floating-action-button.html) (BAF) desempeña la acción principal, o más común, en una pantalla. Aparece en frente de todo el contenido de la pantalla, normalmente como una forma circular con un icono en el centro. Los BAF existen en dos formas: regular, y extendido.

Sólo se recomienda usar un BAF si es la manera más apta para presentar la acción primaria de una pantalla.

Se recomienda solo un botón flotante por pantalla para representar la acción más común.

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

El botón de acción flotante aparece en la página animado como un pedazo de material en expansión, por defecto.

Un botón de acción flotante que aparece en varias páginas laterales (como páginas en pestañas) debe desaparecer por un momento, y luego aparecer de nuevo si su acción cambia.

La transición Zoom se puede usar para lograr esto. Ten en cuenta que ya que las animaciones de salida y de entrada son desencadenados al mismo tiempo, usamos `enterDelay` para permitir que termine la animación del Botón de Acción Flotante saliente antes de que entre el nuevo.

{{"demo": "pages/components/buttons/FloatingActionButtonZoom.js", "bg": true}}

## Upload button

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Tamaños

Botones más grandes o más pequeños? Usa la propiedad `size`.

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

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

👑 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/button).

## Botones Complejos

Los Botones de Texto, los Botones Contenidos, los Botones de Acción Flotantes y los Botones con Iconos se construyen sobre el mismo componente: el `ButtonBase`. Se puede sacar partido de este componente básico para construir interacciones personalizadas.

{{"demo": "pages/components/buttons/ButtonBases.js"}}

## Librería externa de routing

One common use case is to use the button to trigger navigation to a new page. El componente `ButtonBase` provee un atributo para tratar este uso: `component`. Sin embargo, para ciertos rellenos `ButtonBase` requiere el nodo DOM del componente proporcionado. Esto se logra adjuntando una referencia al componente y esperando que el componente reenvíe esta referencia al nodo DOM subyacente. Given that many of the interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere.

Here is an [integration example with react-router](/guides/composition/#button).

## Limitaciones

### Cursor not-allowed

The ButtonBase component sets `pointer-events: none;` on disabled buttons, which prevents the appearance of a disabled cursor.

If you wish to use `not-allowed`, you have two options:

1. **CSS only**. You can remove the pointer events style on the disabled state of the `<button>` element:

  ```css
  .MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
  ```

However:

- You should add `pointer-events: none;` back when you need to display [tooltips on disabled elements](/components/tooltips/#disabled-elements)
- The cursor won't change if you render something other than a button element, for instance, a link `<a>` element.

2. **DOM change**. You can wrap the button:

  ```jsx
  <span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
  ```

Este tiene la ventaja de permitir cualquier elemento, por ejemplo un enlace `<a>`<a></0>.</p>