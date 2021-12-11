---
title: Componente React Seletor de hora
components: DesktopTimePicker, MobileTimePicker, StaticTimePicker, TimePicker, ClockPicker
githubLabel: 'component: TimePicker'
packageName: '@mui/lab'
materialDesign: https://material.io/components/time-pickers
---

# Seletor de hora

<p class="description">Seletores de horário permitem que o usuário selecione um horário.</p>

Seletores de hora permitem que o usuário selecione um horário simples (no formato de horas:minutos). O horário selecionado é indicado pelo círculo preenchido no final do ponteiro do relógio.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

This component relies on the date management library of your choice. It supports [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) and any other library via a public `dateAdapter` interface.

Please install any of these libraries and set up the right date engine by wrapping your root (or the highest level you wish the pickers to be available) with `LocalizationProvider`:

```jsx
// or @mui/lab/Adapter{DayJS,Luxon,Moment} or any valid date-io adapter
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## Basic usage

The date picker is rendered as a modal dialog on mobile, and a textbox with a popup on desktop.

{{"demo": "pages/components/time-picker/BasicTimePicker.js"}}

## Static mode

It's possible to render any time picker inline. This will enable building custom popover/modal containers.

{{"demo": "pages/components/time-picker/StaticTimePickerDemo.js", "bg": true}}

## Responsiveness

O componente seletor de hora é projetado e otimizado para o dispositivo em que ele é executado.

- The `MobileTimePicker` component works best for touch devices and small screens.
- The `DesktopTimePicker` component works best for mouse devices and large screens.

By default, the `TimePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. This can be customized with the `desktopModeMediaQuery` prop.

{{"demo": "pages/components/time-picker/ResponsiveTimePickers.js"}}

## Form props

The time picker component can be disabled or read-only.

{{"demo": "pages/components/time-picker/FormPropsTimePickers.js"}}

## Localization

Use `LocalizationProvider` para alterar a date-engine de localização que é usada para renderizar o seletor de hora. O seletor de hora ajustará automaticamente à configuração de horário da localidade, ou seja, ao formato 12 horas ou 24 horas. Isso pode ser controlado com a propriedade `ampm`.

{{"demo": "pages/components/time-picker/LocalizedTimePicker.js"}}

## Validação de hora

{{"demo": "pages/components/time-picker/TimeValidationTimePicker.js"}}

## Paisagem

{{"demo": "pages/components/time-picker/StaticTimePickerLandscape.js", "bg": true}}

## Sub-components

Some lower-level sub-components (`ClockPicker`) are also exported. These are rendered without a wrapper or outer logic (masked input, date values parsing and validation, etc.).

{{"demo": "pages/components/time-picker/SubComponentsTimePickers.js"}}

## Segundos

O campo de segundos pode ser usado para seleção de um ponto de tempo exato.

{{"demo": "pages/components/time-picker/SecondsTimePicker.js"}}
