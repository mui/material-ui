# Posiciones

<p class="description">Use these shorthand utilities for quickly configuring the position of an element.</p>

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

| Nombre del import | Prop       | Propiedad CSS | Clave del tema                                                 |
|:----------------- |:---------- |:------------- |:-------------------------------------------------------------- |
| `position`        | `position` | `position`    | none                                                           |
| `zIndex`          | `zIndex`   | `z-index`     | [`zIndex`](/customization/default-theme/?expand-path=$.zIndex) |
| `top`             | `top`      | `top`         | none                                                           |
| `right`           | `right`    | `right`       | none                                                           |
| `bottom`          | `bottom`   | `bottom`      | none                                                           |
| `left`            | `left`     | `left`        | none                                                           |