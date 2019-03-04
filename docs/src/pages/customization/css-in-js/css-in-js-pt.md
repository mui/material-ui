# CSS em JS

<p class="description">Você pode aproveitar nossa solução de estilo, mesmo se não estiver usando nossos componentes.</p>

> ⚠️ Estamos trabalhando na extração da solução de estilo em seu próprio pacote: [`@material-ui/styles`](/css-in-js/basics/). É um projeto instável (versão alfa). Esperamos torná-lo a implementação padrão de estilo para os componentes principais do Material-UI v4.

Material-UI tem como objetivo fornecer bases sólidas para a construção de interfaces de usuário dinâmicas. Por uma questão de simplicidade, **expomos nossa solução de estilo aos usuários**. Você pode usá-lo, mas você não precisa. Esta solução de estilo é [interoperável com](/guides/interoperability/) todas as outras soluções principais.

## Solução de estilo do Material-UI

Nas versões anteriores, o Material-UI usava o LESS e, em seguida, uma solução personalizada no estilo inline para escrever o estilo dos componentes, mas essas abordagens provaram ser limitadas. Mais recentemente, temos [movido para](https://github.com/oliviertassinari/a-journey-toward-better-style) a *CSS-in-JS* solução. **desbloqueia muitos ótimos recursos** (aninhamento de temas, estilos dinâmicos, auto-suporte, etc.). Nós pensamos que é o futuro:

- [Um idioma de estilo unificado](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)
- [O futuro do estilo baseado em componentes](https://medium.freecodecamp.org/css-in-javascript-the-future-of-component-based-styling-70b161a79a32)
- [Converter SCSS (Sass) para CSS-in-JS](https://egghead.io/courses/convert-scss-sass-to-css-in-js)

Então, você deve ter notado nas demos que *CSS-in-JS* parece. Usamos o componente de ordem superior criado por [`withStyles`](#api) para injetar uma matriz de estilos no DOM como CSS, usando o JSS. Aqui está um exemplo:

{{"demo": "pages/customization/css-in-js/CssInJs.js"}}

## JSS

A solução de estilo do Material-UI usa [JSS](https://github.com/cssinjs/jss) em seu núcleo. É um [alto desempenho](https://github.com/cssinjs/jss/blob/next/docs/performance.md) JS ao compilador CSS que trabalha em tempo de execução e no lado do servidor. É cerca de 8 kB (minificado e gzipped) e é extensível através de um [plugins](https://github.com/cssinjs/jss/blob/next/docs/plugins.md) API.

Se você acabar usando essa solução de estilo na sua base de código, precisará *aprender a API*. O melhor lugar para começar é observar os recursos que cada um dos [plugins](https://cssinjs.org/plugins/) fornece. Material-UI usa [alguns deles](#plugins). Você sempre pode adicionar novos plugins, se necessário, com o [`JssProvider`](https://github.com/cssinjs/react-jss#custom-setup) ajudante.

Se você deseja construir sua própria instância de `jss` **e** suporte *rtl* Certifique-se de incluir também o [jss-rtl](https://github.com/alitaheri/jss-rtl) plugar. Verifique o [readme](https://github.com/alitaheri/jss-rtl#simple-usage) do jss-rtl para aprender como.

## Sheets registry

Ao renderizar no servidor, você precisará obter todos os estilos renderizados como uma string CSS. O `SheetsRegistry` A classe permite que você agregue e restrinja-os manualmente. Leia mais sobre [Renderização de Servidores](/guides/server-rendering/).

## Sheets manager

O gerenciador de folhas usa uma [contagem de referência](https://en.wikipedia.org/wiki/Reference_counting) Algoritmo para anexar e separar as folhas de estilo apenas uma vez por casal (estilos, tema). Essa técnica fornece um importante aumento de desempenho ao renderizar novamente as instâncias de um componente.

Quando apenas renderização no cliente, isso não é algo que você precisa estar ciente. No entanto, ao renderizar no servidor, você faz. Leia mais sobre [Renderização de Servidores](/guides/server-rendering/).

## Class names

Você deve ter notado que os nomes de classe gerados pela nossa solução de estilo são **não-determinísticos**, para que você não pode contar com eles para ficar na mesma. O seguinte CSS não funciona:

```css
.MuiAppBar-root-12 {
  opacity: 0.6
}
```

Em vez disso, você tem que usar as `classes` propriedade de um componente para substituí-los. Por outro lado, graças à natureza não-determinístico dos nossos nomes de classe, que pode implementar otimizações para o desenvolvimento e produção. Eles são fáceis de depurar no desenvolvimento e tão curtos quanto possível na produção:

- desenvolvimento: `.MuiAppBar-root-12`
- produção: `.jss12`

Se você não gostar desse comportamento padrão, poderá alterá-lo. O JSS conta com o conceito de [gerador de nome de classe](http://cssinjs.org/js-api/#generate-your-own-class-names).

### Global CSS

Fornecemos uma implementação personalizada do gerador de nome de classe para as necessidades de Material-UI: [`createGenerateClassName()`](#creategenerateclassname-options-class-name-generator). Assim como a opção de fazer os nomes de classes serem **determinísticos** com a opção `dangerouslyUseGlobalCSS`. Quando ativado, os nomes das classes ficarão assim:

- desenvolvimento: `.MuiAppBar-root-`
- produção: `.MuiAppBar-root `

⚠️ **ter cuidado quando usando `dangerouslyUseGlobalCSS`.** Nós fornecemos esta opção como uma saída de emergência para uma rápida criação de protótipos. Confiar nele para o código rodando em produção tem as seguintes implicações:

- O CSS global é inerentemente frágil. As pessoas usam metodologias rigorosas como [ BEM ](http://getbem.com/introduction/) para contornar o problema.
- É mais difícil controlar as classes ` ` alterações na API.

⚠️ Ao usar ` dangerouslyUseGlobalCSS ` autônomo (sem Material-UI), você deve nomear os seus style sheets. ` withStyles ` contem uma opção de nome para isso:

```jsx
const Button = withStyles(styles, { name: 'button' })(ButtonBase)
```

## Ordem de injeção de CSS

O CSS inserido pelo Material-UI para estilizar um componente tem a maior especificidade possível, pois o `<link>` é inserido na parte inferior do `<head>` para garantir que os componentes sejam sempre renderizados corretamente.

Você pode, no entanto, também querer substituir esses estilos, por exemplo, com componentes estilizados. Se você está enfrentando um problema de ordem de injeção de CSS, o JSS [ fornece um mecanismo ](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-the-dom-insertion-point) para lidar com essa situação. Ajustando o posicionamento do ponto de inserção ` ` dentro do seu HTML header, você pode [ controlar a ordem em ](http://cssinjs.org/js-api/#attach-style-sheets-in-a-specific-order) que as regras CSS são aplicadas aos seus componentes.

### Comentário HTML

A abordagem mais simples é adicionar um comentário HTML que determine onde o JSS irá inserir os estilos:

```jsx
<head>
  <!-- jss-insertion-point -->
  <link href="..." />
</head>
```

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // Definimos um ponto de inserção personalizado que o JSS procurará para inserir os estilos no DOM.
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

### Outro elemento HTML

[Create React App](https://github.com/facebook/create-react-app) remove comentários em HTML ao criar a compilação de produção. Para contornar o problema, você pode fornecer um elemento DOM (diferente de um comentário) como o ponto de inserção do JSS.

Por exemplo, um elemento `<noscript>`:

```jsx
<head>
  <noscript id="jss-insertion-point"></noscript>
  <link href="..." />
</head>
```

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // Definimos um ponto de inserção personalizado que o JSS procurará para inserir os estilos no DOM.
  insertionPoint: document.getElementById('jss-insertion-point'),
});

function App() {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

### JS createComment

codesandbox.io impede o acesso ao elemento `<head>`. Para contornar o problema, você pode usar a API JavaScript `document.createComment()`:

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const styleNode = document.createComment("jss-insertion-point");
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // Definimos um ponto de inserção personalizado que o JSS procurará para inserir os estilos no DOM.
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

## JssProvider

react-jss exposes a `JssProvider` component to configure JSS for the underlying child components. Existem diferentes casos de uso:

- Fornecendo um class name generator.
- [Providing a Sheets registry.](/customization/css-in-js/#sheets-registry)
- Fornecendo uma instância do JSS. Talvez você queira suportar [Direita-para-esquerda](/guides/right-to-left/) ou alterar a[ordem de injeção de CSS ](/customization/css-in-js/#css-injection-order). Leia [ a documentação do JSS ](http://cssinjs.org/js-api/) para saber mais sobre as opções disponíveis. Aqui está um exemplo:

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

function App() {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

## Plugins

O JSS usa o conceito de plugins para estender seu núcleo, permitindo que as pessoas selecionem os recursos de que precisam. Você paga a sobrecarga de desempenho apenas pelo que está usando. Dado que `withStyles` é nossa solução interna de estilos, todos os plugins não estão disponíveis por padrão. Nós adicionamos a seguinte lista:

- [jss-global](http://cssinjs.org/jss-global/)
- [jss-nested](http://cssinjs.org/jss-nested/)
- [jss-camel-case](http://cssinjs.org/jss-camel-case/)
- [jss-default-unit](http://cssinjs.org/jss-default-unit/)
- [jss-vendor-prefixer](http://cssinjs.org/jss-vendor-prefixer/)
- [jss-props-sort](http://cssinjs.org/jss-props-sort/)

É um subconjunto de [ jss-preset-default ](http://cssinjs.org/jss-preset-default/). Claro, você está livre para adicionar um novo plugin. Nós temos um exemplo para o [ ` jss-rtl ` plugin ](/guides/right-to-left/#3--jss-rtl).

## API

### `withStyles(styles, [options]) => higher-order component`

Vincule uma folha de estilo a um componente. Ele não modifica o componente passados para ele; em vez disso, ele retorna um novo componente, com a propriedade `classes`. Este objeto `classes` contém o nome das classes inseridas no DOM.

Alguns detalhes de implementação que podem ser interessantes para estar ciente:

- Adiciona uma propriedade `classes`, assim você pode substituir, a partir do exterior, os nomes de classe previamente injectados.
- Ele adiciona uma propriedade `innerRef` para que você possa obter uma referência ao componente encapsulado. O uso de ` innerRef ` é idêntico a ` ref `.
- Ele encaminha as propriedades *non React static* para que este HOC seja mais "transparente". Por exemplo, pode ser usado para definir um método estático (next.js) ` getInitialProps () `.

#### Argumentos

1. `styles` (*Function | Object*): Uma função que gera os estilos ou um objeto de estilos. Ele será vinculado ao componente. Use a assinatura da função se você precisar ter acesso ao tema. É fornecido como o primeiro argumento.
2. `options` (*Object* [optional]): 
    - `options.withTheme` (*Boolean* [optional]): Defaults to `false`. Provide the `theme` object to the component as a property.
    - `options.name` (*String* [optional]): The name of the style sheet. Útil para depuração. Se o valor não for fornecido, ele tentará usar o nome do componente.
    - `options.flip` (*Boolean* [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. Quando definido para `true`, os estilos são invertidos. Quando definido para `null`, segue `theme.direction`.
    - The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](http://cssinjs.org/js-api/#create-style-sheet).

#### Returns

`higher-order component`: Should be used to wrap a component.

#### Exemplos

```jsx
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default withStyles(styles)(MyComponent);
```

Also, you can use as [decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) like so:

```jsx
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

@withStyles(styles)
class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default MyComponent
```

### `createGenerateClassName([options]) => class name generator`

A function which returns [a class name generator function](http://cssinjs.org/js-api/#generate-your-own-class-names).

#### Argumentos

1. `options` (*Object* [optional]): 
    - `options.dangerouslyUseGlobalCSS` (*Boolean* [optional]): Defaults to `false`. Makes the Material-UI class names deterministic.
    - `options.productionPrefix` (*String* [optional]): Defaults to `'jss'`. The string used to prefix the class names in production.
    - `options.seed` (*String* [optional]): Defaults to `''`. The string used to uniquely identify the generator. It can be used to avoid class name collisions when using multiple generators.

#### Returns

`class name generator`: The generator should be provided to JSS.

#### Exemplos

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

function App() {
  return (
    <JssProvider generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

## Alternative APIs

Você acha que os componentes [ higher-order são os novos mixins ](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)? Rest assured we don't, however because `withStyles()` is a higher-order component, it can be extended with just a **few lines of code** to match different patterns that are all idiomatic React. Here are a couple of examples.

### Render props API (+11 lines)

The term [“render prop”](https://reactjs.org/docs/render-props.html) refers to a simple technique for sharing code between React components using a prop whose value is a function.

```jsx
// You will find the `createStyled` implementation in the source of the demo.
const Styled = createStyled({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
});

function RenderProps() {
  return (
    <Styled>
      {({ classes }) => (
        <Button className={classes.root}>
          {'Render props'}
        </Button>
      )}
    </Styled>
  );
}
```

{{"demo": "pages/customization/css-in-js/RenderProps.js"}}

Você pode acessar o tema da mesma maneira que faria com `withStyles`:

```js
const Styled = createStyled(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));
```

[@jedwards1211](https://github.com/jedwards1211) Has taken the time to move this module into a package: [material-ui-render-props-styles](https://github.com/jcoreio/material-ui-render-props-styles). Sinta-se livre para usá-lo.

### styled-components API (+15 linhas)

styled-components's API removes the mapping between components and styles. Using components as a low-level styling construct can be simpler.

```jsx
// You will find the `styled` implementation in the source of the demo.
// You can even write CSS with https://github.com/cssinjs/jss-template.
const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

function StyledComponents() {
  return <MyButton>{'Styled Components'}</MyButton>;
}
```

{{"demo": "pages/customization/css-in-js/StyledComponents.js"}}

Você pode acessar o tema da mesma maneira que faria com `withStyles`:

```js
const MyButton = styled(Button)(theme => ({
  backgroundColor: theme.palette.background.paper,
}));
```