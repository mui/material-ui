---
title: Componente React Seletor de hora
components: TimePicker
githubLabel: 'component: TimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/time-pickers
---

# Seletor de hora

<p class="description">Seletores de horário permitem que o usuário selecione um horário.</p>

Seletores de hora permitem que o usuário selecione um horário simples (no formato de horas:minutos). O horário selecionado é indicado pelo círculo preenchido no final do ponteiro do relógio.

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

The time picker will automatically adjust to the locale's time setting, i.e. the 12-hour or 24-hour format. This can be controlled with `ampm` prop.

{{"demo": "pages/components/time-picker/BasicTimePicker.js"}}

## Localização

Use `LocalizationProvider` to change the date-engine locale that is used to render the time picker. Note that `am/pm` setting is switched automatically:

{{"demo": "pages/components/time-picker/LocalizedTimePicker.js"}}

## Responsividade

The time picker component is designed and optimized for the device it runs on.

- A versão "móvel" funciona melhor para dispositivos de toque e telas pequenas.
- A versão "desktop" funciona melhor para dispositivos com mouse e telas grandes.

By default, the `TimePicker` component uses a `@media (pointer: fine)` media query to determine which version to use. Isto pode ser customizado com a propriedade `desktopModeMediaQuery`.

{{"demo": "pages/components/time-picker/ResponsiveTimePickers.js"}}

## Time validation

{{"demo": "pages/components/time-picker/TimeValidationTimePicker.js"}}

## Modo estático

It's possible to render any picker inline. This will enable building custom popover/modal containers.

{{"demo": "pages/components/time-picker/StaticTimePickerDemo.js", "bg": true}}

## Landscape

{{"demo": "pages/components/time-picker/StaticTimePickerLandscape.js", "bg": true}}

## Seconds

The seconds input can be used for selection of a precise time point.

{{"demo": "pages/components/time-picker/SecondsTimePicker.js"}}
