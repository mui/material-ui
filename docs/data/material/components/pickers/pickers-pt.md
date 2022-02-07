---
product: material
title: Componente React para Data e Hora
components: DatePicker, DateTimePicker, TimePicker, TextField
githubLabel: 'component: date picker'
materialDesign: https://material.io/components/date-pickers
waiAria: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
---

# Seletores Data / Hora

<p class="description">Seletores de data e seletores de hora fornecem uma maneira simples de selecionar um único valor de um conjunto pré-determinado.</p>

- Em dispositivos móveis, seletores são melhores aplicados quando mostrados em diálogos de confirmação.
- Para exibição em linha, como em um formulário, considere usar controles compactos, como botões suspensos segmentados.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Componentes React

{{"demo": "MaterialUIPickers.js"}}

### Seletor de data

⚠️ O suporte dos navegadores aos controles de entrada nativos [não é perfeito](https://caniuse.com/#feat=input-datetime).

Um exemplo de seletor de data nativo com `type="date"`.

- [date-fns](https://date-fns.org/)
- [Day.js](https://day.js.org/)
- [Luxon](https://moment.github.io/luxon/#/)
- [Moment.js](https://momentjs.com/)

First you have to install the adapter package for the date-library you want to use:

```sh
// date-fns
npm install @date-io/date-fns
// or for Day.js
npm install -s @date-io/dayjs
// or for Luxon
npm install -s @date-io/luxon
// or for Moment.js
npm install @date-io/moment
```

Um exemplo de seletor de data & hora nativo com `type="datetime-local"`.

```js
// date-fns
import DateAdapter from '@mui/lab/AdapterDateFns';
// or for Day.js
import DateAdapter from '@mui/lab/AdapterDayjs';
// or for Luxon
import DateAdapter from '@mui/lab/AdapterLuxon';
// or for Moment.js
import DateAdapter from '@mui/lab/AdapterMoment';

function App({ children }) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>{children}</LocalizationProvider>
  );
}
```

## Seletores nativos

⚠️ O suporte dos navegadores aos controles de entrada nativos [não é perfeito](https://caniuse.com/#feat=input-datetime).

Um exemplo de seletor de hora nativo com `type="time"`.

{{"demo": "TimePickers.js"}}
