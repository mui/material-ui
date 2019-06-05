---
title: 快速拨号React组件
components: SpeedDial, SpeedDialAction, SpeedDialIcon
---

# 快速拨号

<p class="description">当按下的时候，一个浮动按钮可以弹出3到6个相关联的按钮。</p>

如果需要超过六个操作，则应使用除浮动按钮之外的其他操作来呈现它们。

## 快速拨号实例

浮动操作按钮可以显示相关操作。

{{"demo": "pages/components/speed-dial/SpeedDials.js"}}

## 自定义关闭图标

您可以使用 `SpeedDialIcon` 组件的 `图标` 和 `openIcon` 道具 为关闭和打开状态提供备用图标。

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## 持久性动作工具提示

SpeedDialActions工具提示可以持久显示，这样用户无需长按即可在触摸设备上查看工具提示。

它在所有设备上都可以用于演示目的，但在生产中它可以使用 `isTouch` 逻辑来有条件地设置属性。

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}