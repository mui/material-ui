---
title: React Container component
components: Container
---

# Container(コンテナ)

<p class="description">コンテナはコンテンツを水平方向に中央揃えにします。 それが最も基本的なレイアウト要素です。</p>

コンテナは入れ子にすることができますが、ほとんどのレイアウトは入れ子になったコンテナを必要としません。

## Fluid(可変)

A fluid container width is bounded by the `maxWidth` property value.

{{"demo": "pages/components/container/SimpleContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container maxWidth="sm">
```

## 固定

完全に流動的なビューポートに対応するのではなく、固定サイズのセット用に設計したい場合は、 `fixed` プロパティを設定できます。 最大幅は、現在のブレークポイントの最小幅と一致します。 最大幅は、現在のブレークポイントの最小幅と一致します。

{{"demo": "pages/components/container/FixedContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container fixed>
```