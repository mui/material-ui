---
title: Select React component
components: Select, NativeSelect
---

# Selects (Seleciona)

<p class="description">Os componentes Selects são usados para coletar informações fornecidas pelo usuário em uma lista de opções.</p>

## Select Simples

Os menus são posicionados sobre seus elementos emissores, de modo que o item de menu atualmente selecionado apareça na parte superior do elemento emissor.

{{"demo": "pages/components/selects/SimpleSelect.js"}}

## Select Nativo

Como a experiência do usuário pode ser melhorada em dispositivos móveis usando a seleção nativa da plataforma, permitimos esse padrão.

{{"demo": "pages/components/selects/NativeSelects.js"}}

## Selects Customizados

Aqui estão alguns exemplos de personalização do componente. Você pode aprender mais sobre isso na [página de documentação de substituições](/customization/components/).

O primeiro passo é modelar o componente `InputBase`. Once it's styled, you can either use it directly as a text field or provide it to the select `input` property to have a select field.

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

## Múltipla Select

O componente `Select` pode lidar com várias seleções. Está ativado com a propriedade `multiple`.

Como na seleção única, você pode extrair o novo valor acessando `event.target.value` no retorno da chamada `onChange `. É sempre uma matriz.

{{"demo": "pages/components/selects/MultipleSelect.js"}}

## Select Aberto Controlado

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## With a Dialog

Embora seja desencorajado pela especificação do Material Design, você pode usar um select dentro de um diálogo.

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Campos de Texto

O componente wrapper `TextField` é um controle de formulário completo, incluindo um rótulo, entrada e texto de ajuda. Você pode encontrar um exemplo de seleção [nesta seção](/components/text-fields/#textfield).