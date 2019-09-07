# Часто задаваемые вопросы (FAQ)

<p class="description">Столкнулись с особой проблемой? Check some of these common gotchas first in the FAQ.</p>

Если вы все еще не можете найти то, что ищете, вы можете задать вопрос сообществу в [Spectrum](https://spectrum.chat/material-ui). Для практических и других вопросов, пожалуйста, используйте [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) вместо вопросов на Github. На StackOverflow существует тег `material-ui`, который вы можете использовать для ваших вопросов.

## Почему мои компоненты не отображаются корректно в продакшн сборках?

Скорее всего проблема возникает из-за конфликта имен классов, когда ваш код находится в продакшн пакете. Чтобы Material-UI работал, значения `className` всех компонентов на странице должны генерироваться одним экземпляром [генератора имен классов](/styles/advanced/#class-names).

Чтобы исправить эту проблему, все компоненты на странице должны быть инициализированы так, чтобы между ними был только **один генератор имен классов**.

Два генератора имен классов вы можете получить в различных сценариях:

- Вы случайно используете две версии Material-UI в **пакете**. Возможно, у вас есть зависимость, неправильно устанавливающая Material-UI в качестве одноранговой зависимости.
- Вы используете `StylesProvider` для **подмножества** вашего Реактивного Дерева.
- Вы используете сборщик, и он разбивает код таким образом, что создает несколько экземпляров генератора имен классов.

> Если вы используете webpack с [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/), попробуйте настроить [`runtimeChunk` в секции `optimizations`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk).

В целом, можно легко справиться с этой проблемой, обернув каждое приложение Material-UI компонентом [`StylesProvider`](/styles/api/#stylesprovider) в корне их дерева компонентов **и используя один генератор имен классов, который совместно используется между ними**.

## Why do the fixed positioned elements move when a modal is opened?

Scroll is blocked as soon as a modal is opened. This prevents interacting with the background when the modal should be the only interactive content, however, removing the scrollbar can make your **fixed positioned elements** move. In this situation, you can apply a global `.mui-fixed` class name to tell Material-UI to handle those elements.

## How can I disable the ripple effect globally?

The ripple effect is exclusively coming from the `BaseButton` component. You can disable the ripple effect globally by providing the following in your theme:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});
```

## Как я могу отключить transitions глобально?

You can disable transitions globally by providing the following in your theme:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  transitions: {
    // Então temos `transition: none;` everywhere
    create: () => 'none',
  },
});
```

Sometimes you will want to enable this behavior conditionally, for instance during testing or on low-end devices, in these cases, you can dynamically change the theme value.

You can go one step further by disabling all the transitions, animations and the ripple effect:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => 'none',
  },
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
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application!
    },
  },
});
```

## Должен ли я использовать JSS для стилизации своего приложения?

No, it's not required. But this dependenency comes built in, so carries no additional bundle size overhead.

However perhaps you're adding some Material-UI components to an app that already uses another styling solution, or are already familiar with a different API, and don't want to learn a new one? In that case, head over to the [Style Library Interoperability](/guides/interoperability/) section, where we show how simple it is to restyle Material-UI components with alternative style libraries.

## When should I use inline-style vs CSS?

As a rule of thumb, only use inline-style for dynamic style properties. The CSS alternative provides more advantages, such as:

- auto-prefixing
- better debugging
- медиа-запросы
- ключевые кадры

## Как мне использовать react-router?

How to use a [third-party routing library](/components/buttons/#third-party-routing-library) is documented with the `ButtonBase` component. A lot of the interactive components use it internally: `Link`, `Button`, `MenuItem`, `<ListItem button />`, `Tab`, etc. Вы можете использовать то же решение с ними.

## Как я могу получить доступ к элементу DOM?

All Material-UI components that should render something in the DOM forward their ref to the underlying DOM component. This means that you can get DOM elements by reading the ref attached to Material-UI components:

```jsx
// or a ref setter function
const ref = React.createRef();
// render
<Button ref={ref} />;
// usage
const element = ref.current;
```

If you're not sure if the Material-UI component in question forwards its ref you can check the API documentation under "Props" e.g. the [Button API](/api/button/#props) includes

> The ref is forwarded to the root element.

indicating that you can access the DOM element with a ref.

## I have several instances of styles on the page

If you are seeing a warning message in the console like the one below, you probably have several instances of `@material-ui/styles` initialized on the page.

> It looks like there are several instances of `@material-ui/styles` initialized in this application. This may cause theme propagation issues, broken class names, specificity issues, and makes your application bigger without a good reason.

### Возможные причины

Существует несколько распространенных причин для этого:

- You have another `@material-ui/styles` library somewhere in your dependencies.
- You have a monorepo structure for your project (e.g, lerna, yarn workspaces) and `@material-ui/styles` module is a dependency in more than one package (this one is more or less the same as the previous one).
- You have several applications that are using `@material-ui/styles` running on the same page (e.g., several entry points in webpack are loaded on the same page).

### Duplicated module in node_modules

If you think that the issue is in duplicated @material-ui/styles module somewhere in your dependencies, there are several ways to check this. You can use `npm ls @material-ui/styles`, `yarn list @material-ui/styles` or `find -L ./node_modules | grep /@material-ui/styles/package.json` commands in your application folder.

If none of these commands identified the duplication, try analyzing your bundle for multiple instances of @material-ui/styles. You can just check your bundle source, or use a tool like [source-map-explorer](https://github.com/danvk/source-map-explorer) or [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

If you identified that duplication is the issue that you are encountering there are several things you can try to solve it:

If you are using npm you can try running `npm dedupe`. This command searches the local dependencies and tries to simplify the structure by moving common dependencies further up the tree.

If you are using webpack, you can change the way it will [resolve](https://webpack.js.org/configuration/resolve/#resolve-modules) the @material-ui/styles module. You can overwrite the default order in which webpack will look for your dependencies and make your application node_modules more prioritized than default node module resolution order:

```diff
  resolve: {
+   alias: {
+     "@material-ui/styles": path.resolve(appFolder, "node_modules", "@material-ui/styles"),
+   }
  }
