# Sizing 大小

<p class="description">使用设置宽和高的辅助功能，您能够轻松的将一个元素的宽度或者高度设置为相对于父级元素一样。</p>

## 支持的值

大小调整样式函数支持不同的属性输入类型：

{{"demo": "pages/system/sizing/Values.js", "defaultCodeOpen": false}}

```jsx
<Box width={1/4}> // 在 [0，1] 区间的数字，乘以 100 在转换成百分数（%）。
<Box width={300}> // 转换成像素值的数字。
<Box width="75%"> // 字符串的值作为原始的 CSS 使用。
<Box width={1}>   // 100%
```

## 宽度

{{"demo": "pages/system/sizing/Width.js", "defaultCodeOpen": false}}

```jsx
<Box width="25%">…
<Box width="50%">…
<Box width="75%">…
<Box width="100%">…
<Box width="auto">…
```

## 高度

{{"demo": "pages/system/sizing/Height.js", "defaultCodeOpen": false}}

```jsx
<Box height="25%">…
<Box height="50%">…
<Box height="75%">…
<Box height="100%">…
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