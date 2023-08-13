---
productId: material-ui
title: Componente React para Autocompletar
components: TextField, Popper, Autocomplete
githubLabel: 'component: autocomplete'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
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
// ou
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

:::warning
⚠️ Esses dois estados são isolados, e devem ser controlados independentemente.
:::

{{"demo": "ControllableStates.js"}}

## Free solo

Set `freeSolo` to true so the textbox can contain any arbitrary value.

### Campo search

Esta propriedade é projetada para cobrir o caso de uso primário de uma **entrada de pesquisa** com sugestões, por exemplo, pesquisa do Google ou react-autowhatever.

{{"demo": "FreeSolo.js"}}

:::warning
⚠️ Tome cuidado ao usar o modo free solo com opções não string, pois pode causar incompatibilidade de tipagem.

O valor criado ao digitar na caixa de texto é sempre uma string, independentemente do tipo das opções.
:::

### Creatable

Se você pretende usar esse modo para uma experiência de [caixa de combinação](#combo-box) (uma versão aprimorada de um elemento select) recomendamos definir:

- `selectOnFocus` para ajudar o usuário a limpar o valor selecionado.
- `clearOnBlur` para ajudar o usuário a digitar um novo valor.
- `handleHomeEndKeys` para mover o foco dentro do popup com as teclas <kbd class="key">Home</kbd> e <kbd class="key">End</kbd>.
- Adicione uma última opção para indicar a possibilidade de adição, por exemplo `Adicionar "SUA PESQUISA"`.

{{"demo": "FreeSoloCreateOption.js"}}

Você também pode exibir uma caixa de diálogo quando o usuário deseja adicionar um novo valor.

{{"demo": "FreeSoloCreateOptionDialog.js"}}

## Agrupamento

Você pode agrupar as opções com a propriedade `groupBy`. Se você fizer isso, certifique-se de que as opções também sejam classificadas com a mesma dimensão que elas são agrupadas, caso contrário, você notará cabeçalhos duplicados.

{{"demo": "Grouped.js"}}

## Opções desabilitadas

{{"demo": "DisabledOptions.js"}}

## `useAutocomplete`

Para casos de uso de personalização avançada, um hook `useAutocomplete()` sem cabeçalho é exposto. Ele aceita quase as mesmas opções que o componente Autocomplete, menos todas as props relacionadas à renderização de JSX. O componente Autocomplete é construído neste hook.

```tsx
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
```

O hook `useAutocomplete` também é reexportado de @mui/material para conveniência e compatibilidade com versões anteriores.

````tsx

```tsx
import { createFilterOptions } from '@material-ui/core/Autocomplete';
````

- 📦 [4.5 kB gzipped](/size-snapshot/).

{{"demo": "UseAutocomplete.js", "defaultCodeOpen": false}}

### Hook customizado

{{"demo": "CustomizedHook.js"}}

Vá para a seção de [personalização](#customization) para um exemplo com o componente `Autocomplete` em vez do hook.

## Requisições assíncronas

O componente suporta dois casos de uso assíncronos diferentes:

- [Carregar ao abrir](#load-on-open): espera uma interação com o componente para carregar as opções.
- [Pesquisar enquanto digita](#search-as-you-type): um novo pedido é feito para cada tecla pressionada.

### Carregar ao abrir

Exibe um estado de progresso enquanto a solicitação de rede estiver pendente.

{{"demo": "Asynchronous.js"}}

### Pesquisar enquanto digita

Se a sua lógica estiver buscando novas opções em cada tecla pressionada e usando o valor atual da caixa de texto para filtrar no servidor, você pode querer considerar a limitação de solicitações.

Adicionalmente, você precisará desabilitar a filtragem integrada do componente `Autocomplete` substituindo a propriedade `filterOptions`:

```jsx
<Autocomplete filterOptions={(x) => x} />
```

### Lugares com a API do Google Maps

Uma interface personalizada para o Google Maps Places Autocomplete. Para esta demonstração, precisamos carregar a [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/overview) e [Google Places](https://developers.google.com/maps/documentation/places/web-service/overview) API.

{{"demo": "GoogleMaps.js"}}

:::warning
⚠️ Antes de começar a usar a API do Google Maps JavaScript e a API do Places, você precisa obter sua própria [chave da API](https://developers.google.com/maps/documentation/javascript/get-api-key).
:::

## Múltiplos valores

Também conhecido como tags, o usuário pode inserir mais de um valor.

{{"demo": "Tags.js"}}

### Opções fixas

No caso de você precisar bloquear determinadas tags para que elas não possam ser removidas, você pode desabilitar os chips.

{{"demo": "FixedTags.js"}}

### Caixas de seleção

{{"demo": "CheckboxesTags.js"}}

### Limitar tags

Você pode usar a propriedade `limitTags` para limitar o número de opções exibidas quando não estiver focado.

{{"demo": "LimitTags.js"}}

## Tamanhos

Caixas de texto menores? Use a propriedade `size`.

{{"demo": "Sizes.js"}}

## Customização

### Input customizado

A propriedade `renderInput` permite que você personalize a entrada renderizada. O primeiro argumento desse render prop contém as props que você precisa encaminhar. Preste atenção específicamente às chaves `ref` e `inputProps`.

{{"demo": "CustomInputAutocomplete.js"}}

### Seletor do GitHub

Essa demonstração reproduz o seletor de etiquetas do GitHub:

{{"demo": "GitHubLabel.js"}}

Vá para a seção de [hook personalizado](#customized-hook) para um exemplo de personalização com o hook `useAutocomplete` em vez do componente.

## Realce

A demonstração a seguir depende do [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), um utilitário pequeno (1 kB) para destacar texto em componentes de sugestão automática e autocompletar.

{{"demo": "Highlights.js"}}

## Filtro customizado

Esse componente expõe uma fábrica para criar um método de filtro que pode ser fornecido à propriedade `filterOptions`. Você pode usá-lo para alterar o comportamento padrão de filtro de opções.

```js
import { createFilterOptions } from '@mui/material/Autocomplete';
```

### `createFilterOptions(config) => filterOptions`

#### Argumentos

1. `config` (_object_ [opcional]):

- `config.ignoreAccents` (_bool_ [optional]): Padrão como `verdadeiro`. Remover sinais diacríticos.
- `config.ignoreCase` (_boolean_ [optional]): Padrão como `verdadeiro`. Minúsculas em tudo.
- `config.limit` (_number_ [opcional]): Padrão null. Limitar o número de opções sugeridas a serem exibidas. Por exemplo, se `config.limit` é `100`, somente as primeiras `100` opções correspondentes são exibidas. Isto pode ser útil se um monte corresponderem e a virtualização não estiver configurada.
- `config.matchFrom` (_'any' | 'start'_ [opcional]): Padrão `'any'`.
- `config.stringify` (_func_ [opcional]): Controla a forma como a opção é convertida em texto, dessa forma pode ser comparada com qualquer fragmento de texto.
- `config.trim` (_bool_ [opcional]): Padrão `false`. Remover espaços ao fim.

#### Retornos

`filterOptions`: o método de filtro retornado pode ser fornecido diretamente à propriedade `filterOptions` do componente `Autocomplete`, ou o parâmetro de mesmo nome para o hook.

Na demonstração a seguir, as opções precisam começar com o prefixo da consulta:

```jsx
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

<Autocomplete filterOptions={filterOptions} />;
```

{{"demo": "Filter.js", "defaultCodeOpen": false}}

### Avançado

Para mecanismos de filtragem mais ricos, como correspondência difusa, é recomendável olhar para [match-sorter](https://github.com/kentcdodds/match-sorter). Por exemplo:

```jsx
import { matchSorter } from 'match-sorter';

const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />;
```

## Virtualização

Busca dentro de 10.000 opções geradas aleatoriamente. A lista é virtualizada graças ao [react-window](https://github.com/bvaughn/react-window).

{{"demo": "Virtualize.js"}}

## Eventos

Se você deseja impedir o comportamento padrão do manipulador de teclas, você pode definir a propriedade `defaultMuiPrevented` do evento como `true`:

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

Navegadores têm heurísticas para ajudar o usuário a preencher entradas de formulário. No entanto, isso pode prejudicar a experiência do usuário do componente.

Por padrão, o componente desabilita o recurso de **autocomplete** da caixa de texto (lembrando o que o usuário digitou para um determinado campo em uma sessão anterior) com o atributo `autoComplete="off"`. O Google Chrome atualmente não suporta essa configuração de atributo ([Issue 587466](https://bugs.chromium.org/p/chromium/issues/detail?id=587466)). Uma possível solução alternativa é remover o `id` para que o componente gere um aleatório.

Além de lembrar valores inseridos anteriormente, o navegador também pode sugerir preenchimentos automáticos (login salvo, endereço ou detalhes de pagamento). No caso de você querer evitar o preenchimento automático, você pode tentar o seguinte:

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

Leia o [guia no MDN](https://developer.mozilla.org/pt-BR/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion) para mais detalhes.

### iOS VoiceOver

VoiceOver no iOS Safari não suporta muito bem o atributo `aria-owns`. Você pode contornar o problema com a propriedade `disablePortal`.

### ListboxComponent

Se você fornecer uma propriedade `ListboxComponent` personalizada, você precisa garantir que o contêiner de rolagem pretendido tenha o atributo `role` definido como `listbox`. Isso garante o comportamento correto da rolagem, por exemplo, ao usar o teclado para navegar.

## Acessibilidade

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

Nós encorajamos o uso de um label para a caixa de texto. O componente implementa as práticas de autoria WAI-ARIA.
