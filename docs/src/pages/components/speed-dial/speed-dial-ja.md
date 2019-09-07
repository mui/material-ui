---
title: Speed Dial Reactコンポーネント
components: SpeedDial, SpeedDialAction, SpeedDialIcon
---

# スピードダイヤル（Speed Dial）

<p class="description">フローティング状態のアクションボタンを押すと、3~6つの関連アクションを短縮ダイヤルの形式で表示できます。</p>

6つ以上のアクションが必要な場合は、FAB以外のものを使用してそれらを表示する必要があります。

## シンプルスピードダイヤル

フローティングアクションボタンは、関連するアクションを表示できます。

{{"demo": "pages/components/speed-dial/SpeedDials.js"}}

## カスタムcloseアイコン

`SpeedDialIcon` コンポーネントの `アイコン` と `openIcon` props を使用して、閉じた状態と開いた状態の代替アイコンを提供できます。

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## 永続的なアクションのツールチップ

SpeedDialActionsのツールチップは永続的に表示されるため、ユーザーがタッチデバイスでツールチップを表示するために長押しする必要はありません。

ここではデモ目的ですべてのデバイスで有効になっていますが、実稼働環境では、 `isTouch` ロジックを使用して条件付きでプロパティを設定できます。

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}