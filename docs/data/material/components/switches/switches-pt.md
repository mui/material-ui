---
product: material-ui
title: Componente React Interruptor
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
githubLabel: 'component: switch'
materialDesign: 'https://m2.material.io/components/selection-controls#switches'
unstyled: /base/react-switch/
---

# Interruptor

<p class="description">Interruptores alternam o estado de uma única configuração ligado ou desligado.</p>

[Interruptores](https://m2.material.io/design/components/selection-controls.html#switches) são a forma preferida de ajustes de configuração em mobile. The option that the switch controls, as well as the state it's in, should be made clear from the corresponding inline label.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Interruptores básicos

{{"demo": "BasicSwitches.js"}}

## Caixas de seleção com FormGroup

Você pode fornecer um rótulo para o `Switch` graças ao componente `FormControlLabel`.

{{"demo": "SwitchLabels.js"}}

## Tamanho

Use a propriedade `size` para alterar o tamanho do interruptor.

{{"demo": "SwitchesSize.js"}}

## Cor

{{"demo": "ColorSwitches.js"}}

## Controlled

Você pode controlar o interruptor com as propriedades `checked` e `onChange`:

{{"demo": "ControlledSwitches.js"}}

## Interruptores com FormGroup

`FormGroup` is a helpful wrapper used to group selection controls components that provides an easier API. However, you are encouraged to use [Checkboxes](/material-ui/react-checkbox/) instead if multiple related controls are required. (Veja: [Quando usar](#when-to-use)).

{{"demo": "SwitchesGroup.js"}}

## Interruptores customizados

Aqui estão alguns exemplos de customização do componente. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedSwitches.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/switch/).

## Label placement

You can change the placement of the label:

{{"demo": "FormControlLabelPosition.js"}}

## When to use

- [Caixas de seleção vs. interruptores](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accessibility

- Ele irá renderizar um elemento com a regra de `checkbox` e não `switch`, pois esta regra não é amplamente suportada ainda. Por favor, teste primeiro se a tecnologia assistiva do seu público-alvo suporta essa regra corretamente. Em seguida, você pode alterar a regra com `<Switch inputProps={{ role: 'switch' }}>`
- Todos os controles de formulário devem ter rótulos, e isso inclui os botões de opção, caixas de seleção e interruptores. In most cases, this is done by using the `<label>` element ([FormControlLabel](/material-ui/api/form-control-label/)).
- Quando um rótulo não pode ser usado, é necessário adicionar um atributo diretamente no componente de entrada. Nesse caso você pode aplicar um atributo adicional (por exemplo, `aria-label`,`aria-labelledby`, `title`) através da propriedade `inputProps`.

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```
