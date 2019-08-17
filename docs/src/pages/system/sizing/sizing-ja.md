# Sizing

<p class="description">Easily make an element as wide or as tall (relative to its parent) with our width and height utilities.</p>

## Supported values

The sizing style functions support different property input type:

```jsx
<Box width={1/4}> // Números em [0,1] são multiplicados por 100 e convertido em % valores.
<Box width={300}> // Números são convertidos em valores de pixel.
<Box width="75%"> // Valores de string são usados como CSS bruto.
<Box width={1}>   // 100%
```

{{"demo": "pages/system/sizing/Values.js"}}

## Width

```jsx
<Box width="25%">…
<Box width="50%">…
<Box width="75%">…
<Box width="100%">…
<Box width="auto">…
```

{{"demo": "pages/system/sizing/Width.js"}}

## Height

```jsx
<Box height="25%">…
<Box height="50%">…
<Box height="75%">…
<Box height="100%">…
```

{{"demo": "pages/system/sizing/Height.js"}}

## API

```js
import { sizing } from '@material-ui/system';
```

| Import name | Prop        | CSS property | Theme key |
|:----------- |:----------- |:------------ |:--------- |
| `width`     | `width`     | `width`      | none      |
| `maxWidth`  | `maxWidth`  | `max-width`  | none      |
| `minWidth`  | `minWidth`  | `min-width`  | none      |
| `height`    | `height`    | `height`     | none      |
| `maxHeight` | `maxHeight` | `max-height` | none      |
| `minHeight` | `minHeight` | `min-height` | none      |