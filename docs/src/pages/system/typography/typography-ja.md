# タイポグラフィ

<p class="description">位置合わせ、ラッピング、重みなどをコントロールする一般的なテキストユーティリティのドキュメントと例。</p>

## テキストの位置

{{"demo": "pages/system/typography/TextAlignment.js", "defaultCodeOpen": false}}

```jsx
<Box textAlign="left">…
<Box textAlign="center">…
<Box textAlign="right">…
```

## Font weight

{{"demo": "pages/system/typography/FontWeight.js", "defaultCodeOpen": false}}

```jsx
<Box fontWeight="fontWeightLight">…
<Box fontWeight="fontWeightRegular">…
<Box fontWeight="fontWeightMedium">…
<Box fontWeight={500}>…
<Box fontWeight="fontWeightBold">…
```

## フォントサイズ

{{"demo": "pages/system/typography/FontSize.js", "defaultCodeOpen": false}}

```jsx
<Box fontSize="fontSize">…
<Box fontSize="h6.fontSize">…
<Box fontSize={16}>…
```

## フォントスタイル

{{"demo": "pages/system/typography/FontStyle.js", "defaultCodeOpen": false}}

```jsx
<Box fontStyle="normal">…
<Box fontStyle="italic">…
<Box fontStyle="oblique">…
```

## フォントファミリー

{{"demo": "pages/system/typography/FontFamily.js", "defaultCodeOpen": false}}

```jsx
<Box fontFamily="fontFamily">…
<Box fontFamily="Monospace">…
```

## 文字間隔

{{"demo": "pages/system/typography/LetterSpacing.js", "defaultCodeOpen": false}}

```jsx
<Box letterSpacing={6}>…
<Box letterSpacing={10}>…
```

## 行の高さ

{{"demo": "pages/system/typography/LineHeight.js", "defaultCodeOpen": false}}

```jsx
<Box lineHeight="normal">…
<Box lineHeight={10}>…
```

## API

```js
import { typography } from '@material-ui/system';
```

| Import name     | Prop            | CSS property     | Theme key                                                              |
|:--------------- |:--------------- |:---------------- |:---------------------------------------------------------------------- |
| `fontFamily`    | `fontFamily`    | `font-family`    | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontSize`      | `fontSize`      | `font-size`      | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontStyle`     | `fontStyle`     | `font-style`     | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontWeight`    | `fontWeight`    | `font-weight`    | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `letterSpacing` | `letterSpacing` | `letter-spacing` | none                                                                   |
| `lineHeight`    | `lineHeight`    | `line-height`    | none                                                                   |
| `textAlign`     | `textAlign`     | `text-align`     | none                                                                   |