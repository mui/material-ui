# Haltepunkte

<p class="description">API, die die Verwendung von Rasterpunkten in einer Vielzahl von Kontexten ermöglicht.</p>

Für eine optimale Benutzererfahrung müssen Materialdesign-Schnittstellen in der Lage sein, ihr Layout an verschiedenen Haltepunkten anzupassen. Material-UI verwendet eine **vereinfachte** Implementierung der ursprünglichen [Spezifikation](https://material.io/design/layout/responsive-layout-grid.html#breakpoints).

Die Haltepunkte werden intern in verschiedenen Komponenten verwendet, um sie ansprechbar zu machen, Sie können sie jedoch auch benutzten, um das Layout Ihrer Anwendung über das [Grid](/components/grid/) zu steuern und für [Hidden](/components/hidden/) Komponenten.

## Default breakpoints

Jeder Haltepunkt (ein Schlüssel) stimmt mit einer *festen* Bildschirmbreite (ein Wert) überein:

- ** xs, ** extraklein: 0px
- ** sm, ** klein: 600px
- ** md, ** mittel: 960px
- ** lg, ** groß: 1280px
- ** xl ** extra groß: 1920px

These breakpoint values are used to determine breakpoint ranges. Ein Bereich beginnt mit dem Haltepunktwert einschließlich bis zum nächsten Haltepunktwert:

```js
Wert          |0px     600px    960px    1280px   1920px
Schlüssel     |xs      sm       md       lg       xl
Breite        |--------|--------|--------|--------|-------->
Bereich       |   xs   |   sm   |   md   |   lg   |   xl
```

These values can be [customized](#custom-breakpoints).

## CSS-Medienabfragen

CSS media queries are the idiomatic approach to make your UI responsive. The theme provides four styles helpers to do so:

- [theme.breakpoints.up(key)](#theme-breakpoints-up-key-media-query)
- [theme.breakpoints.down(key)](#theme-breakpoints-down-key-media-query)
- [theme.breakpoints.only(key)](#theme-breakpoints-only-key-media-query)
- [theme.breakpoints.between(start, end)](#theme-breakpoints-between-start-end-media-query)

In der folgenden Demo ändern wir die Hintergrundfarbe (rot, blau & grün) basierend auf der Bildschirmbreite.

```jsx
const styles = theme => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: green[500],
    },
  },
});
```

{{"demo": "pages/customization/breakpoints/MediaQuery.js"}}

## JavaScript-Medienabfragen

Manchmal reicht die Verwendung von CSS nicht aus. Möglicherweise möchten Sie die React-Rendering-Struktur basierend auf dem Haltepunktwert in JavaScript ändern.

### useMediaQuery hook

Weitere Informationen finden Sie auf der [ useMediaQuery](/components/use-media-query/) Seite.

### withWidth()

> ⚠️ This higher-order component will be deprecated for the [useMediaQuery](/components/use-media-query/) hook.

```jsx
import withWidth from '@material-ui/core/withWidth';

function MyComponent(props) {
  return <div>{`Current width: ${props.width}`}</div>;
}

export default withWidth()(MyComponent);
```

In der folgenden Demo ändern wir das gerenderte DOM-Element (* em*, <u> u</u>, ~~ del ~~ & span) basierend auf der Bildschirmbreite.

{{"demo": "pages/customization/breakpoints/WithWidth.js"}}

## Custom breakpoints

You define your project's breakpoints in the `theme.breakpoints` section of your theme.

- [`theme.breakpoints.values`](/customization/default-theme/?expand-path=$.breakpoints.values): Default to the [above values](#default-breakpoints). The keys are your screen names, and the values are the min-width where that breakpoint should start.
- `theme.breakpoints.unit`: Default to `px`. The unit used for the breakpoint's values.
- `theme.breakpoints.step`: Default to 5 (`0.05px`). The increment used to implement exclusive breakpoints.

If you change the default breakpoints's values, you need to provide them all:

```jsx
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})
```

Feel free to have as few or as many breakpoints as you want, naming them in whatever way you'd prefer for your project.

```js
const theme = createMuiTheme({
  breakpoints: {
    values: {
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});
```

If you are using TypeScript, you would also need to use [module augmentation](/guides/typescript/#customization-of-theme) for the theme to accept the above values.

```ts
declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}
```

## API

### `theme.breakpoints.up(key) => media query`

#### Argumente

1. `key` (*String* | *Number*): Ein Haltepunkteschlüssel (`xs`, `sm`, etc.) oder eine Bildschirmbreite in pixel.

#### Rückgabewerte

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths greater than and including the screen size given by the breakpoint key.

#### Beispiele

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, ∞)
    //       [960px, ∞)
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.down(key) => media query`

#### Argumente

1. `key` (*String* | *Number*): Ein Haltepunkteschlüssel (`xs`, `sm`, etc.) oder eine Bildschirmbreite in pixel.

#### Rückgabewerte

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths less than and including the screen size given by the breakpoint key.

#### Beispiele

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [0, md + 1)
    //       [0, lg)
    //       [0, 1280px)
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.only(key) => media query`

#### Argumente

1. `key` (*String*): Ein Haltepunkteschlüssel (`xs`, `sm`, etc.).

#### Rückgabewerte

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths including the screen size given by the breakpoint key.

#### Beispiele

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [md, md + 1)
    //       [md, lg)
    //       [960px, 1280px)
    [theme.breakpoints.only('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.between(start, end) => media query`

#### Argumente

1. `start` (*String*): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in pixels.
2. `end` (*String*): A breakpoint key (`xs`, `sm`, etc.) or a screen width number in pixels.

#### Rückgabewerte

`media query`: A media query string ready to be used with most styling solutions, which matches screen widths greater than the screen size given by the breakpoint key in the first argument and less than the the screen size given by the breakpoint key in the second argument.

#### Beispiele

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Match [sm, md + 1)
    //       [sm, lg)
    //       [600px, 1280px[
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `withWidth([options]) => higher-order component`

Injizieren Sie eine `width` Eigenschaft. Die an sie übergebene Komponente wird nicht geändert. Stattdessen wird eine neue Komponente zurückgegeben. Diese `width` Haltepunkt-Eigenschaft entspricht der aktuellen Bildschirmbreite. Es kann einer der folgenden Haltepunkte sein:

```ts
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

Einige Implementierungsdetails, die interessant sein könnten:

- Es leitet *nicht React statisch* Eigenschaften weiter, so dass dieser HOC "transparenter" ist. Es kann zum Beispiel verwendet werden, um eine `getInitialProps()` als statische Methode zu definieren (next.js).

#### Argumente

1. `options` (*Object* [optional]): 
  - `options.withTheme` (*Boolean* [optional]): Standardeinstellung ist `false`. Übergeben Sie das `Theme` Objekt als Eigenschaft an die Komponente.
  - `options.noSSR` (*Boolean* [optional]): Standardeinstellung ist `false`. Um den serverseitigen Renderingabgleich durchzuführen, muss er zweimal gerendert werden. Ein erstes Mal mit nichts und ein zweites Mal mit den Kind-Elementen. Dieser Zyklus mit zwei Durchgängen ist mit einem Nachteil verbunden. Die Benutzeroberfläche blinkt möglicherweise. Sie können dieses Flag auf `true` setzen, wenn Sie kein serverseitiges Rendering durchführen.
  - `options.initialWidth` (*Breakpoint* [optional]): Da `window.innerWidth` auf dem Server nicht verfügbar ist, wird eine leere Komponente während der ersten Mounts standardmäßig gerendert. Vielleicht mögen Sie eine Heuristik verwenden, um annähernd die Bildschirmbreite des Client-Browsers zu bestimmen. Sie könnten beispielsweise den Benutzeragenten oder die Client-Hinweise verwenden. Mit https://caniuse.com/#search=client%20hint, können wir die anfängliche Breite global festlegen, indem Sie die [`benutzerdefinierten Eigenschaften`](/customization/globals/#default-props) zum Theme verwenden. Um die Anfangsbreite festzulegen, müssen wir eine benutzerdefinierte Eigenschaft mit dieser Form übergeben:

```js
const theme = createMuiTheme({
  props: {
    // withWidth Komponente ⚛️
    MuiWithWidth: {
      // Initiale Breite
      initialWidth: 'lg', // Haltepunkte ist global gesetzt 🌎!
    },
  },
});
```

- `options.resizeInterval` (*Number* [optional]): Der Standardwert ist 166, entspricht 10 Bildern bei 60 Hz. Anzahl der Millisekunden, die gewartet werden muss, bevor auf ein Ereignis zur Größenänderung des Bildschirms reagiert wird.

#### Rückgabewerte

`Komponente höherer Ordnung`: Sollte zum Umwickeln einer Komponente verwendet werden.

#### Beispiele

```jsx
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

function MyComponent(props) {
  if (isWidthUp('sm', props.width)) {
    return <span />
  }

  return <div />;
}

export default withWidth()(MyComponent);
```

## Default values

You can explore the default values of the breakpoints using [the theme explorer](/customization/default-theme/?expand-path=$.breakpoints) or by opening the dev tools console on this page (`window.theme.breakpoints`).