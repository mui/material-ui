---
title: React中的媒体查询用于响应式设计
---

# useMediaQuery

<p class="description">这是React的CSS媒体查询钩子。 它监控着与 CSS 媒体查询的匹配结果。 它允许根据查询是否匹配来呈现组件。</p>

以下是这个库的一些特点：

- ⚛️它有一个惯用的React API。
- 🚀它具有高性能，它会观察文档以检测其媒体查询何时发生更改，而不是定期轮询值。
- 📦 [1 kB gzipped](/size-snapshot).
- 🤖 It supports server-side rendering.

## 简单的媒体查询

您应该为挂钩的第一个参数提供媒体查询。 媒体查询字符串可以由任何有效的CSS媒体查询，如 `'print'`。

{{"demo": "pages/components/use-media-query/SimpleMediaQuery.js", "defaultCodeOpen": true}}

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

## 服务器端呈现

An implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) is required on the server. We recommend using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate it.

{{"demo": "pages/components/use-media-query/ServerSide.js"}}

⚠️ Server-side rendering and client-side media queries are fundamentally at odds. Be aware of the tradeoff. The support can only be partial.

Try relying on client-side CSS media queries first. For instance, you could use:

- [`<Box display>`](/system/display/#hiding-elements)
- [`<Hidden implementation="css">`](/components/hidden/#css)
- or [`themes.breakpoints.up(x)`](/customization/breakpoints/#css-media-queries)

## 测试

Similar to the server-side case, you need an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) in your test environment.

For instance, [jsdom doesn't support it yet](https://github.com/jsdom/jsdom/blob/master/test/web-platform-tests/to-upstream/html/browsers/the-window-object/window-properties-dont-upstream.html). You should polyfill it. We recommend using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate it.

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

## 迁徙自 `withWidth()`

`withWidth()` 高阶组件注入页面的屏幕宽度。 您可以对 `useWidth` 钩子重用相同的操作：

{{"demo": "pages/components/use-media-query/UseWidth.js"}}

## API

### `useMediaQuery(query, [options]) => matches`

#### 参数

1. `query` (*String* | *Function*): A string representing the media query to handle or a callback function accepting the theme (in the context) that returns a string.
2. `options` (*Object* [optional]): 
  - `options.defaultMatches` （*布尔值* [optional]）： 作为 `window.matchMedia()` 在服务器上不可用， 我们在第一次安装时返回默认匹配。 默认值为 `false`。
  - `options.noSsr` (*Boolean* [optional]): 默认值为`false`。 为了执行服务器端呈现协调，它需要呈现两次。 第一次没有任何东西，第二次与孩子们在一起。 这种双遍渲染周期有一个缺点。 它慢了。 您可以将此标志设置为 `真` ，如果你是 **没有做服务器端渲染**。
  - `options.ssrMatchMedia` （*功能* [optional]）您可能希望使用启发式来近似 客户端浏览器的屏幕。 例如，您可以使用用户代理或客户端提示https://caniuse.com/#search=client%20hint。 You can provide a global ponyfill using [`custom props`](/customization/globals/#default-props) on the theme. 检查 [服务器端呈现示例](#server-side-rendering)。

#### 返回结果

` matches `：如果文档当前能够匹配这个媒体查询，Matches 是 `true` ，否则为 `false` 。

#### 示例

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('print');

  return <span>{`@media (min-width:600px) matches: ${matches}`}</span>;
}
```