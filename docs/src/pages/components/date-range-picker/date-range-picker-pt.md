---
title: React Date Range Picker component
components: DateRangePicker
githubLabel: 'component: DateRangePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Range Picker [<span role="img" title="Enterprise">⚡️</span>](https://material-ui.com/store/items/material-ui-x/)

<p class="description">Date pickers let the user select a range of dates.</p>

> ⚠️ Premium component <br /><br /> The date range picker is intended for Material-UI X, a commercial set of advanced components built on top of the community edition (MIT license) of Material-UI. <br /><br /> This paid extension will include more advanced components (rich data grid, date range picker, tree view drag & drop, etc.). [Early access](https://material-ui.com/store/items/material-ui-x/) starts at an affordable price.

The date range pickers let the user select a range of dates.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requisitos

Este componente depende da biblioteca de gerenciamento de datas da sua escolha. Ele suporta [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) e qualquer outra biblioteca através da interface publica `dateAdapter`.

Por favor, instale qualquer uma destas bibliotecas e configure corretamente o mecanismo de data encapsulando na raiz dos componentes (ou o nível mais alto que você deseja que os seletores estejam disponíveis) com `LocalizationProvider`:

```jsx
// or @material-ui/lab/dateAdapter/{dayjs,luxon,moment} or any valid date-io adapter
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>...</LocalizationProvider>
  );
}
```

## Utilização Básica

Note that you can pass almost any prop from [DatePicker]('/api/date-picker/').

{{"demo": "pages/components/date-range-picker/BasicDateRangePicker.js"}}

## Responsividade

The date range picker component is designed to be optimized for the device it runs on.

- A versão "móvel" funciona melhor para dispositivos de toque e telas pequenas.
- A versão "desktop" funciona melhor para dispositivos com mouse e telas grandes.

By default, the `DateRangePicker` component uses a `@media (pointer: fine)` media query to determine which version to use. Isto pode ser customizado com a propriedade `desktopModeMediaQuery`.

{{"demo": "pages/components/date-range-picker/ResponsiveDateRangePicker.js"}}

## Different number of months

Note that the `calendars` prop only works in desktop mode.

{{"demo": "pages/components/date-range-picker/CalendarsDateRangePicker.js"}}

## Disabling dates

Disabling dates behaves the same as the simple `DatePicker`.

{{"demo": "pages/components/date-range-picker/MinMaxDateRangePicker.js"}}

## Custom input component

You can customize the rendered input with the `renderInput` prop. For `DateRangePicker` it takes **2** parameters – for start and end input respectively. If you need to render custom inputs make sure to spread `ref` and `inputProps` correctly to the input components.

{{"demo": "pages/components/date-range-picker/CustomDateRangeInputs.js"}}

## Static mode

It is possible to render any picker without a modal or popper. For this use `StaticDateRangePicker`.

{{"demo": "pages/components/date-range-picker/StaticDateRangePicker.js"}}
