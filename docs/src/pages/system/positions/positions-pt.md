# Posições

<p class="description">Use esses utilitários para configurar rapidamente a posição de um elemento.</p>

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

| Nome da importação | Propriedade | Propriedade CSS | Chave do tema                                                  |
|:------------------ |:----------- |:--------------- |:-------------------------------------------------------------- |
| `position`         | `position`  | `position`      | none                                                           |
| `zIndex`           | `zIndex`    | `z-index`       | [`zIndex`](/customization/default-theme/?expand-path=$.zIndex) |
| `top`              | `top`       | `top`           | none                                                           |
| `right`            | `right`     | `right`         | none                                                           |
| `bottom`           | `bottom`    | `bottom`        | none                                                           |
| `left`             | `left`      | `left`          | none                                                           |