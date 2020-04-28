---
title: Componente React para Seleção
components: Select, NativeSelect
---

# Seleção

<p class="description">Os componentes de seleção são usados para coletar informações fornecidas pelo usuário em uma lista de opções.</p>

## Seleção Simples

Os menus são posicionados sobre seus elementos emissores, de modo que o item de menu atualmente selecionado apareça na parte superior do elemento emissor.

{{"demo": "pages/components/selects/SimpleSelect.js"}}

## Recursos avançados

O componente `Select` é pensado para ser intercambiável com um elemento nativo `<select>`.

Se você estiver procurando por recursos mais avançados, como combobox, seleção múltipla, autocompletar, uso assíncrono ou com suporte de adição, vá para o [ componente `Autocomplete`](/components/autocomplete/). A ideia dessa ferramenta era para ser uma versão melhorada das bibliotecas "react-select" e "downshift".

## Seleção Nativa

Como a experiência do usuário pode ser melhorada em dispositivos móveis usando a seleção nativa da plataforma, permitimos esse padrão.

{{"demo": "pages/components/selects/NativeSelects.js"}}

## Campos de Texto

O componente wrapper `TextField` é um controle de formulário completo, incluindo um rótulo, entrada e texto de ajuda. Você pode encontrar um exemplo de seleção [nesta seção](/components/text-fields/#select).

## Seleções Customizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

O primeiro passo é modelar o componente `InputBase`. Uma vez estilizado, você pode usá-lo diretamente como um campo de texto ou fornecê-lo à propriedade `input` da seleção para ter um campo `select`.

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

## Seleção Múltipla

O componente `Select` pode lidar com várias seleções. É ativado com a propriedade `multiple`.

Como na seleção única, você pode extrair o novo valor acessando `event.target.value` na chamada `onChange`. É sempre uma matriz.

{{"demo": "pages/components/selects/MultipleSelect.js"}}

## Seleção Aberta Controlada

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## Com uma caixa de Diálogo

Embora não seja recomendado pela especificação do Material Design, você pode usar uma seleção dentro de uma caixa de diálogo.

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Agrupando

Exiba categorias com o componente `ListSubheader` ou com o elemento nativo `<optgroup>`.

{{"demo": "pages/components/selects/GroupedSelect.js"}}

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