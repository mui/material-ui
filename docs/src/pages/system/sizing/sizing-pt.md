# Dimensionando

<p class="description">Facilmente faça um elemento tão largo ou tão alto (relativo a seu pai) com os utilitários de largura e altura.</p>

## Valores suportados

As funções de estilo de dimensionamento suportam diferentes tipos de entrada de propriedade:

{{"demo": "pages/system/sizing/Values.js", "defaultCodeOpen": false}}

```jsx
// Os números em [0,1] são multiplicados por 100 e convertidos em valores %.
<Box sx={{ width: 1/4 }}>
<Box sx={{ width: 300 }}> // Números são convertidos em valores de pixel.
<Box sx={{ width: '75%' }}> // Valores de string são usados como CSS bruto.
<Box sx={{ width: 1 }}> // 100%
```

## Largura

{{"demo": "pages/system/sizing/Width.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ width: '25%' }}>…
<Box sx={{ width: '50%' }}>…
<Box sx={{ width: '75%' }}>…
<Box sx={{ width: '100%' }}>…
<Box sx={{ width: 'auto' }}>…
```

## Altura

{{"demo": "pages/system/sizing/Height.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ height: '25%' }}>…
<Box sx={{ height: '50%' }}>…
<Box sx={{ height: '75%' }}>…
<Box sx={{ height: '100%' }}>…
```

## API

```js
import { sizing } from '@material-ui/system';
```

| Nome da importação | Propriedade | Propriedade CSS | Chave do tema |
|:------------------ |:----------- |:--------------- |:------------- |
| `width`            | `width`     | `width`         | none          |
| `maxWidth`         | `maxWidth`  | `max-width`     | none          |
| `minWidth`         | `minWidth`  | `min-width`     | none          |
| `height`           | `height`    | `height`        | none          |
| `maxHeight`        | `maxHeight` | `max-height`    | none          |
| `minHeight`        | `minHeight` | `min-height`    | none          |
| `boxSizing`        | `boxSizing` | `box-sizing`    | none          |
