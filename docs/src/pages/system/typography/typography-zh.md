# 活版印刷

<p class="description">用于控制对齐，包装，重量等的常用文本实用程序的文档和示例。</p>

## 文本对齐

```jsx
<Box textAlign="left">…
<Box textAlign="center">…
<Box textAlign="right">…
```

{{"demo": "pages/system/typography/TextAlignment.js"}}

## 字体高度

```jsx
<Box fontWeight="fontWeightLight">…
<Box fontWeight="fontWeightRegular">…
<Box fontWeight="fontWeightMedium">…
<Box fontWeight={500}>…
<Box fontWeight="fontWeightBold">…
```

{{"demo": "pages/system/typography/FontWeight.js"}}

## 字体大小 

```jsx
<Box fontSize="fontSize">…
<Box fontSize="h6.fontSize">…
<Box fontSize={16}>…
```

{{"demo": "pages/system/typography/FontSize.js"}}

## 字体样式

```jsx
<Box fontStyle="normal">…
<Box fontStyle="italic">…
<Box fontStyle="oblique">…
```

{{"demo": "pages/system/typography/FontStyle.js"}}

## 字体系列

```jsx
<Box fontFamily="fontFamily">…
<Box fontFamily="Monospace">…
```

{{"demo": "pages/system/typography/FontFamily.js"}}

## 字符间距

```jsx
<Box letterSpacing={6}>…
<Box letterSpacing={10}>…
```

{{"demo": "pages/system/typography/LetterSpacing.js"}}

## 行高

```jsx
<Box lineHeight="normal">…
<Box lineHeight={10}>…
```

{{"demo": "pages/system/typography/LineHeight.js"}}

## API

```js
import { typography } from '@material-ui/system';
```

| 导入名称            | Prop            | CSS 属性           | Theme key                                                              |
|:--------------- |:--------------- |:---------------- |:---------------------------------------------------------------------- |
| `fontFamily`    | `fontFamily`    | `font-family`    | [`typography`](/customization/default-theme/?expend-path=$.typography) |
| `fontSize`      | `fontSize`      | `font-size`      | [`typography`](/customization/default-theme/?expend-path=$.typography) |
| `fontStyle`     | `fontStyle`     | `font-style`     | [`typography`](/customization/default-theme/?expend-path=$.typography) |
| `fontWeight`    | `fontWeight`    | `font-weight`    | [`typography`](/customization/default-theme/?expend-path=$.typography) |
| `letterSpacing` | `letterSpacing` | `letter-spacing` | none                                                                   |
| `lineHeight`    | `lineHeight`    | `line-height`    | none                                                                   |
| `textAlign`     | `textAlign`     | `text-align`     | none                                                                   |