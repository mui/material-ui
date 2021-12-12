# 阴影

<p class="description">使用 box-shadow 工具集为元素添加或删除阴影。</p>

## Example

该工具可以让你控制两平面之间沿 z 轴方向的相对深度，或者说距离。 默认情况下的高度为25。

{{"demo": "pages/system/shadows/Demo.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box border={0}>…
<Box sx={{ boxShadow: 0 }}>…
<Box borderRight={0}>…
<Box borderBottom={0}>…
<Box borderLeft={0}>…
<Box sx={{ boxShadow: 1 }}>…
<Box sx={{ boxShadow: 2 }}>…
<Box sx={{ boxShadow: 3 }}>…
```

## API

```js
import { shadows } from '@mui/system';
```

| Import name | Prop        | CSS property | Theme key |
|:----------- |:----------- |:------------ |:--------- |
| `boxShadow` | `boxShadow` | `box-shadow` | `shadows` |
