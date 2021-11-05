---
title: React Backdrop（背景暗化）组件
components: Backdrop, BackdropUnstyled
githubLabel: '组件：背景暗化'
---

# Backdrop

<p class="description">背景暗化组件用于提供针对特定元素或这个元素一部分的强调。</p>

Backdrop组件可以用来提醒用户当前应用状态的变化，同时它也可以用来创建加载遮罩层、对话框等等。 在最简单的情况下，背景暗化组件将在您的应用程序上添加一个暗淡的图层。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 示例

{{"demo": "pages/components/backdrop/SimpleBackdrop.js"}}

## Unstyled

Backdrop组件也有一个无样式的版本。 在需要进行大量自定义样式时，它可以更好的控制住包的大小

```js
import Backdrop from '@mui/core/Backdrop';
```
