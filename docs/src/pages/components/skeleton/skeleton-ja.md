---
title: Skeleton React component
components: Skeleton
---

# スケルトン

<p class="description">データがロードされる前にコンテンツのプレースホルダープレビューを表示して、ロード時のフラストレーションを軽減します。</p>

コンポーネントのデータがすぐに利用できない場合があります。 スケルトンを使用することにより、ユーザーの知覚パフォーマンスを向上させることができます。 すぐに物事が発生しているように感じ、情報が画面に徐々に表示されます（Cf. [Avoid The Spinner](https://www.lukew.com/ff/entry.asp?1797)).

このコンポーネントは、**コンポーネント内で直接使用**できるように設計されています。 例えば：

```jsx
{item ? (
  <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
) : (
  <Skeleton variant="rect" width={210} height={118} />
)}
```

## YouTubeの例

{{"demo": "pages/components/skeleton/YouTube.js"}}

## Facebookの例

{{"demo": "pages/components/skeleton/Facebook.js"}}