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

Use `LocalizationProvider` para alterar a date-engine de localização que é usada para renderizar o seletor de data. Aqui esta um exemplo de alteração da localidade com o adaptador `date-fns`:

{{"demo": "pages/components/date-picker/LocalizedDatePicker.js"}}

## Exemplos de exibições

É possível combinar `year`, `month`, e `date` para seleção na exibição. As exibições aparecerão na ordem em que estão incluídas no array `views`.

{{"demo": "pages/components/date-picker/ViewsDatePicker.js"}}

## Modo estático

É possível renderizar qualquer seletor sem usar um modal/popover e campos de texto. Isso pode ser útil na construção de containers customizados de popover/modal.

{{"demo": "pages/components/date-picker/StaticDatePickerDemo.js", "bg": true}}

## Orientação paisagem

Para ter seu uso facilitado, o seletor de data irá automaticamente alterar o leiaute entre retrato e paisagem devido a subscrição de alterações com o evento `window.orientation`. Você pode forçar um leiaute específico usando a propriedade `orientation`.

{{"demo": "pages/components/date-picker/StaticDatePickerLandscape.js", "bg": true}}

## Subcomponentes

Alguns subcomponentes de nível mais baixo (`DayPicker`, `MonthPicker` e `YearPicker`) também são exportados. Estes são renderizados sem estar encapsulado ou  lógica exterior (campo com mascara, valores de data e validação, etc.).

{{"demo": "pages/components/date-picker/InternalPickers.js"}}

## Componente de entrada customizado

É possível customizar a renderização do campo de entrada com a propriedade  `renderInput`. Certifique-se de encaminhar `ref` e `inputProps` corretamente para o componente de entrada customizado.

{{"demo": "pages/components/date-picker/CustomInput.js"}}

## Renderização customizada do dia

Os dias exibidos são customizados com uma função na propriedade `renderDay`. Você pode tirar vantagem do componente interno [PickersDay](/api/pickers-day).

{{"demo": "pages/components/date-picker/CustomDay.js"}}

## Dados dinâmicos

Às vezes, pode ser necessário exibir informação adicional diretamente no calendário. Aqui está um exemplo de pré-busca e exibição de dados do servidor usando as propriedades `onMonthChange`, `loading`, e `renderDay`.

{{"demo": "pages/components/date-picker/ServerRequestDatePicker.js"}}
