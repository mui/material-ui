---
title: Reactメニューコンポーネント
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---

# Menus

<p class="description">メニューには、一時的なサーフェスの選択肢のリストが表示されます。</p>

[Menu](https://material.io/design/components/menus.html)には、一時サーフェス上の選択項目のリストが表示されます。 ユーザーがボタンやその他のコントロールを操作すると表示されます。 ユーザーがボタンやその他のコントロールを操作すると表示されます。 ユーザーがボタンやその他のコントロールを操作すると表示されます。 ユーザーがボタンやその他のコントロールを操作すると表示されます。

## シンプルなメニュー

デフォルトでは、アンカー要素の上にシンプルなメニューが開きます（このオプションはpropsを介して変更できます）。 画面の端に近づくと、シンプルメニューが垂直方向に再配置され、すべてのメニュー項目が完全に表示されます。 画面の端に近づくと、シンプルメニューが垂直方向に再配置され、すべてのメニュー項目が完全に表示されます。

オプションを選択したら、そのオプションをすぐにコミットしてメニューを閉じるのが理想的です。

The `MenuItem` is a wrapper around `ListItem` with some additional styles. You can use the same list composition features with the `MenuItem` component:

{{"demo": "pages/components/menus/SimpleMenu.js"}}

## 選択したメニュー

項目の選択に使用した場合、シンプルメニューを開くと、現在選択されているメニュー項目がアンカー要素に垂直に配置されます。 選択したメニュー項目に初期フォーカスが移ります。 The `MenuItem` is a wrapper around `ListItem` with some additional styles. The `MenuItem` is a wrapper around `ListItem` with some additional styles. You can use the same list composition features with the `MenuItem` component: 項目の選択に使用した場合、シンプルメニューを開くと、現在選択されているメニュー項目がアンカー要素に垂直に配置されます。 選択したメニュー項目に初期フォーカスが移ります。 現在選択されているメニュー項目は、 `selected` プロパティ（[ListItem](/api/list-item/)）を使用して設定されます。 項目の選択に使用した場合、シンプルメニューを開くと、現在選択されているメニュー項目がアンカー要素に垂直に配置されます。 選択したメニュー項目に初期フォーカスが移ります。 現在選択されているメニュー項目は、 `selected` プロパティ（[ListItem](/api/list-item/)）を使用して設定されます。 選択したメニュー項目を、初期フォーカスやメニューの縦位置に影響を与えずに使用するには、`variant`プロパティを `menu`に設定します。

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## メニューリストの構成

`Menu` コンポーネントは内部的に `Popover` コンポーネントを使用します。 しかし、別の配置方法を使ったり、スクロールをブロックしないようにしたいかもしれません。 そのようなニーズに応えるために、自身で構成できる `MenuList` コンポーネントを公開しています。次の例では`Popper`を使用しています。

`MenuList` コンポーネントの主な役割は、フォーカスを処理することです。

{{"demo": "pages/components/menus/MenuListComposition.js", "bg": true}}

## Customized menus

コンポーネントのカスタマイズ例を次に示します。 コンポーネントのカスタマイズ例を次に示します。 コンポーネントのカスタマイズ例を次に示します。 詳細については、 [overrides documentation page](/customization/components/)を参照してください。

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

`MenuItem` はいくつかの追加のスタイルを備えた `ListItem` のラッパーです。 `MenuItem` コンポーネントで同じリスト構成機能を使用できます:

🎨 インスピレーションを求めている場合は、 [MUI Treasury's customization examples](https://mui-treasury.com/styles/menu) を確認すると良いでしょう。

## 最大高さメニュー

すべてのメニュー項目を表示しないようにメニューの高さを設定すると、メニューは内部でスクロールできるようになります。

{{"demo": "pages/components/menus/LongMenu.js"}}

## 制限事項

`text-overflow: ellipsis`がflexbox layoutで動作しなくなる[fexboxのバグ](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) があります。 `Typography` コンポーネントの `noWrap` を利用してこの問題を回避できます。

{{"demo": "pages/components/menus/TypographyMenu.js", "bg": true}}

## トランジションの変更

別のトランジションを使用します。

{{"demo": "pages/components/menus/FadeMenu.js"}}

## コンテキストメニュー

コンテキストメニューの例を次に示します。 (右クリックで開きます。)

{{"demo": "pages/components/menus/ContextMenu.js"}}

## 補完プロジェクト

より高度な使用例では、以下を利用できます。

### PopupState helper

サードパーティ製のパッケージ [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state)があり、ほとんどの場合、メニューの状態を管理してくれます。

{{"demo": "pages/components/menus/MenuPopupState.js"}}