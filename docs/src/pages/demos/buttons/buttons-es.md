---
title: Botón componente React
components: Button, Fab, IconButton, ButtonBase, Zoom
---
# Botones

<p class="description">Los botones permiten a los usuarios ejecutar acciones, y tomar decisiones, con un solo toque.</p>

Los [botones](https://material.io/design/components/buttons.html) indican acciones que los usuarios pueden tomar. Suelen ponerse a lo largo de la interfaz, en lugares como:

- Dialogs
- Ventanas modal
- Formularios
- Tarjetas
- Barras de herramientas

## Botones contenidos

Los [botones contenidos](https://material.io/design/components/buttons.html#contained-button) son de alto énfasis, distinguidos por el uso de elevación y relleno. Contienen acciones que son primarias para tu aplicación.

El último ejemplo de esta demostración muestra cómo usar un botón de subir archivos.

{{"demo": "pages/demos/buttons/ContainedButtons.js"}}

## Botones de texto

Los [botones de texto](https://material.io/design/components/buttons.html#text-button) se suelen usar para acciones menos notables, incluyendo las que se encuentran:

- En diálogos
- En tarjetas

En las tarjetas, los botones de texto ayudan a mantener un énfasis en el contenido de la tarjeta.

{{"demo": "pages/demos/buttons/TextButtons.js"}}

## Botones descritos

[Botones descritos](https://material.io/design/components/buttons.html#outlined-button) son de énfasis medio. Contienen acciones que son importantes, pero no primarias en la app.

### Alternativos

Los botones delineados también son una alternativa de menos énfasis que los botones contenidos, o de mayor énfasis que los botones de texto.

{{"demo": "pages/demos/buttons/OutlinedButtons.js"}}

## Botones de acción flotantes

Un [botón de acción flotante](https://material.io/design/components/buttons-floating-action-button.html) (BAF) desempeña la acción principal, o más común, en una pantalla. Aparece en frente de todo el contenido de la pantalla, normalmente como una forma circular con un icono en el centro. BAFs existen en dos formas: regular, y extendido.

Solo usa un BAF si es la manera más apta para presentar la acción primaria de una pantalla.

Se recomienda solo un botón flotante por pantalla para representar la acción más común.

{{"demo": "pages/demos/buttons/FloatingActionButtons.js"}}

El botón de acción flotante aparece en la página animado como un pedazo de material en expansión, por defecto.

Un botón de acción flotante que aparece en varias páginas (como páginas en pestañas) debe desaparecerse por un momento, y luego aparecer de nuevo si su acción cambia.

La transición Zoom se puede usar para lograr esto. Ten en cuenta que ya que las animaciones de salida y de entrada son desencadenados al mismo tiempo, usamos `enterDelay` para permitir que termine la animación del Botón de acción flotante que sale antes de que entre el nuevo.

{{"demo": "pages/demos/buttons/FloatingActionButtonZoom.js"}}

## Tamaños

Te gustan botones más grandes o más pequeños? Usa el atributo `size`.

{{"demo": "pages/demos/buttons/ButtonSizes.js"}}

## Botones con iconos y títulos

Tal vez te gustaría tener iconos para un botón en particular para mejorar la experiencia del usuario de la aplicación porque se reconocen más fácilmente que el texto. Por ejemplo, si tienes un botón para borrar puedes ponerle un icono de papelera.

{{"demo": "pages/demos/buttons/IconLabelButtons.js"}}

## Botónes con iconos

Los botones de iconos suelen encontrarse en las barras de aplicaciones y las barras de herramientas.

Iconos son también apropiados para botones de cambio que permiten marcar o desmarcar una sola opción, tal como poner o quitar una estrella de un elemento.

{{"demo": "pages/demos/buttons/IconButtons.js"}}

## Botones personalizados

Si has leído la [página de documentación de anulación](/customization/overrides/) pero no te sientes cómodo intentándolo, a continuación hay ejemplos de como cambiar el color principal de un Botón usandos clases, y usando un tema; y de un Botón estilo Bootstrap.

⚠️ A pesar de que la especificación de material design anima a usar temas, estos ejemplos no son comunes.

{{"demo": "pages/demos/buttons/CustomizedButtons.js"}}

## Botones complejos

Los Botones de texto, los Botones contenidos, los Botones de acción flotantes y los Botones con iconos se construyen sobre el mismo componente: el `ButtonBase`. Puedes aprovecharte de este componente básico para construir interacciones personalizadas.

{{"demo": "pages/demos/buttons/ButtonBases.js"}}

## Librería externa de routing

Un uso común es usar el botón para empezar la navigación a una página nueva. El componente `ButtonBase` provee un atributo para tratar este uso: `component`. Ya que muchos de nuestros componentes interactivos dependen de `ButtonBase`, puedes aprovecharte de él en todas partes:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

<Button component={Link} to="/open-collective">
  Link
</Button>
```

o si quieres evitar un choque de atributos:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const MyLink = props => <Link to="/open-collective" {...props} />

<Button component={MyLink}>
  Link
</Button>
```

*Nota: Crear `MyLink` es necesario para prevenir una montura inesperada. Puedes leer más en nuestra [guía de atributos de componentes](/guides/composition/#component-property).*