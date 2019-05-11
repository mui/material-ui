---
title: Switch React component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Opções

<p class="description">Switches alternam o estado de uma única configuração ligado ou desligado.</p>

[Switches](https://material.io/design/components/selection-controls.html#switches) são a forma preferida de ajustes de configuração em mobile. A opção que o switch controla, juntamente com o estado atual, deve ser claramente explícita na label correspondente.

{{"demo": "pages/components/switches/Switches.js"}}

## Switches com FormControlLabel

`Switch` também pode ser utilizado com uma descrição de label graças ao componente `FormControlLabel`.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Switches with FormGroup

`FormGroup` é usado para agrupar componentes seletores para facilitar o uso da API. However, we encourage you to use a [Checkbox](#checkboxes) instead.

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Customized switches

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

## Posicionamento do Label

Você pode alterar o posicionamento do label:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## Acessibilidade

Todos os form controls devem ter labels, e isso inclui radio buttons, checkboxes e switches. Na maioria dos casos, isso é feito usando `<label>` ([FormControlLabel](/api/form-control-label/)).

Quando uma label não pode ser usada, é necessário adicionar um atributo diretamente no componente de input. Nesse caso você pode aplicar um atributo adicional (e.g.`aria-label`,`aria-labelledby`, `title`) através do `inputProps`.

```jsx
<Switch
  value="checkedA"
  inputProps={{ 'aria-label': 'Switch A' } }
/>
```