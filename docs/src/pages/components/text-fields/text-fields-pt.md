---
title: Componente React de Campo de Texto
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# Text Field (campo de texto)

<p class="description">Campos de texto permitem que os usuários digitem e editem texto.</p>

[Campos de texto](https://material.io/design/components/text-fields.html) permitem que os usuários insiram texto em uma interface de usuário. Eles geralmente aparecem em formulários e diálogos.

## TextField

O componente wrapper `TextField` é um controle de formulário completo, incluindo um rótulo, entrada e texto de ajuda.

It supports standard, outlined and filled styling.

{{"demo": "pages/components/text-fields/BasicTextFields.js"}}

**Note:** The standard variant of the `TextField` is no longer documented in the [Material Design guidelines](https://material.io/) ([here's why](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03)), but Material-UI will continue to support it.

## Form props

Standard form attributes are supported e.g. `required`, `disabled`, `type`, etc. as well as a `helperText` which is used to give context about a field’s input, such as how the input will be used.

{{"demo": "pages/components/text-fields/FormPropsTextFields.js"}}

## Validation

The `error` prop toggles the error state, the `helperText` prop can then be used to provide feedback to the user about the error.

{{"demo": "pages/components/text-fields/ValidationTextFields.js"}}

## Multiline

The `multiline` prop transforms the text field into a [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) or a [TextareaAutosize](/components/textarea-autosize/).

{{"demo": "pages/components/text-fields/MultilineTextFields.js"}}

## Select

The `select` prop makes the text field use the [Select](/components/selects/) component internally.

{{"demo": "pages/components/text-fields/SelectTextFields.js"}}

## Ícones

There are multiple ways to display an icon with a text field.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### Decoração de inputs

The main way is with an `InputAdornment`. Estes podem ser usados para adicionar um prefixo, sufixo ou uma ação para uma entrada. Por exemplo, você pode usar um botão com ícone para ocultar ou revelar a senha.

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

## Tamanhos

Fancy smaller inputs? Use a propriedade `size`.

{{"demo": "pages/components/text-fields/TextFieldSizes.js"}}

## Leiaute

`margin` can be used to alter the vertical spacing of inputs. Using `none` (default) will not apply margins to the `FormControl`, whereas `dense` and `normal` will. `dense` and `normal` alter other styles to meet the specification.

`fullWidth` can be used to make the input take up the full width of its container.

{{"demo": "pages/components/text-fields/LayoutTextFields.js"}}

## Uncontrolled vs Controlled

The component can be controlled or uncontrolled

{{"demo": "pages/components/text-fields/StateTextFields.js"}}

## Componentes

`TextField` é composto por componentes menores ([`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), e [`FormHelperText`](/api/form-helper-text/)) que você pode aproveitar diretamente para personalizar significativamente as entradas do seu formulário.

Você também pode ter notado que algumas propriedades de entrada nativas do HTML estão faltando no componente `TextField`. Isto é intencional. O componente cuida das propriedades mais usadas, depois cabe ao usuário usar o componente exibido na demonstração. Ainda, você pode usar `inputProps` (`InputProps` e `InputLabelProps`) se você quiser evitar algum boilerplate.

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Entradas

{{"demo": "pages/components/text-fields/Inputs.js"}}

## Cor

The `color` prop changes the highlight color of the text field when focused.

{{"demo": "pages/components/text-fields/ColorTextFields.js"}}

## Inputs Costumizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

A customização não para no CSS, você pode usar composição para criar componentes personalizados e dar ao seu aplicativo uma sensação única. Abaixo há um exemplo usando o componente [`InputBase`](/api/input-base/), inspirado pelo Google Maps.

{{"demo": "pages/components/text-fields/CustomizedInputBase.js", "bg": true}}

## Limitações

### Reduzir

O label de entrada "shrink" nem sempre está correto. O input label deve encolher assim que o input estiver exibindo algo. Em algumas circunstâncias, não podemos determinar o estado de "srink" (input numérico, input datetime, input Stripe). Você pode notar uma sobreposição.

![minimizar](/static/images/text-fields/shrink.png)

Para contornar o problema, você pode forçar a "shrink" do label.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

ou

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

### Rótulo flutuante

O rótulo flutuante está absolutamente posicionado, não afetará o leiaute da página. Você precisa ter certeza de que o componente de entrada é maior do que o rótulo para a exibição correta.

## Integração com bibliotecas de input de terceiros

Você pode usar bibliotecas de terceiros para formatar uma entrada. Você precisa fornecer uma implementação personalizada do elemento `<input>` com a propriedade `inputComponent`.

A seguinte demonstração usa as bibliotecas [react-text-mask](https://github.com/text-mask/text-mask) e [react-number-format](https://github.com/s-yadav/react-number-format). O mesmo conceito pode ser aplicado para, [p. ex. react-stripe-element](https://github.com/mui-org/material-ui/issues/16037).

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

O componente de entrada fornecido deve manipular a propriedade `inputRef`. A propriedade deve ser chamada com um valor que implemente a seguinte interface:

```ts
interface InputElement {
  focus(): void;
  value?: string;
}
```

```jsx
function MeuInputComponente(props) {
  const { component: Component, inputRef, ...other } = props;

  // implementa a interface `InputElement`
  React.useImperativeHandle(inputRef, () => ({
    focus: () => {
      // logica para focar o componente renderizado de terceiros entra aquito focus
    },
    // ocultando o valor p.ex. react-stripe-elements
  }));

  // O `Component` abaixo será seu `AlgumComponentDeTerceiro`
  return <Component {...other} />;
}

// uso
<TextField
  InputProps={{
    inputComponent: MeuInputComponente,
    inputProps: { component: AlgumComponentDeTerceiro },
  }}
/>;
```

## Acessibilidade

Para que o campo de texto seja acessível, **a entrada deve estar vinculada ao rótulo e ao texto auxiliar**. Os nós DOM subjacentes devem ter essa estrutura.

```jsx
<div class="form-control">
  <label for="my-input">Endereço de e-mail</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">Nós nunca compartilharemos seu e-mail.</span>
</div>
```

- Se você estiver usando o componente `TextField`, basta fornecer um `id` único.
- Se você está compondo o componente:

```jsx
<div class="form-control">
  <label for="my-input">Endereço de e-mail</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">Nós nunca compartilharemos seu e-mail.</span>
</div>
```

## Projetos Complementares

Para usos mais avançados, você pode tirar vantagem com:

- [formik-material-ui](https://github.com/stackworx/formik-material-ui) Ligações para usar Mateiral-UI com formik.
- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) Um conjunto de componentes do wrapper para facilitar o uso do Material UI com Redux Form.
- [final-form-material-ui](https://github.com/Deadly0/final-form-material-ui) Um conjunto de componentes wrapper para facilitar o uso do Material UI com Final Form.
- [mui-rff](https://github.com/lookfirst/mui-rff) A set of wrapper components to facilitate using Material UI with React Final Form.