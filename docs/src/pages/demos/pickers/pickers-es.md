---
title: Componentes React Selector de Fecha, Selector de Hora
components: TextField
---
# Pickers

<p class="description">Los selectores proporcionan una manera sencilla de elegir un valor desde un conjunto predeterminado.</p>

- En móvil, los selectores son los mas adecuados para despliegue en diálogos de confirmación.
- Para despliegue en línea, como en un formulario, considere usar controles compactos tales como los botones desplegables segmentados.

#### Aviso

Estamos recurriendo a **controles de entrada nativos**.

⚠️ Los controles de entrada nativos compatibles con los navegadores [no son perfectos](https://caniuse.com/#feat=input-datetime). Eche un vistazo a los [proyectos complementarios](#complementary-projects) para mejores soluciones.

## Selectores de fecha

Un selector de fecha nativo con `type="date"`, puede ser usado también como calendario.

{{"demo": "pages/demos/pickers/DatePickers.js"}}

## Selectores de fecha y hora

Un ejemplo de selector de fecha y hora con `type="datetime-local"`.

{{"demo": "pages/demos/pickers/DateAndTimePickers.js"}}

## Selectores de hora

Un ejemplo de un selector de hora nativo con `type="time"`.

{{"demo": "pages/demos/pickers/TimePickers.js"}}

## Proyectos relacionados

Para que puedas sacar ventaja de ellos en casos de uso más avanzados.

### material-ui-pickers

![estrellas](https://img.shields.io/github/stars/dmtrKovalenko/material-ui-pickers.svg?style=social&label=Stars) ![descargas npm](https://img.shields.io/npm/dm/material-ui-pickers.svg)

[material-ui-pickers](https://material-ui-pickers.firebaseapp.com/) provee controles de fecha y hora que siguen la especificación de Material Design.

{{"demo": "pages/demos/pickers/MaterialUIPickers.js"}}

### Otros

- [material-ui-time-picker](https://github.com/TeamWertarbyte/material-ui-time-picker): selectores de hora.
- [material-ui-next-pickers](https://github.com/chingyawhao/material-ui-next-pickers): selectores de fecha y hora.