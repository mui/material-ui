# Tipografía

<p class="description">Documentation and examples for common text utilities to control alignment, wrapping, weight, and more.</p>

## Text alignment

{{"demo": "pages/system/typography/TextAlignment.js", "defaultCodeOpen": false}}

```jsx
<Box textAlign="left">…
<Box textAlign="center">…
<Box textAlign="right">…
```

## Font weight

{{"demo": "pages/system/typography/FontWeight.js", "defaultCodeOpen": false}}

```jsx
<Box fontWeight="fontWeightLight">…
<Box fontWeight="fontWeightRegular">…
<Box fontWeight="fontWeightMedium">…
<Box fontWeight={500}>…
<Box fontWeight="fontWeightBold">…
```

## Font size

{{"demo": "pages/system/typography/FontSize.js", "defaultCodeOpen": false}}

```jsx
<Box fontSize="fontSize">…
<Box fontSize="h6.fontSize">…
<Box fontSize={16}>…
```

## Font Style

{{"demo": "pages/system/typography/FontStyle.js", "defaultCodeOpen": false}}

```jsx
<Box fontStyle="normal">…
<Box fontStyle="italic">…
<Box fontStyle="oblique">…
```

## Familia de fuente

{{"demo": "pages/system/typography/FontFamily.js", "defaultCodeOpen": false}}

```jsx
<Box fontFamily="fontFamily">…
<Box fontFamily="Monospace">…
```

## Letter Spacing

{{"demo": "pages/system/typography/LetterSpacing.js", "defaultCodeOpen": false}}

```jsx
<Box letterSpacing={6}>…
<Box letterSpacing={10}>…
```

## Line Height

{{"demo": "pages/system/typography/LineHeight.js", "defaultCodeOpen": false}}

```jsx
<Box lineHeight="normal">…
<Box lineHeight={10}>…
```

## API

```js
import { typography } from '@material-ui/system';
```

| Nombre del import | Prop            | Propiedad CSS    | Clave del tema                                                         |
|:----------------- |:--------------- |:---------------- |:---------------------------------------------------------------------- |
| `fontFamily`      | `fontFamily`    | `font-family`    | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontSize`        | `fontSize`      | `font-size`      | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontStyle`       | `fontStyle`     | `font-style`     | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontWeight`      | `fontWeight`    | `font-weight`    | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `letterSpacing`   | `letterSpacing` | `letter-spacing` | none                                                                   |
| `lineHeight`      | `lineHeight`    | `line-height`    | none                                                                   |
| `textAlign`       | `textAlign`     | `text-align`     | none                                                                   |