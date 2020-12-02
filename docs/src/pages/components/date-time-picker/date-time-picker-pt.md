---
title: React Date Time Picker component
components: DateTimePicker
githubLabel: 'component: DateTimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Time Picker

<p class="description">Combined date & time picker.</p>

This component combines the date & time pickers. It allows the user to select both date and time with the same control.

Note that this component is the [DatePicker](/components/date-picker/) and [TimePicker](/components/time-picker/) component combined, so any of these components' props can be passed to the DateTimePicker.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requisitos

Este componente depende da biblioteca de gerenciamento de datas da sua escolha. Ele suporta [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) e qualquer outra biblioteca através da interface publica `dateAdapter`.

Por favor, instale qualquer uma destas bibliotecas e configure corretamente o mecanismo de data encapsulando na raiz dos componentes (ou o nível mais alto que você deseja que os seletores estejam disponíveis) com `LocalizationProvider`:

```jsx
// ou @material-ui/lab/Adapter{DayJS,Luxon,Moment} ou qualquer adaptador válido de date-io
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## Utilização Básica

Allows choosing date then time. There are 4 steps available (year, date, hour and minute), so tabs are required to visually distinguish date/time steps.

{{"demo": "pages/components/date-time-picker/BasicDateTimePicker.js"}}

## Responsividade

The `DateTimePicker` component is designed and optimized for the device it runs on.

- A versão "móvel" funciona melhor para dispositivos de toque e telas pequenas.
- A versão "desktop" funciona melhor para dispositivos com mouse e telas grandes.

By default, the `DateTimePicker` component uses a `@media (pointer: fine)` media query to determine which version to use. Isto pode ser customizado com a propriedade `desktopModeMediaQuery`.

{{"demo": "pages/components/date-time-picker/ResponsiveDateTimePickers.js"}}

## Date and time validation

It is possible to restrict date and time selection in two ways:

- by using `minDateTime`/`maxDateTime` its possible to restrict time selection to before or after a particular moment in time
- using `minTime`/`maxTime`, you can disable selecting times before or after a certain time each day respectively

{{"demo": "pages/components/date-time-picker/DateTimeValidation.js"}}

## Customização

Here are some examples of heavily customized date & time pickers:

{{"demo": "pages/components/date-time-picker/CustomDateTimePicker.js"}}
