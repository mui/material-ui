---
title: Componente React para Autocompletar
components: TextField, Popper, Autocomplete
---

# Autocompletar

<p class="description">O autocompletar é uma entrada de texto normal aprimorada por um painel de opções sugeridas.</p>

Essa ferramenta é útil para configurar os valores de um campo de texto quando em um dos dois cenários abaixo:

1. O valor para a caixa de texto deve ser escolhido a partir de um conjunto pré-definido de valores permitidos, por exemplo, um campo de localização deve conter um nome de localização válido: [combo box](#combo-box).
2. A caixa de texto pode conter qualquer valor arbitrário, mas é vantajoso porque pode sugerir possíveis valores para o usuário, por exemplo, um campo de pesquisa que pode sugerir pesquisas anteriores ou semelhantes para economizar o tempo do usuário: [solo livre](#free-solo).

A ideia dessa ferramenta era para ser uma versão melhorada das bibliotecas "react-select" e "downshift".

## Combo box

O valor deve ser escolhido a partir de um conjunto predefinido de valores permitidos.

{{"demo": "pages/components/autocomplete/ComboBox.js"}}

### Playground

Cada um dos exemplos a seguir demonstra uma funcionalidade do componente Autocomplet.

{{"demo": "pages/components/autocomplete/Playground.js"}}

### Country select

Escolha um dos 248 países.

{{"demo": "pages/components/autocomplete/CountrySelect.js"}}

## Free solo

Coloque `freeSolo` como true para que o textbox contenha qualquer valor aleatório. Essa prop é focada em cobrir o principal caso de uso que é seria uma caixa de pesquisas com sugestões, e.g. Google search.

Entretanto, se você gostaria de usá-lo para trazer ao usuário a experiência de um [combo box](#combo-box) (equivalente a um select aprimorado) nós recomendamos passar `selectOnFocus` (isso ajuda o usuário limpando o valor selecionado).

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

### Mensagem de ajuda

Às vezes você quer tornar explícito ao usuário que ele pode adicionar qualquer valor que ele/ela quiser. O exemplo a seguir adiciona a última opção: `Adicionar "SUA PESQUISA"`.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOption.js"}}

Você pode também exibir um diálogo quando o usuário quiser adicionar um novo valor.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOptionDialog.js"}}

## Agrupamento

{{"demo": "pages/components/autocomplete/Grouped.js"}}

## Opções desabilitadas

{{"demo": "pages/components/autocomplete/DisabledOptions.js"}}

## `useAutocomplete`

Para casos de customização avançada nós expomos o `useAutocomplete()` hook. Ele aceita quase as mesmas opções do componente Autocompletar exceto todas as props relacionadas a renderização do JSX. O componente Autocompletar usa esse hook internamente.

```jsx
import useAutocomplete from '@material-ui/lab/useAutocomplete';
```

- 📦 [4.5 kB gzipped](/size-snapshot).

{{"demo": "pages/components/autocomplete/UseAutocomplete.js", "defaultCodeOpen": false}}

### Hook customizado

{{"demo": "pages/components/autocomplete/CustomizedHook.js"}}

Indo para a seção de [Autocompletar customizado](#customized-autocomplete) vemos um exemplo de customização com o componente `Autocompletar` ao invés do hook.

## Requisições assíncronas

{{"demo": "pages/components/autocomplete/Asynchronous.js"}}

### Lugares com a API do Google Maps

Uma customização de UI para o autocompletar de lugares do Google Maps.

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

Para esse exemplo, nós precisamos carregar a API de Javascript do [Google Maps](https://developers.google.com/maps/documentation/javascript/tutorial).

> ⚠️ Antes de você começar a usar a API Javascript do Google Maps você precisará estar cadastrado e ter uma conta.

## Múltiplos valores

Também conhecidos como tags, o usuário pode inserir mais de um valor.

{{"demo": "pages/components/autocomplete/Tags.js"}}

### Opções fixas

In the event that you need to lock certain tag so that they can't be removed in the interface, you can set the chips disabled.

{{"demo": "pages/components/autocomplete/FixedTags.js"}}

### Caixas de Seleção

{{"demo": "pages/components/autocomplete/CheckboxesTags.js"}}

### Limit tags

You can use the `limitTags` prop to limit the number of displayed options when not focused.

{{"demo": "pages/components/autocomplete/LimitTags.js"}}

## Tamanhos

Gosta mais de campos de texto menores? Use a propriedade `size`.

{{"demo": "pages/components/autocomplete/Sizes.js"}}

## Customized Autocomplete

This demo reproduces the GitHub's label picker:

{{"demo": "pages/components/autocomplete/GitHubLabel.js"}}

Head to the [Customized hook](#customized-hook) section for a customization example with the `useAutocomplete` hook instead of the component.

## Highlights

The following demo relies on [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), a small (1 kB) utility for highlighting text in autosuggest and autocomplete components.

{{"demo": "pages/components/autocomplete/Highlights.js"}}

## Custom filter

The component exposes a factory to create a filter method that can provided to the `filerOption` prop. You can use it to change the default option filter behavior.

```js
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
```

### `createFilterOptions(config) => filterOptions`

#### Argumentos

1. `config` (*Object* [optional]): 
  - `config.ignoreAccents` (*Boolean* [optional]): Defaults to `true`. Remove diacritics.
  - `config.ignoreCase` (*Boolean* [optional]): Defaults to `true`. Lowercase everything.
  - `config.limit` (*Number* [optional]): Default to null. Limit the number of suggested options to be shown. For example, if `config.limit` is `100`, only the first `100` matching options are shown. It can be useful if a lot of options match and virtualization wasn't set up.
  - `config.matchFrom` (*'any' | 'start'* [optional]): Defaults to `'any'`.
  - `config.startAfter`(*Number* [optional]): Default to `0`. Show the suggested options only after a certain number of letters
  - `config.stringify` (*Func* [optional]): Controls how an option is converted into a string so that it can be matched against the input text fragment.
  - `config.trim` (*Boolean* [opcional]): Padrão `false`. Remove trailing spaces.

#### Retornos

`filterOptions`: the returned filter method can be provided directly to the `filterOptions` prop of the `Autocomplete` component, or the parameter of the same name for the hook.

In the following demo, the options need to start with the query prefix:

```js
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.title,
});

<Autocomplete filterOptions={filterOptions} />
```

{{"demo": "pages/components/autocomplete/Filter.js", "defaultCodeOpen": false}}

### Avançado

For richer filtering mechanisms, like fuzzy matching, it's recommended to look at [match-sorter](https://github.com/kentcdodds/match-sorter). Por exemplo:

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />
```

## Virtualization

Search within 10,000 randomly generated options. The list is virtualized thanks to [react-window](https://github.com/bvaughn/react-window).

{{"demo": "pages/components/autocomplete/Virtualize.js"}}

## Limitações

### autocomplete/autofill

The browsers have heuristics to help the users fill the form inputs. However, it can harm the UX of the component.

By default, the component disable the **autocomplete** feature (remembering what the user has typed for a given field in a previous session) with the `autoComplete="off"` attribute.

However, in addition to remembering past entered values, the browser might also propose **autofill** suggestions (saved login, address, or payment details). In the event you want the avoid autofill, you can try the following:

- Name the input without leaking any information the browser can use. e.g. `id="field1"` instead of `id="country"`. If you leave the id empty, the component uses a random id.
- Set `autoComplete="new-password"`: 
        jsx
        <TextField
        {...params}
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password',
        }}
        />

### iOS VoiceOver

VoiceOver on iOS Safari doesn't support the `aria-owns` attribute very well. You can work around the issue with the `disablePortal` prop.

### TypeScript

To fully take advantage of type inference, you need to set the `multiple` prop to `undefined`, `false` or `true`. See [this discussion](https://github.com/mui-org/material-ui/pull/18854#discussion_r364215153) for more details. TypeScript might solve this bug in the future.

### ListboxComponent

If you provide a custom `ListboxComponent` prop, you need to make sure that the intended scroll container has the `role` attribute set to `listbox`. This ensures the correct behavior of the scroll, for example when using the keyboard to navigate.

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

We encourage the usage of a label for the textbox. The component implements the WAI-ARIA authoring practices.