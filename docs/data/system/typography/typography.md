# Typography

<p class="description">Documentation and examples for common text utilities to control alignment, wrapping, weight, and more.</p>

## Variant

{{"demo": "Variant.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ typography: 'subtitle2' }}>… // theme.typography.subtitle2
<Box sx={{ typography: 'body1' }}>…
<Box sx={{ typography: 'body2' }}>…
```

## Text alignment

{{"demo": "TextAlignment.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ textAlign: 'left' }}>…
<Box sx={{ textAlign: 'center' }}>…
<Box sx={{ textAlign: 'right' }}>…
```

## Text transformation

{{"demo": "TextTransform.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ textTransform: 'capitalize' }}>…
<Box sx={{ textTransform: 'lowercase' }}>…
<Box sx={{ textTransform: 'uppercase' }}>…
```

## Font weight

{{"demo": "FontWeight.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontWeight: 'light' }}>… // theme.typography.fontWeightLight
<Box sx={{ fontWeight: 'regular' }}>…
<Box sx={{ fontWeight: 'medium' }}>…
<Box sx={{ fontWeight: 500 }}>…
<Box sx={{ fontWeight: 'bold' }}>…
```

## Font size

{{"demo": "FontSize.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontSize: 'default' }}>…  // theme.typography.fontSize
<Box sx={{ fontSize: 'h6.fontSize' }}>…
<Box sx={{ fontSize: 16 }}>…
```

## Font style

{{"demo": "FontStyle.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontStyle: 'normal' }}>…
<Box sx={{ fontStyle: 'italic' }}>…
<Box sx={{ fontStyle: 'oblique' }}>…
```

## Font family

{{"demo": "FontFamily.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontFamily: 'default' }}>…
<Box sx={{ fontFamily: 'Monospace' }}>…
```

## Letter spacing

{{"demo": "LetterSpacing.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ letterSpacing: 6 }}>…
<Box sx={{ letterSpacing: 10 }}>…
```

## Line height

{{"demo": "LineHeight.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ lineHeight: 'normal' }}>…
<Box sx={{ lineHeight: 10 }}>…
```

## API

```js
import { typography } from '@mui/system';
```

| Import name     | Prop            | CSS property                                                                                 | Theme key                                                                          |
| :-------------- | :-------------- | :------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| `typography`    | `typography`    | `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `text-transform` | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `fontFamily`    | `fontFamily`    | `font-family`                                                                                | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `fontSize`      | `fontSize`      | `font-size`                                                                                  | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `fontStyle`     | `fontStyle`     | `font-style`                                                                                 | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `fontWeight`    | `fontWeight`    | `font-weight`                                                                                | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `letterSpacing` | `letterSpacing` | `letter-spacing`                                                                             | none                                                                               |
| `lineHeight`    | `lineHeight`    | `line-height`                                                                                | none                                                                               |
| `textAlign`     | `textAlign`     | `text-align`                                                                                 | none                                                                               |
| `textTransform` | `textTransform` | `text-transform`                                                                             | none                                                                               |
