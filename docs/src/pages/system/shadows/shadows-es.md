# Sombras

<p class="description">Add or remove shadows to elements with box-shadow utilities.</p>

## Ejemplo

The helpers allow you to control relative depth, or distance, between two surfaces along the z-axis. By default, there is 25 elevation levels.

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

| Nombre del import | Prop        | Propiedad CSS | Clave del tema |
|:----------------- |:----------- |:------------- |:-------------- |
| `boxShadow`       | `boxShadow` | `box-shadow`  | `shadows`      |