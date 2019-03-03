# 边距

<p class="description">使用边框实用程序快速设置元素的边框和边框半径的样式。 非常适合图像，按钮或任何其他元素。</p>

## 描边

使用边框实用程序添加或删除元素的边框。 选择所有边框或一次一个。

### 添加剂

```jsx
<Box border={1}>…
<Box borderTop={1}>…
<Box borderRight={1}>…
<Box borderBottom={1}>…
<Box borderLeft={1}>…
```

{{"demo": "pages/system/borders/BorderAdditive.js"}}

### 减法

```jsx
<Box border={0}>…
<Box borderTop={0}>…
<Box borderRight={0}>…
<Box borderBottom={0}>…
<Box borderLeft={0}>…
```

{{"demo": "pages/system/borders/BorderSubtractive.js"}}

## 描边颜色

```jsx
<Box borderColor="primary.main">…
<Box borderColor="secondary.main">…
<Box borderColor="error.main">…
<Box borderColor="grey.500">…
<Box borderColor="text.primary">…
```

{{"demo": "pages/system/borders/BorderColor.js"}}

## 边界半径

```jsx
<Box borderRadius="50%">…
<Box borderRadius="borderRadius">…
<Box borderRadius={16}>…
```

{{"demo": "pages/system/borders/BorderRadius.js"}}

## API

```js
import { borders } from '@material-ui/system';
```

| 导入名称           | Prop           | CSS 属性          | Theme key                                                        |
|:-------------- |:-------------- |:--------------- |:---------------------------------------------------------------- |
| `border`       | `border`       | `border`        | `borders`                                                        |
| `borderTop`    | `borderTop`    | `border-top`    | `borders`                                                        |
| `borderLeft`   | `borderLeft`   | `border-left`   | `borders`                                                        |
| `borderRight`  | `borderRight`  | `border-right`  | `borders`                                                        |
| `borderBottom` | `borderBottom` | `border-bottom` | `borders`                                                        |
| `borderColor`  | `borderColor`  | `border-color`  | [`palette`](/customization/default-theme/?expend-path=$.palette) |
| `borderRadius` | `borderRadius` | `border-radius` | [`shape`](/customization/default-theme/?expend-path=$.shape)     |