---
title: Componente React Seletor intervalo de data
components: DateRangePicker
githubLabel: 'component: DateRangePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Seletor de intervalo de data [<span role="img" title="Enterprise">⚡️</span>](https://material-ui.com/store/items/material-ui-x/)

<p class="description">Seletores de data permitem ao usuário selecionar um intervalo de datas.</p>

> ⚠️ Componente Premium <br /><br /> O seletor de intervalo de data é destinado ao Material-UI X, um conjunto comercial de componentes avançados construídos pela comunidade principal (MIT license) do Material-UI. <br /><br /> Esta extensão paga incluirá mais componentes avançados (um data grid rico, seletor de intervalo de data, arrastar  & soltar na visualização em árvore, etc.). [Acesso antecipado](https://material-ui.com/store/items/material-ui-x/) começa com um preço acessível.

Os seletores de intervalo de datas permitem que o usuário selecione um intervalo de datas.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requisitos

Este componente depende da biblioteca de gerenciamento de datas da sua escolha. Ele suporta [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) e qualquer outra biblioteca através da interface publica `dateAdapter`.

Por favor, instale qualquer uma destas bibliotecas e configure corretamente o mecanismo de data encapsulando na raiz dos componentes (ou o nível mais alto que você deseja que os seletores estejam disponíveis) com `LocalizationProvider`:

```jsx
// ou @material-ui/lab/dateAdapter/{dayjs,luxon,moment} ou qualquer adaptador válido de date-io
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>...</LocalizationProvider>
  );
}
```

## Utilização Básica

Note que você pode passar quase qualquer propriedade de [DatePicker]('/api/date-picker/').

{{"demo": "pages/components/date-range-picker/BasicDateRangePicker.js"}}

## Responsividade

O componente de seletor de intervalo de data é projetado e otimizado para o dispositivo em que ele é executado.

- A versão "móvel" funciona melhor para dispositivos de toque e telas pequenas.
- A versão "desktop" funciona melhor para dispositivos com mouse e telas grandes.

Por padrão, o componente `DateRangePicker` usa uma consulta de mídia `@media (pointer: fine)` para determinar qual versão usar. Isto pode ser customizado com a propriedade `desktopModeMediaQuery`.

{{"demo": "pages/components/date-range-picker/ResponsiveDateRangePicker.js"}}

## Número diferente de meses

Observe que a propriedade `calendars` só funciona no modo desktop.

{{"demo": "pages/components/date-range-picker/CalendarsDateRangePicker.js"}}

## Desabilitando datas

Desabilitar datas se comporta da mesma forma que `DatePicker`.

{{"demo": "pages/components/date-range-picker/MinMaxDateRangePicker.js"}}

## Componente de entrada customizado

É possível customizar o componente de entrada renderizado com a propriedade `renderInput`. Para o `DateRangePicker` ele recebe **2** parâmetros– para o campo inicial e final, respectivamente. Se você precisar renderizar campos de entrada customizados, certifique-se de encaminhar `ref` e `inputProps` corretamente para os componentes de entrada.

{{"demo": "pages/components/date-range-picker/CustomDateRangeInputs.js"}}

## Modo estático

É possível renderizar qualquer seletor sem usar um modal ou popover. Nesse caso use `StaticDateRangePicker`.

{{"demo": "pages/components/date-range-picker/StaticDateRangePicker.js"}}
