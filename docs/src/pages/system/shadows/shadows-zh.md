# 阴影

<p class="description">使用box-shadow实用程序为元素添加或删除阴影。</p>

## 示例

该工具可以让你控制两平面之间沿z轴方向的相对深度，或者说距离。 默认情况下，高度为25。

{{"demo": "pages/system/shadows/Demo.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box boxShadow={0}>…
<Box boxShadow={1}>…
<Box boxShadow={2}>…
<Box boxShadow={3}>…
```

## API

```js
import { shadows } from '@material-ui/system';
```

| 导入名称        | Prop        | CSS 属性       | Theme key |
|:----------- |:----------- |:------------ |:--------- |
| `boxShadow` | `boxShadow` | `box-shadow` | `shadows` |