---
title: App Bar React-Komponente
components: AppBar, Toolbar, Menu
---

# App Bar

<p class="description">In der App-Bar werden Informationen und Aktionen angezeigt, die sich auf den aktuellen Bildschirm beziehen.</p>

Die [obere App-Bar](https://material.io/design/components/app-bars-top.html) liefert Inhalte und Aktionen auf dem aktuellen Bildschirm. Sie wird für Branding, Bildschirmtitel, Navigation und Aktionen verwendet.

Sie kann in eine kontextabhängige Aktionsleiste verwandelt, oder als Navigationsleiste verwendet werden.

## Simple App Bar

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## App Bar with a primary search field

A primary searchbar.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## App Bar with menu

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## App Bar with search field

A side searchbar.

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## Dense (desktop only)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## Bottom App Bar

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Scrolling

You can use the `useScrollTrigger()` hook to respond to user scroll actions.

### App-Bar verstecken

The app bar hides on scroll down to leave more space for reading.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true, "maxWidth": 500}}

### App-Bar anheben

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true, "maxWidth": 500}}

### Back to top

A floating action buttons appears on scroll to make it easy to get back to the top of the page.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true, "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### Parameter

1. `options` (*Object* [optional]):

- `options.disableHysteresis ` (*Boolean* [optional]): Standardeinstellung ist `false`. Hysterese deaktivieren. Die Bildlaufrichtung wird beim Bestimmen des `trigger`-Werts ignoriert.
- `options.target` (*Node* [optional]): Standardwert `window`.
- `options.threshold` (*Number* [optional]): Defaults to `100`. Change the `trigger` value when the vertical scroll strictly crosses this threshold (exclusive).

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