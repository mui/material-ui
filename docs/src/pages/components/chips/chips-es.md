---
title: "Los Chips son elementos compactos que representan una entrada, atributo, o acción.\nLos Chips le permiten a los usuarios introducir información, hacer selecciones, filtrar contenido, o activar acciones.\nAunque incluido como un componente individual, el uso más común será en algún tipo de entrada de formulario, por lo que parte del comportamiento demostrado aquí no se muestra en este contexto"
components: Chip
---

# Chip

<p class="description">Los Chips son elementos compactos que representan una entrada, atributo o acción.</p>

Los [Chips](https://material.io/design/components/chips.html) le permiten a los usuarios introducir información, hacer selecciones, filtrar contenido, o activar acciones.

Aunque incluido como un componente individual, el uso más común será en algún tipo de entrada de formulario, por lo que parte del comportamiento demostrado aquí no se muestra en este contexto.

## Chip

Ejemplos de Chips, usando un Avatar de imagen, Avatar de icono SVG, Avatar con "Letra" y (cadena de texto).

- Los Chips con la propiedad `onClick` definida cambian su apariencia en el focus, el hover y el click.
- Los Chips con la propiedad `onDelete` definida mostrarán un icono de eliminar, el cuál cambia de apariencia en el hover.

{{"demo": "pages/components/chips/Chips.js"}}

### Chips con contorno

Los chips con contorno ofrecen un estilo alternativo.

{{"demo": "pages/components/chips/OutlinedChips.js"}}

## Array de Chips

Un ejemplo de cómo renderizar múltiples Chips desde un array de valores. Eliminar un chip lo quita del array. Tened en cuenta que al no estar la propiedad `onClick` definida, al Chip se le puede hacer focus, pero no gana profundidad si se hace click en él o se toca.

{{"demo": "pages/components/chips/ChipsArray.js", "bg": true}}

## Small Chip

You can use the `size` prop to define a small Chip.

### Default variant

{{"demo": "pages/components/chips/SmallChips.js"}}

### Outlined variant

{{"demo": "pages/components/chips/SmallOutlinedChips.js"}}

## Chip Playground

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideHeader": true}}

## Accesibilidad

If the Chip is deletable or clickable then it is a button in tab order. When the Chip is focused (e.g. when tabbing) releasing (`keyup` event) `Backspace` or `Delete` will call the `onDelete` handler while releasing `Escape` will blur the Chip.