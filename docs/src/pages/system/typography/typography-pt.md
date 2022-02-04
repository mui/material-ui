# Tipografia

<p class="description">Documentação e exemplos de texto, utilizações comuns para controlar o alinhamento, quebra, peso e muito mais.</p>

## Variante

{{"demo": "pages/system/typography/Variant.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ typography: 'subtitle2' }}>… // theme.typography.subtitle2
<Box sx={{ typography: 'body1' }}>…
<Box sx={{ typography: 'body2' }}>…
```

## Alinhamento do texto

{{"demo": "pages/system/typography/TextAlignment.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ textAlign: 'left' }}>…
<Box sx={{ textAlign: 'center' }}>…
<Box sx={{ textAlign: 'right' }}>…
```

## Peso da fonte

{{"demo": "pages/system/typography/FontWeight.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontWeight: 'light' }}>… // theme.typography.fontWeightLight
<Box sx={{ fontWeight: 'regular' }}>…
<Box sx={{ fontWeight: 'medium' }}>…
<Box sx={{ fontWeight: 500 }}>…
<Box sx={{ fontWeight: 'bold' }}>…
```

## Tamanho da fonte

{{"demo": "pages/system/typography/FontSize.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontSize: 'default' }}>…  // theme.typography.fontSize
<Box sx={{ fontSize: 'h6.fontSize' }}>…
<Box sx={{ fontSize: 16 }}>…
```

## Estilo da fonte

{{"demo": "pages/system/typography/FontStyle.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontStyle: 'normal' }}>…
<Box sx={{ fontStyle: 'italic' }}>…
<Box sx={{ fontStyle: 'oblique' }}>…
```

## Família da fonte

{{"demo": "pages/system/typography/FontFamily.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontFamily: 'default' }}>…
<Box sx={{ fontFamily: 'Monospace' }}>…
```

## Espaçamento das letras

{{"demo": "pages/system/typography/LetterSpacing.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ letterSpacing: 6 }}>…
<Box sx={{ letterSpacing: 10 }}>…
```

## Altura da linha

{{"demo": "pages/system/typography/LineHeight.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ lineHeight: 'normal' }}>…
<Box sx={{ lineHeight: 10 }}>…
```

## API

```js
import { typography } from '@material-ui/system';
```

| Nome da importação | Propriedade     | Propriedade CSS                                                                              | Chave do tema                                                          |
|:------------------ |:--------------- |:-------------------------------------------------------------------------------------------- |:---------------------------------------------------------------------- |
| `typography`       | `typography`    | `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `text-transform` | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontFamily`       | `fontFamily`    | `font-family`                                                                                | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontSize`         | `fontSize`      | `font-size`                                                                                  | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontStyle`        | `fontStyle`     | `font-style`                                                                                 | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontWeight`       | `fontWeight`    | `font-weight`                                                                                | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `letterSpacing`    | `letterSpacing` | `letter-spacing`                                                                             | none                                                                   |
| `lineHeight`       | `lineHeight`    | `line-height`                                                                                | none                                                                   |
| `textAlign`        | `textAlign`     | `text-align`                                                                                 | none                                                                   |
