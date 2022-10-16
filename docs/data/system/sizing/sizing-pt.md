# Dimensionando

<p class="description">Facilmente faça um elemento tão largo ou tão alto (relativo a seu pai) com os utilitários de largura e altura.</p>

## Valores suportados

As funções de estilo de dimensionamento suportam diferentes tipos de entrada de propriedade:

```js
function transform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
```

If the value is between [0, 1], it's converted to percent. Otherwise, it is directly set on the CSS property.

{{"demo": "Values.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ width: 1/4 }}> // Equivalent to width: '25%'
<Box sx={{ width: 300 }}> // Numbers are converted to pixel values.
<Box sx={{ width: '75%' }}> // String values are used as raw CSS.
<Box sx={{ width: 1 }}> // 100%
```

## Largura

{{"demo": "Width.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ width: '25%' }}>…
<Box sx={{ width: '50%' }}>…
<Box sx={{ width: '75%' }}>…
<Box sx={{ width: '100%' }}>…
<Box sx={{ width: 'auto' }}>…
```

### Max-width

The max-width property allows setting a constraint on your breakpoints. In this example, the value resolves to [`theme.breakpoints.values.md`](/material-ui/customization/default-theme/?expand-path=$.breakpoints.values).

```jsx
<Box sx={{ maxWidth: 'md' }}>…
```

## Altura

{{"demo": "Height.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ height: '25%' }}>…
<Box sx={{ height: '50%' }}>…
<Box sx={{ height: '75%' }}>…
<Box sx={{ height: '100%' }}>…
```

## API

```js
import { sizing } from '@mui/system';
```

| Nome da importação | Propriedade | Propriedade CSS | Chave do tema                                                                                            |
|:------------------ |:----------- |:--------------- |:-------------------------------------------------------------------------------------------------------- |
| `width`            | `width`     | `width`         | none                                                                                                     |
| `maxWidth`         | `maxWidth`  | `max-width`     | [`theme.breakpoints.values`](/material-ui/customization/default-theme/?expand-path=$.breakpoints.values) |
| `minWidth`         | `minWidth`  | `min-width`     | none                                                                                                     |
| `height`           | `height`    | `height`        | none                                                                                                     |
| `maxHeight`        | `maxHeight` | `max-height`    | none                                                                                                     |
| `minHeight`        | `minHeight` | `min-height`    | none                                                                                                     |
| `boxSizing`        | `boxSizing` | `box-sizing`    | none                                                                                                     |
