# Positionen

<p class="description">Verwenden Sie diese Hilfsprogramme zum schnellen Konfigurieren der Position eines Elements.</p>

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

| Inportname | Eigenschaften | CSS-Eigenschaft | Theme-Schlüssel                                                |
|:---------- |:------------- |:--------------- |:-------------------------------------------------------------- |
| `position` | `position`    | `position`      | none                                                           |
| `zIndex`   | `zIndex`      | `z-index`       | [`zIndex`](/customization/default-theme/?expand-path=$.zIndex) |
| `top`      | `top`         | `top`           | none                                                           |
| `right`    | `right`       | `right`         | none                                                           |
| `bottom`   | `bottom`      | `bottom`        | none                                                           |
| `left`     | `left`        | `left`          | none                                                           |