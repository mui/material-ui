# Anzeige

<p class="description">Unterstützt einige der gebräuchlichsten Werte sowie einige Extras zur Steuerung der Anzeige beim Drucken. Quickly and responsively toggle the display value of components and more with the display utilities.</p>

## Beispiele

### Inline

{{"demo": "pages/system/display/Inline.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box component="div" sx={{ display: 'inline' }}>inline</Box>
<Box component="div" sx={{ display: 'inline' }}>inline</Box>
```

### Block

{{"demo": "pages/system/display/Block.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box component="span" sx={{ display: 'block' }}>block</Box>
<Box component="span" sx={{ display: 'block' }}>block</Box>
```

## Elemente verstecken

Verwenden Sie für eine schnellere, mobilere Entwicklung responsive Anzeigeklassen zum Anzeigen und Ausblenden von Elementen nach Gerätetypen. Erstellen Sie keine völlig unterschiedlichen Versionen derselben Seite, sondern blenden Sie Elemente für jede Bildschirmgröße entsprechend aus.

| Bildschirmgröße      | Klasse                                                       |
|:-------------------- |:------------------------------------------------------------ |
| Für alle versteckt   | `sx={{ display: 'none' }}`                                   |
| Versteckt nur bei xs | `sx={{ display: { xs: 'none', sm: 'block' } }}`              |
| Versteckt nur bei sm | `sx={{ display: { xs: 'block', sm: 'none', md: 'block' } }}` |
| Versteckt nur bei md | `sx={{ display: { xs: 'block', md: 'none', lg: 'block' } }}` |
| Versteckt nur bei lg | `sx={{ display: { xs: 'block', lg: 'none', xl: 'block' } }}` |
| Versteckt nur bei xl | `sx={{ display: { xs: 'block', xl: 'none' } }}`              |
| Sichtbar nur bei xs  | `sx={{ display: { xs: 'block', sm: 'none' } }}`              |
| Sichtbar nur bei sm  | `sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }}`  |
| Sichtbar nur bei md  | `sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}`  |
| Sichtbar nur bei lg  | `sx={{ display: { xs: 'none', lg: 'block', xl: 'none' } }}`  |
| Sichtbar nur bei xl  | `sx={{ display: { xs: 'none', xl: 'block' } }}`              |

{{"demo": "pages/system/display/Hiding.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ display: { xs: 'block', md: 'none' }}}>
  auf Bildschirmen ausblenden, die breiter als md sind
</Box>
<Box sx={{ display: { xs: 'none', md: 'block' }}}>
  ausblenden auf Bildschirmen, die kleiner als md sind
</Box>
```

## Im Druck anzeigen

{{"demo": "pages/system/display/Print.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ display: 'block', displayPrint: 'none' }}>
  Nur Bildschirm (Beim Drucken ausgeblendet)
</Box>
<Box sx={{ display: 'none', displayPrint: 'block' }}>
  Nur Druck (Auf dem Bildschirm ausgeblendet)
</Box>
```

## Overflow

{{"demo": "pages/system/display/Overflow.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ overflow: 'hidden' }}>
  Overflow Hidden
</Box>
<Box component="div" sx={{ overflow: 'visible' }}>
  Overflow visible
</Box>
```

## Text overflow

{{"demo": "pages/system/display/TextOverflow.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ textOverflow: 'clip' }}>
  Text Overflow Clip
</Box>
<Box component="div" sx={{ textOverflow: 'ellipsis' }}>
  Text Overflow Ellipsis
</Box>
```

## Visibility

{{"demo": "pages/system/display/Visibility.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ visibility: 'visible' }}>
  Visibility Visible
</Box>
<Box component="div" sx={{ visibility: 'hidden' }}>
  Visibility Hidden
</Box>
```

## White space

{{"demo": "pages/system/display/WhiteSpace.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ whiteSpace: 'nowrap' }}>
  White Space Nowrap
</Box>
<Box component="div" sx={{ whiteSpace: 'normal' }}>
  White Space Normal
</Box>
```

## API

```js
import { display } from '@material-ui/system';
```

| Inportname     | Eigenschaften  | CSS-Eigenschaft | Theme-Schlüssel |
|:-------------- |:-------------- |:--------------- |:--------------- |
| `displayPrint` | `displayPrint` | `display`       | none            |
| `displayRaw`   | `display`      | `display`       | none            |
| `overflow`     | `overflow`     | `overflow`      | none            |
| `textOverflow` | `textOverflow` | `text-overflow` | none            |
| `visibility`   | `visibility`   | `visibility`    | none            |
| `whiteSpace`   | `whiteSpace`   | `white-space`   | none            |
