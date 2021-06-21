# Shadows

<p class="description">Box-shadow ユーティリティを使用して要素に影を追加または削除します。</p>

## 例

Elevationヘルパーを使用すると、 <strong x-id="1">z-axis</strong> に沿った2つのサーフェス間の相対的な影の濃度または距離を制御できます。 デフォルトでは、濃度25です。

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

| Import name | Prop        | CSS property | Theme key |
|:----------- |:----------- |:------------ |:--------- |
| `boxShadow` | `boxShadow` | `box-shadow` | `shadows` |