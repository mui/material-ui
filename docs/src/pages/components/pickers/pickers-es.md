---
title: Componentes React Selector de Fecha, Selector de Hora
components: TextField
---

# Pickers

<p class="description">Los selectores proporcionan una manera sencilla de elegir un valor desde un conjunto predeterminado.</p>

- En móvil, los selectores son los mas adecuados para despliegue en diálogos de confirmación.
- Para despliegue en línea, como en un formulario, considere usar controles compactos tales como los botones desplegables segmentados.

## Native pickers

⚠️ Los controles de entrada nativos compatibles con los navegadores [no son perfectos](https://caniuse.com/#feat=input-datetime). Have a look at the [complementary projects](#complementary-projects) for a richer solution.

### Selectores de fecha

A native date picker example with `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Selectores de fecha y hora

Un ejemplo de selector de fecha y hora con `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Selectores de hora

Un ejemplo de un selector de hora nativo con `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}

## Proyectos relacionados

Para que puedas sacar ventaja de ellos en casos de uso más avanzados.

### @material-ui/pickers

![estrellas](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![descargas npm](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@material-ui/pickers](https://material-ui-pickers.dev/) provides date and time controls that follow the Material Design spec.

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}