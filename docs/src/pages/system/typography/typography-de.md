# Typografie

<p class="description">Dokumentation und Beispiele für allgemeine Textprogramme zur Steuerung von Ausrichtung, Umbruch, Gewicht usw.</p>

## Text-Ausrichtung

{{"demo": "pages/system/typography/TextAlignment.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ textAlign: "left" }}>…
<Box sx={{ textAlign: "center" }}>…
<Box sx={{ textAlign: "right" }}>…
```

## Schriftdicke

{{"demo": "pages/system/typography/FontWeight.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontWeight: "fontWeightLight" }}>…
<Box sx={{ fontWeight: "fontWeightRegular" }}>…
<Box sx={{ fontWeight: "fontWeightMedium" }}>…
<Box sx={{ fontWeight: 500 }}>…
<Box sx={{ fontWeight: "fontWeightBold" }}>…
```

## Schriftgröße

{{"demo": "pages/system/typography/FontSize.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontSize: "fontSize" }}>…
<Box sx={{ fontSize: "h6.fontSize" }}>…
<Box sx={{ fontSize: 16 }}>…
```

## Font Style

{{"demo": "pages/system/typography/FontStyle.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontStyle: "normal" }}>…
<Box sx={{ fontStyle: "italic" }}>…
<Box sx={{ fontStyle: "oblique" }}>…
```

## Schriftfamilie

{{"demo": "pages/system/typography/FontFamily.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ fontFamily: "fontFamily" }}>…
<Box sx={{ fontFamily: "Monospace" }}>…
```

## Zeichenabstand

{{"demo": "pages/system/typography/LetterSpacing.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ letterSpacing: 6 }}>…
<Box sx={{ letterSpacing: 10 }}>…
```

## Zeilenhöhe

{{"demo": "pages/system/typography/LineHeight.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ lineHeight: "normal" }}>…
<Box sx={{ lineHeight: 10 }}>…
```

## API

```js
import { typography } from '@material-ui/system';
```

| Inportname      | Eigenschaften   | CSS-Eigenschaft                                                                              | Theme-Schlüssel                                                        |
|:--------------- |:--------------- |:-------------------------------------------------------------------------------------------- |:---------------------------------------------------------------------- |
| `typography`    | `typography`    | `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `text-transform` | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontFamily`    | `fontFamily`    | `font-family`                                                                                | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontSize`      | `fontSize`      | `font-size`                                                                                  | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontStyle`     | `fontStyle`     | `font-style`                                                                                 | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `fontWeight`    | `fontWeight`    | `font-weight`                                                                                | [`typography`](/customization/default-theme/?expand-path=$.typography) |
| `letterSpacing` | `letterSpacing` | `letter-spacing`                                                                             | none                                                                   |
| `lineHeight`    | `lineHeight`    | `line-height`                                                                                | none                                                                   |
| `textAlign`     | `textAlign`     | `text-align`                                                                                 | none                                                                   |