```

### Usage with Lerna

One possible fix to get @material-ui/styles to run in a Lerna monorepo across packages, is to [hoist](https://github.com/lerna/lerna/blob/master/doc/hoist.md) shared dependencies to the root of your monorepo file. Try running the bootstrap option with the --hoist flag.

```sh
lerna bootstrap --hoist
```

Alternatively, you can remove @material-ui/styles from your package.json file and hoist it manually to your top-level package.json file.

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

### Running multiple applications on one page

If you have several applications running on one page, consider using one @material-ui/styles module for all of them. If you are using webpack, you can use [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) to create an explicit [vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), that will contain the @material-ui/styles module:

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

## My App doesn't render correctly on the server

If it doesn't work, in 99% of cases it's a configuration issue. A missing property, a wrong call order, or a missing component. Server side rendering is strict about configuration, and the best way to find out what's wrong is to compare your project to an already working setup, check out the [reference implementations](/guides/server-rendering/#reference-implementations), bit by bit.

### CSS works only on first load then is missing

The CSS is only generated on the first load of the page. Then, the CSS is missing on the server for consecutive requests.

#### Action to Take

The styling solution relies on a cache, the *sheets manager*, to only inject the CSS once per component type (if you use two buttons, you only need the CSS of the button one time). You need to create **a new `sheets` instance for each request**.

*example of fix:*

```diff
-// Create a sheets instance.
-const sheets = new ServerStyleSheets();

function handleRender(req, res) {

+ // Create a sheets instance.
+ const sheets = new ServerStyleSheets();

  //…

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
```

### React class name hydration mismatch

There is a class name mismatch between the client and the server. It might work for the first request. Another symptom is that the styling changes between initial page load and the downloading of the client scripts.

#### Action to Take

The class names value relies on the concept of [class name generator](/styles/advanced/#class-names). The whole page needs to be rendered with **a single generator**. This generator needs to behave identically on the server and on the client. For instance:

- You need to provide a new class name generator for each request. But you shouldn't share a `createGenerateClassName()` between different requests:

*example of fix:*

```diff
-// Create a new class name generator.
-const generateClassName = createGenerateClassName();

function handleRender(req, res) {

+ // Create a new class name generator.
+ const generateClassName = createGenerateClassName();

  //…

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
```

- You need to verify that your client and server are running the **exactly the same version** of Material-UI. It is possible that a mismatch of even minor versions can cause styling problems. To check version numbers, run `npm list @material-ui/core` in the environment where you build your application and also in your deployment environment.
    
    You can also ensure the same version in different environments by specifying a specific MUI version in the dependencies of your package.json.

*example of fix (package.json):*

```diff
  "dependencies": {
    ...

-   "@material-ui/core": "^4.0.0",
+   "@material-ui/core": "4.0.0",
    ...
  },
```

- You need to make sure that the server and the client share the same `process.env.NODE_ENV` value.

## Why are the colors I am seeing different from what I see here?

Сайт документации использует пользовательскую тему. Следовательно, цветовая палитра отличается от темы по умолчанию, которую поставляет Material-UI. Пожалуйста, обратитесь к [этой странице](/customization/theming/), чтобы узнать о настройке темы.

## Material-UI потрясающий. Как я могу поддержать проект?

Есть несколько способов, чтобы поддержать Material-UI:

- Улучшить [документацию](https://github.com/mui-org/material-ui/tree/master/docs).
- Помочь другим начать.
- [Распространять информацию](https://twitter.com/MaterialUI).
- Отвечать на вопросы на [и StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) или [Spectrum](https://spectrum.chat/material-ui).

Если вы используете Material-UI в коммерческом проекте и хотели бы поддержать его дальнейшее развитие, став **спонсором**, или в стороннем или хобби-проекте, и хотели бы поддержать, вы можете сделать это через [OpenCollective](https://opencollective.com/material-ui).

All funds raised are managed transparently, and Sponsors receive recognition in the README and on the Material-UI home page.

## Why does component X require a DOM node in a prop instead of a ref object?

Components like the [Portal](/api/portal/#props) or [Popper](/api/popper/#props) require a DOM node in the `container` or `anchorEl` prop respectively. It seems convenient to simply pass a ref object in those props and let Material-UI access the current value. This works in a simple scenario:

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

With this simple heuristic `Portal` might re-render after it mounts because refs are up-to-date before any effects run. However, just because a ref is up-to-date doesn't mean it points to a defined instance. If the ref is attached to a ref forwarding component it is not clear when the DOM node will be available. In the above example the `Portal` would run run an effect once but might not re-render because `ref.current` is still `null`. This is especially apparent for React.lazy components in Suspense. The above implementation could also not account for a change in the DOM node.

This is why we require a prop with the actual DOM node so that React can take care of determining when the `Portal` should re-render:

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

## What's the clsx dependency for?

[clsx](https://github.com/lukeed/clsx) is a tiny utility for constructing `className` strings conditionally.

Instead of writing:

```jsx
return (
  <div
    className={`MuiButton-root ${disabled ? 'Mui-disabled' : ''} ${selected ? 'Mui-selected' : ''}`}
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