---
title: Componente React para Autocompletar
components: TextField, Popper, Autocomplete
---

# Autocompletar

<p class="description">O autocompletar é uma entrada de texto normal aprimorada por um painel de opções sugeridas.</p>

Essa ferramenta é útil para configurar os valores de um campo de texto quando em um dos dois cenários abaixo:

1. O valor para a caixa de texto deve ser escolhido a partir de um conjunto pré-definido de valores permitidos, por exemplo, um campo de localização deve conter um nome de localização válido: [caixa de combinação](#combo-box).
2. A caixa de texto pode conter qualquer valor arbitrário, mas é mais vantajosa, porque pode sugerir possíveis valores para o usuário, por exemplo, um campo de pesquisa que pode sugerir pesquisas anteriores ou semelhantes para economizar o tempo do usuário: [free solo](#free-solo).

A ideia dessa ferramenta é ser uma versão melhorada das bibliotecas "react-select" e "downshift".

## Caixa de combinação

O valor deve ser escolhido a partir de um conjunto predefinido de valores permitidos.

{{"demo": "pages/components/autocomplete/ComboBox.js"}}

### Área de exemplos

Cada um dos exemplos a seguir demonstra uma funcionalidade do componente Autocomplete.

{{"demo": "pages/components/autocomplete/Playground.js"}}

### Seleção de países

Escolha um dos 248 países.

{{"demo": "pages/components/autocomplete/CountrySelect.js"}}

### Estados controláveis

O componente tem dois estados que podem ser controlados:

1. o estado "value" com a combinação das propriedades `value`/`onChange`. Esse estado representa o valor selecionado pelo usuário, por exemplo, quando é pressionado a tecla <kbd>Enter</kbd>.
2. o estado "input value" com a combinação das propriedades `inputValue`/`onInputChange`. Esse estado representa o valor exibido na caixa de texto.

> ⚠️ Esses dois estados estão isolados, eles podem ser controlados de forma independente.

{{"demo": "pages/components/autocomplete/ControllableStates.js"}}

## Free solo

Coloque `freeSolo` como true para que o campo de texto contenha qualquer valor aleatório.

### Campo search

A propriedade foi desenvolvida para suprir a situação de uso mais comum de um **campo do tipo search** com sugestões, por exemplo, pesquisa do Google ou react-autowhatever.

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

### Creatable

Se você pretende usar este modo para uma [caixa de combinação](#combo-box), por experiência (uma versão aprimorada de um elemento select) recomendamos a configuração:

- `selectOnFocus` para ajudar o usuário a limpar o valor selecionado.
- `clearOnBlur` para ajudar o usuário a digitar um novo valor.
- `handleHomeEndKeys` para mover o foco dentro do popup com as teclas <kbd>Home</kbd> e <kbd>End</kbd>.
- Adicione uma última opção para indicar a possibilidade de adição, por exemplo `Adicionar "SUA PESQUISA"`.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOption.js"}}

Você pode também exibir um diálogo quando o usuário quiser adicionar um novo valor.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOptionDialog.js"}}

## Agrupamento

{{"demo": "pages/components/autocomplete/Grouped.js"}}

## Opções desabilitadas

{{"demo": "pages/components/autocomplete/DisabledOptions.js"}}

## `useAutocomplete`

Para casos de customização avançada nós expomos o hook `useAutocomplete()`. Ele aceita quase as mesmas opções do componente autocompletar exceto todas as propriedades relacionadas a renderização do JSX. O componente autocompletar usa esse hook internamente.

```jsx
import useAutocomplete from '@material-ui/lab/useAutocomplete';
```

- 📦 [4.5 kB gzipado](/size-snapshot).

{{"demo": "pages/components/autocomplete/UseAutocomplete.js", "defaultCodeOpen": false}}

### Hook customizado

{{"demo": "pages/components/autocomplete/CustomizedHook.js"}}

Indo para a seção de [Autocompletar customizado](#customized-autocomplete) vemos um exemplo de customização com o componente `Autocomplete` ao invés do hook.

## Requisições assíncronas

{{"demo": "pages/components/autocomplete/Asynchronous.js"}}

### Lugares com a API do Google Maps

Uma customização de UI para o autocompletar de lugares do Google Maps.

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

Para esse exemplo, nós precisamos carregar a API de Javascript do [Google Maps](https://developers.google.com/maps/documentation/javascript/tutorial).

> ⚠️ Antes de você começar a usar a API JavaScript do Google Maps você precisará estar cadastrado e ter uma conta.

## Múltiplos valores

Também conhecidos como tags, o usuário pode inserir mais de um valor.

{{"demo": "pages/components/autocomplete/Tags.js"}}

### Opções fixas

Em ocasiões que você necessite travar certa tag para que não possa ser removida da interface, você pode defini-la como desabilitada.

{{"demo": "pages/components/autocomplete/FixedTags.js"}}

### Caixas de seleção

{{"demo": "pages/components/autocomplete/CheckboxesTags.js"}}

### Limitar tags

Você pode usar a propriedade `limitTags` para limitrar o número de opções exibidas quando o componente não estiver com o foco.

{{"demo": "pages/components/autocomplete/LimitTags.js"}}

## Tamanhos

Gosta mais de campos de texto menores? Use a propriedade `size`.

{{"demo": "pages/components/autocomplete/Sizes.js"}}

## Customizações

### Input customizado

A propriedade `renderInput` permite que você customize o input renderizado. O primeiro argumento desta propriedade de render, contém propriedades que você precisa encaminhar. Preste atenção específicamente nas chaves `ref` e `inputProps`.

{{"demo": "pages/components/autocomplete/CustomInputAutocomplete.js"}}

### Seletor do GitHub

Esta demonstração reproduz o rótulo de seleção do GitHub's:

{{"demo": "pages/components/autocomplete/GitHubLabel.js"}}

Va para a seção [Hook customizado](#customized-hook) para um exemplo com o uso do hook customizado `useAutocomplete` ao invés do componente.

## Realce

A demonstração a seguir dependem do [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), um utilitário pequeno (1 kB) para realçar textos nos componentes autosuggest e autocomplete.

{{"demo": "pages/components/autocomplete/Highlights.js"}}

## Filtro customizado

O componente expõe uma fábrica para criar um método de filtro que pode ser fornecido para a propriedade `filterOptions`. Você pode usar ela para modificar o comportamento padrão do filtro.

```js
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
```

### `createFilterOptions(config) => filterOptions`

#### Argumentos

1. `config` (*Object* [opcional]): 
  - `config.ignoreAccents` (*Boolean* [opcional]): Padrão `true`. Remover sinais diacríticos.
  - `config.ignoreCase` (*Boolean* [opcional]): Padrão `true`. Minúsculas em tudo.
  - `config.limit` (*Number* [opcional]): Padrão null. Limitar o número de opções sugeridas a serem exibidas. Por exemplo, se `config.limit` é `100`, somente as primeiras `100` opções correspondentes são exibidas. Isto pode ser útil se um monte corresponderem e a virtualização não estiver configurada.
  - `config.matchFrom` (*'any' | 'start'* [opcional]): Padrão `'any'`.
  - `config.stringify` (*Func* [opcional]): Controla a forma como a opção é convertida em texto, dessa forma pode ser comparada com qualquer fragmento de texto.
  - `config.trim` (*Boolean* [opcional]): Padrão `false`. Remover espaços ao fim.

#### Retornos

`filterOptions`: o método de filtro retornado pode ser fornecido diretamente para a propriedade `filterOptions` do componente `Autocomplete` ou para o parâmetro de mesmo nome no hook.

Na demonstração a seguir, as opções necessárias para o filtro ser aplicado no inicio das opções:

```js
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.title,
});

<Autocomplete filterOptions={filterOptions} />
```

{{"demo": "pages/components/autocomplete/Filter.js", "defaultCodeOpen": false}}

### Avançado

Para mecanismos de filtragem mais ricos, como correspondência difusa, recomenda-se explorar o [match-sorter](https://github.com/kentcdodds/match-sorter). Por exemplo:

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />
```

## Virtualização

Pesquise dentro de 10.000 opções geradas aleatoriamente. A lista é virtualizada graças a [react-window](https://github.com/bvaughn/react-window).

{{"demo": "pages/components/autocomplete/Virtualize.js"}}

## Limitações

### autocomplete/autofill

Os navegadores têm heurística para ajudar os usuários a preencherem os campos do formulário. No entanto, isso pode prejudicar a experiência do usuário com o componente.

Por padrão, o componente desabilita o recurso de **autocomplete** (recurso que memoriza informações que o usuário forneceu em sessões anteriores) com o atributo `autoComplete="off"`.

No entanto, além de relembrar valores fornecidos anteriormente, o navegador também pode propor sugestões de **autofill** (preenchimento automático para informações de login, endereço ou detalhes de pagamento). No caso de você querer evitar o recurso de preenchimento automático, tente o seguinte:

- Nomeie o campo sem fornecer informações para o navegador do que ele representa. `id="field1"` ao invés de `id="country"`. Se você deixar o id do vazio, o componente utiliza um id aleatório.
- Defina `autoComplete="new-password"`: 
        jsx
        <TextField
        {...params}
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password',
        }}
        />

### iOS VoiceOver

VoiceOver no Safari do iOS não suporta o atributo `aria-owns` muito bem. Você pode contornar o problema com a propriedade `disablePortal`.

### ListboxComponent

Se você fornecer um componente customizado na propriedade `ListboxComponent`, você precisará certificar-se de que o contêiner de scroll esteja com o atributo `role` definido como `listbox`. Isto garante o comportamento correto do scroll, por exemplo, quando utilizar o teclado para navegar.

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

Incentivamos a utilização de um rótulo para a caixa de texto. O componente implementa as práticas de autoria da WAI-ARIA.