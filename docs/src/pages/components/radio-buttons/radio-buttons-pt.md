---
title: Componente React para Botões de opção
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
githubLabel: 'component: Radio'
materialDesign: 'https://material.io/components/selection-controls#radio-buttons'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#radiobutton'
---

# Botões de opção

<p class="description">Botões de opção permitem o usuário selecionar uma das opções de um conjunto.</p>

Use [botões de opção](https://material.io/design/components/selection-controls.html#radio-buttons) quando um usuário precisar ver todas as opções disponíveis. Se várias opções podem ser suprimidas da visualização, considere usar um menu suspenso (dropdown), pois ele utiliza menos espaço.

Os botões de opção devem ter a opção comum e mais usada selecionada por padrão.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## RadioGroup

O componente `RadioGroup` é um wrapper utilizado para agrupar componentes `Radio`, fornece uma API mais simples e adequada para a acessibilidade por teclado.

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

Para demonstrar os botões horizontalmente, defina a propriedade `row`: `<RadioGroup row />`.

## Botões de opção independentes

O componente `Radio` também pode ser usado de forma independente, sem o wrapper RadioGroup.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## Posicionamento do rótulo

Você pode alterar o posicionamento do rótulo com o componente `FormControlLabel` na propriedade `labelPlacement`:

{{"demo": "pages/components/radio-buttons/FormControlLabelPlacement.js"}}

## Exibição de erro

Em geral, os botões de opção devem ter um valor selecionado por padrão. Se esse não for o caso, você pode exibir um erro se nenhum valor estiver selecionado quando o formulário for submetido:

{{"demo": "pages/components/radio-buttons/ErrorRadios.js"}}

## Opções customizadas

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/radio-buttons/CustomizedRadios.js"}}

## `useRadioGroup`

For advanced customization use cases, a `useRadioGroup()` hook is exposed. It returns the context value of the parent radio group. The Radio component uses this hook internally.

### API

```jsx
import { useRadioGroup } from '@material-ui/core/RadioGroup';
```

#### Retornos

`value` (_Object_):

- `value.name` (_String_ [optional]): The name used to reference the value of the control.
- `value.onChange` (_Void_ [optional]): Callback fired when a radio button is selected.
- `value.value` (_Any_ [optional]): Value of the selected radio button.

#### Exemplo

{{"demo": "pages/components/radio-buttons/UseRadioGroup.js"}}

## Quando usar

- [Caixas de Seleção vs. Botões de Opção](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton)

- Todos os controles de formulário devem ter rótulos, e isso inclui os botões de opção, caixas de seleção e interruptores. Na maioria dos casos, isso é feito usando o elemento `<label>` ([FormControlLabel](/api/form-control-label/)).
- Quando um rótulo não pode ser usado, é necessário adicionar um atributo diretamente no componente de entrada. Nesse caso você pode aplicar um atributo adicional (por exemplo, `aria-label`,`aria-labelledby`, `title`) através da propriedade `inputProps`.

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' }}
/>
```
