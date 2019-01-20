---
title: 快速拨号React组件
components: SpeedDial, SpeedDialAction, SpeedDialIcon
---
# 快速拨号

<p class="description">当按下的时候，一个浮动按钮可以弹出3到6个相关联的按钮。</p>

如果需要超过六个操作，则应使用除浮动按钮之外的其他操作来呈现它们。

## 快速拨号实例

浮动操作按钮可以显示相关操作。

{{"demo": "pages/lab/speed-dial/SpeedDials.js"}}

## 自定义关闭图标

You can provide an alternate icon for the closed and open states using the `icon` and `openIcon` props of the `SpeedDialIcon` component.

{{"demo": "pages/lab/speed-dial/OpenIconSpeedDial.js"}}

## Persistent action tooltips

The SpeedDialActions tooltips can be be displayed persistently so that users don't have to long-press in order to see the tooltip on touch devices.

It is enabled here across all devices for demo purposes, but in production it could use the `isTouch` logic to conditionally set the property.

{{"demo": "pages/lab/speed-dial/SpeedDialTooltipOpen.js"}}