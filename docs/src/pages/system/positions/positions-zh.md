# 位置

<p class="description">使用这些简写的小程程序来快速配置元素的位置。</p>

## z-index

{{"demo": "pages/system/positions/ZIndex.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box zIndex="tooltip">
<Box zIndex="modal">
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