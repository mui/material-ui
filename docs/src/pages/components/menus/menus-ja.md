---
title: メニューReactコンポーネント
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---

# Menus

<p class="description">メニューには、一時的なサーフェスの選択肢のリストが表示されます。</p>

[Menu](https://material.io/design/components/menus.html)には、一時サーフェス上の選択項目のリストが表示されます。 ユーザーがボタンやその他のコントロールを操作すると表示されます。

## シンプルなメニュー

デフォルトでは、アンカー要素の上にシンプルなメニューが開きます（このオプションはpropsを介して変更できます）。 画面の端に近づくと、シンプルメニューが垂直方向に再配置され、すべてのメニュー項目が完全に表示されます。

オプションを選択したら、そのオプションをすぐにコミットしてメニューを閉じるのが理想的です。

**曖昧さ回避**: 単純なメニューとは対照的に、単純なダイアログでは、リスト項目で使用可能なオプションに関連する追加の詳細を表示したり、主要なタスクに関連するナビゲーションまたは直交アクションを提供することができます。 シンプルメニューは同じ内容を表示できますが、ユーザーの現在のコンテキストを混乱させないため、シンプルダイアログよりも好まれます。

{{"demo": "pages/components/menus/SimpleMenu.js"}}

## 選択したメニュー

項目の選択に使用した場合、シンプルメニューを開くと、現在選択されているメニュー項目がアンカー要素に垂直に配置されます。 選択したメニュー項目に初期フォーカスが移ります。 現在選択されているメニュー項目は、 `selected` プロパティ（[ListItem](/api/list-item/)）を使用して設定されます。 選択したメニュー項目を、初期フォーカスやメニューの縦位置に影響を与えずに使用するには、`variant`プロパティを `menu`に設定します。

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## メニューリストの構成

The `Menu` component uses the `Popover` component internally. However, you might want to use a different positioning strategy, or not blocking the scroll. For answering those needs, we expose a `MenuList` component that you can compose, with `Popper` in this example.

The primary responsibility of the `MenuList` component is to handle the focus.

{{"demo": "pages/components/menus/MenuListComposition.js", "bg": true}}

## Customized menus

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

The `MenuItem` is a wrapper around `ListItem` with some additional styles. You can use the same list composition features with the `MenuItem` component:

## 最大高さメニュー

If the height of a menu prevents all menu items from being displayed, the menu can scroll internally.

{{"demo": "pages/components/menus/LongMenu.js"}}

## 制限事項

There is [a flexbox bug](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) that prevents `text-overflow: ellipsis` from working in a flexbox layout. You can use the `Typography` component with `noWrap` to workaround this issue:

{{"demo": "pages/components/menus/TypographyMenu.js", "bg": true}}

## トランジションの変更

別のトランジションを使用します。

{{"demo": "pages/components/menus/FadeMenu.js"}}

## Context menu

Here is an example of a context menu. (Right click to open.)

{{"demo": "pages/components/menus/ContextMenu.js"}}

## 補完プロジェクト

より高度な使用例では、以下を利用できます。

### PopupState helper

サードパーティ製のパッケージ [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state)があり、ほとんどの場合、メニューの状態を管理してくれます。

{{"demo": "pages/components/menus/MenuPopupState.js"}}