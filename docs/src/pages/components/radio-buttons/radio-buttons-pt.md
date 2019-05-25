---
title: Componente React Botões de Opção
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
---

# Botões de Opção

<p class="description">Botões de opções permitem o usuário selecionar uma das opções de um conjunto.</p>

Use [botões de opções](https://material.io/design/components/selection-controls.html#radio-buttons) quando um usuário precisar ver todas as opções disponíveis. Se várias opções podem ser suprimidas da visualização, considere usar um menu suspenso (dropdown), pois ele utiliza menos espaço.

Os botões de opção devem ter a opção mais comumente usada selecionada por padrão.

`RadioGroup` é um wrapper útil usado para agrupar componentes `Radio` fornecendo uma API mais fácil, e adequá a acessibilidade pelo teclado para o grupo.

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

## Botões de Opção Independentes

`Radio` também pode ser usado de forma independente, sem a necessidade de um wrapper.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## Posicionamento do Rótulo

Você pode alterar o posicionamento do rótulo:

{{"demo": "pages/components/radio-buttons/FormControlLabelPosition.js"}}

## Acessibilidade

Todos os controles de formulário devem ter rótulos, e isso inclui os botões de opção, caixas de seleção e seletores. Na maioria dos casos, isso é feito usando `<label>` ([FormControlLabel](/api/form-control-label/)).

Quando uma label não pode ser usada, é necessário adicionar um atributo diretamente no componente de input. Nesse caso você pode aplicar um atributo adicional (e.g.`aria-label`,`aria-labelledby`, `title`) através do `inputProps`.

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Opção A' } }
/>
```

## Orientação

- [Caixas de Seleção vs. Botões de Opção](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)