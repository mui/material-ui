---
title: React Select component
components: Select, NativeSelect
githubLabel: 'component: Select'
---

# Seleção

<p class="description">Os componentes de seleção são usados para coletar informações fornecidas pelo usuário em uma lista de opções.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Seleção Simples

Os menus são posicionados sobre seus elementos emissores, de modo que o item de menu atualmente selecionado apareça na parte superior do elemento emissor.

O componente `Select` é pensado para ser intercambiável com um elemento nativo `<select>`.

## Recursos avançados

O componente `Select` é pensado para ser intercambiável com um elemento nativo `<select>`.

Se você estiver procurando por recursos mais avançados, como combobox, seleção múltipla, autocompletar, uso assíncrono ou com suporte de adição, vá para o [ componente `Autocomplete`](/components/autocomplete/). A ideia dessa ferramenta é ser uma versão melhorada das bibliotecas "react-select" e "downshift".

## Propriedades

### Filled and outlined variants

{{"demo": "pages/components/selects/NativeSelects.js"}}

### Labels and helper text

{{"demo": "pages/components/selects/SelectLabels.js"}}

### Auto width

{{"demo": "pages/components/selects/SelectAutoWidth.js"}}

### Other props

{{"demo": "pages/components/selects/SelectOtherProps.js"}}

## Campos de Texto

Como a experiência do usuário pode ser melhorada em dispositivos móveis usando a seleção nativa da plataforma, permitimos esse padrão.

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/select).

## TextField

O componente wrapper `TextField` é um controle de formulário completo, incluindo um rótulo, entrada e texto de ajuda. Você pode encontrar um exemplo de seleção [nesta seção](/components/text-fields/#select).

## Seleções customizadas

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

O primeiro passo é estilizar o componente `InputBase`. Uma vez estilizado, você pode usá-lo diretamente como um campo de texto ou fornecê-lo à propriedade `input` da seleção para ter um campo `select`.

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/select).

## Seleção Aberta Controlada

O componente `Select` pode lidar com múltiplas seleções. O componente `Select` pode lidar com múltiplas seleções.

Como na seleção única, você pode extrair o novo valor acessando `event.target.value` na chamada `onChange`. É sempre uma matriz.

### Padrão

{{"demo": "pages/components/selects/MultipleSelect.js"}}

### Checkmarks

{{"demo": "pages/components/selects/MultipleSelectCheckmarks.js"}}

### Chip

Alternativamente, um `TextField` com `id` e `label` cria a marcação adequada e ids para você:

### Placeholder

Para uma [seleção nativa](#native-select), você deve utilizar um rótulo fornecendo o atributo `id` do elemento de seleção para o atributo `htmlFor` do `InputLabel`:

### Native

{{"demo": "pages/components/selects/MultipleSelectNative.js"}}

## Com uma caixa de Diálogo

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## Agrupando

Embora não seja recomendado pela especificação do Material Design, você pode usar uma seleção dentro de um diálogo.

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Agrupando

Exiba categorias com o componente `ListSubheader` ou com o elemento nativo `<optgroup>`.

{{"demo": "pages/components/selects/GroupedSelect.js"}}

## Acessibilidade

Para rotular corretamente seu campo  `Select` você precisa de um elemento extra com um `id` que contenha o rótulo desejado. Esse `id` precisa coincidir com o `labelId` do `Select`, por exemplo.

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
