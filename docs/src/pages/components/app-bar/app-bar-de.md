---
title: App Bar React-Komponente
components: AppBar, Toolbar, Menu
---

# App Bar

<p class="description">In der App-Bar werden Informationen und Aktionen angezeigt, die sich auf den aktuellen Bildschirm beziehen.</p>

Die [obere App Leiste](https://material.io/design/components/app-bars-top.html) liefert Inhalte und Aktionen auf dem aktuellen Bildschirm. Es wird für Branding, Bildschirmtitel, Navigation und Aktionen verwendet.

Es kann sich in eine kontextabhängige Aktionsleiste verwandeln oder als Navigationsleiste verwendet werden.

## App Bar mit Schaltflächen

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## Einfache App Bar

{{"demo": "pages/components/app-bar/SimpleAppBar.js"}}

## App-Bar mit einem Hauptsuchfeld

Eine primäre Suchleiste.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## App Bar mit Menü

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## App Bar mit Suchfeld

Ein seitliches Suchfeld.

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## Verdichtet (nur für Desktop)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## Untere App Bar

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Scrolling

### Hide App Bar

An App Bar that hides on scroll.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": "true", "maxWidth": 500}}

### Elevate App Bar

An App Bar that elevates on scroll.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": "true", "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### Argumente

1. `options` (*Object* [optional]):

- `options.disableHysteresis` (*Boolan* [optional]): Defaults to `false`. Disable the hysteresis. Ignore the scroll direction when determining the `trigger` value.
- `options.target` (*Node* [optional]): Defaults to `window`.
- `options.threshold` (*Number* [optional]): Defaults to `100`. Change the `trigger` value when the vertical scroll crosses this threshold.

#### Rückgabewerte

`trigger`: Does the scroll position match the criteria?

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