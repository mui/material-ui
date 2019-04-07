# Typografie

<p class="description">Dokumentation und Beispiele für allgemeine Textprogramme zur Steuerung von Ausrichtung, Umbruch, Gewicht usw.</p>

## Text-Ausrichtung

```jsx
<Box textAlign="left">…
<Box textAlign="center">…
<Box textAlign="right">…
```

{{"demo": "pages/system/typography/TextAlignment.js"}}

## Schriftdicke

```jsx
<Box fontWeight="fontWeightLight">…
<Box fontWeight="fontWeightRegular">…
<Box fontWeight="fontWeightMedium">…
<Box fontWeight={600}>…
```

{{"demo": "pages/system/typography/FontWeight.js"}}

## Schriftgröße

```jsx
<Box fontSize="fontSize">…
<Box fontSize="h6.fontSize">…
<Box fontSize={16}>…
```

{{"demo": "pages/system/typography/FontSize.js"}}

## Schriftfamilie

```jsx
<Box fontFamily="fontFamily">…
<Box fontFamily="Monospace">…
```

{{"demo": "pages/system/typography/FontFamily.js"}}

## API

```js
import { typography } from '@material-ui/system';
```

| Inportname   | Eigenschaften | CSS-Eigenschaft | Theme-Schlüssel                                                        |
|:------------ |:------------- |:--------------- |:---------------------------------------------------------------------- |
| `fontFamily` | `fontFamily`  | `font-family`   | [`typography`](/customization/default-theme/?expend-path=$.typography) |
| `fontSize`   | `fontSize`    | `font-size`     | [`typography`](/customization/default-theme/?expend-path=$.typography) |
| `fontWeight` | `fontWeight`  | `font-weight`   | [`typography`](/customization/default-theme/?expend-path=$.typography) |
| `textAlign`  | `textAlign`   | `text-align`    | none                                                                   |