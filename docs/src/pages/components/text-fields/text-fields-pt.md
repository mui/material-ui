---
title: Componente React para Campo de Texto
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
githubLabel: 'component: TextField'
materialDesign: https://material.io/components/text-fields
---

# Campo de texto

<p class="description">Campos de texto permitem que os usuários digitem e editem texto.</p>

[Campos de texto](https://material.io/design/components/text-fields.html) permitem que os usuários insiram texto em uma interface de usuário. Eles geralmente aparecem em formulários e diálogos.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## TextField

O componente wrapper `TextField` é um controle de formulário completo, incluindo um rótulo, entrada e texto de ajuda.

Ele suporta 3 variações: O estilo padrão, com contorno e preenchido.

{{"demo": "pages/components/text-fields/BasicTextFields.js"}}

Os atributos são suportados pelo `TextField`, como por exemplo `required`, `disabled`, `type`, etc. assim como o `helperText` que é utilizada para dar contexto sobre um campo de entrada, tais como, a entrada que será usada.

## Propriedades de formulário

Atributos padrão de formulário são suportados, por exemplo,  `required`, `disabled`, `type`, etc. bem como `helperText` que é usado para dar contexto sobre o campo de texto, tal como, ele deve ser usado.

{{"demo": "pages/components/text-fields/FormPropsTextFields.js"}}

## Validação

A propriedade `error` habilita o estado de erro, e utilizando a propriedade `helperText` será fornecido um feedback ao usuário sobre o erro.

{{"demo": "pages/components/text-fields/ValidationTextFields.js"}}

## Multilinha

A propriedade `multiline` transforma o `textfield` em um `<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea">TextArea</a>.
Unless the`rows`prop is set, the height of the text field dynamically matches its content (using [TextareaAutosize](/components/textarea-autosize/)).
You can use the`rowsMin`and`rowsMax` props to bound it.

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

The `filled` variant input height can be further reduced by rendering the label outside of it.

{{"demo": "pages/components/text-fields/TextFieldHiddenLabel.js"}}

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

### type="number"

Campos com type="number" tem problemas potenciais de usabilidade:

- Permitindo certos caracteres não numéricos ('e', '+', '-', '.') e silenciosamente descartando outros
- A funcionalidade de rolagem para incrementar/decrementar o número, pode causar alterações acidentais difíceis de notar

e muito mais - consulte [este artigo](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) da equipe GOV.UK Design System para obter uma explicação mais detalhada.

Para validação de número, uma alternativa viável é usar o padão de campo, type="text", com o atributo _pattern_, por exemplo:

```jsx
<TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
```

No futuro, pretendemos fornecer um [componente de campo número](https://github.com/mui-org/material-ui/issues/19154).

### Texto auxiliar

A propriedade de texto auxiliar afeta a altura do campo de texto. Se dois campos de texto forem colocados lado a lado, um com um texto auxiliar e outro sem ele, terão alturas diferentes. Por exemplo:

Para usos mais avançados, você pode tirar vantagem com:

Isso pode ser corrigido passando um caractere de espaço para a propriedade `helperText`:

{{"demo": "pages/components/text-fields/HelperTextAligned.js"}}

## Integração com bibliotecas de campo de terceiros

Você pode usar bibliotecas de terceiros para formatar um campo. Você precisa fornecer uma implementação personalizada do elemento `<input>` com a propriedade `inputComponent`.

A seguinte demonstração usa as bibliotecas [react-text-mask](https://github.com/text-mask/text-mask) e [react-number-format](https://github.com/s-yadav/react-number-format). O mesmo conceito pode ser aplicado para, [p. ex. react-stripe-element](https://github.com/mui-org/material-ui/issues/16037).

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

O componente de entrada fornecido deve expor um ref com um valor que implemente a seguinte interface:

```ts
interface InputElement {
  focus(): void;
  value?: string;
}
```

```jsx
const MyInputComponent = React.forwardRef((props, ref) => {
  const { component: Component, ...other } = props;

  // implemente a interface`InputElement`
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      // lógica para focar o componente de terceiro renderizado deve ser feita aqui
    },
    // ocultando o valor, por exemplo, react-stripe-elements
  }));

  // O `Component` abaixo será seu `AlgumComponenteDeTerceiro`
  return <Component {...other} />;
});

// uso
<TextField
  InputProps={{
    inputComponent: MyInputComponent,
    inputProps: {
      component: SomeThirdPartyComponent,
    },
  }}
/>;
```

## Acessibilidade

Para que o campo de texto seja acessível, **a entrada deve estar vinculada ao rótulo e ao texto auxiliar**. Os nós DOM subjacentes devem ter essa estrutura:

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
<div class="form-control" mark="crwd-mark">
  <label for="my-input">Endereço de e-mail</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">Nós nunca compartilharemos seu e-mail.</span>
</div>
```

## Projetos Complementares

Para situações de uso mais avançadas, você pode tirar proveito com:

- [react-hook-form](https://react-hook-form.com/): React hook para validação de formulários.
- [formik-material-ui](https://github.com/stackworx/formik-material-ui): Bindings para usar Material-UI com [formik](https://jaredpalmer.com/formik).
- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui): Bindings para usar Material-UI com [Redux Form](https://redux-form.com/).
- [mui-rff](https://github.com/lookfirst/mui-rff): Bindings para usar Material-UI com [React Final Form](https://final-form.org/react).
