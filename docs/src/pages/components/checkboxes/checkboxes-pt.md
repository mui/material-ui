---
title: Checkbox React component
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Checkbox

<p class="description">Checkboxes permitem o usuário selecionar um ou mais itens de um conjunto.</p>

[Checkboxes](https://material.io/design/components/selection-controls.html#checkboxes) podem ser usados para deixar uma opção disponível ou indisponível.

Se você tem várias opções aparecendo na lista, você pode economizar espaço usando checkbox ao invés de on/off switches. Se você tem uma única opção, evite usar um checkbox e use um on/off switch.

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

`Checkbox` também podem ser usadas com uma `label` graças ao `FormControlLabel` componente.

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## Checkboxes com FormGroup

`FormGroup` é usado para agrupar componentes seletores para facilitar o uso da API.

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## Posicionamento do Label

Você pode alterar o posicionamento do label:

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## Acessibilidade

Todos os form controls devem ter labels, e isso inclui radio buttons, checkboxes e switches. Na maioria dos casos, isso é feito usando `<label>` ([FormControlLabel](/api/form-control-label/)).

Quando uma label não pode ser usada, é necessário adicionar um atributo diretamente no componente de input. Nesse caso você pode aplicar um atributo adicional (e.g.`aria-label`,`aria-labelledby`, `title`) através do `inputProps`.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Caixa de seleção A' } }
/>
```

## Guia

- [Checkboxes vs. Botões de Rádio](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)