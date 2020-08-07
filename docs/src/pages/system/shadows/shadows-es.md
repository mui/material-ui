# Sombras

<p class="description">Añade o elimina sombras de elementos con las propiedades de box-shawdow.</p>

## Ejemplo

Los asistentes te permiten controlar la profundidad relativa, o la distancia entre dos superficies a lo largo del eje-z. Por defecto, hay 25 niveles de elevación.

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