---
title: App Bar React component
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

## Scrolling

### Hide App Bar

An App Bar that hides on scroll.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": "true", "maxWidth": 500}}

### Elevate App Bar

An App Bar that elevates on scroll.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": "true", "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### Arguments

1. `options` (*Object* [optional]):
    
    - `options.disableHysteresis` (*Boolean* [optional]): Defaults to `false`. Disable the hysteresis. Ignore the scroll direction when determining the `trigger` value.
    - `options.target` (*Node* [optional]): Defaults to `window`.
    - `options.threshold` (*Number* [optional]): Defaults to `100`. Change the `trigger` value when the vertical scroll strictly crosses this threshold (exclusive).

#### Returns

`trigger`: Does the scroll position match the criteria?

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