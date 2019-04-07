# Dimensionierung

<p class="description">Mit unseren Hilfsmitteln für Breite und Höhe können Sie ein Element problemlos so breit oder so groß (relativ zu seinem übergeordneten Element) machen, wie sie wollen.</p>

## Unterstützte Werte

Die Größenstilfunktionen unterstützen verschiedene Eigenschafteneingabetypen:

```jsx
<Box width={1/4}> // Números em [0,1] são multiplicados por 100 e convertido em % valores.
<Box width={300}> // Números são convertidos em valores de pixel.
<Box width="75%"> // Valores de string são usados como CSS bruto.
<Box width={1}>   // 100%
```

{{"demo": "pages/system/sizing/Values.js"}}

## Breite

```jsx
<Box width="25%">…
<Box width="50%">…
<Box width="75%">…
<Box width="100%">…
<Box width="auto">…
```

{{"demo": "pages/system/sizing/Width.js"}}

## Höhe

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

| Inportname  | Eigenschaften | CSS-Eigenschaft | Theme-Schlüssel |
|:----------- |:------------- |:--------------- |:--------------- |
| `width`     | `width`       | `width`         | none            |
| `maxWidth`  | `maxWidth`    | `max-width`     | none            |
| `minWidth`  | `minWidth`    | `min-width`     | none            |
| `height`    | `height`      | `height`        | none            |
| `maxHeight` | `maxHeight`   | `max-height`    | none            |
| `minHeight` | `minHeight`   | `min-height`    | none            |