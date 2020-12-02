---
title: Componente React Seletor de data
components: DatePicker, PickersDay
githubLabel: 'component: DatePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Seletor de data

<p class="description">Seletores de data permitem que o usuário selecione uma data.</p>

Seletores de data permitem que o usuário selecione uma data. Seletores de data são exibidos com:

- Diálogos em dispositivos móveis
- Menu suspenso com campo de texto em desktop

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

O seletor de data será renderizado como um diálogo modal no dispositivo móvel, e um campo de texto com um popover no desktop.

{{"demo": "pages/components/date-picker/BasicDatePicker.js"}}

## Responsividade

O componente seletor de data é projetado e otimizado para o dispositivo em que ele é executado.

- A versão "móvel" funciona melhor para dispositivos de toque e telas pequenas.
- A versão "desktop" funciona melhor para dispositivos com mouse e telas grandes.

Por padrão, o componente `DatePicker` usa uma consulta de mídia `@media (pointer: fine)` para determinar qual versão usar. Isto pode ser customizado com a propriedade `desktopModeMediaQuery`.

{{"demo": "pages/components/date-picker/ResponsiveDatePickers.js"}}

## Localização

Use `LocalizationProvider` to change the date-engine locale that is used to render the date picker. Here is an example of changing the locale for the `date-fns` adapter:

{{"demo": "pages/components/date-picker/LocalizedDatePicker.js"}}

## Views playground

It's possible to combine `year`, `month`, and `date` selection views. Views will appear in the order they're included in the `views` array.

{{"demo": "pages/components/date-picker/ViewsDatePicker.js"}}

## Static mode

It's possible to render any picker without the modal/popover and text field. This can be helpful when building custom popover/modal containers.

{{"demo": "pages/components/date-picker/StaticDatePickerDemo.js", "bg": true}}

## Landscape orientation

For ease of use the date picker will automatically change the layout between portrait and landscape by subscription to the `window.orientation` change. You can force a specific layout using the `orientation` prop.

{{"demo": "pages/components/date-picker/StaticDatePickerLandscape.js", "bg": true}}

## Sub-components

Some lower level sub-components (`DayPicker`, `MonthPicker` and `YearPicker`) are also exported. These are rendered without a wrapper or outer logic (masked input, date values parsing and validation, etc.).

{{"demo": "pages/components/date-picker/InternalPickers.js"}}

## Custom input component

You can customize rendering of the input with the `renderInput` prop. Make sure to spread `ref` and `inputProps` correctly to the custom input component.

{{"demo": "pages/components/date-picker/CustomInput.js"}}

## Customized day rendering

The displayed days are customizable with the `renderDay` function prop. You can take advantage of the internal [PickersDay](/api/pickers-day) component.

{{"demo": "pages/components/date-picker/CustomDay.js"}}

## Dynamic data

Sometimes it may be necessary to display additional info right in the calendar. Here's an example of prefetching and displaying server-side data using the `onMonthChange`, `loading`, and `renderDay` props.

{{"demo": "pages/components/date-picker/ServerRequestDatePicker.js"}}
