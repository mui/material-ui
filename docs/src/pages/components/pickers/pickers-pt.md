---
title: Date picker, Time picker React components
components: TextField
---

# Date/Time pickers

<p class="description">Date pickers and Time pickers provide a simple way to select a single value from a pre-determined set.</p>

- Em dispositivos móveis, seletores são melhores aplicados quando mostrados em diálogos de confirmação.
- Para exibição em linha, como em um formulário, considere usar controles compactos, como botões suspensos segmentados.

## @material-ui/pickers

![estrelas](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@material-ui/pickers](https://material-ui-pickers.dev/) provides date picker and time picker controls.

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Seletores nativos

⚠️ O suporte dos navegadores aos controles de entrada nativos [não é perfeito](https://caniuse.com/#feat=input-datetime). Have a look at [@material-ui/pickers](#material-ui-pickers) for a richer solution.

### Datepickers

A native datepicker example with `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Seletores de Data & Hora

Um exemplo de seletor de data & hora nativo com `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Seletores de Hora

Um exemplo de seletor de hora nativo com `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}