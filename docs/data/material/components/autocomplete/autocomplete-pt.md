---
product: material
title: React Autocomplete component
components: TextField, Popper, Autocomplete
githubLabel: 'component: autocomplete'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#combobox'
---

# Autocompletar

<p class="description">O autocompletar é uma entrada de texto normal aprimorada por um painel de opções sugeridas.</p>

Essa ferramenta é útil para configurar os valores de um campo de texto quando em um dos dois cenários abaixo:

1. O valor para a caixa de texto deve ser escolhido a partir de um conjunto pré-definido de valores permitidos, por exemplo, um campo de localização deve conter um nome de localização válido: [caixa de combinação](#combo-box).
2. A caixa de texto pode conter qualquer valor arbitrário, mas é mais vantajosa, porque pode sugerir possíveis valores para o usuário, por exemplo, um campo de pesquisa que pode sugerir pesquisas anteriores ou semelhantes para economizar o tempo do usuário: [free solo](#free-solo).

A ideia dessa ferramenta é ser uma versão melhorada das bibliotecas "react-select" e "downshift".

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Caixa de combinação

O valor deve ser escolhido a partir de um conjunto predefinido de valores permitidos.

{{"demo": "ComboBox.js"}}

### Estrutura de opções

Por padrão, o componente aceita as seguintes estruturas de opções:

```ts
interface AutocompleteOption {
  label: string;
}
// ou
type AutocompleteOption = string;
```

por exemplo:

```js
const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];
// or
const options = ['The Godfather', 'Pulp Fiction'];
```

No entanto, você pode usar estruturas diferentes fornecendo a propriedade `getOptionLabel`.

### Área de exemplos

Cada um dos exemplos a seguir demonstra uma funcionalidade do componente Autocomplete.

{{"demo": "Playground.js"}}

### Seleção de países

Escolha um dos 248 países.

{{"demo": "CountrySelect.js"}}

### Estados controlados

O componente tem dois estados que podem ser controlados:

1. o estado "value" com a combinação das propriedades `value`/`onChange`. Esse estado representa o valor selecionado pelo usuário, por exemplo, quando pressionando <kbd class="key">Enter</kbd>.
2. o estado "input value" com a combinação das propriedades `inputValue`/`onInputChange`. Esse estado representa o valor exibido na caixa de texto.

> ⚠️Esses dois estados são isolados e devem ser controlados de forma independente.

{{"demo": "ControllableStates.js"}}

## Free solo

Coloque `freeSolo` como true para que o campo de texto contenha qualquer valor aleatório.

### Campo search

A propriedade é projetada para cobrir o principal caso de uso de uma **caixa de pesquisa** com sugestões, por exemplo, pesquisa do Google ou react-autowhatever.

{{"demo": "FreeSolo.js"}}

### Creatable

Se você pretende usar este modo para uma [caixa de combinação](#combo-box), por experiência (uma versão aprimorada de um elemento select) recomendamos a configuração:

- `selectOnFocus` para ajudar o usuário a limpar o valor selecionado.
- `clearOnBlur` para ajudar o usuário a digitar um novo valor.
- `handleHomeEndKeys` para mover o foco dentro do popup com as teclas <kbd class="key">Home</kbd> e <kbd class="key">End</kbd>.
- A last option, for instance: `Add "YOUR SEARCH"`.

{{"demo": "FreeSoloCreateOption.js"}}

Você pode também exibir um diálogo quando o usuário quiser adicionar um novo valor.

{{"demo": "FreeSoloCreateOptionDialog.js"}}

## Agrupamento

Você pode agrupar as opções com a propriedade `groupBy`. If you do so, make sure that the options are also sorted with the same dimension that they are grouped by, otherwise, you will notice duplicate headers.

{{"demo": "Grouped.js"}}

## Opções desabilitadas

{{"demo": "DisabledOptions.js"}}

## `useAutocomplete`

Ele aceita quase as mesmas opções do componente autocompletar exceto todas as propriedades relacionadas a renderização do JSX. Ele aceita quase as mesmas opções do componente autocompletar exceto todas as propriedades relacionadas a renderização do JSX. O componente de auto completar é baseado neste hook.

```tsx
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
```

O hook `useAutocomplete` também é reexportado de @mui/material por conveniência e compatibilidade com versões anteriores.

```tsx
import { createFilterOptions } from '@material-ui/core/Autocomplete';
```

- 📦 [4.5 kB gzipado](/size-snapshot).

{{"demo": "UseAutocomplete.js", "defaultCodeOpen": false}}

### Hook customizado

{{"demo": "CustomizedHook.js"}}

Vá para a seção [customização](#customization) para um exemplo com o componente `Autocomplete` em vez do hook.

## Requisições assíncronas

O componente suporta dois cenários de uso assíncrono diferentes:

- [Carregar ao abrir](#load-on-open): espera uma interação com o componente para carregar as opções.
- [Pesquisar enquanto digita](#search-as-you-type): um novo pedido é feito para cada tecla pressionada.

### Carregar ao abrir

Exibe um estado de progresso enquanto a requisição de rede estiver pendente.

{{"demo": "Asynchronous.js"}}

### Pesquisar enquanto digita

Se sua lógica está buscando novas opções em cada tecla pressionada e usando o valor atual da caixa de texto para filtrar no servidor, você pode querer considerar um limite nas requisições.

Uma customização de UI para o autocompletar de lugares do Google Maps.

```jsx
<Autocomplete filterOptions={(x) => x} />
```

### Lugares com a API do Google Maps

A customized UI for Google Maps Places Autocomplete. For this demo, we need to load the [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/overview) and [Google Places](https://developers.google.com/maps/documentation/places/web-service/overview) API.

{{"demo": "GoogleMaps.js"}}

> ⚠️ Before you can start using the Google Maps JavaScript API and Places API, you must sign up and create a billing account.

## Múltiplos valores

Also known as tags, the user is allowed to enter more than one value.

{{"demo": "Tags.js"}}

### Opções fixas

In the event that you need to lock certain tags so that they can't be removed, you can set the chips disabled.

{{"demo": "FixedTags.js"}}

### Caixas de seleção

{{"demo": "CheckboxesTags.js"}}

### Limitar tags

You can use the `limitTags` prop to limit the number of displayed options when not focused.

{{"demo": "LimitTags.js"}}

## Tamanhos

Fancy smaller inputs? Use the `size` prop.

{{"demo": "Sizes.js"}}

## Customização

### Input customizado

The `renderInput` prop allows you to customize the rendered input. The first argument of this render prop contains props that you need to forward. Pay specific attention to the `ref` and `inputProps` keys.

{{"demo": "CustomInputAutocomplete.js"}}

### Seletor do GitHub

This demo reproduces GitHub's label picker:

{{"demo": "GitHubLabel.js"}}

Head to the [Customized hook](#customized-hook) section for a customization example with the `useAutocomplete` hook instead of the component.

## Realce

The following demo relies on [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), a small (1 kB) utility for highlighting text in autosuggest and autocomplete components.

{{"demo": "Highlights.js"}}

## Filtro customizado

The component exposes a factory to create a filter method that can be provided to the `filterOptions` prop. You can use it to change the default option filter behavior.

```js
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />;
```

### `createFilterOptions(config) => filterOptions`

#### Argumentos

1. `config` (_object_ [opcional]):

- `config.ignoreAccents` (_bool_ [optional]): Padrão como `verdadeiro`. Remover sinais diacríticos.
- `config.ignoreCase` (*boolean* [optional]): Padrão como `verdadeiro`. Minúsculas em tudo.
- `config.limit` (*number* [opcional]): Padrão null. Limitar o número de opções sugeridas a serem exibidas. Por exemplo, se `config.limit` é `100`, somente as primeiras `100` opções correspondentes são exibidas. Isto pode ser útil se um monte corresponderem e a virtualização não estiver configurada.
- `config.matchFrom` (_'any' | 'start'_ [opcional]): Padrão `'any'`.
- `config.stringify` (*func* [opcional]): Controla a forma como a opção é convertida em texto, dessa forma pode ser comparada com qualquer fragmento de texto.
- `config.trim` (_bool_ [opcional]): Padrão `false`. Remover espaços ao fim.

#### Retornos

`filterOptions`: the returned filter method can be provided directly to the `filterOptions` prop of the `Autocomplete` component, or the parameter of the same name for the hook.

In the following demo, the options need to start with the query prefix:

```jsx
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

<Autocomplete filterOptions={filterOptions} />;
```

{{"demo": "Filter.js", "defaultCodeOpen": false}}

### Avançado

For richer filtering mechanisms, like fuzzy matching, it's recommended to look at [match-sorter](https://github.com/kentcdodds/match-sorter). For instance:

```jsx
import { matchSorter } from 'match-sorter';

const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />;
```

## Virtualização

Search within 10,000 randomly generated options. The list is virtualized thanks to [react-window](https://github.com/bvaughn/react-window).

{{"demo": "Virtualize.js"}}

## Eventos

If you would like to prevent the default key handler behavior, you can set the event's `defaultMuiPrevented` property to `true`:

```jsx
<Autocomplete
  onKeyDown={(event) => {
    if (event.key === 'Enter') {
      // Previne o comportamento padrão do 'Enter'.
      event.defaultMuiPrevented = true;
      // seu código manipulador
    }
  }}
/>
```

## Limitações

### autocomplete/autofill

Browsers have heuristics to help the user fill in form inputs. However, this can harm the UX of the component.

By default, the component disables the input **autocomplete** feature (remembering what the user has typed for a given field in a previous session) with the `autoComplete="off"` attribute. Google Chrome does not currently support this attribute setting ([Issue 587466](https://bugs.chromium.org/p/chromium/issues/detail?id=587466)). A possible workaround is to remove the `id` to have the component generate a random one.

In addition to remembering past entered values, the browser might also propose **autofill** suggestions (saved login, address, or payment details). In the event you want the avoid autofill, you can try the following:

- Nomeie o campo sem fornecer informações para o navegador do que ele representa. `id="field1"` ao invés de `id="country"`. Se você deixar o id do vazio, o componente utiliza um id aleatório.
- Defina `autoComplete="new-password"` (alguns navegadores irão sugerir uma senha forte para entradas com esta configuração de atributo):

  ```jsx
  <TextField
    {...params}
    inputProps={{
      ...params.inputProps,
      autoComplete: 'new-password',
    }}
  />
  ```

Read [the guide on MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion) for more details.

### iOS VoiceOver

VoiceOver on iOS Safari doesn't support the `aria-owns` attribute very well. You can work around the issue with the `disablePortal` prop.

### ListboxComponent

If you provide a custom `ListboxComponent` prop, you need to make sure that the intended scroll container has the `role` attribute set to `listbox`. This ensures the correct behavior of the scroll, for example when using the keyboard to navigate.

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

We encourage the usage of a label for the textbox. The component implements the WAI-ARIA authoring practices.
