# Display 显示

<p class="description">使用显示（display）工具集来快速、灵敏地切换组件的显示状态等。 这样包括对一些更常见值的支持，以及一些用于在打印时控制显示的附加功能。</p>

## 例子

### 内嵌元素（Inline）

{{"demo": "Inline.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box component="div" sx={{ display: 'inline' }}>内嵌元素</Box>
<Box component="div" sx={{ display: 'inline' }}>内嵌元素</Box>
```

### 块级元素（Block）

{{"demo": "Block.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box component="span" sx={{ display: 'block' }}>块级元素</Box>
<Box component="span" sx={{ display: 'block' }}>块级元素</Box>
```

## 隐藏元素（Hiding elements）

为了更快速地进行移动端的开发，您可以使用响应式的显示类来按设备显示和隐藏元素。 避免为同一站点创建完全不同的版本，您只需要根据不同的屏幕大小来相应地隐藏元素。

| 屏幕大小        | 类别                                                           |
|:----------- |:------------------------------------------------------------ |
| 在所有设备上隐藏    | `sx={{ display: 'none' }}`                                   |
| 仅在 xs 大小时隐藏 | `sx={{ display: { xs: 'none', sm: 'block' } }}`              |
| 仅在 sm 大小时隐藏 | `sx={{ display: { xs: 'block', sm: 'none', md: 'block' } }}` |
| 仅在 md 大小时隐藏 | `sx={{ display: { xs: 'block', md: 'none', lg: 'block' } }}` |
| 仅在 lg 大小时隐藏 | `sx={{ display: { xs: 'block', lg: 'none', xl: 'block' } }}` |
| 仅在 xl 大小时隐藏 | `sx={{ display: { xs: 'block', xl: 'none' } }}`              |
| 仅在 xs 大小时可见 | `sx={{ display: { xs: 'block', sm: 'none' } }}`              |
| 仅在 sm 大小时可见 | `sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }}`  |
| 仅在 md 大小时可见 | `sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}`  |
| 仅在 lg 大小时可见 | `sx={{ display: { xs: 'none', lg: 'block', xl: 'none' } }}`  |
| 仅在 xl 大小时可见 | `sx={{ display: { xs: 'none', xl: 'block' } }}`              |

{{"demo": "Hiding.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ display: { xs: 'block', md: 'none' }}}>
  在宽度大于 md 的屏幕上隐藏
</Box>
<Box sx={{ display: { xs: 'none', md: 'block' }}}>
  在宽度小于 md 的屏幕上隐藏
</Box>
```

## 控制打印设备中的显示

{{"demo": "Print.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ display: 'block', displayPrint: 'none' }}>
  仅在屏幕上显示（仅在打印时隐藏）
</Box>
<Box sx={{ display: 'none', displayPrint: 'block' }}>
  仅打印上显示（仅在屏幕上隐藏）
</Box>
```

## 溢出（Overflow）

{{"demo": "Overflow.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ overflow: 'hidden' }}>
  隐藏溢出的元素
</Box>
<Box component="div" sx={{ overflow: 'visible' }}>
  显示溢出的元素
</Box>
```

## 文本溢出（Text overflow）

{{"demo": "TextOverflow.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ textOverflow: 'clip' }}>
  文本溢出时直接剪切
</Box>
<Box component="div" sx={{ textOverflow: 'ellipsis' }}>
  文本溢出时显示省略号
</Box>
```

## 可见性（Visibility）

{{"demo": "Visibility.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ visibility: 'visible' }}>
  可见
</Box>
<Box component="div" sx={{ visibility: 'hidden' }}>
  不可见
</Box>
```

## 空格（White space）

{{"demo": "WhiteSpace.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ whiteSpace: 'nowrap' }}>
  不换行的空格
</Box>
<Box component="div" sx={{ whiteSpace: 'normal' }}>
  普通的空格
</Box>
</Box>
<Box component="div" sx={{ whiteSpace: 'normal' }}>
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
</Box>
```

## API

```js
import { display } from '@mui/system';
```

| 导入名称              | 属性                | CSS 属性            | Theme key |
|:----------------- |:----------------- |:----------------- |:--------- |
| `displayPrint`    | `displayPrint`    | `display`         | none      |
| `displayRaw`      | `display`         | `display`         | none      |
| `溢出（Overflow）`    | `溢出（Overflow）`    | `溢出（Overflow）`    | none      |
| `textOverflow`    | `textOverflow`    | `text-overflow`   | none      |
| `可见性（Visibility）` | `可见性（Visibility）` | `可见性（Visibility）` | none      |
| `whiteSpace`      | `whiteSpace`      | `white-space`     | none      |
