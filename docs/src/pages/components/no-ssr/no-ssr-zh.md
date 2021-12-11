---
title: React No SSR（非服务端渲染）的组件
components: NoSsr
---

# 非服务端渲染（SSR）

<p class="description">NoSsr 的目的是从服务器端渲染（SSR）里删除组件。</p>

该组件可用于各种情况：

- 对于不支持服务端渲染的依赖包实施补救。
- 通过仅在首屏上呈现，来改善客户端上的首次绘制时间。
- 减少服务器上的渲染时间。
- 在过重的服务器负载下，您可以打开服务降级。
- 通过仅渲染重要的内容（使用 `defer` 属性），从而来改善交互时间。

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Client-side deferring

{{"demo": "pages/components/no-ssr/SimpleNoSsr.js"}}

## 延迟帧数

At its core, the NoSsr component's purpose is to **defer rendering**. 正如在前一个演示中所展示的那样，您可以使用它来将推迟从服务器到客户端的渲染。

但你也可以使用它来推迟客户端自身的渲染。 您可以使用 `defer` 属性来**等待一个屏幕帧**后，再渲染子组件。 React 会做  [2 次提交](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)  而不是 1 次。

{{"demo": "pages/components/no-ssr/FrameDeferring.js"}}

## Unstyled

- 📦 [784 B gzipped](https://bundlephobia.com/package/@mui/base@latest)

As the component does not have any styles, it also comes with the unstyled package.

```js
import NoSsr from '@mui/base/NoSsr';
```
