---
title: React中的媒体查询用于响应式设计
---

# useMediaQuery

<p class="description">这是React的CSS媒体查询钩子。 它侦听与CSS媒体查询的匹配。 它允许根据查询是否匹配来呈现组件。</p>

一些重要特点：

- ⚛️它有一个惯用的React API。
- 🚀它具有高性能，它会观察文档以检测其媒体查询何时发生更改，而不是定期轮询值。
- 📦 [1 kB gzipped](/size-snapshot).
- 🤖 It supports server-side rendering.

## 简单的媒体查询

您应该为挂钩的第一个参数提供媒体查询。 The media query string can by any valid CSS media query, e.g. [`'(prefers-color-scheme: dark)'`](/customization/palette/#user-preference).

{{"demo": "pages/components/use-media-query/SimpleMediaQuery.js", "defaultCodeOpen": true}}

⚠️ You can't use `'print'` per browsers limitation, e.g. [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=774398).

## 使用Material-UI的断点助手

You can use Material-UI's [breakpoint helpers](/customization/breakpoints/) as follows:

```jsx
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

{{"demo": "pages/components/use-media-query/ThemeHelper.js"}}

Alternatively, you can use a callback function, accepting the theme as a first argument:

```jsx
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

⚠️ There is **no default** theme support, you have to inject it in a parent theme provider.

## 使用JavaScript语法

You can use [json2mq](https://github.com/akiran/json2mq) to generate media query string from a JavaScript object.

{{"demo": "pages/components/use-media-query/JavaScriptMedia.js", "defaultCodeOpen": true}}

## 测试

You need an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) in your test environment.

For instance, [jsdom doesn't support it yet](https://github.com/jsdom/jsdom/blob/master/test/web-platform-tests/to-upstream/html/browsers/the-window-object/window-properties-dont-upstream.html). You should polyfill it. Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate it is recommended.

```js
import mediaQuery from 'css-mediaquery';

function createMatchMedia(width) {
  return query => ({
    matches: mediaQuery.match(query, { width }),
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

## 服务器端呈现

> ⚠️ Server-side rendering and client-side media queries are fundamentally at odds. Be aware of the tradeoff. The support can only be partial.

Try relying on client-side CSS media queries first. For instance, you could use:

- [`<Box display>`](/system/display/#hiding-elements)
- [`themes.breakpoints.up(x)`](/customization/breakpoints/#css-media-queries)
- or [`<Hidden implementation="css">`](/components/hidden/#css)

If none of the above alternatives are an option, you can proceed reading this section of the documentation.

First, you need to guess the characteristics of the client request, from the server. You have the choice between using:

- **User agent**. Parse the user agent string of the client to extract information. Using [ua-parser-js](https://github.com/faisalman/ua-parser-js) to parse the user agent is recommended.
- **Client hints**. Read the hints the client is sending to the server. Be aware that this feature is [not supported everywhere](https://caniuse.com/#search=client%20hint).

Finally, you need to provide an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to the `useMediaQuery` with the previously guessed characteristics. Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate matchMedia is recommended.

就像这样：

```js
import ReactDOMServer from 'react-dom/server';
import parser from 'ua-parser-js';
import mediaQuery from 'css-mediaquery';
import { ThemeProvider } from '@material-ui/core/styles';

function handleRender(req, res) {
  const deviceType = parser(req.headers['user-agent']).device.type || 'desktop';
  const ssrMatchMedia = query => ({
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser.
      width: deviceType === 'mobile' ? 0 : 1024,
    }),
  });

  const html = ReactDOMServer.renderToString(
    <ThemeProvider
      theme={{
        props: {
          // Change the default options of useMediaQuery
          MuiUseMediaQuery: { ssrMatchMedia },
        },
      }}
    >
      <App />
    </ThemeProvider>,
  );

  // …
}
```

{{"demo": "pages/components/use-media-query/ServerSide.js"}}

## 迁徙自 `withWidth()`

The `withWidth()` higher-order component injects the screen width of the page. You can reproduce the same behavior with a `useWidth` hook:

{{"demo": "pages/components/use-media-query/UseWidth.js"}}

## API

### `useMediaQuery(query, [options]) => matches`

#### 参数

1. `query` (*String* | *Function*): A string representing the media query to handle or a callback function accepting the theme (in the context) that returns a string.
2. `options` (*Object* [optional]): 
  - `options.defaultMatches` （*布尔值* [optional]）： 作为 `window.matchMedia()` 在服务器上不可用， 我们在第一次安装时返回默认匹配。 默认值为 `false`。
  - `options.noSsr` (*Boolean* [可选的]): 默认值为`false`。 为了执行服务器端呈现协调，它需要呈现两次。 第一次没有任何东西，第二次与孩子们在一起。 这种双遍渲染周期有一个缺点。 它慢了。 您可以将此标志设置为 `真` ，如果你是 **没有做服务器端渲染**。
  - `options.ssrMatchMedia` (*Function* [optional]) You can provide your own implementation of *matchMedia*. This especially useful for [server-side rendering support](#server-side-rendering).

Note: You can change the default options using the [`default props`](/customization/globals/#default-props) feature of the theme with the `MuiUseMediaQuery` key.

#### 返回结果

`matches`: Matches is `true` if the document currently matches the media query and `false` when it does not.

#### 例子

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}
```