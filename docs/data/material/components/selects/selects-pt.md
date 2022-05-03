---
product: material-ui
title: Componente React Seleção
components: Select, NativeSelect
githubLabel: 'component: select'
unstyled: import { useSelect } from '@mui/base/SelectUnstyled';
---

# Seleção

<p class="description">Os componentes de seleção são usados para coletar informações fornecidas pelo usuário em uma lista de opções.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Seleção Simples

Os menus são posicionados sobre seus elementos emissores, de modo que o item de menu atualmente selecionado apareça na parte superior do elemento emissor.

{{"demo": "BasicSelect.js"}}

## Recursos avançados

O componente `Select` é pensado para ser intercambiável com um elemento nativo `<select>`.

Se você estiver procurando por recursos mais avançados, como combobox, seleção múltipla, autocompletar, uso assíncrono ou com suporte de adição, vá para o [ componente `Autocomplete`](/material-ui/react-autocomplete/). A ideia dessa ferramenta é ser uma versão melhorada das bibliotecas "react-select" e "downshift".

## Propriedades

O componente seleção é implementado como um elemento `<input>` personalizado do [InputBase](/material-ui/api/input-base/). It extends the [text field components](/material-ui/react-text-field/) sub-components, either the [OutlinedInput](/material-ui/api/outlined-input/), [Input](/material-ui/api/input/), or [FilledInput](/material-ui/api/filled-input/), depending on the variant selected. Ele compartilha os mesmos estilos e muitas das mesmas propriedades. Consulte a página da API do respectivo componente para obter detalhes.

### Filled and standard variants

{{"demo": "SelectVariants.js"}}

### Rótulos e texto de ajuda

{{"demo": "SelectLabels.js"}}

> ⚠ Note that when using FormControl with the outlined variant of the Select, you need to provide a label in two places: in the InputLabel component and in the `label` prop of the Select component (see the above demo).

### Largura automática

{{"demo": "SelectAutoWidth.js"}}

### Outras propriedades

{{"demo": "SelectSmall.js"}}

### Padrão

Como a experiência do usuário pode ser melhorada em dispositivos móveis usando a seleção nativa da plataforma, permitimos esse padrão.

## Campos de Texto

As the user experience can be improved on mobile using the native select of the platform, we allow such pattern.

{{"demo": "NativeSelect.js"}}

## TextField

O componente wrapper `TextField` é um controle de formulário completo, incluindo um rótulo, entrada e texto de ajuda. Você pode encontrar um exemplo de seleção [nesta seção](/material-ui/react-text-field/#select).

## Seleções customizadas

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/material-ui/customization/how-to-customize/).

O primeiro passo é estilizar o componente `InputBase`. Uma vez estilizado, você pode usá-lo diretamente como um campo de texto ou fornecê-lo à propriedade `input` da seleção para ter um campo `select`. Notice that the `"standard"` variant is easier to customize, since it does not wrap the contents in a `fieldset`/`legend` markup.

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/select/).

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/select/).

## Seleção Aberta Controlada

The `Select` component can handle multiple selections. It's enabled with the `multiple` prop.

Como na seleção única, você pode extrair o novo valor acessando `event.target.value` na chamada `onChange`. É sempre uma matriz.

### Marcações

import { MultiSelectUnstyled } from '@mui/base/SelectUnstyled';

### Controlled select

{{"demo": "MultipleSelectCheckmarks.js"}}

### Chip

{{"demo": "MultipleSelectChip.js"}}

### Placeholder

{{"demo": "MultipleSelectPlaceholder.js"}}

### Unstyled component

{{"demo": "MultipleSelectNative.js"}}

## Seleção aberta controlada

You can control the open state of the select with the `open` prop. Alternatively, it is also possible to set the initial (uncontrolled) open state of the component with the `defaultOpen` prop.

{{"demo": "ControlledOpenSelect.js"}}

## Com um diálogo

While it's discouraged by the Material Design guidelines, you can use a select inside a dialog.

{{"demo": "DialogSelect.js"}}

## Grouping

Display categories with the `ListSubheader` component or the native `<optgroup>` element.

{{"demo": "GroupedSelect.js"}}

## Acessibilidade

Para rotular corretamente seu campo `Select` você precisa de um elemento extra com um `id` que contenha o rótulo desejado. Esse `id` precisa coincidir com o `labelId` do `Select`, por exemplo.

```jsx
<InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</Select>
```

Alternativamente, um `TextField` com `id` e `label` cria a marcação adequada e ids para você:

```jsx
<TextField id="select" label="Age" value="20" select>
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</TextField>
```

Para uma [seleção nativa](#native-select), você deve utilizar um rótulo fornecendo o atributo `id` do elemento de seleção para o atributo `htmlFor` do `InputLabel`:

```jsx
<InputLabel htmlFor="select">Age</InputLabel>
<NativeSelect id="select">
  <option value="10">Ten</option>
  <option value="20">Twenty</option>
</NativeSelect>
```
