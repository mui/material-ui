---
title: App Bar コンポーネント
components: AppBar, Toolbar, Menu
---

# App Bar

<p class="description">App Barには、現在の画面に関する情報と操作が表示されます。</p>

[top App Bar](https://material.io/design/components/app-bars-top.html) は、現在の画面に関連するコンテンツとアクションを提供します。 ブランディング、画面タイトル、ナビゲーション、およびアクションに使用されます。

状況に応じて変化するアクションバーや、ナビゲーションバーとして使用することができます。

## ボタン付き App Bar

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## シンプルアプリバー

{{"demo": "pages/components/app-bar/SimpleAppBar.js"}}

## 基本的な検索フィールド付きApp Bar

基本的な検索バー

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## メニュー付き App Bar

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## 検索フィールド付きApp Bar

サイド検索バー

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## Dense App Bar (デスクトップのみ)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## 下部アプリバー

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## スクロール

### App Barを隠す

スクロール時に隠れるApp Bar。

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true, "maxWidth": 500}}

### App Barを固定する

スクロール時に上部に固定されたApp Bar。

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true, "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### 引数

1. `オプション` (*オプジェクト* [任意]):
    
    - `options.disableHysteresis` (*ブール値* [任意]): デフォルト値 `false`. ヒステリシスを無効にします。 ` trigger ` 値を決定するときにスクロール方向を無視します。
    - `options.target` (*ノード* [任意]): デフォルト地 `window`.
    - `options.threshold` （*数値* [任意]）：デフォルト値`100`。垂直スクロールがこのしきい値を厳密に横切ったときに ` trigger ` 値を変更します（排他的）。

#### 戻り値

` trigger `：スクロール位置が基準に合っているのか

#### 例

```jsx
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Hello</div>
    </Slide>
  );
}
```