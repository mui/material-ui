---
title: App Bar React-Komponente
components: AppBar, Toolbar, Menu
---

# App Bar

<p class="description">In der App-Bar werden Informationen und Aktionen angezeigt, die sich auf den aktuellen Bildschirm beziehen.</p>

Die [obere App-Bar](https://material.io/design/components/app-bars-top.html) liefert Inhalte und Aktionen auf dem aktuellen Bildschirm. Sie wird für Branding, Bildschirmtitel, Navigation und Aktionen verwendet.

Sie kann in eine kontextabhängige Aktionsleiste verwandelt, oder als Navigationsleiste verwendet werden.

## App-Bar mit Schaltflächen

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## Einfache App-Bar

{{"demo": "pages/components/app-bar/SimpleAppBar.js"}}

## App-Bar mit einem Hauptsuchfeld

Eine primäre Suchleiste.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## App-Bar mit Menü

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## App-Bar mit Suchfeld

Ein seitliches Suchfeld.

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## Verdichtet (nur für Desktop)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## Untere App-Bar

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Scrollen

### App-Bar verstecken

Eine App-Bar die sich beim Scrollen versteckt.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": "true", "maxWidth": 500}}

### App-Bar anheben

Eine App-Bar die sich beim Scrollen anhebt.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": "true", "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### Parameter

1. `options` (*Object* [optional]):
    
    - `options.disableHysteresis ` (*Boolean* [optional]): Standardeinstellung ist `false`. Hysterese deaktivieren. Die Bildlaufrichtung wird beim Bestimmen des `trigger`-Werts ignoriert.
    - `options.target` (*Node* [optional]): Standardwert `window`.
    - `options.threshold` (*Number* [optional]): Standardwert `100`. Ändert den `trigger`-Wert wenn der vertikale Bildlauf den Schwellwert (streng) überschreitet (exklusiv).

#### Rückgabewerte

`trigger`: Entspricht die Bildlaufposition den Kriterien?

#### Beispiele

```jsx
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Hello</div>
    </Slide>
  );
}
```