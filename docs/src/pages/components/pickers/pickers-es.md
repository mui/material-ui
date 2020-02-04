---
title: Date picker, Time picker React components
components: TextField
---

# Date / Time pickers

<p class="description">Date pickers and Time pickers provide a simple way to select a single value from a pre-determined set.</p>

- En móvil, los selectores son los mas adecuados para despliegue en diálogos de confirmación.
- Para despliegue en línea, como en un formulario, considere usar controles compactos tales como los botones desplegables segmentados.

## @material-ui/pickers

![estrellas](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![descargas npm](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@material-ui/pickers](https://material-ui-pickers.dev/) provides date picker and time picker controls.

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Native pickers

⚠️ Los controles de entrada nativos compatibles con los navegadores [no son perfectos](https://caniuse.com/#feat=input-datetime). Have a look at [@material-ui/pickers](https://material-ui-pickers.dev/) for a richer solution.

### Datepickers

A native datepicker example with `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Selectores de fecha y hora

Un ejemplo de selector de fecha y hora con `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Selectores de hora

Un ejemplo de un selector de hora nativo con `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}