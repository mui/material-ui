---
title: Componente React para Botões de Opção
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
---

# Botões de opção

<p class="description">Botões de opção permitem o usuário selecionar uma das opções de um conjunto.</p>

Use [botões de opção](https://material.io/design/components/selection-controls.html#radio-buttons) quando um usuário precisar ver todas as opções disponíveis. Se várias opções podem ser suprimidas da visualização, considere usar um menu suspenso (dropdown), pois ele utiliza menos espaço.

Os botões de opção devem ter a opção mais comumente usada selecionada por padrão.

## RadioGroup

`RadioGroup` é um wrapper útil usado para agrupar componentes `Radio` fornecendo uma API mais fácil, e adequá a acessibilidade pelo teclado para o grupo.

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

## Standalone radio buttons

`Radio` can also be used standalone, without the RadioGroup wrapper.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## Posicionamento do Rótulo

You can change the placement of the label with the `FormControlLabel` component's `labelPlacement` prop:

{{"demo": "pages/components/radio-buttons/FormControlLabelPlacement.js"}}

## Show error

In general, radio buttons should have a value selected by default. If this is not the case, you can display an error if no value is selected when the form is submitted:

{{"demo": "pages/components/radio-buttons/ErrorRadios.js"}}

## Opções customizadas

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/radio-buttons/CustomizedRadios.js"}}

## Quando usar

- [Caixas de Seleção vs. Botões de Opção](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton)

- Todos os controles de formulário devem ter rótulos, e isso inclui os botões de opção, caixas de seleção e seletores. Na maioria dos casos, isso é feito usando o elemento `<label>` ([FormControlLabel](/api/form-control-label/)).
- Quando um rótulo não pode ser usado, é necessário adicionar um atributo diretamente no componente de entrada. Nesse caso você pode aplicar um atributo adicional (e.g.`aria-label`,`aria-labelledby`, `title`) através da propriedade `inputProps`.

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' }}
/>
```