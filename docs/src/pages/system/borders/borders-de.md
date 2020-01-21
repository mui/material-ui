# Rahmen

<p class="description">Verwenden Sie die Ränder Werkzeuge, um den Rand und den Randradius eines Elements schnell zu gestalten. Ideal für Bilder, Schaltflächen oder andere Elemente.</p>

## Rahmen

Verwenden Sie Ränder Werkzeuge, um die Ränder eines Elements hinzuzufügen oder zu entfernen. Wählen Sie aus einzelne oder allen Grenzen aus.

### Zusätze

{{"demo": "pages/system/borders/BorderAdditive.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box border={1}>…
<Box borderTop={1}>…
<Box borderRight={1}>…
<Box borderBottom={1}>…
<Box borderLeft={1}>…
```

### Subtraktionen

{{"demo": "pages/system/borders/BorderSubtractive.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box border={0}>…
<Box borderTop={0}>…
<Box borderRight={0}>…
<Box borderBottom={0}>…
<Box borderLeft={0}>…
```

## Rahmen Farbe

{{"demo": "pages/system/borders/BorderColor.js", "defaultCodeOpen": false}}

```jsx
<Box borderColor="primary.main">…
<Box borderColor="secondary.main">…
<Box borderColor="error.main">…
<Box borderColor="grey.500">…
<Box borderColor="text.primary">…
```

## Border-radius

{{"demo": "pages/system/borders/BorderRadius.js", "defaultCodeOpen": false}}

```jsx
<Box borderRadius="50%">…
<Box borderRadius="borderRadius">…
<Box borderRadius={16}>…
```

## API

```js
import { borders } from '@material-ui/system';
```

| Inportname     | Eigenschaften  | CSS-Eigenschaft | Theme-Schlüssel                                                  |
|:-------------- |:-------------- |:--------------- |:---------------------------------------------------------------- |
| `border`       | `border`       | `border`        | `borders`                                                        |
| `borderTop`    | `borderTop`    | `border-top`    | `borders`                                                        |
| `borderLeft`   | `borderLeft`   | `border-left`   | `borders`                                                        |
| `borderRight`  | `borderRight`  | `border-right`  | `borders`                                                        |
| `borderBottom` | `borderBottom` | `border-bottom` | `borders`                                                        |
| `borderColor`  | `borderColor`  | `border-color`  | [`palette`](/customization/default-theme/?expand-path=$.palette) |
| `borderRadius` | `borderRadius` | `border-radius` | [`shape`](/customization/default-theme/?expand-path=$.shape)     |