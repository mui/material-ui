# 位置

<p class="description">使用这些速记工具集可以快速设置元素的位置。</p>

## z-index

{{"demo": "pages/system/positions/ZIndex.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ zIndex: 'tooltip' }}>
<Box sx={{ zIndex: 'modal' }}>
```

## API

```js
import { positions } from '@material-ui/system';
```

| 导入名称       | 属性         | CSS 属性     | Theme key                                                      |
|:---------- |:---------- |:---------- |:-------------------------------------------------------------- |
| `position` | `position` | `position` | none                                                           |
| `zIndex`   | `zIndex`   | `z-index`  | [`zIndex`](/customization/default-theme/?expand-path=$.zIndex) |
| `top`      | `top`      | `top`      | none                                                           |
| `right`    | `right`    | `right`    | none                                                           |
| `bottom`   | `bottom`   | `bottom`   | none                                                           |
| `left`     | `left`     | `left`     | none                                                           |
