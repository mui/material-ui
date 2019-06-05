---
title: Componente React para Interruptores
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Interruptores (Switches)

<p class="description">Interruptores alternam o estado de uma única configuração ligado ou desligado.</p>

[Interruptores](https://material.io/design/components/selection-controls.html#switches) são a forma preferida de ajustes de configuração em mobile. A opção que o interruptor controla, juntamente com o estado atual, deve ser claramente explícita no rótulo(label) inline correspondente.

{{"demo": "pages/components/switches/Switches.js"}}

## Interruptores com FormControlLabel

`Switch` também pode ser utilizado com uma descrição de rótulo graças ao componente `FormControlLabel`.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Interruptores com FormGroup

`FormGroup` é um componente encapsulador usado para agrupar componentes de seleção para fornecer uma fácil API. No entanto, nós recomendamos que você use [Caixas de Seleção](#checkboxes).

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Interruptores customizados

Aqui esta um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

## Posicionamento do rótulo

Você pode alterar o posicionamento do rótulo:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## Acessibilidade

Todos os controles de formulário devem ter rótulos, e isso inclui botões de opção, caixas de seleção e interruptores. Na maioria dos casos, isso é feito usando `<label>` ([FormControlLabel](/api/form-control-label/)).

Quando um rótulo não pode ser usado, é necessário adicionar um atributo diretamente no componente de entrada. Nesse caso você pode aplicar um atributo adicional (e.g.`aria-label`,`aria-labelledby`, `title`) através da propriedade `inputProps`.

```jsx
<Switch
  value="checkedA"
  inputProps={{ 'aria-label': 'Switch A' } }
/>
```