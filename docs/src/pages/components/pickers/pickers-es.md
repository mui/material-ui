---
title: Componentes de React de Selectores de Fecha y Selectores de Hora
components: TextField
---

# Selectores de Fecha / Hora

<p class="description">Los selectores de fecha y hora proporcionan una forma simple de seleccionar un solo valor de un conjunto predeterminado.</p>

- En móvil, los selectores son los más adecuados para despliegue en diálogos de confirmación.
- Para despliegue en línea, como en un formulario, considere usar controles compactos tales como los botones desplegables segmentados.

## @material-ui/pickers

![estrellas](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![descargas npm](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@material-ui/pickers](https://material-ui-pickers.dev/) proporcionan controles de selectores de fecha y hora.

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Selectores nativos

⚠️ Los controles de entrada nativos compatibles con los navegadores [no son perfectos](https://caniuse.com/#feat=input-datetime). Heche un vistazo a [@material-ui/pickers](https://material-ui-pickers.dev/) para una mejor solución.

### Selectores de fecha

Un ejemplo del selector de fecha nativo con `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Selectores de fecha y hora

Un ejemplo de selector de fecha y hora con `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Selectores de hora

Un ejemplo de un selector de hora nativo con `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}