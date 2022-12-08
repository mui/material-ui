# Sizing 大小

<p class="description">使用设置宽和高的辅助功能，您能够轻松的将一个元素的宽度或者高度设置为相对于父级元素一样。</p>

## 支持的值

Sizing 样式函数支持不同的属性输入类型：

```js
function transform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
```

If the value is between [0, 1], it's converted to percent. Otherwise, it is directly set on the CSS property. Otherwise, it is directly set on the CSS property.

{{"demo": "Values.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ width: 1/4 }}> // Equivalent to width: '25%'
<Box sx={{ width: 300 }}> // Numbers are converted to pixel values.
<Box sx={{ width: '75%' }}> // 字符串的值作为原始的 CSS 使用。
<Box sx={{ width: '75%' }}> // String values are used as raw CSS.
<Box sx={{ width: 1 }}> // 100%
```

## 宽度

{{"demo": "Width.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ width: '25%' }}>…
<Box sx={{ width: '50%' }}>…
<Box sx={{ width: '75%' }}>…
<Box sx={{ width: '100%' }}>…
<Box sx={{ width: 'auto' }}>…
```

### Max-width

The max-width property allows setting a constraint on your breakpoints. In this example, the value resolves to [`theme.breakpoints.values.md`](/material-ui/customization/default-theme/?expand-path=$.breakpoints.values).

```jsx
<Box sx={{ maxWidth: 'md' }}>…
```

## 高度

{{"demo": "Height.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ height: '25%' }}>…
<Box sx={{ height: '50%' }}>…
<Box sx={{ height: '75%' }}>…
<Box sx={{ height: '100%' }}>…
```

## API

```js
import { sizing } from '@mui/system';
```

| 导入名称        | 属性          | CSS 属性       | Theme key                                                                                                |
|:----------- |:----------- |:------------ |:-------------------------------------------------------------------------------------------------------- |
| `width`     | `width`     | `width`      | none                                                                                                     |
| `maxWidth`  | `maxWidth`  | `max-width`  | [`theme.breakpoints.values`](/material-ui/customization/default-theme/?expand-path=$.breakpoints.values) |
| `minWidth`  | `minWidth`  | `min-width`  | none                                                                                                     |
| `height`    | `height`    | `height`     | none                                                                                                     |
| `maxHeight` | `maxHeight` | `max-height` | none                                                                                                     |
| `minHeight` | `minHeight` | `min-height` | none                                                                                                     |
| `boxSizing` | `boxSizing` | `box-sizing` | none                                                                                                     |
