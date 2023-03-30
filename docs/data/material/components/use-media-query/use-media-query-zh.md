---
product: material-ui
title: 用于响应式设计的 React 中的媒体查询
githubLabel: 'hook: useMediaQuery'
---

# useMediaQuery

<p class="description">这是 React 的 CSS 媒体查询 （Media queries）hook。 它监听与 CSS 媒体查询的匹配的内容。 它允许根据查询的结果是否匹配来渲染组件。</p>

以下是一些重要的特点：

- ⚛️ 它有一个符合用户使用习惯的 React API。
- 🚀 它是高性能的，原理是通过观测文档的媒体查询值发生更改，而不是使用定期轮询的方法来监听其结果。
- 📦 [1 kB gzipped](/size-snapshot/).
- 🤖 它支持服务器端渲染。

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## 简单的媒体查询

你应该将媒体查询提供给 hook 作为第一个参数。 The media query string can be any valid CSS media query, e.g. [`'(prefers-color-scheme: dark)'`](/material-ui/customization/dark-mode/#system-preference).

{{"demo": "SimpleMediaQuery.js", "defaultCodeOpen": true}}

⚠️ 由于每个浏览器的限制，你不能使用 `'print'`，例如 [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=774398) 上的这个问题。

## 使用 Material-UI 的断点辅助功能

You can use MUI's [breakpoint helpers](/material-ui/customization/breakpoints/) as follows:

```jsx
import { useTheme } from '@mui/core/styles';
import useMediaQuery from '@mui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

{{"demo": "ThemeHelper.js", "defaultCodeOpen": false}}

或者你也可以使用一个回调函数，其第一个参数是 theme：

```jsx
import useMediaQuery from '@mui/core/useMediaQuery';

function MyComponent() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

⚠️ 由于这个方法**没有默认的**主题支持，所以你必须将它注入到父级主题提供者（parent theme provider）中。

## 使用 JavaScript 的语法

你可以使用 [json2mq](https://github.com/akiran/json2mq) 来从 JavaScript 对象中生成媒体查询字符串。

{{"demo": "JavaScriptMedia.js", "defaultCodeOpen": true}}

## 测试

你需要在测试环境中实现 [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)。

例如：[暂时还不支持 jsdom](https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom)。 所以你应来兼容（polyfill）它。 我们推荐使用 [css-mediaquery](https://github.com/ericf/css-mediaquery) 来创造一个模拟环境从而达到兼容的目的。

```js
import mediaQuery from 'css-mediaquery';

function createMatchMedia(width) {
  return (query) => ({
    matches: mediaQuery.match(query, {
      width,
    }),
    addListener: () => {},
    removeListener: () => {},
  });
}

describe('MyTests', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });
});
```

## 仅在客户端渲染

要和服务器进行同步使用（hydration），hook 需要渲染两次。 第一次使用 `false` 表示服务端的值，第二次使用已解析的值。 这个双向渲染周期带有一个缺点。 速度较慢。 如果你只需要**客户端渲染**，那么你可以设置 `noSsr` 选项为 `true`。

```js
const matches = useMediaQuery('(min-width:600px)', { noSsr: true });
```

或者你可以通过全局主题设置来启用它：

```js
const theme = createTheme({
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
  },
});
```

## 服务端渲染

:::warning
⚠️ Server-side rendering and client-side media queries are fundamentally at odds.
Be aware of the tradeoff. The support can only be partial.
:::

Try relying on client-side CSS media queries first. For instance, you could use:

- [`<Box display>`](/system/display/#hiding-elements)
- [`themes.breakpoints.up(x)`](/material-ui/customization/breakpoints/#css-media-queries)
- or [`sx prop`](/system/getting-started/the-sx-prop/)

If none of the above alternatives are an option, you can proceed reading this section of the documentation.

First, you need to guess the characteristics of the client request, from the server. You have the choice between using:

- **用户代理（User agent）**。 解析客户端上用户代理的字符串来提取信息。 我们推荐使用 [ua-parser-js](https://github.com/faisalman/ua-parser-js) 来解析用户代理信息。
- **客户端提示（Client hints）**。 读取客户端向服务器发送的提示。 请注意，[并不是所有浏览器都会支持](https://caniuse.com/#search=client%20hint) 此功能。

Finally, you need to provide an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to the `useMediaQuery` with the previously guessed characteristics. Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate matchMedia is recommended.

For instance on the server-side:

```js
import * as ReactDOMServer from 'react-dom/server';
import parser from 'ua-parser-js';
import mediaQuery from 'css-mediaquery';
import { ThemeProvider } from '@mui/core/styles';

function handleRender(req, res) {
  const deviceType = parser(req.headers['user-agent']).device.type || 'desktop';
  const ssrMatchMedia = (query) => ({
    matches: mediaQuery.match(query, {
      // 浏览器的 CSS 宽度预计值
      width: deviceType === 'mobile' ? '0px' : '1024px',
    }),
  });

  const html = ReactDOMServer.renderToString(
    <ThemeProvider
      theme={{
        props: {
          // 更改 useMediaQuery 的默认选项
          MuiUseMediaQuery: {
            ssrMatchMedia,
          },
        },
      }}
    >
      <App />
    </ThemeProvider>,
  );

  // …
}
      width: deviceType === 'mobile' ? '0px' : '1024px',
    }),
  });

  const html = ReactDOMServer.renderToString(
    <ThemeProvider
      theme={{
        props: {
          // 更改 useMediaQuery 的默认选项
          MuiUseMediaQuery: {
            ssrMatchMedia,
          },
        },
      }}
    >
      <App />
    </ThemeProvider>,
  );

  // …
}
      width: deviceType === 'mobile' ? '0px' : '1024px',
    }),
  });

  const theme = createTheme({
    components: {
      // Change the default options of useMediaQuery
      MuiUseMediaQuery: {
        defaultProps: {
          ssrMatchMedia,
        },
      },
    },
  });

  const html = ReactDOMServer.renderToString(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
  );

  // …
}
```

{{"demo": "ServerSide.js", "defaultCodeOpen": false}}

Make sure you provide the same custom match media implementation to the client-side to guarantee a hydration match.

## 从 `withWidth()` 迁移

The `withWidth()` higher-order component injects the screen width of the page. You can reproduce the same behavior with a `useWidth` hook:

{{"demo": "UseWidth.js"}}

## API

### `useMediaQuery(query, [options]) => matches`

#### 参数

1. `query` (_string_ | _func_): A string representing the media query to handle or a callback function accepting the theme (in the context) that returns a string.
2. `options` (_object_ [optional]):

- `options.defaultMatches` (_bool_ [optional]): As `window.matchMedia()` is unavailable on the server, we return a default matches during the first mount. 默认值为 `false`。 默认值为 `false`。
- `options.matchMedia` (_func_ [optional]): You can provide your own implementation of _matchMedia_. 用其您可以处理一个 iframe 内容窗口。 用其您可以处理一个 iframe 内容窗口。
- `options.noSsr` (_bool_ [optional])：默认为 `false`。 要和服务器进行同步使用（hydration），hook 需要渲染两次。 A first time with `false`, the value of the server, and a second time with the resolved value. 这个双向渲染周期带有一个缺点。 速度较慢。 如果你只需要 **客户端**渲染，那么可以将该选项设置为 `true`。
- `options.ssrMatchMedia` (_func_ [optional]): You can provide your own implementation of _matchMedia_ in a [server-side rendering context](#server-side-rendering).

Note: You can change the default options using the [`default props`](/material-ui/customization/theme-components/#default-props) feature of the theme with the `MuiUseMediaQuery` key.

#### 返回结果

`matches`: Matches is `true` if the document currently matches the media query and `false` when it does not.

#### 例子

```jsx
import * as React from 'react';
import useMediaQuery from '@mui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}
```
