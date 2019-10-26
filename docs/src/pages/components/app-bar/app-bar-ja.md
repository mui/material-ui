---
title: App Bar コンポーネント
components: AppBar, Toolbar, Menu
---

# App Bar

<p class="description">App Barには、現在の画面に関する情報と操作が表示されます。</p>

[top App Bar](https://material.io/design/components/app-bars-top.html) は、現在の画面に関連するコンテンツとアクションを提供します。 ブランディング、画面タイトル、ナビゲーション、およびアクションに使用されます。

状況に応じて変化するアクションバーや、ナビゲーションバーとして使用することができます。

## シンプルなアプリバー

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

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

## Prominent

A prominent app bar.

{{"demo": "pages/components/app-bar/ProminentAppBar.js"}}

## Bottom App Bar

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Fixed placement

When you render the app bar position fixed, the dimension of the element doesn't impact the rest of the page. This can cause some part of your content to be invisible, behind the app bar. Here are 3 possible solutions:

1. You can use `position="sticky"` instead of fixed. ⚠️ sticky is not supported by IE 11.
2. You can render a second `<Toolbar />` component:

```jsx
function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
```

3. You can use `theme.mixins.toolbar` CSS:

```jsx
const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </React.Fragment>
  )
};
```

## Scrolling

You can use the `useScrollTrigger()` hook to respond to user scroll actions.

### App Barを隠す

The app bar hides on scroll down to leave more space for reading.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true, "maxWidth": 500}}

### App Barを固定する

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true, "maxWidth": 500}}

### トップへ戻る

A floating action buttons appears on scroll to make it easy to get back to the top of the page.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true, "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### 引数

1. `オプション` (*オプジェクト* [任意]):

- `options.disableHysteresis` (*ブール値* [任意]): デフォルト値 `false`. ヒステリシスを無効にします。 ` trigger ` 値を決定するときにスクロール方向を無視します。
- `options.target` (*ノード* [任意]): デフォルト地 `window`.
- `options.threshold` (*Number* [optional]): デフォルトは`100`. 垂直スクロールがこのしきい値(排他的) を厳密に超えたときに`trigger` 値を変更します。

#### 戻り値

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