---
product: base
title: React Trap Focus（容器焦点）组件
components: TrapFocus
githubLabel: 'component: TrapFocus'
packageName: '@mui/base'
---

# Trap Focus 容器焦点

<p class="description">在 DOM 节点内捕获焦点。</p>

容器焦点是一个为其子节点管理焦点的组件。 这在实现遮罩层时很有用，比如模态对话框，它不应该允许在该组件打开时转移焦点。

When `open={true}` the trap is enabled, and pressing <kbd class="key">Tab</kbd> or <kbd><kbd class="key">Shift</kbd>+<kbd class="key">Tab</kbd></kbd> will rotate focus within the inner focusable elements of the component.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## 示例

{{"demo": "BasicTrapFocus.js"}}

## Unstyled

- 📦 [2.0 kB gzipped](https://bundlephobia.com/package/@mui/base@latest)

As the component does not have any styles, it also comes with the Base package.

```js
import TrapFocus from '@mui/base/Unstable_TrapFocus';
```

## 禁用强制对焦

Clicks within the focus trap behave normally, but clicks outside the focus trap are blocked.

你可以使用 `disableEnforceFocus` 属性来禁用此行为。

{{"demo": "DisableEnforceFocus.js"}}

## 延迟激活

默认情况下，组件在打开后就会立刻将其焦点移到其子节点：`open={true}`。

你可以使用 `disableAutoFocus` 属性来禁止这种行为，并使其变成惰性加载。 当禁用自动聚焦时，就像下面的演示一样，组件只有在聚焦后才会捕捉焦点。

{{"demo": "LazyTrapFocus.js"}}

## Portal

The following demo uses the [`Portal`](/material-ui/react-portal/) component to render a subset of the trap focus children into a new "subtree" outside of the current DOM hierarchy; so that they no longer form part of the focus loop.

{{"demo": "PortalTrapFocus.js"}}
