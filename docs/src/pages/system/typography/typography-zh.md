# Typography（文字铸排）

<p class="description">用于控制对齐（alignment），封装（wrapping），以及字体权重（weight）等等的常用文本实用辅助工具的文档和示例。</p>

## 文本对齐（Text alignment）

{{"demo": "pages/system/typography/TextAlignment.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ textAlign: "left" }}>…
<Box sx={{ textAlign: "center" }}>…
<Box sx={{ textAlign: "right" }}>…
```

## 字体权重（Font weight）

{{"demo": "pages/system/typography/FontWeight.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontWeight: "fontWeightLight" }}>…
<Box sx={{ fontWeight: "fontWeightRegular" }}>…
<Box sx={{ fontWeight: "fontWeightMedium" }}>…
<Box sx={{ fontWeight: 500 }}>…
<Box sx={{ fontWeight: "fontWeightBold" }}>…
```

## 字体大小（Font size）

{{"demo": "pages/system/typography/FontSize.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontSize: "fontSize" }}>…
<Box sx={{ fontSize: "h6.fontSize" }}>…
<Box sx={{ fontSize: 16 }}>…
```

## 字体样式（Font Style）

{{"demo": "pages/system/typography/FontStyle.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontStyle: "normal" }}>…
<Box sx={{ fontStyle: "italic" }}>…
<Box sx={{ fontStyle: "oblique" }}>…
```

## Font family

{{"demo": "pages/system/typography/FontFamily.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontFamily: "fontFamily" }}>…
<Box sx={{ fontFamily: "Monospace" }}>…
```

## 字符间距（Letter Spacing）

{{"demo": "pages/system/typography/LetterSpacing.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ letterSpacing: 6 }}>…
<Box sx={{ letterSpacing: 10 }}>…
```

## 行高（Line Height）

{{"demo": "pages/system/typography/LineHeight.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ lineHeight: "normal" }}>…
<Box sx={{ lineHeight: 10 }}>…
```

## API

```js
import { typography } from '@material-ui/system';
```

| 导入名称            | 属性              | CSS 属性                                                                                       | Theme key                                                              |
|:--------------- |:--------------- |:-------------------------------------------------------------------------------------------- |:---------------------------------------------------------------------- |
| `typography`    | `typography`    | `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `text-transform` | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontFamily`    | `fontFamily`    | `font-family`                                                                                | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontSize`      | `fontSize`      | `font-size`                                                                                  | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontStyle`     | `fontStyle`     | `font-style`                                                                                 | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontWeight`    | `fontWeight`    | `font-weight`                                                                                | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `letterSpacing` | `letterSpacing` | `letter-spacing`                                                                             | none                                                                   |
| `lineHeight`    | `lineHeight`    | `line-height`                                                                                | none                                                                   |
| `textAlign`     | `textAlign`     | `text-align`                                                                                 | none                                                                   |
