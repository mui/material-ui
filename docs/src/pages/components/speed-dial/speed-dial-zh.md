---
title: React 快速拨号组件
components: SpeedDial, SpeedDialAction, SpeedDialIcon
githubLabel: 'component: SpeedDial'
packageName: '@material-ui/lab'
---

# Speed Dial 快速拨号

<p class="description">当按下一个浮动操作按钮（floating action button）时，它可以弹出 3 到 6 个以快速拨号形式出现的相关操作。</p>

如果您需要展示六个以上的操作，则应使用除浮动操作按钮之外的其他操作来呈现它们。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 快速拨号实例

浮动操作按钮可以显示相关操作。

{{"demo": "pages/components/speed-dial/SpeedDials.js"}}

## 自定义关闭图标

您可以使用 `SpeedDialIcon` 组件的 `图标` 和 `openIcon` 道具 为关闭和打开状态提供备用图标。

SpeedDialActions工具提示可以持久显示，这样用户无需长按即可在触摸设备上查看工具提示。

## 自定义关闭图标

您可以使用 `SpeedDialIcon` 组件的 `icon` 和 `openIcon` 属性，给关闭和打开状态提供一个备用的图标。

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## 恒定不变的操作的工具提示

SpeedDialActions 提示组件可以持续显示，这样一来用户不用长按就能在触摸设备上看到提示内容了。

为了演示的目的，该示例为所有设备都启用了该功能，但在生产环境中，它可以使用 `isTouch` 逻辑来有条件地设置属性。

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}
