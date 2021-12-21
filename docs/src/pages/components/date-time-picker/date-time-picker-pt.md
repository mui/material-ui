---
title: Componente React Seletor de data e hora
components: DateTimePicker,DesktopDateTimePicker,MobileDateTimePicker,StaticDateTimePicker
githubLabel: 'component: DateTimePicker'
packageName: '@mui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Seletor de data e hora

<p class="description">Seletor de data & hora combinados.</p>

Este componente combina os seletores de data & hora. Ele permite que o usuário selecione data e hora com o mesmo controle.

Note que este componente é cobinação dos componentes [DatePicker](/components/date-picker/) e[TimePicker](/components/time-picker/), então qualquer uma das propriedades desses componentes pode ser passada para o DateTimePicker.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

This component relies on the date management library of your choice. It supports [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) and any other library via a public `dateAdapter` interface.

Please install any of these libraries and set up the right date engine by wrapping your root (or the highest level you wish the pickers to be available) with `LocalizationProvider`:

```jsx
// or @mui/lab/Adapter{Dayjs,Luxon,Moment} or any valid date-io adapter
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## Basic usage

Permite escolher a data e hora. Existem 4 etapas disponíveis (ano, data, hora e minuto), então as abas são necessárias para distinguir visualmente os passos de data/hora.

{{"demo": "pages/components/date-time-picker/BasicDateTimePicker.js"}}

## Responsividade

O componente `DateTimePicker` é projetado e otimizado para o dispositivo em que ele é executado.

- The `MobileDateTimePicker` component works best for touch devices and small screens.
- The `DesktopDateTimePicker` component works best for mouse devices and large screens.

By default, the `DateTimePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. Isto pode ser customizado com a propriedade `desktopModeMediaQuery`.

{{"demo": "pages/components/date-time-picker/ResponsiveDateTimePickers.js"}}

## Form props

The date time picker component can be disabled or read-only.

{{"demo": "pages/components/date-time-picker/FormPropsDateTimePickers.js"}}

## Validação de data e hora

É possível restringir a seleção de data e hora de duas maneiras:

- por meio de `minDateTime`/`maxDateTime` é possível restringir a seleção de tempo para antes ou após um determinado momento no tempo
- usando `minTime`/`maxTime`, você pode desabilitar selecionar horas antes ou depois de um certo tempo a cada dia, respectivamente

{{"demo": "pages/components/date-time-picker/DateTimeValidation.js"}}

## Static mode

It's possible to render any date & time picker inline. This will enable building custom popover/modal containers.

{{"demo": "pages/components/date-time-picker/StaticDateTimePickerDemo.js", "bg": true}}

## Customization

Aqui estão alguns exemplos de seletores de data & hora fortemente customizados:

{{"demo": "pages/components/date-time-picker/CustomDateTimePicker.js"}}
