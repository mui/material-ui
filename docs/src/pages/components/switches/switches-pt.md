---
title: Componente React Interruptor
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Interruptor

<p class="description">Interruptores alternam o estado de uma única configuração ligado ou desligado.</p>

[Interruptores](https://material.io/design/components/selection-controls.html#switches) são a forma preferida de ajustes de configuração em mobile. A opção que o interruptor controla, juntamente com o estado atual, deve ser claramente explícita no rótulo em linha correspondente.

## Interruptores básicos

{{"demo": "pages/components/switches/Switches.js"}}

## Interruptores com FormControlLabel

O componente `Switch` pode ser fornecido com uma descrição graças ao componente `FormControlLabel`.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Interruptores com FormGroup

O componente `FormGroup` é um encapsulador usado para agrupar componentes de seleção para fornecer uma API facilitada. No entanto, é recomendado usar [caixas de seleção](/components/checkboxes/), se vários controles relacionados forem necessários. (Veja: [Quando usar](#when-to-use)).

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Interruptores customizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/switch).

## Tamanhos

Gosta de interruptores menores? Use a propriedade `size`.

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## Posicionamento do rótulo

Você pode alterar o posicionamento do rótulo:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## Quando usar

- [Caixas de seleção vs. interruptores](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Acessibilidade

- Ele irá renderizar um elemento com a regra de `checkbox` e não `switch`, pois esta regra não é amplamente suportada ainda. Por favor, teste primeiro se a tecnologia assistiva do seu público-alvo suporta essa regra corretamente. Em seguida, você pode alterar a regra com `<Switch inputProps={{ role: 'switch' }}>`
- Todos os controles de formulário devem ter rótulos, e isso inclui os botões de opção, caixas de seleção e interruptores. Na maioria dos casos, isso é feito usando o elemento `<label>` ([FormControlLabel](/api/form-control-label/)).
- Quando um rótulo não pode ser usado, é necessário adicionar um atributo diretamente no componente de entrada. Nesse caso você pode aplicar um atributo adicional (por exemplo, `aria-label`,`aria-labelledby`, `title`) através da propriedade `inputProps`.

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```