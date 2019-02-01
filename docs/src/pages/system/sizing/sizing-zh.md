# 浆纱

<p class="description">使用我们的宽度和高度实用程序轻松地将元素设置为宽或高（相对于其父元素）。</p>

## 支持的值

大小调整样式函数支持不同的属性输入类型：

```jsx
<Box width={1/4}> // Numbers in [0,1] are multiplied by 100 and converted to % values.
<Box width={300}> // Numbers are converted to pixel values.
<Box width="75%"> // String values are used as raw CSS.
<Box width={1}>   // 100%
```

{{"demo": "pages/system/sizing/Values.js"}}

## 宽度

```jsx
<Box width="25%">…
<Box width="50%">…
<Box width="75%">…
<Box width="100%">…
<Box width="auto">…
```

{{"demo": "pages/system/sizing/Width.js"}}

## 高度

```jsx
<Box height="25%">…
<Box height="50%">…
<Box height="75%">…
<Box height="100%">…
```

{{"demo": "pages/system/sizing/Height.js"}}

## API

```js
import { sizing } from '@material-ui/system';
```

| 导入名称        | Prop        | CSS 属性       | 主题键  |
|:----------- |:----------- |:------------ |:---- |
| `width`     | `width`     | `width`      | none |
| `maxWidth`  | `maxWidth`  | `max-width`  | none |
| `minWidth`  | `minWidth`  | `min-width`  | none |
| `height`    | `height`    | `height`     | none |
| `maxHeight` | `maxHeight` | `max-height` | none |
| `minHeight` | `minHeight` | `min-height` | none |