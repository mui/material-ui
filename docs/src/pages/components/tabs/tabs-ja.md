---
title: Tabs React component
components: Tabs, Tab
---

# Tabs

<p class="description">タブを使用すると、さまざまなビューを簡単に探索して切り替えることができます。</p>

[タブ](https://material.io/design/components/tabs.html) は、関連し、同じ階層レベルにあるコンテンツのグループ間のナビゲーションを整理し、許可します。

## シンプルなタブ

飾り気のないシンプルな例です。

{{"demo": "pages/components/tabs/SimpleTabs.js", "bg": true}}

### ラップされたラベル

長いラベルはタブで自動的に折り返されます。 ラベルがタブに対して長すぎる場合、ラベルはオーバーフローし、テキストは表示されません。

{{"demo": "pages/components/tabs/TabsWrappedLabel.js", "bg": true}}

### 無効タブ

`disabled` プロパティを設定すると、タブを無効にできます。

{{"demo": "pages/components/tabs/DisabledTabs.js", "bg": true}}

## 固定タブ

固定タブは、限られた数のタブで、一定の配置が筋肉の記憶に役立つ場合に使用します。

### 最大幅

小さいビューには、 `variant = "fullWidth"` プロパティを使用する必要があります。 このデモでは、 [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) を使用してタブの遷移をアニメーション化し、タッチデバイスでタブをスワイプできるようにします。

{{"demo": "pages/components/tabs/FullWidthTabs.js", "bg": true}}

### 中央揃え

より大きなビューには、`centered`プロパティを使用する必要があります。

{{"demo": "pages/components/tabs/CenteredTabs.js", "bg": true}}

## スクロール可能なタブ

### 自動スクロールボタン

左右のスクロールボタンはデスクトップに自動的に表示され、モバイルでは非表示になります。 （ビューポート幅に基づく）

{{"demo": "pages/components/tabs/ScrollableTabsButtonAuto.js", "bg": true}}

### 強制スクロールボタン

ビューポートの幅に関係なく、左右のスクロールボタンが表示されます。

{{"demo": "pages/components/tabs/ScrollableTabsButtonForce.js", "bg": true}}

### スクロールボタンを防ぐ

左右のスクロールボタンは表示されません。 すべてのスクロールは、ユーザーエージェントのスクロールメカニズム(たとえば、左右のスワイプ、Shift-マウスホイールなど。)を使用して開始する必要があります。

{{"demo": "pages/components/tabs/ScrollableTabsButtonPrevent.js", "bg": true}}

## カスタマイズされたタブ

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/tabs/CustomizedTabs.js", "bg": true}}

👑 インスピレーションを求めているなら, [MUI Treasury's customization examples](https://mui-treasury.com/components/tabs)を確認できます。

## 垂直タブ

{{"demo": "pages/components/tabs/VerticalTabs.js", "bg": true}}

## ナビゲーションタブ

デフォルトでは、タブは `button`要素を使用しますが、独自のカスタムタグまたはコンポーネントを提供できます。 次に、タブナビゲーションを実装する例を示します。

{{"demo": "pages/components/tabs/NavTabs.js", "bg": true}}

## アイコンタブ

タブラベルは、すべてアイコンまたはすべてテキストのいずれかです。

{{"demo": "pages/components/tabs/IconTabs.js", "bg": true}}

{{"demo": "pages/components/tabs/IconLabelTabs.js", "bg": true}}