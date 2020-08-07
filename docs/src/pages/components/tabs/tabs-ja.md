---
title: Tabs React component
components: Tabs, Tab, TabScrollButton, TabContext, TabList, TabPanel
---

# Tabs

<p class="description">タブでは、様々なビューの探索を切り替えを簡単に行うことができます。</p>

[タブ](https://material.io/design/components/tabs.html) は、関連し、同じ階層レベルにあるコンテンツのグループ間のナビゲーションを整理し、許可します。

## シンプルなタブ

飾り気のないシンプルな例です。

{{"demo": "pages/components/tabs/SimpleTabs.js", "bg": true}}

### ラップされたラベル

長いラベルはタブで自動的に折り返されます。 ラベルがタブに対して長すぎる場合、ラベルはオーバーフローし、テキストは表示されません。 長いラベルはタブで自動的に折り返されます。 ラベルがタブに対して長すぎる場合、ラベルはオーバーフローし、テキストは表示されません。

{{"demo": "pages/components/tabs/TabsWrappedLabel.js", "bg": true}}

### 無効タブ

`disabled` プロパティを設定すると、タブを無効にできます。

{{"demo": "pages/components/tabs/DisabledTabs.js", "bg": true}}

## 固定タブ

固定タブは、限られた数のタブで、一定の配置が筋肉の記憶に役立つ場合に使用します。

### 最大幅

小さいビューには、 `variant = "fullWidth"` プロパティを使用する必要があります。 小さいビューには、 `variant = "fullWidth"` プロパティを使用する必要があります。 このデモでは、 [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) を使用してタブの遷移をアニメーション化し、タッチデバイスでタブをスワイプできるようにします。

{{"demo": "pages/components/tabs/FullWidthTabs.js", "bg": true}}

### 中央揃え

より大きなビューには、`centered`プロパティを使用する必要があります。

{{"demo": "pages/components/tabs/CenteredTabs.js", "bg": true}}

## スクロール可能なタブ

### 自動スクロールボタン

左右のスクロールボタンはデスクトップに自動的に表示され、モバイルでは非表示になります。 （ビューポート幅に基づく） （ビューポート幅に基づく）

{{"demo": "pages/components/tabs/ScrollableTabsButtonAuto.js", "bg": true}}

### 強制スクロールボタン

ビューポートの幅に関係なく、左右のスクロールボタンが表示されます。

{{"demo": "pages/components/tabs/ScrollableTabsButtonForce.js", "bg": true}}

### スクロールボタンを防ぐ

左右のスクロールボタンは表示されません。 左右のスクロールボタンは表示されません。 すべてのスクロールは、ユーザーエージェントのスクロールメカニズム(たとえば、左右のスワイプ、Shift-マウスホイールなど。)を使用して開始する必要があります。

{{"demo": "pages/components/tabs/ScrollableTabsButtonPrevent.js", "bg": true}}

## カスタマイズされたタブ

An example for the current implementation can be found in the demos on this page. We've also published [an experimental API](#experimental-api) in `@material-ui/lab` that does not require extra work.

{{"demo": "pages/components/tabs/CustomizedTabs.js", "bg": true}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/tabs/).

## 垂直タブ

{{"demo": "pages/components/tabs/VerticalTabs.js", "bg": true}}

## ナビゲーションタブ

デフォルトでは、タブは `button`要素を使用しますが、独自のカスタムタグまたはコンポーネントを提供できます。 次に、タブナビゲーションを実装する例を示します。 次に、タブナビゲーションを実装する例を示します。

{{"demo": "pages/components/tabs/NavTabs.js", "bg": true}}

## アイコンタブ

タブラベルは、すべてアイコンまたはすべてテキストのいずれかです。

{{"demo": "pages/components/tabs/IconTabs.js", "bg": true}}

{{"demo": "pages/components/tabs/IconLabelTabs.js", "bg": true}}

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tabpanel)

The following steps are needed in order to provide necessary information for assistive technologies:

1. Label `Tabs` via `aria-label` or `aria-labelledby`.
2. `Tab`s need to be connected to their corresponding `[role="tabpanel"]` by setting the correct `id`, `aria-controls` and `aria-labelledby`.

An example for the current implementation can be found in the demos on this page. We've also published [an experimental API](#experimental-api) in `@material-ui/lab` that does not require extra work.

### Keyboard navigation

The components implement keyboard navigation using the "manual activation" behavior. If you want to switch to the "selection automatically follows focus" behavior you have pass `selectionFollowsFocus` to the `Tabs` component. The WAI-ARIA authoring practices have a detailed guide on [how to decide when to make selection automatically follow focus](https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus).

#### Demo

The following two demos only differ in their keyboard navigation behavior. Focus a tab and navigate with arrow keys to notice the difference.

```jsx
/* Tabs where selection follows focus */
<Tabs selectionFollowsFocus />
/* Tabs where each tab needs to be selected manually */
<Tabs />
```

{{"demo": "pages/components/tabs/AccessibleTabs.js", "bg": true}}

## Experimental API

`@material-ui/lab` offers utility components that inject props to implement accessible tabs following [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/#tabpanel).

{{"demo": "pages/components/tabs/LabTabs.js", "bg": true}}