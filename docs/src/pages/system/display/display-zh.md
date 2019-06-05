# 显示

<p class="description">使用我们的显示实用程序快速响应地切换组件的显示值等。 包括对一些更常见值的支持，以及一些用于在打印时控制显示的附加功能。</p>

## 示例

```jsx
<Box component="div" display="inline">inline</Box>
<Box component="div" display="inline">inline</Box>
```

{{"demo": "pages/system/display/Inline.js"}}

```jsx
<Box component="span" display="block">block</Box>
<Box component="span" display="block">block</Box>
```

{{"demo": "pages/system/display/Block.js"}}

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

```jsx
<Box display={{ xs: 'block', md: 'none' }}>
  隐藏在比md宽的屏幕上
</Box>
<Box display={{ xs: 'none', md: 'block' }}>
  隐藏在小于md屏幕上
</Box>
```

{{"demo": "pages/system/display/Hiding.js"}}

## 显示在打印中

```jsx
<Box display="block" displayPrint="none">
  Screen Only (Hide on print only)
</Box>
<Box display="none" displayPrint="block">
  Print Only (Hide on screen only)
</Box>
```

{{"demo": "pages/system/display/Print.js"}}

## API

```js
import { display } from '@material-ui/system';
```

| 导入名称           | Prop           | CSS 属性    | Theme key |
|:-------------- |:-------------- |:--------- |:--------- |
| `displayRaw`   | `display`      | `display` | none      |
| `displayPrint` | `displayPrint` | `display` | none      |