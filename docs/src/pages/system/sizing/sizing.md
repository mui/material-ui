# Sizing

<p class="description">Easily make an element as wide or as tall (relative to its parent) with our width and height utilities.</p>

## Supported values

The sizing style functions support different property input type:

```jsx
<Box width={1/4}> // Numbers in [0,1] are multiplied by 100 and converted to % values.
<Box width={300}> // Numbers are converted to pixel values.
<Box width="75%"> // String values are used as raw CSS.
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

| Import name | Prop | CSS property | Theme key |
|:------------|:-----|:-------------|:----------|
| `width` | `width` | `width` | none |
| `maxWidth` | `maxWidth` | `max-width` | none |
| `minWidth` | `minWidth` | `min-width` | none |
| `height` | `height` | `height` | none |
| `maxHeight` | `maxHeight`| `max-height` | none |
| `minHeight` | `minHeight`| `min-height` | none |
