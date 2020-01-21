---
title: Componente React Caixa de Seleção
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Checkbox (Caixa de Seleção)

<p class="description">Caixas de Seleção permitem o usuário selecionar um ou mais itens de um conjunto.</p>

[Caixas de Seleção](https://material.io/design/components/selection-controls.html#checkboxes) podem ser usadas para ativar ou desativar uma opção.

Se você tem várias opções aparecendo em uma lista, você pode economizar espaço usando caixas de seleção ao invés de seletores liga/desliga. Se você tem uma única opção, evite usar uma caixa de seleção e use um seletor de liga/desliga.

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

Caixa de Seleção pode também ser usada com um rótulo graças ao componente `FormControlLabel`.

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## Caixas de Seleção com FormGroup

`FormGroup` é usado para agrupar componentes seletores para facilitar o uso da API.

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## Posicionamento do Rótulo

Você pode alterar o posicionamento do rótulo:

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## Caixa de seleção customizada

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/checkboxes/CustomizedCheckbox.js", "defaultCodeOpen": false}}

## Quando usar

- [Caixas de Seleção vs. Botões de Opção](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [Caixas de Seleção vs. Interruptores](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox)

- Todos os controles de formulário devem ter rótulos, e isso inclui os botões de opção, caixas de seleção e seletores. Na maioria dos casos, isso é feito usando o elemento `<label>` ([FormControlLabel](/api/form-control-label/)).
- Quando um rótulo não pode ser usado, é necessário adicionar um atributo diretamente no componente de entrada. Nesse caso você pode aplicar um atributo adicional (e.g.`aria-label`,`aria-labelledby`, `title`) através da propriedade `inputProps`.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' }}
/>
```