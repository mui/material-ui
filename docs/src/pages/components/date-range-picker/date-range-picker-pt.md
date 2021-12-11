---
title: Componente React Seletor intervalo de data
components: DateRangePicker, DateRangePickerDay, DesktopDateRangePicker, MobileDateRangePicker, StaticDateRangePicker
githubLabel: 'component: DateRangePicker'
packageName: '@mui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Seletor de intervalo de data [<span role="img" title="Enterprise">⚡️</span>](https://material-ui.com/store/items/material-ui-pro/)

<p class="description">Seletores de data permitem ao usuário selecionar um intervalo de datas.</p>

> ⚠️ Pro component <br /><br /> The date range picker is intended for MUI X Pro, a commercial set of advanced components built on top of the community edition (MIT license). <br /><br /> Esta extensão paga incluirá mais componentes avançados (um data grid rico, seletor de intervalo de data, arrastar  & soltar na visualização em árvore, etc.). [Acesso antecipado](https://material-ui.com/store/items/material-ui-pro/) começa com um preço acessível.

Os seletores de intervalo de datas permitem que o usuário selecione um intervalo de datas.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

This component relies on the date management library of your choice. It supports [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) and any other library via a public `dateAdapter` interface.

Please install any of these libraries and set up the right date engine by wrapping your root (or the highest level you wish the pickers to be available) with `LocalizationProvider`:

```jsx
// or @mui/lab/dateAdapter/{dayjs,luxon,moment} or any valid date-io adapter
import DateFnsAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>...</LocalizationProvider>
  );
}
```

## Basic usage

Note que você pode passar quase qualquer propriedade de [DatePicker](/api/date-picker/).

{{"demo": "pages/components/date-range-picker/BasicDateRangePicker.js"}}

## Static mode

É possível renderizar qualquer seletor em linha. Isto permitirá construir contêineres customizados de popover/modal.

{{"demo": "pages/components/date-range-picker/StaticDateRangePickerDemo.js", "bg": true}}

## Responsiveness

O componente de seletor de intervalo de data é projetado e otimizado para o dispositivo em que ele é executado.

- The `MobileDateRangePicker` component works best for touch devices and small screens.
- The `DesktopDateRangePicker` component works best for mouse devices and large screens.

By default, the `DateRangePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. This can be customized with the `desktopModeMediaQuery` prop.

{{"demo": "pages/components/date-range-picker/ResponsiveDateRangePicker.js"}}

## Form props

The date range picker component can be disabled or read-only.

{{"demo": "pages/components/date-range-picker/FormPropsDateRangePickers.js"}}

## Número diferente de meses

Observe que a propriedade `calendars` só funciona no modo desktop.

{{"demo": "pages/components/date-range-picker/CalendarsDateRangePicker.js"}}

## Desabilitando datas

Desabilitar datas se comporta da mesma forma que `DatePicker`.

{{"demo": "pages/components/date-range-picker/MinMaxDateRangePicker.js"}}

## Custom input component

É possível customizar o componente de entrada renderizado com a propriedade `renderInput`. Para o `DateRangePicker` ele recebe **2** parâmetros– para o campo inicial e final, respectivamente. Se você precisar renderizar campos de entrada customizados, certifique-se de encaminhar `ref` e `inputProps` corretamente para os componentes de entrada.

{{"demo": "pages/components/date-range-picker/CustomDateRangeInputs.js"}}

## Customized day rendering

The displayed days are customizable with the `renderDay` function prop. You can take advantage of the internal [DateRangePickerDay](/api/date-range-picker-day/) component.

{{"demo": "pages/components/date-range-picker/CustomDateRangePickerDay.js"}}
