---
title: React Drawer component
components: Drawer, SwipeableDrawer
---

# Drawer

<p class="description">ナビゲーションドロワー(Drawer) を使用すると、App内の目的地にアクセスできます。サイドシートは、画面の左端または右端にアンカーされた補足コンテンツを含むサーフェスです。</p>

[ナビゲーション・ドロワー](https://material.io/design/components/navigation-drawer.html)(または「サイドバー」)は、目的地へのアクセスとアカウントの切り替えなどのアプリケーション機能を提供します。 これらは、画面上で永続的に表示することも、ナビゲーション・メニュー・アイコンで制御することもできます。

[サイドシート](https://material.io/design/components/sheets-side.html) は、主にタブレットやデスクトップで使用される補助サーフェスです。

## Temporary drawer

一時的なnavigation drawersは、開閉することができます。 デフォルトでは閉じていますが、セクションが選択されるまで、ドロワーは一時的に他のすべてのコンテンツの上に開きます。

ドロワーをキャンセルするには、オーバーレイをクリックするか、Escキーを押します。 アイテムが選択されると、`open`プロパティを制御して閉じます。

{{"demo": "pages/components/drawers/TemporaryDrawer.js"}}

### Swipeable

`SwipeableDrawer` コンポーネントを使用すると、引き出しをスワイプ可能にできます。

このコンポーネントには、2 kBの圧縮ペイロードオーバーヘッドがあります。 一部のローエンドモバイルデバイスは、60FPSで指の動きを追うことができません。 `disableBackdropTransition` プロパティを使用すると便利です。

{{"demo": "pages/components/drawers/SwipeableTemporaryDrawer.js"}}

このドキュメントのWebサイトでは、コンポーネントの操作性を最適化するために、次のプロパティが使用されています。

- iOSはハイエンドデバイスでホストされています。 iOSはハイエンドデバイスでホストされています。 The backdrop transition can be enabled without dropping frames. 性能は十分良いでしょう。
- iOS has a "swipe to go back" feature that interferes with the discovery feature, so discovery has to be disabled.

```jsx
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />
```

## レスポンシブなドロワー

`Hidden`対応ヘルパーコンポーネントを使用すると、画面の幅に応じてさまざまな種類のドロワーを表示できます。 小さな画面では `temporary` ドロワーが表示され、大きな画面では `permanent` ドロワーが表示されます。

{{"demo": "pages/components/drawers/ResponsiveDrawer.js", "iframe": true}}

## Persistent（永続的）ドロワー

永続的なナビゲーションdrawersは、開閉を切り替えることができます。 この drawerは、コンテンツと同じ表面の高さにあります。 デフォルトでは閉じられており、メニューアイコンを選択すると開き、ユーザーが閉じるまで開いたままになります。 ドロワーの状態は、アクションからアクションへ、セッションからセッションへと記憶されます。

ページグリッドの外側にあるdrawerを開くと、他のコンテンツのサイズが強制的に変更され、小さい方のビューポートに合わせて調整されます。

永続的なナビゲーションdrawersは、モバイルよりも大きいすべてのサイズに適しています。 ナビゲーションに上矢印を使用する必要がある複数レベルの階層を持つAppにはお勧めしません。

{{"demo": "pages/components/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

## Mini variant drawer (ミニバリアントドロワー)

このバリエーションでは、固定ナビゲーションドロワーの幅が変更されます。 静止状態はコンテンツと同じ高さのミニドロワーで、アプリバーでクリップされます。 展開すると、標準の永続的なナビゲーション領域として表示されます。

ミニバリアントは、コンテンツと共にクイック選択アクセスが必要なアプリのセクションに推奨されます。

{{"demo": "pages/components/drawers/MiniDrawer.js", "iframe": true}}

## Permanent drawer　(固定ドロワー)

固定ナビゲーションdrawersは常に表示され、コンテンツまたは背景と同じ高さの左端に固定されます。 それらを閉じることはできません。

パーマネントナビゲーションドロワーは、**デスクトップでデフォルト推奨**です。

### Full-height navigation（フルハイトナビゲーション）

アプリケーションは、左から右への階層を使用する情報消費に重点を置いていました。

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

{{"demo": "pages/components/drawers/PermanentDrawerRight.js", "iframe": true}}

### アプリケーションバーの下にクリップされている

画面全体のバランスを必要とする生産性を重視したアプリ。

{{"demo": "pages/components/drawers/ClippedDrawer.js", "iframe": true}}