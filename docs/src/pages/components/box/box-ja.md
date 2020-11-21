---
title: React Box component
---

# Box

<p class="description">Boxコンポーネントは、CSSユーティリティーのほとんどのニーズに対応するラッパーコンポーネントとして機能します</p>

Boxコンポーネントは、`@material-ui/system`で公開される[すべてのスタイル関数](/system/basics/#all-inclusive) をパッケージ化します。 It's created using the [`styled()`](/styles/api/#styled-style-function-component) function of `@material-ui/core/styles`. It's created using the [`styled()`](/styles/api/#styled-style-function-component) function of `@material-ui/core/styles`.

## 例

[The palette](/system/palette/) style関数。

## Material-UI componentsのオーバーライド

The Box componentは、コンポーネントをラップします。 The Box componentは、コンポーネントをラップします。 The Box componentは、コンポーネントをラップします。 新しいDOM要素を作成します。この要素はデフォルトで`<div>`であり、`component` プロパティを使用して変更できます。</code> 代わりに `<span>` を使用すると 代わりに `<span>` を使用すると 代わりに `<span>` を使用すると

```jsx
<Box component="span" m={1}>
  <Button />
</Box>
```

これは、新しいDOM要素に分離する変更の場合に非常に有効です。 たとえば、この方法で余白を変更できます。 たとえば、この方法で余白を変更できます。 たとえば、この方法で余白を変更できます。 たとえば、この方法で余白を変更できます。

ただし、場合によっては基礎となるDOM要素をターゲットにする必要があります。 たとえば、ボタンのテキストカラーを変更するとします。 Buttonコンポーネントは、独自のカラーを定義します。 CSS継承は役に立ちません。 この問題を回避するには、次の2つの方法があります。

1. [`React.cloneElement()`](https://reactjs.org/docs/react-api.html#cloneelement)を使う

ボックスコンポーネントには、Reactのクローン要素メソッドの使用を有効にする`clone` プロパティーがあります。

```jsx
<Box color="text.primary" clone>
  <Button />
</Box>
```

2. Render propsを使う

ボックスの子は、レンダープロップス機能を受け入れます `className`を取り出すことができます。

```jsx
<Box color="text.primary">
  {props => <Button {...props} />}
</Box>
```

> CSSの仕様は、インポート順序に依存します。 ラップされたコンポーネントのスタイルが確実にオーバーライドされるようにするには、最後にボックスをインポートする必要があります。

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Name                                                    | Type                                                                                                              | Default                                 | Description                                                    |
|:------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:-------------------------------------------------------------- |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br />&nbsp;func<br /></span>                                 |                                         | ボックスレンダー関数またはノード。                                              |
| <span class="prop-name">clone</span>                    | <span class="prop-type">bool</span>                                                                               | <span class="prop-default">false</span> | `true`の場合、ボックスはその子DOM要素をリサイクルします。 内部的には`React.cloneElement`です。 |
| <span class="prop-name">component</span>                | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br />&nbsp;func&nbsp;&#124;<br />&nbsp;object<br /></span> | <span class="prop-default">'div'</span> | ルートノードに使用されるコンポーネント。 DOM要素またはコンポーネントを使用する文字列。                  |


指定したその他のプロパティは、 [the style functions](/system/basics/#all-inclusive)で使用されるか、ルート要素に展開されます。