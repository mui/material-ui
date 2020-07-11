---
title: Componente React para Campo de Texto
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# Campo de texto

<p class="description">Campos de texto permitem que os usuários digitem e editem texto.</p>

[Campos de texto](https://material.io/design/components/text-fields.html) permitem que os usuários insiram texto em uma interface de usuário. Eles geralmente aparecem em formulários e diálogos.

## TextField

O componente wrapper `TextField` é um controle de formulário completo, incluindo um rótulo, entrada e texto de ajuda.

Ele suporta 3 variações: O estilo padrão, com contorno e preenchido.

{{"demo": "pages/components/text-fields/BasicTextFields.js"}}

**Observação:** A variante padrão do `TextField` não é mais documentada nas [diretrizes do Material Design](https://material.io/) ([entenda o porquê](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03)).

## Propriedades de formulário

Os atributos padrões de formulários são suportados, por exemplo, `required`, `disabled`, `type`, etc. assim como o `helperText`, que é utilizado para dar contexto sobre um campo de entrada, tal como, explicar como o campo deve ser preenchido.

{{"demo": "pages/components/text-fields/FormPropsTextFields.js"}}

## Validação

A propriedade `error` habilita o estado de erro, e utilizando a propriedade `helperText` será fornecido um feedback ao usuário sobre o erro.

{{"demo": "pages/components/text-fields/ValidationTextFields.js"}}

## Multilinha

A propriedade `multiline` transforma o campo de texto em um [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) ou em um componente [TextareaAutosize](/components/textarea-autosize/).

{{"demo": "pages/components/text-fields/MultilineTextFields.js"}}

## Seleção

A propriedade `select` faz com que o campo de texto use internamente um componente [Select](/components/selects/).

{{"demo": "pages/components/text-fields/SelectTextFields.js"}}

## Ícones

Há muitas formas de incluir um ícone com um campo de texto.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### Adereços de campo

A forma principal é utilizando um componente `InputAdornment`. Estes podem ser usados para adicionar um prefixo, sufixo ou uma ação para um campo. Por exemplo, você pode usar um botão com ícone para ocultar ou revelar a senha.

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

## Tamanhos

Gosta mais de campos de texto menores? Use a propriedade `size`.

{{"demo": "pages/components/text-fields/TextFieldSizes.js"}}

## Leiaute

A propriedade `margin` pode ser utilizada para alterar o espaçamento vertical dos campos. Usar `none` (padrão) não aplicará margens para o `FormControl`, enquanto `dense` e `normal` irá. As definições `dense` e `normal` altera outros estilos para atender a especificação.

A propriedade `fullWidth` pode ser usada para fazer com que o campo ocupe a largura total de seu contêiner.

{{"demo": "pages/components/text-fields/LayoutTextFields.js"}}

## Não controlado vs controlado

O componente pode ser controlado ou não controlado.

{{"demo": "pages/components/text-fields/StateTextFields.js"}}

## Componentes

O componente `TextField` é composto por componentes menores ([`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), e [`FormHelperText`](/api/form-helper-text/)) que você pode aproveitar diretamente para customizar significativamente os campos do seu formulário.

Você também pode ter notado que algumas propriedades de campo nativas do HTML input estão faltando no componente `TextField`. Isto é intencional. O componente cuida das propriedades mais usadas, depois cabe ao usuário, caso queira, usar o componente subjacente, como esta exibido na demonstração a seguir. Ainda, você pode usar `inputProps` (`InputProps` e `InputLabelProps`) se você quiser evitar algum boilerplate.

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Campos

{{"demo": "pages/components/text-fields/Inputs.js"}}

## Cor

A propriedade `color` altera a cor do destaque do campo de texto quando focado.

{{"demo": "pages/components/text-fields/ColorTextFields.js"}}

## Campos customizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

A customização não para no CSS, você pode usar composição para criar componentes customizados e dar ao seu aplicativo uma sensação única. Abaixo há um exemplo usando o componente [`InputBase`](/api/input-base/), inspirado pelo Google Maps.

{{"demo": "pages/components/text-fields/CustomizedInputBase.js", "bg": true}}

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/text-field).

## Limitações

### Shrink

O rótulo do campo no estado de "shrink"(recuo) nem sempre está correto. O rótulo do campo deve recuar assim que o campo estiver exibindo algo. Em algumas circunstâncias, não podemos determinar o estado de "shrink" (input numérico, input datetime, input Stripe). Você pode notar uma sobreposição.

![shrink](/static/images/text-fields/shrink.png)

Para contornar o problema, você pode forçar o "shrink" do rótulo.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

ou

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

### Rótulo flutuante

O rótulo flutuante está absolutamente posicionado, não afetará o leiaute da página. Você precisa ter certeza de que o componente de campo é maior do que o rótulo para a exibição correta.

## Integração com bibliotecas de campo de terceiros

Você pode usar bibliotecas de terceiros para formatar um campo. Você precisa fornecer uma implementação personalizada do elemento `<input>` com a propriedade `inputComponent`.

A seguinte demonstração usa as bibliotecas [react-text-mask](https://github.com/text-mask/text-mask) e [react-number-format](https://github.com/s-yadav/react-number-format). O mesmo conceito pode ser aplicado para, [p. ex. react-stripe-element](https://github.com/mui-org/material-ui/issues/16037).

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

O componente de campo fornecido deve manipular a propriedade `inputRef`. A propriedade deve ser chamada com um valor que implemente a seguinte interface:

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

Para que o campo de texto seja acessível, **o campo deve estar vinculado ao rótulo e ao texto auxiliar**. Os nós DOM subjacentes devem ter essa estrutura:

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

Para situações de uso mais avançadas, você pode tirar proveito com:

- [formik-material-ui](https://github.com/stackworx/formik-material-ui) Bindings para usar Material-UI com [formik](https://jaredpalmer.com/formik).
- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) Bindings para usar Material-UI com [Redux Form](https://redux-form.com/).
- [mui-rff](https://github.com/lookfirst/mui-rff) Bindings para usar Material-UI com [React Final Form](https://final-form.org/react).