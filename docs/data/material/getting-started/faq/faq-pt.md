# Perguntas Frequentes

<p class="description">Preso em um determinado problema? Confira primeiro algumas dicas nas Perguntas Frequentes.</p>

If you still can't find what you're looking for, you can refer to our [support page](/material-ui/getting-started/support/).

## MUI is awesome. Como posso apoiar o projeto?

Existem muitas maneiras de apoiar o Material-UI:

- **Espalhe a palavra**. Evangelize Material-UI [vinculando o material-ui.com](https://material-ui.com/) no seu site, todo backlink conta. Siga-nos no [Twitter](https://twitter.com/MaterialUI), curta e retuíte as notícias importantes. Ou apenas fale sobre nós com os seus amigos.
- **Dê-nos sua opinião**. Conte-nos o que estamos fazendo bem ou onde podemos melhorar. Por favor vote (👍) nos issues do GitHub que você está mais interessado em ver resolvidos.
- **Ajude novos usuários**. You can answer questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/mui).
- **Faça as alterações acontecerem**.
  - Edite a documentação. Cada página da versão em inglês tem um link "EDIT THIS PAGE" no canto superior direito.
  - Reporte erros ou recursos faltantes [criando uma issue](https://github.com/mui/material-ui/issues/new).
  - Revise e comente em [pull requests](https://github.com/mui/material-ui/pulls) e [issues](https://github.com/mui/material-ui/issues) existentes.
  - Ajude a [traduzir](https://translate.mui.com) a documentação.
  - [Improve our documentation](https://github.com/mui/material-ui/tree/HEAD/docs), fix bugs, or add features by [submitting a pull request](https://github.com/mui/material-ui/pulls).
- **Support us financially on [OpenCollective](https://opencollective.com/mui)**. Se você usa Material-UI em um projeto comercial e gostaria de apoiar seu desenvolvimento contínuo tornando-se um Patrocinador, ou em um projeto freelancer ou hobby e gostaria de se tornar um Apoiador, você pode se tornar através do OpenCollective. Todos os fundos doados são geridos de forma transparente e os Patrocinadores recebem reconhecimento no README e na página inicial do Material-UI.

## Por que meus componentes não estão renderizando corretamente em compilações de produção?

A rolagem é bloqueada assim que um modal é aberto. Isto impede a interação com o segundo plano, pois o modal deve ser o único conteúdo interativo. No entanto, removendo a barra de rolagem pode fazer com que seus **elementos fixos posicionados** se movam. Nesta situação, você pode aplicar um nome de classe global `.mui-fixed` para informar ao Material-UI para manipular esses elementos.

## Por que os elementos posicionados como fixos se movem quando um modal é aberto?

O efeito cascata é exclusivamente proveniente do componente `BaseButton`. Você pode desativar o efeito cascata globalmente aplicando as seguintes configurações no seu tema:

```js
import { createTheme } from '@material-ui/core';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
  },
});
```

## Como posso desativar o efeito cascata globalmente?

Material-UI usa o mesmo auxiliar de tema para criar todas as transições. Portanto, você pode desativar todas as transições substituindo o auxiliar no seu tema:

```js
import { createTheme } from '@material-ui/core';

const theme = createTheme({
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => 'none',
  },
});
```

No geral, é simples livrar-se desse problema encapsulando cada aplicação Material-UI com componentes [`StylesProvider`](/styles/api/#stylesprovider), no topo de suas árvores de componentes** e usando um único gerador de nome de classe compartilhado entre eles**.

Você pode ir além, desabilitando todas as transições e efeitos de animações:

```js
import { createTheme } from '@material-ui/core';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
  },
});
```

Observe que o uso de `CssBaseline` é necessário para que a abordagem acima funcione. Se você optar por não usá-lo, você ainda pode desabilitar transições e animações incluindo estas regras CSS:

```css
*,
*::before,
*::after {
  transition: 'none !important';
  animation: 'none !important';
}
```

## Do I have to use Emotion to style my app?

Não, não é obrigatório. But if you are using the default styled engine (`@mui/styled-engine`) the Emotion dependency comes built in, so carries no additional bundle size overhead.

No entanto, talvez você esteja adicionando os componentes Material-UI para uma aplicação que já usa outra solução de estilos, ou, já esta familiarizado com uma API diferente e não quer aprender uma nova? In that case, head over to the [Style library interoperability](/material-ui/guides/interoperability/) section, where we show how simple it is to restyle MUI components with alternative style libraries.

## When should I use inline-style vs. CSS?

Como regra geral, use apenas o estilo em linha para propriedades de estilo dinâmicas. A alternativa de uso com CSS oferece mais vantagens, em:

- auto-prefixing
- Você esta usando `StylesProvider` para um **subconjunto** da sua árvore de componentes React.
- Você está usando um empacotador (bundler) e está dividindo o código de uma maneira que faz com que várias instâncias do gerador de nome de classe sejam criadas.
- keyframes

## How do I use react-router?

We detail the [integration with third-party routing libraries](/material-ui/guides/routing/) like react-router, Gatsby or Next.js in our guide.

## Como usar react-router?

Todos os componentes do Material-UI que devem renderizar algo no DOM possuem referência para o componente DOM subjacente. Isso significa que você pode obter elementos DOM lendo o ref anexado aos componentes do Material-UI:

```jsx
// uma função setter ref
const ref = React.createRef();
// renderizando
<Button ref={ref} />;
// uso
const element = ref.current;
```

If you're not sure if the MUI component in question forwards its ref you can check the API documentation under "Props" e.g. the [Button API](/material-ui/api/button/#props) includes

:::info
The ref is forwarded to the root element.
:::

indicating that you can access the DOM element with a ref.

## Como posso acessar o elemento DOM?

If you are seeing a warning message in the console like the one below, you probably have several instances of `@mui/styles` initialized on the page.

:::warning
It looks like there are several instances of `@mui/styles` initialized in this application. This may cause theme propagation issues, broken class names, specificity issues, and make your application bigger without a good reason.
:::

### Possíveis razões

There are several common reasons for this to happen:

- prefixação automática
- melhor depuração
- consultas de mídia

### Módulo duplicado em node_modules

If you think that the issue may be in the duplication of the @mui/styles module somewhere in your dependencies, there are several ways to check this. You can use `npm ls @mui/styles`, `yarn list @mui/styles` or `find -L ./node_modules | grep /@mui/styles/package.json` commands in your application folder.

If none of these commands identified the duplication, try analyzing your bundle for multiple instances of @mui/styles. You can just check your bundle source, or use a tool like [source-map-explorer](https://github.com/danvk/source-map-explorer) or [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

If you identified that duplication is the issue that you are encountering there are several things you can try to solve it:

If you are using npm you can try running `npm dedupe`. This command searches the local dependencies and tries to simplify the structure by moving common dependencies further up the tree.

If you are using webpack, you can change the way it will [resolve](https://webpack.js.org/configuration/resolve/#resolve-modules) the @mui/styles module. You can overwrite the default order in which webpack will look for your dependencies and make your application node_modules more prioritized than default node module resolution order:

```diff
  resolve: {
+   alias: {
+     "@material-ui/styles": path.resolve(appFolder, "node_modules", "@material-ui/styles"),
+   }
  }
```

### Uso com Lerna

One possible fix to get @mui/styles to run in a Lerna monorepo across packages is to [hoist](https://github.com/lerna/lerna/blob/HEAD/doc/hoist.md) shared dependencies to the root of your monorepo file. Try running the bootstrap option with the --hoist flag.

```sh
lerna bootstrap --hoist
```

Alternatively, you can remove @mui/styles from your package.json file and hoist it manually to your top-level package.json file.

Example of a package.json file in a Lerna root folder

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

If you have several applications running on one page, consider using one @mui/styles module for all of them. If you are using webpack, you can use [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) to create an explicit [vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), that will contain the @mui/styles module:

```diff
  module.exports = {
    entry: {
+     vendor: ["@material-ui/styles"],
      app1: "./src/app.1.js",
      app2: "./src/app.2.js",
    },
    plugins: [
+     new webpack.optimize. CommonsChunkPlugin({
+       name: "vendor",
+       minChunks: Infinity,
+     }),
    ]
  }
```

## Eu tenho várias instâncias de estilos na página

If it doesn't work, in 99% of cases it's a configuration issue. A missing property, a wrong call order, or a missing component – server-side rendering is strict about configuration.

The best way to find out what's wrong is to compare your project to an **already working setup**. Check out the [reference implementations](/material-ui/guides/server-rendering/#reference-implementations), bit by bit.

## Minha aplicação não é renderizada corretamente no servidor

The documentation site is using a custom theme. Hence, the color palette is different from the default theme that MUI ships. Please refer to [this page](/material-ui/customization/theming/) to learn about theme customization.

## Por que as cores que estou vendo são diferentes das que vejo aqui?

Components like the [Portal](/base/api/portal/#props) or [Popper](/material-ui/api/popper/#props) require a DOM node in the `container` or `anchorEl` prop respectively. It seems convenient to simply pass a ref object in those props and let MUI access the current value. This works in a simple scenario:

```jsx
function App() {
  const container = React.useRef(null);

  return (
    <div className="App">
      <Portal container={container}>
        <span>Componente filho portado</span>
      </Portal>
      <div ref={container} />
    </div>
  );
}
```

where `Portal` would only mount the children into the container when `container.current` is available. Here is a naive implementation of Portal:

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

With this simple heuristic `Portal` might re-render after it mounts because refs are up-to-date before any effects run. However, just because a ref is up-to-date doesn't mean it points to a defined instance. If the ref is attached to a ref forwarding component it is not clear when the DOM node will be available. In the example above, the `Portal` would run an effect once, but might not re-render because `ref.current` is still `null`. This is especially apparent for React.lazy components in Suspense. The above implementation could also not account for a change in the DOM node.

This is why we require a prop with the actual DOM node so that React can take care of determining when the `Portal` should re-render:

```jsx
function App() {
  const [container, setContainer] = React.useState(null);
  const handleRef = React.useCallback(
    (instance) => setContainer(instance),
    [setContainer],
  );

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

## Por que o componente X requer um nó DOM em uma propriedade em vez de um objeto ref?

[clsx](https://github.com/lukeed/clsx) is a tiny utility for constructing `className` strings conditionally, out of an object with keys being the class strings, and values being booleans.

Instead of writing:

```jsx
// let disabled = false, selected = true;

return (
  <div
    className={`MuiButton-root ${disabled ? 'Mui-disabled' : ''} ${selected ? 'Mui-selected' : ''
    }`}
  />
);
```

you can do:

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

## I cannot use components as selectors in the styled() utility. What should I do?

If you are getting the error: `TypeError: Cannot convert a Symbol value to a string`, take a look at the [styled()](/system/styled/#how-to-use-components-selector-api) docs page for instructions on how you can fix this.

## [v4] Why aren't my components rendering correctly in production builds?

The #1 reason this happens is likely due to class name conflicts once your code is in a production bundle. For MUI to work, the `className` values of all components on a page must be generated by a single instance of the [class name generator](/system/styles/advanced/#class-names).

To correct this issue, all components on the page need to be initialized such that there is only ever **one class name generator** among them.

You could end up accidentally using two class name generators in a variety of scenarios:

- Você acidentalmente **empacota** duas versões do Material-UI. Você pode ter nesse caso, uma dependência que não esta configurando corretamente o Material-UI.
- Você tem uma estrutura "monorepo" para seu projeto (por exemplo, lerna, yarn workspaces) e o módulo `@material-ui/styles` é uma dependência em mais de um pacote (este é mais ou menos o mesmo que o anterior).
- Você tem várias aplicações que estão usando `@material-ui/styles` executando na mesma página (por exemplo, vários pontos de entrada no webpack são carregados na mesma página).

:::info
💡 If you are using webpack with the [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/), try configuring the [`runtimeChunk` setting under `optimizations`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk).
:::

Overall, it's simple to recover from this problem by wrapping each MUI application with [`StylesProvider`](/system/styles/api/#stylesprovider) components at the top of their component trees **and using a single class name generator shared among them**.

### O CSS funciona apenas no primeiro carregamento, em seguida, para de funcionar

The CSS is only generated on the first load of the page. Then, the CSS is missing on the server for consecutive requests.

#### Ação a tomar

The styling solution relies on a cache, the _sheets manager_, to only inject the CSS once per component type (if you use two buttons, you only need the CSS of the button one time). You need to create **a new `sheets` instance for each request**.

Example of fix:

```diff
-// Crie uma instância de sheets.
-const sheets = new ServerStyleSheets();

function handleRender(req, res) {

+ // Crie uma instância de sheets.
+ const sheets = new ServerStyleSheets();

  //…

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
```

### React incompatibilidade de nome de classes na hidratação (React Hydrate)

:::warning
**⚠️ Warning**

Prop className did not match.
:::

There is a class name mismatch between the client and the server. It might work for the first request. Another symptom is that the styling changes between initial page load and the downloading of the client scripts.

#### Ação a tomar

The class names value relies on the concept of [class name generator](/system/styles/advanced/#class-names). The whole page needs to be rendered with **a single generator**. This generator needs to behave identically on the server and on the client. For instance:

- Você precisa fornecer um novo gerador de nome de classe para cada requisição. Mas você não deve compartilhar um `createGenerateClassName()` entre diferentes requisições:

  exemplo de correção:

  ```diff
  - // Crie um novo gerador de nome de classe.
  -const generateClassName = createGenerateClassName();

  function handleRender(req, res) {
  + // Create a new class name generator.
  -const generateClassName = createGenerateClassName();

    // Renderize o componente para uma string.
    const html = ReactDOMServer.renderToString(
  ```

- Você precisa verificar se seu cliente e servidor estão executando o **exatamente a mesma versão** do Material-UI. É possível que uma incompatibilidade de versões menores possa causar problemas de estilo. Para verificar números de versão, execute `npm list @material-ui/core` no ambiente em que você cria sua aplicação e também em seu ambiente de implementação.

  Você também pode garantir a mesma versão em diferentes ambientes, definindo uma versão específica do MUI nas dependências do seu package.json.

  _exemplo de correção (package.json):_

  ```diff
    "dependencies": {
      ...
  -   "@mui/material": "^4.0.0",
  +   "@mui/material": "4.0.0",
      ...
    },
  ```

- Você precisa ter certeza de que o servidor e o cliente compartilhem o mesmo valor de `process.env.NODE_ENV`.
