# Display 显示

<p class="description">使用显示（display）工具集来快速、灵敏地切换组件的显示状态等。 这样包括对一些更常见值的支持，以及一些用于在打印时控制显示的附加功能。</p>

## 例子

### 内嵌元素（Inline）

{{"demo": "pages/system/display/Inline.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box component="div" display="inline">inline</Box>
<Box component="div" display="inline">inline</Box>
```

### 块级元素（Block）

{{"demo": "pages/system/display/Block.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box component="span" display="block">block</Box>
<Box component="span" display="block">block</Box>
```

## 隐藏元素（Hiding elements）

为了更快速地进行移动端的开发，您可以使用响应式的显示类来按设备显示和隐藏元素。 避免为同一站点创建完全不同的版本，您只需要根据不同的屏幕大小来相应地隐藏元素。

| 屏幕大小        | 类别                                                   |
|:----------- |:---------------------------------------------------- |
| 在所有设备上隐藏    | `display="none"`                                     |
| 仅在 xs 大小时隐藏 | `display={{ xs: 'none', sm: 'block' }}`              |
| 仅在 sm 大小时隐藏 | `display={{ xs: 'block', sm: 'none', md: 'block' }}` |
| 仅在 md 大小时隐藏 | `display={{ xs: 'block', md: 'none', lg: 'block' }}` |
| 仅在 lg 大小时隐藏 | `display={{ xs: 'block', lg: 'none', xl: 'block' }}` |
| 仅在 xl 大小时隐藏 | `display={{ xs: 'block', xl: 'none' }}`              |
| 仅在 xs 大小时可见 | `display={{ xs: 'block', sm: 'none' }}`              |
| 仅在 sm 大小时可见 | `display={{ xs: 'none', sm: 'block', md: 'none' }}`  |
| 仅在 md 大小时可见 | `display={{ xs: 'none', md: 'block', lg: 'none' }}`  |
| 仅在 lg 大小时可见 | `display={{ xs: 'none', lg: 'block', xl: 'none' }}`  |
| 仅在 xl 大小时可见 | `display={{ xs: 'none', xl: 'block' }}`              |


{{"demo": "pages/system/display/Hiding.js", "defaultCodeOpen": false}}

```jsx
<Box display={{ xs: 'block', md: 'none' }}>
  在宽度大于 md 的屏幕上隐藏
</Box>
<Box display={{ xs: 'none', md: 'block' }}>
  在宽度小于 md 的屏幕上隐藏
</Box>
```

## 控制打印设备中的显示

{{"demo": "pages/system/display/Print.js", "defaultCodeOpen": false}}

```jsx
<Box display="block" displayPrint="none">
  仅在屏幕上显示（仅在打印时隐藏）
</Box>
<Box display="none" displayPrint="block">
  仅打印上显示（仅在屏幕上隐藏）
</Box>
```

## 溢出（Overflow）

{{"demo": "pages/system/display/Overflow.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" overflow="hidden">
  隐藏溢出的元素
</Box>
<Box component="div" overflow="visible">
  显示溢出的元素
</Box>
```

## 文本溢出（Text Overflow）

{{"demo": "pages/system/display/TextOverflow.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" textOverflow="clip">
  文本溢出时直接剪切
</Box>
<Box component="div" textOverflow="ellipsis">
  文本溢出时显示省略号
</Box>
```

## 可见性（Visibility）

{{"demo": "pages/system/display/Visibility.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" visibility="visible">
  可见
</Box>
<Box component="div" visibility="hidden">
  不可见
</Box>
```

## 空格（White Space）

{{"demo": "pages/system/display/WhiteSpace.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" whiteSpace="nowrap">
  不换行的空格
</Box>
<Box component="div" whiteSpace="normal">
  普通的空格
</Box>
```

## API

```js
import { display } from '@material-ui/system';
```

| 导入名称           | 属性             | CSS 属性          | Theme key |
|:-------------- |:-------------- |:--------------- |:--------- |
| `displayPrint` | `displayPrint` | `display`       | none      |
| `displayRaw`   | `display`      | `display`       | none      |
| `overflow`     | `overflow`     | `overflow`      | none      |
| `textOverflow` | `textOverflow` | `text-overflow` | none      |
| `visibility`   | `visibility`   | `visibility`    | none      |
| `whiteSpace`   | `whiteSpace`   | `white-space`   | none      |