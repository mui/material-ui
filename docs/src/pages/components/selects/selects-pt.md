---
title: Componente React para Seleção
components: Select, NativeSelect
---

# Select

<p class="description">Os componentes de seleção são usados para coletar informações fornecidas pelo usuário em uma lista de opções.</p>

## Seleção Simples

Os menus são posicionados sobre seus elementos emissores, de modo que o item de menu atualmente selecionado apareça na parte superior do elemento emissor.

{{"demo": "pages/components/selects/SimpleSelect.js"}}

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

## Grouping

Display categories with the `ListSubheader` component or the native `<optgroup>` element.

{{"demo": "pages/components/selects/GroupedSelect.js"}}

## Acessibilidade

To properly label your `Select` input you need an extra element with an `id` that contains a label. That `id` needs to match the `labelId` of the `Select` e.g.

```jsx
<InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</Select>
```

Alternatively a `TextField` with an `id` and `label` creates the proper markup and ids for you:

```jsx
<TextField id="select" label="Age" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</TextField>
```