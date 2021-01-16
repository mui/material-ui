# Sizing 大小

<p class="description">使用设置宽和高的辅助功能，您能够轻松的将一个元素的宽度或者高度设置为相对于父级元素一样。</p>

## 支持的值

Sizing 样式函数支持不同的属性输入类型：

{{"demo": "pages/system/sizing/Values.js", "defaultCodeOpen": false}}

```jsx
// 在 [0,1] 中的数字乘以 100 并转换为 % 值。
<Box sx={{ width: 1/4 }}>
<Box sx={{ width: 300 }}> // 讲数字转换为像素值。
<Box sx={{ width: '75%' }}> // 字符串的值作为原始的 CSS 使用。
<Box sx={{ width: 1 }}> // 100%
```

## 宽度

{{"demo": "pages/system/sizing/Width.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ width: '25%' }}>…
<Box sx={{ width: '50%' }}>…
<Box sx={{ width: '75%' }}>…
<Box sx={{ width: '100%' }}>…
<Box sx={{ width: 'auto' }}>…
```

## 高度

{{"demo": "pages/system/sizing/Height.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ height: '25%' }}>…
<Box sx={{ height: '50%' }}>…
<Box sx={{ height: '75%' }}>…
<Box sx={{ height: '100%' }}>…
```

## API

```js
import { sizing } from '@material-ui/system';
```

| 导入名称        | 属性          | CSS 属性       | Theme key |
|:----------- |:----------- |:------------ |:--------- |
| `width`     | `width`     | `width`      | none      |
| `maxWidth`  | `maxWidth`  | `max-width`  | none      |
| `minWidth`  | `minWidth`  | `min-width`  | none      |
| `height`    | `height`    | `height`     | none      |
| `maxHeight` | `maxHeight` | `max-height` | none      |
| `minHeight` | `minHeight` | `min-height` | none      |
| `boxSizing` | `boxSizing` | `box-sizing` | none      |
