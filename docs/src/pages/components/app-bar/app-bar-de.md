---
title: App Bar React-Komponente
components: AppBar, Toolbar, Menu
---

# App Bar

<p class="description">In der App-Bar werden Informationen und Aktionen angezeigt, die sich auf den aktuellen Bildschirm beziehen.</p>

Die [obere App-Bar](https://material.io/design/components/app-bars-top.html) liefert Inhalte und Aktionen auf dem aktuellen Bildschirm. Sie wird für Branding, Bildschirmtitel, Navigation und Aktionen verwendet.

It can transform into a contextual action bar or be used as a navbar.

## Einfache App-Bar

{{"demo": "pages/components/app-bar/ButtonAppBar.js", "bg": true}}

## App-Bar mit einem Hauptsuchfeld

Eine primäre Suchleiste.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js", "bg": true}}

## App-Bar mit Menü

{{"demo": "pages/components/app-bar/MenuAppBar.js", "bg": true}}

## App-Bar mit Suchfeld

Ein seitliches Suchfeld.

{{"demo": "pages/components/app-bar/SearchAppBar.js", "bg": true}}

## Kompakt (nur für Desktop)

{{"demo": "pages/components/app-bar/DenseAppBar.js", "bg": true}}

## Prominent

A prominent app bar.

{{"demo": "pages/components/app-bar/ProminentAppBar.js", "bg": true}}

## Untere App-Bar

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 400}}

## Fixed placement

When you render the app bar position fixed, the dimension of the element doesn't impact the rest of the page. This can cause some part of your content to be invisible, behind the app bar. Here are 3 possible solutions:

1. You can use `position="sticky"` instead of fixed. ⚠️ sticky wird vom IE 11 nicht unterstützt.
2. You can render a second `<Toolbar />` component:

```jsx
function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
```

3. You can use `theme.mixins.toolbar` CSS:

```jsx
const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </React.Fragment>
  )
};
```

## Scrollen

Sie können den Hook `useScrollTrigger ()`, um auf Bildlauf Aktionen zu reagieren.

### App-Bar verstecken

The app bar hides on scroll down to leave more space for reading.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true}}

### App-Bar anheben

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true}}

### Zurück nach oben

Beim Scrollen erscheint ein schwebender Button, um einfach wieder zum Seitenanfang zu gelangen.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true}}

### `useScrollTrigger([options]) => trigger`

#### Parameter

1. `options` (*Object* [optional]):

- `options.disableHysteresis ` (*Boolean* [optional]): Standardeinstellung ist `false`. Hysterese deaktivieren. Die Bildlaufrichtung wird beim Bestimmen des `trigger`-Werts ignoriert.
- `options.target` (*Node* [optional]): Standardwert `window`.
- `options.threshold` (*Number* [optional]): Defaults to `100`. Change the `trigger` value when the vertical scroll strictly crosses this threshold (exclusive).

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