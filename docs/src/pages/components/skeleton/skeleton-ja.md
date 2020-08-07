---
title: Skeleton React component
components: Skeleton
---

# スケルトン

<p class="description">データがロードされる前にコンテンツのプレースホルダープレビューを表示して、ロード時のフラストレーションを軽減します。</p>

コンポーネントのデータがすぐに利用できない場合があります。 スケルトンを使用することにより、ユーザーの知覚パフォーマンスを向上させることができます。 すぐに物事が発生しているように感じ、情報が画面に徐々に表示されます（Cf. [Avoid The Spinner](https://www.lukew.com/ff/entry.asp?1797)).

このコンポーネントは、**コンポーネント内で直接使用**できるように設計されています。 例えば： 例えば：

```jsx
{item ? (
  <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
) : (
  <Skeleton variant="rect" width={210} height={118} />
)}
```

## バリアント

The component supports 3 shape variants.

{{"demo": "pages/components/skeleton/Variants.js"}}

## Animations

By default, the skeleton pulsate, but you can change the animation for a wave or disable it entirely.

{{"demo": "pages/components/skeleton/Animations.js"}}

### Pulsate example

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

### Wave example

{{"demo": "pages/components/skeleton/Facebook.js", "defaultCodeOpen": false, "bg": true}}

## Inferring dimensions

In addition to accepting `width` and `height` props, the component can also infer the dimensions.

It works well when it comes to typography as its height is set using `em` units.

```jsx
<Typography variant="h1">
  {loading ? <Skeleton /> : 'h1'}
</Typography>
```

{{"demo": "pages/components/skeleton/SkeletonTypography.js", "defaultCodeOpen": false}}

But when it comes to other components, you may not want to repeat the width and height. In these instances, you can pass `children` and it will infer its width and height from them.

```jsx
loading
  ? <Skeleton><Avatar /></Skeleton>
  : <Avatar src={data.avatar} />
```

{{"demo": "pages/components/skeleton/SkeletonChildren.js", "defaultCodeOpen": false}}

## アクセシビリティ

Skeleton screens provide an alternative to the traditional spinner methods. Rather than showing an abstract widget, skeleton screens create anticipation of what is to come and reduce cognitive load.

The background color of the skeleton uses the least amount of luminance to be visible in good conditions (good ambient light, good screen, no visual impairments).