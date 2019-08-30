---
title: Speed Dial Reactコンポーネント
components: SpeedDial, SpeedDialAction, SpeedDialIcon
---

# スピードダイヤル

<p class="description">フローティング状態のアクションボタンを押すと、3~6つの関連アクションを短縮ダイヤルの形式で表示できます。</p>

If more than six actions are needed, something other than a FAB should be used to present them.

## シンプルスピードダイヤル

The floating action button can display related actions.

{{"demo": "pages/components/speed-dial/SpeedDials.js"}}

## カスタムcloseアイコン

You can provide an alternate icon for the closed and open states using the `icon` and `openIcon` props of the `SpeedDialIcon` component.

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## 永続的なアクションのツールチップ

The SpeedDialActions tooltips can be be displayed persistently so that users don't have to long-press in order to see the tooltip on touch devices.

It is enabled here across all devices for demo purposes, but in production it could use the `isTouch` logic to conditionally set the property.

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}