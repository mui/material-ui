---
title: React 陷阱焦点组件
components: Unstable_TrapFocus
githubLabel:
  component: 陷阱焦点
---

# 陷阱焦点

<p class="description">在 DOM 节点内捕获焦点。</p>

陷阱焦点是一个为其子节点管理焦点的组件。 这在实现对话框之类的叠加层时非常有用，因为打开对话框时焦点不应该转移。

当使用 `open={true}` 来启用陷阱时，按夏 <kbd>Tab</kbd> 或 <kbd>Shift</kbd> + <kbd>Tab</kbd> 将在组件的内部可聚焦元素内变动焦点位置。

- 📦 [1.5kB 已压缩的包](https://material-ui.com/size-snapshot)。
- ⚛️ 支持传送门组件

查看[调色板](/system/palette/)样式功能。

> 该组件处于试验阶段，是不稳定的。

## 示例

{{"demo": "pages/components/trap-focus/BasicTrapFocus.js"}}

## 禁用强制对焦

在焦点陷阱内的点击会正常进行，但在焦点陷阱外的点击会被阻止。

你可以使用 `disableEnforceFocus` 属性来禁用此行为。

{{"demo": "pages/components/trap-focus/DisableEnforceFocus.js"}}

## 延迟激活

默认情况下，组件在打开后就会立刻将其焦点移到其子节点：`open={true}`。

你可以使用 `disableAutoFocus` 属性来禁止这种行为，并使其变成惰性加载。 当禁用自动聚焦时，就像下面的演示一样，组件只有在聚焦后才会捕捉焦点。

{{"demo": "pages/components/trap-focus/LazyTrapFocus.js"}}

## Portal

下面的演示使用  [`Portal`](/components/portal/)  组件将陷阱焦点子集渲染到当前 DOM 层次结构之外的新“子树（subtree）”中，这样它们就不再是焦点循环的一部分。

{{"demo": "pages/components/trap-focus/PortalTrapFocus.js"}}
