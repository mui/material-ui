# 显示

<p class="description">使用 显示(display) 工具集来快速、灵敏地切换组件的 显示(display) 状态等。 包括对一些更常见值的支持，以及一些用于在打印时控制显示的附加功能。</p>

## 例子

### Inline（内嵌元素）

{{"demo": "pages/system/display/Inline.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box component="div" display="inline">inline</Box>
<Box component="div" display="inline">inline</Box>
```

### Block（块级元素）

{{"demo": "pages/system/display/Block.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box component="span" display="block">block</Box>
<Box component="span" display="block">block</Box>
```

## 隐藏元素

为了更快地进行移动设备开发，请使用响应式显示类来按设备显示和隐藏元素。 避免创建相同站点的完全不同版本，而是相应地为每个屏幕大小隐藏元素。

| 屏幕大小     | 类别                                                   |
|:-------- |:---------------------------------------------------- |
| 隐藏在所有人身上 | `display="none"`                                     |
| 仅隐藏在xs上  | `display={{ xs: 'none', sm: 'block' }}`              |
| 隐藏在sm上   | `display={{ xs: 'block', sm: 'none', md: 'block' }}` |
| 只在md上隐藏  | `display={{ xs: 'block', md: 'none', lg: 'block' }}` |
| 隐藏在lg上   | `display={{ xs: 'block', lg: 'none', xl: 'block' }}` |
| 只在xl上隐藏  | `display={{ xs: 'block', xl: 'none' }}`              |
| 仅在xs上可见  | `display={{ xs: 'block', sm: 'none' }}`              |
| 仅在sm上可见  | `display={{ xs: 'none', sm: 'block', md: 'none' }}`  |
| 仅在md上可见  | `display={{ xs: 'none', md: 'block', lg: 'none' }}`  |
| 仅在lg上可见  | `display={{ xs: 'none', lg: 'block', xl: 'none' }}`  |
| 仅在xl上可见  | `display={{ xs: 'none', xl: 'block' }}`              |


{{"demo": "pages/system/display/Hiding.js", "defaultCodeOpen": false}}

```jsx
<Box display={{ xs: 'block', md: 'none' }}>
  隐藏在比md宽的屏幕上
</Box>
<Box display={{ xs: 'none', md: 'block' }}>
  隐藏在小于md屏幕上
</Box>
```

## 显示在打印中

{{"demo": "pages/system/display/Print.js", "defaultCodeOpen": false}}

```jsx
<Box display="block" displayPrint="none">
  Screen Only (Hide on print only)
</Box>
<Box display="none" displayPrint="block">
  Print Only (Hide on screen only)
</Box>
```

## Overflow（溢出）

{{"demo": "pages/system/display/Overflow.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" overflow="hidden">
  Overflow Hidden
</Box>
<Box component="div" overflow="visible">
  Overflow visible
</Box>
```

## Text Overflow（文本溢出）

{{"demo": "pages/system/display/TextOverflow.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" textOverflow="clip">
  Text Overflow Clip
</Box>
<Box component="div" textOverflow="ellipsis">
  Text Overflow Ellipsis
</Box>
```

## Visibility（可见性）

{{"demo": "pages/system/display/Visibility.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" visibility="visible">
  Visibility Visible
</Box>
<Box component="div" visibility="hidden">
  Visibility Hidden
</Box>
```

## White Space（空格）

{{"demo": "pages/system/display/WhiteSpace.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" whiteSpace="nowrap">
  White Space Nowrap
</Box>
<Box component="div" whiteSpace="normal">
  White Space Normal
</Box>
```

## API

```js
import { display } from '@material-ui/system';
```

| 导入名称           | Prop           | CSS 属性          | Theme key |
|:-------------- |:-------------- |:--------------- |:--------- |
| `displayPrint` | `displayPrint` | `display`       | none      |
| `displayRaw`   | `display`      | `display`       | none      |
| `overflow`     | `overflow`     | `overflow`      | none      |
| `textOverflow` | `textOverflow` | `text-overflow` | none      |
| `visibility`   | `visibility`   | `visibility`    | none      |
| `whiteSpace`   | `whiteSpace`   | `white-space`   | none      |