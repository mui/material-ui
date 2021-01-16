# Flexbox

<p class="description">レスポンシブなflexboxユーティリティのフルスイートを使用して、グリッドカラム、ナビゲーション、コンポーネントなどのレイアウト、整列、サイズ調整をすばやく管理できます。</p>

**flexboxに不慣れ**な場合、 [CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) を読むことをおすすめします。

## 親のプロパティ

### display

{{"demo": "pages/system/flexbox/Display.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ display: 'flex' }}>…
```

### flex-direction

{{"demo": "pages/system/flexbox/FlexDirection.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ flexDirection: 'row' }}>…
<Box sx={{ flexDirection: 'row-reverse' }}>…
```

### flex-wrap

{{"demo": "pages/system/flexbox/FlexWrap.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ flexWrap: 'nowrap' }}>…
<Box sx={{ flexWrap: 'wrap' }}>…
```

### justify-content

{{"demo": "pages/system/flexbox/JustifyContent.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ justifyContent: 'flex-start' }}>…
<Box sx={{ justifyContent: 'flex-end' }}>…
<Box sx={{ justifyContent: 'center' }}>…
```

### align-items

{{"demo": "pages/system/flexbox/AlignItems.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ alignItems: 'flex-start' }}>…
<Box sx={{ alignItems: 'flex-end' }}>…
<Box sx={{ alignItems: 'center' }}>…
```

### align-content

{{"demo": "pages/system/flexbox/AlignContent.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ alignContent: 'flex-start' }}>…
<Box sx={{ alignContent: 'flex-end' }}>…
```

## 子供のプロパティ

### order

{{"demo": "pages/system/flexbox/Order.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ order: 2 }}>Item 1</Box>
<Box sx={{ order: 3 }}>Item 2</Box>
<Box sx={{ order: 1 }}>Item 3</Box>
```

### flex-grow

{{"demo": "pages/system/flexbox/FlexGrow.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ flexGrow: 1 }}>Item 1</Box>
<Box>Item 2</Box>
<Box>Item 3</Box>
```

### flex-shrink

{{"demo": "pages/system/flexbox/FlexShrink.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ width: '100%' }}>Item 1</Box>
<Box sx={{ flexShrink: 1 }}>Item 2</Box>
<Box sx={{ flexShrink: 0 }}>Item 3</Box>
```

### align-self

{{"demo": "pages/system/flexbox/AlignSelf.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box>Item 1</Box>
<Box sx={{ alignSelf: 'flex-end' }}>Item 2</Box>
<Box>Item 3</Box>
```

## API

```js
import { flexbox } from '@material-ui/system';
```

| Import name      | Prop             | CSS property      | Theme key |
|:---------------- |:---------------- |:----------------- |:--------- |
| `flexDirection`  | `flexDirection`  | `flex-direction`  | none      |
| `flexWrap`       | `flexWrap`       | `flex-wrap`       | none      |
| `justifyContent` | `justifyContent` | `justify-content` | none      |
| `alignItems`     | `alignItems`     | `align-items`     | none      |
| `alignContent`   | `alignContent`   | `align-content`   | none      |
| `order`          | `order`          | `order`           | none      |
| `flex`           | `flex`           | `flex`            | none      |
| `flexGrow`       | `flexGrow`       | `flex-grow`       | none      |
| `flexShrink`     | `flexShrink`     | `flex-shrink`     | none      |
| `alignSelf`      | `alignSelf`      | `align-self`      | none      |
