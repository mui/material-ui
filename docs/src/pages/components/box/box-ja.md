---
title: React Box component
githubLabel: 'component: Box'
---

# Box

<p class="description">Boxコンポーネントは、CSSユーティリティーのほとんどのニーズに対応するラッパーコンポーネントとして機能します</p>

Boxコンポーネントは、`@material-ui/system`で公開される[すべてのスタイル関数](/system/basics/#all-inclusive) をパッケージ化します。 It's created using the [`styled()`](/styles/api/#styled-style-function-component) function of `@material-ui/core/styles`. It's created using the `experimentalStyled()` function of `@material-ui/core/styles`.

[The palette](/system/palette/) style関数。

## 例

[The palette](/system/palette/) style関数。

## The sx prop

All system properties are available via the `sx` prop. In addition, this prop allows you to specify any other CSS rules you may need. Here's an example of how you can use it:

{{"demo": "pages/components/box/BoxSx.js", "defaultCodeOpen": true }}

## Material-UI componentsのオーバーライド

The Box componentは、コンポーネントをラップします。 新しいDOM要素を作成します。 この要素はデフォルトで`<div>`であり、`component` プロパティを使用して変更できます。 代わりに `<span>` を使用すると

{{"demo": "pages/components/box/BoxComponent.js", "defaultCodeOpen": true }}

これは、新しいDOM要素に分離する変更の場合に非常に有効です。 たとえば、この方法で余白を変更できます。 たとえば、この方法で余白を変更できます。 たとえば、この方法で余白を変更できます。

ただし、場合によっては基礎となるDOM要素をターゲットにする必要があります。 For instance, you want to change the border of the Button. The Button component defines its own styles. CSS継承は役に立ちません。 この問題を回避するには、次の2つの方法があります。

1. [`React.cloneElement()`](https://reactjs.org/docs/react-api.html#cloneelement)を使う

ボックスの子は、レンダープロップス機能を受け入れます `className`を取り出すことができます。

{{"demo": "pages/components/box/BoxClone.js", "defaultCodeOpen": true }}

2. Render propsを使う

ボックスの子は、レンダープロップス機能を受け入れます `className`を取り出すことができます。

{{"demo": "pages/components/box/BoxRenderProps.js", "defaultCodeOpen": true }}

> CSSの仕様は、インポート順序に依存します。 ラップされたコンポーネントのスタイルが確実にオーバーライドされるようにするには、最後にボックスをインポートする必要があります。

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Name                                                    | Type                                                                                                                          | Default                                 | Description                                                         |
|:------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:------------------------------------------------------------------- |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br>&nbsp;func<br></span>                                     |                                         | ボックスレンダー関数またはノード。                                                   |
| <span class="prop-name">clone</span>                    | <span class="prop-type">bool</span>                                                                                           | <span class="prop-default">false</span> | `true`の場合、ボックスはその子DOM要素をリサイクルします。 内部的には`React.cloneElement`です。      |
| <span class="prop-name">component</span>                | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | ルートノードに使用されるコンポーネント。 DOM要素またはコンポーネントを使用する文字列。                       |
| <span class="prop-name">sx</span>                       | <span class="prop-type">object</span>                                                                                         | <span class="prop-default">{}</span>    | Accepts all system properties, as well as any valid CSS properties. |
