---
title: React 快速拨号组件
components: SpeedDial, SpeedDialAction, SpeedDialIcon
---

# Speed Dial 快速拨号

<p class="description">当按下一个浮动操作按钮（floating action button）时，它可以弹出 3 到 6 个以快速拨号形式出现的相关操作。</p>

如果您需要展示六个以上的操作，则应使用除浮动操作按钮之外的其他操作来呈现它们。

## 简单的快速拨号组件

浮动操作按钮可以显示相关操作。

{{"demo": "pages/components/speed-dial/SpeedDials.js"}}

## 自定义关闭图标

您可以使用 `SpeedDialIcon` 组件的 `icon` 和 `openIcon` 属性，给关闭和打开状态提供一个备用的图标。

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## 恒定不变的操作的工具提示

SpeedDialActions 工具提示条可以持久的显示，这样在触摸设备上，用户无需长按即可查看工具提示。

它在所有设备上都是启用的，这样出于演示的目的，但在生产环境中中您可以使用 `isTouch` 逻辑来有条件地设置属性。

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}