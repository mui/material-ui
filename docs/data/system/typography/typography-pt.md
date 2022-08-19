# Tipografia

<p class="description">Documentação e exemplos de texto, utilizações comuns para controlar o alinhamento, quebra, peso e muito mais.</p>

## Variante

{{"demo": "Variant.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ typography: 'subtitle2' }}>… <Box sx={{ typography: 'subtitle2' }}>… // theme.typography.subtitle2
<Box sx={{ typography: 'body1' }}>…
<Box sx={{ typography: 'body2' }}>…
<Box sx={{ typography: 'body2' }}>…
```

## Alinhamento do texto

{{"demo": "TextAlignment.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ textAlign: 'left' }}>…
<Box sx={{ textAlign: 'left' }}>…
<Box sx={{ textAlign: 'center' }}>…
<Box sx={{ textAlign: 'right' }}>…
<Box sx={{ textAlign: 'right' }}>…
```

## Peso da fonte

{{"demo": "TextTransform.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ textTransform: 'capitalize' }}>…
<Box sx={{ textTransform: 'lowercase' }}>…
<Box sx={{ textTransform: 'uppercase' }}>…
```

## Tamanho da fonte

{{"demo": "FontWeight.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontWeight: 'light' }}>… <Box sx={{ fontWeight: 'light' }}>… // theme.typography.fontWeightLight
<Box sx={{ fontWeight: 'regular' }}>…
<Box sx={{ fontWeight: 'medium' }}>…
<Box sx={{ fontWeight: 500 }}>…
<Box sx={{ fontWeight: 'bold' }}>…
<Box sx={{ fontWeight: 'medium' }}>…
<Box sx={{ fontWeight: 500 }}>…
<Box sx={{ fontWeight: 'bold' }}>…
```

## Estilo da fonte

{{"demo": "FontSize.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontSize: 'default' }}>…  <Box sx={{ fontSize: 'default' }}>…  // theme.typography.fontSize
<Box sx={{ fontSize: 'h6.fontSize' }}>…
<Box sx={{ fontSize: 16 }}>…
<Box sx={{ fontSize: 16 }}>…
```

## Família da fonte

{{"demo": "FontStyle.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontStyle: 'normal' }}>…
<Box sx={{ fontStyle: 'italic' }}>…
<Box sx={{ fontStyle: 'oblique' }}>…
<Box sx={{ fontStyle: 'italic' }}>…
<Box sx={{ fontStyle: 'oblique' }}>…
```

## Espaçamento das letras

{{"demo": "FontFamily.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontFamily: 'default' }}>…
<Box sx={{ fontFamily:
'Monospace' }}>…
```

## Altura da linha

{{"demo": "LetterSpacing.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ letterSpacing: 6 }}>…
<Box sx={{ letterSpacing: 6 }}>…
<Box sx={{ letterSpacing: 10 }}>…
```

## Line height

{{"demo": "LineHeight.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ lineHeight: 'normal' }}>…
<Box sx={{ lineHeight: 10 }}>…
<Box sx={{ lineHeight: 10 }}>…
```

## API

```js
import { typography } from '@material-ui/system';
```

| Nome da importação | Propriedade     | Propriedade CSS                                                                              | Chave do tema                                                                      |
|:------------------ |:--------------- |:-------------------------------------------------------------------------------------------- |:---------------------------------------------------------------------------------- |
| `typography`       | `typography`    | `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `text-transform` | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `fontFamily`       | `fontFamily`    | `font-family`                                                                                | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `fontSize`         | `fontSize`      | `font-size`                                                                                  | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `fontStyle`        | `fontStyle`     | `font-style`                                                                                 | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `fontWeight`       | `fontWeight`    | `font-weight`                                                                                | [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) |
| `letterSpacing`    | `letterSpacing` | `letter-spacing`                                                                             | none                                                                               |
| `lineHeight`       | `lineHeight`    | `line-height`                                                                                | none                                                                               |
| `textAlign`        | `textAlign`     | `text-align`                                                                                 | none                                                                               |
| `textTransform`    | `textTransform` | `text-transform`                                                                             | none                                                                               |
