# Perguntas Frequentes

<p class="description">Preso em um determinado problema? Confira primeiro algumas dicas nas Perguntas Frequentes.</p>

Se mesmo assim você não encontrar o que você está procurando, você pode consultar a nossa [página de suporte](/getting-started/support/).

## Material-UI é incrível. Como posso apoiar o projeto?

Existem muitas maneiras de apoiar o Material-UI:

- **Espalhe a palavra**. Evangelize Material-UI by [linking to material-ui.com](https://material-ui.com/) on your website, every backlink matters. Follow us on [Twitter](https://twitter.com/MaterialUI), like and retweet the important news. Or just talk about us with your friends.
- **Give us feedback**. Tell us what we're doing well or where we can improve. Please upvote (👍) the issues that you are the most interested in seeing solved.
- **Help new users**. You can answer questions on [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui).
- **Make changes happen**. 
  - Report bugs or missing features by [creating an issue](https://github.com/mui-org/material-ui/issues/new).
  - Reviewing and commenting on existing [pull requests](https://github.com/mui-org/material-ui/pulls) and [issues](https://github.com/mui-org/material-ui/issues).
  - Help [translate](https://translate.material-ui.com) the documentation.
  - Fixing bugs, adding features, and [improving our documentation](https://github.com/mui-org/material-ui/tree/master/docs) by [submitting a pull request](https://github.com/mui-org/material-ui/pulls).
- **Support us financially on [OpenCollective](https://opencollective.com/material-ui)**. If you use Material-UI in a commercial project and would like to support its continued development by becoming a Sponsor, or in a side or hobby project and would like to become a Backer, you can do so through OpenCollective. All funds donated are managed transparently, and Sponsors receive recognition in the README and on the Material-UI home page.

## Por que meus componentes não estão renderizando corretamente em compilações de produção?

Este é provavelmente o problema n° 1 que acontece devido a conflitos de nome de classe quando seu código está em um pacote de produção. Para que o Material-UI funcione, os valores do `className` de todos os componentes de uma página, devem ser gerados por uma única instância do [gerador de nome de classes](/styles/advanced/#class-names).

Para corrigir este problema, todos os componentes da página precisam ser inicializados, de modo que haja somente **um gerador de nome de classe** entre eles.

Você pode acabar usando acidentalmente dois geradores de nome de classe em vários cenários:

- Você acidentalmente **empacota** duas versões do Material-UI. Você pode ter nesse caso, uma dependência que não esta configurando corretamente o Material-UI.
- Você esta usando `StylesProvider` para um **subconjunto** da sua árvore de componentes React.
- Você está usando um empacotador (bundler) e está dividindo o código de uma maneira que faz com que várias instâncias do gerador de nome de classe sejam criadas.

> Se você estiver usando webpack com [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/), tente configurar o [`runtimeChunk` disponível em `optimizations`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk).

No geral, é simples livrar-se desse problema encapsulando cada aplicação Material-UI com componentes [`StylesProvider`](/styles/api/#stylesprovider), no topo de suas árvores de componentes **e usando um único gerador de nome de classe compartilhado entre eles**.

## Por que os elementos posicionados como fixos se movem quando um modal é aberto?

Scrolling is blocked as soon as a modal is opened. Isso evita a interação com o segundo plano quando o modal deve ser o único conteúdo interativo, no entanto, remover a barra de rolagem pode fazer com que seus **elementos posicionados como fixos** se movam. Nesta situação, você pode aplicar um nome de classe global `.mui-fixed ` para informar ao Material-UI para manipular esses elementos.

## Como posso desativar o efeito cascata globalmente?

O efeito cascata é exclusivamente proveniente do componente `BaseButton`. Você pode desativar o efeito cascata globalmente aplicando as seguintes configurações no seu tema:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  props: {
    // Nome do componente ⚛️
    MuiButtonBase: {
      // As propriedades para aplicar
      disableRipple: true, // Sem efeito cascata, em toda aplicação 💣!
    },
  },
});
```

## Como posso desativar as transições globalmente?

Material-UI uses the same theme helper for creating all its transitions. So you can disable all the transitions by overriding the helper in your theme:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  transitions: {
    // Então temos `transition: none;` em todo lugar
    create: () => 'none',
  },
});
```

It can be useful to disable transitions during visual testing or to improve performance on low-end devices.

You can go one step further by disabling all the transitions and animations effect:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️
    MuiCssBaseline: {
      // Name of the rule
      '@global': {
        '*, *::before, *::after': {
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
  },
});
```

Notice that the usage of `CssBaseline` is required for the above approach to work. If you choose not to use it, you can still disable transitions and animations by including these CSS rules:

```css
*, *::before, *::after {
  transition: 'none !important';
  animation: 'none !important';
}
```

## Preciso usar o JSS para estilizar minha aplicação?

Não, não é obrigatório. But this dependency comes built in, so carries no additional bundle size overhead.

Perhaps, however, you're adding some Material-UI components to an app that already uses another styling solution, or are already familiar with a different API, and don't want to learn a new one? Nesse caso, dirija-se à seção de [interoperabilidade da biblioteca de estilos](/guides/interoperability/), onde mostramos como é simples reestilizar os componentes do Material-UI com bibliotecas de estilos alternativas.

## Quando devo usar o estilo em linha vs CSS?

Como regra geral, use apenas o estilo em linha para propriedades de estilo dinâmicas. A alternativa de uso com CSS oferece mais vantagens, em:

- prefixação automática
- melhor depuração
- consultas de mídia (media queries)
- keyframes

## Como usar react-router?

We detail the [integration with third-party routing libraries](/guides/composition/#routing-libraries) like react-router, Gatsby or Next.js in our guide.

## Como posso acessar o elemento DOM?

Todos os componentes do Material-UI que devem renderizar algo no DOM possuem referencia para o componente DOM subjacente. Isso significa que você pode obter elementos DOM lendo o ref anexado aos componentes do Material-UI:

```jsx
// uma função setter ref
const ref = React.createRef();
// renderizando
<Button ref={ref} />;
// uso
const element = ref.current;
```

Se você não tem certeza se o componente do Material-UI em questão encaminha sua ref, você pode verificar a documentação da API em "Props" por exemplo, a API [Button API](/api/button/#props)

> O ref é encaminhado para o elemento raiz.

indicando que você pode acessar o elemento DOM como uma referência.

## Eu tenho várias instâncias de estilos na página

Se você está vendo uma mensagem de aviso no console como a abaixo, você provavelmente tem várias instâncias de `@material-ui/styles` inicializadas na página.

> It looks like there are several instances of `@material-ui/styles` initialized in this application. This may cause theme propagation issues, broken class names, specificity issues, and make your application bigger without a good reason.

### Possíveis razões

Existem várias razões comuns para isso acontecer:

- Você tem outra biblioteca `@material-ui/styles` em algum lugar das suas dependências.
- Você tem uma estrutura "monorepo" para seu projeto (e.g, lerna, yarn workspaces) e o módulo `@material-ui/styles` é uma dependência em mais de um pacote (este é mais ou menos o mesmo que o anterior).
- Você tem várias aplicações que estão usando `@material-ui/styles` executando na mesma página (por exemplo, vários pontos de entrada no webpack são carregados na mesma página).

### Módulo duplicado em node_modules

If you think that the issue may be in the duplication of the @material-ui/styles module somewhere in your dependencies, there are several ways to check this. Você pode usar os comandos `npm ls @material-ui/styles`, `yarn list @material-ui/styles` ou `find -L ./node_modules | grep /@material-ui/styles/package.json` na pasta da sua aplicação.

Se nenhum desses comandos identificou a duplicação, tente analisar seu pacote para encontrar instâncias duplicadas do @material-ui/styles. Você pode somente checar em fontes do seu pacote, ou usar uma ferramenta como [source-map-explorer](https://github.com/danvk/source-map-explorer) ou [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

Se você identificou que a duplicação é o problema que você esta enfrentando, há várias coisas que você pode tentar para resolvê-lo:

Se você está usando npm você pode tentar executar `npm dedupe`. Este comando pesquisa as dependências locais e tenta simplificar a estrutura movendo dependências comuns mais acima na árvore.

Se você estiver usando o webpack, você pode mudar a maneira como ele irá resolver ([resolve](https://webpack.js.org/configuration/resolve/#resolve-modules)) o módulo @material-ui/styles. Você pode sobrescrever a ordem padrão na qual o webpack irá procurar por suas dependências e tornar a pasta node_modules da sua aplicação, com maior prioridade do que a ordem de resolução de módulos padrão:

```diff
  resolve: {
+   alias: {
+     "@material-ui/styles": path.resolve(appFolder, "node_modules", "@material-ui/styles"),
+   }
  }
```

### Uso com Lerna

One possible fix to get @material-ui/styles to run in a Lerna monorepo across packages is to [hoist](https://github.com/lerna/lerna/blob/master/doc/hoist.md) shared dependencies to the root of your monorepo file. Tente executar a opção de auto inicialização com o parâmetro --hoist.

```sh
lerna bootstrap --hoist
```

Alternativamente, você pode remover a referência do @material-ui/styles do seu arquivo package.json e subir (hoist) ela manualmente para o arquivo package.json da pasta raiz do Lerna.

Exemplo de um arquivo package.json em uma pasta raiz do Lerna

```json
{
  "name": "my-monorepo",
  "devDependencies": {
    "lerna": "latest"
  },
  "dependencies": {
    "@material-ui/styles": "^4.0.0"
  },
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "clean": "lerna clean",
    "start": "lerna run start",
    "build": "lerna run build"
  }
}
```

### Executando múltiplas aplicações em uma única página

Se você tiver várias aplicações em execução em uma página, considere o uso de um único módulo @material-ui/styles para todas elas. Se você esta usando webpack, você pode usar [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) para criar de forma explícita um [vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), que conterá o módulo @material-ui/styles:

```diff
  module.exports = {
    entry: {
+     vendor: ["@material-ui/styles"],
      app1: "./src/app.1.js",
      app2: "./src/app.2.js",
    },
    plugins: [
+     new webpack.optimize.CommonsChunkPlugin({
+       name: "vendor",
+       minChunks: Infinity,
+     }),
    ]
  }
```

## Minha aplicaçao não é renderizada corretamente no servidor

Se isso não funcionar, em 99% dos casos é um problema de configuração. A missing property, a wrong call order, or a missing component – server-side rendering is strict about configuration, and the best way to find out what's wrong is to compare your project to an already working setup. Check out the [reference implementations](/guides/server-rendering/#reference-implementations), bit by bit.

### O CSS funciona apenas no primeiro carregamento, em seguida, para de funcionar

O CSS é gerado apenas no primeiro carregamento da página. Em seguida, o CSS não retorna do servidor para solicitações consecutivas.

#### Ação a tomar

The styling solution relies on a cache, the *sheets manager*, to only inject the CSS once per component type (if you use two buttons, you only need the CSS of the button one time). Você precisa criar **uma nova instância de `sheets` para cada requisição **.

*exemplo de correção:*

```diff
-// Crie uma instância de sheets.
-const sheets = new ServerStyleSheets();

function handleRender(req, res) {

+ // Crie uma instância de sheets.
+ const sheets = new ServerStyleSheets();

  //…

  // Renderize o componente para uma string.
  const html = ReactDOMServer.renderToString(
```

### React incompatibilidade de nome de classes na hidratação (React Hydrate)

Há uma incompatibilidade de nome de classe entre o cliente e o servidor. Pode funcionar para a primeira requisição. Outro sintoma é que o estilo muda entre o carregamento inicial da página e o download dos scripts do cliente.

#### Ação a tomar

O valor de nomes de classe depende da lógica empregada pelo [gerador de nome de classe](/styles/advanced/#class-names). A página inteira precisa ser renderizada com **um único gerador**. Este gerador precisa se comportar de forma idêntica no servidor e no cliente. Por exemplo:

- Você precisa fornecer um novo gerador de nome de classe para cada requisição. Mas você não deve compartilhar um `createGenerateClassName()` entre diferentes requisições:

*exemplo de correção:*

```diff
- // Cria um novo gerador de nome de classe.
-const generateClassName = createGenerateClassName();

function handleRender(req, res) {

+ // Cria um novo gerador de nome de classe.
+ const generateClassName = createGenerateClassName();

  //…

  // Renderize o componente para uma string.
  const html = ReactDOMServer.renderToString(
```

- Você precisa verificar se seu cliente e servidor estão executando o **exatamente a mesma versão** do Material-UI. É possível que uma incompatibilidade de versões menores possa causar problemas de estilo. Para verificar números de versão, execute `npm list @material-ui/core` no ambiente em que você cria sua aplicação e também em seu ambiente de implementação.
  
    Você também pode garantir a mesma versão em diferentes ambientes, definindo uma versão específica do MUI nas dependências do seu package.json.

*exemplo de correção (package.json):*

```diff
  "dependencies": {
    ...

-   "@material-ui/core": "^4.0.0",
+   "@material-ui/core": "4.0.0",
    ...
  },
```

- Você precisa ter certeza de que o servidor e o cliente compartilham o mesmo valor de `process.env.NODE_ENV`.

## Por que as cores que estou vendo são diferentes do que vejo aqui?

O site de documentação está usando um tema customizado. Assim, a paleta de cores é diferente do tema padrão que é fornecido pelo Material-UI. Por favor, consulte [esta página](/customization/theming/) para aprender sobre customização de temas.

## Por que o componente X requer um nó DOM em um prop em vez de um objeto ref?

Componentes como [Portal](/api/portal/#props) ou [Popper](/api/popper/#props) requer um nó DOM na propriedade `container` ou `anchorEl` respectivamente. Parece conveniente simplesmente passar um objeto ref nessas propriedades e deixar o Material-UI acessar o valor atual. Isso funciona em um cenário simples:

```jsx
function App() {
  const container = React.useRef(null);

  return (
    <div className="App">
      <Portal container={container}>
        <span>portaled children</span>
      </Portal>
      <div ref={container} />
    </div>
  );
}
```

onde `Portal` só montaria os filhos no container quando `container.current` estiver disponível. Aqui está uma implementação ingênua do Portal:

```jsx
function Portal({ children, container }) {
  const [node, setNode] = React.useState(null);

  React.useEffect(() => {
    setNode(container.current);
  }, [container]);

  if (node === null) {
    return null;
  }
  return ReactDOM.createPortal(children, node);
}
```

Com esta simples heurística `Portal` pode renderizar novamente depois de montado porque os refs estão atualizados antes de qualquer efeito ser executado. No entanto, só porque um ref está atualizado não significa que ele aponta para uma instância definida. Se o ref estiver anexado a um componente de encaminhamento de ref não estará claro quando o nó DOM estará disponível. In the example above, the `Portal` would run an effect once, but might not re-render because `ref.current` is still `null`. This is especially apparent for React.lazy components in Suspense. A implementação acima também não poderia explicar uma alteração no nó DOM.

É por isso que precisamos de uma propriedade com o nó DOM real para que o React possa tomar cuidado ao determinar quando o `Portal` deve renderizar novamente:

```jsx
function App() {
  const [container, setContainer] = React.useState(null);
  const handleRef = React.useCallback(instance => setContainer(instance), [setContainer])

  return (
    <div className="App">
      <Portal container={container}>
        <span>Portaled</span>
      </Portal>
      <div ref={handleRef} />
    </div>
  );
}
```

## Para que serve a dependência do clsx?

[clsx](https://github.com/lukeed/clsx) is a tiny utility for constructing `className` strings conditionally.

Em vez de escrever:

```jsx
return (
  <div
    className={`MuiButton-root ${disabled ? 'Mui-disabled' : ''} ${selected ? 'Mui-selected' : ''}`}
  />
);
```

você pode fazer:

```jsx
import clsx from 'clsx';

return (
  <div
    className={clsx('MuiButton-root', {
      'Mui-disabled': disabled,
      'Mui-selected': selected,
    })}
  />
);
```