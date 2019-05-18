---
title: Date Picker, Time Picker React components
components: TextField
---

# Pickers

<p class="description">Seletores fornecem uma maneira simples de selecionar um único valor de um conjunto pré-determinado.</p>

- Em dispositivos móveis, seletores são melhores aplicados quando mostrados em diálogos de confirmação.
- For inline display, such as on a form, consider using compact controls such as segmented dropdown buttons.

## Native pickers

⚠️ Native input controls support by browsers [isn't perfect](https://caniuse.com/#feat=input-datetime). Have a look at the [complementary projects](#complementary-projects) for a richer solution.

### Date pickers

A native date picker example with `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Date & Time pickers

A native date & time picker example with `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Time pickers

A native time picker example with `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}

## Projetos Complementares

Para caso de usos mais avançados, você é capaz de aproveitar de.

### @material-ui/pickers

![estrelas](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@material-ui/pickers](https://material-ui-pickers.dev/) provides date and time controls that follow the Material Design spec.

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}