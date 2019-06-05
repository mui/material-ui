# Haltepunkte

<p class="description">API, die die Verwendung von Rasterpunkten in einer Vielzahl von Kontexten ermöglicht.</p>

Für eine optimale Benutzererfahrung müssen Materialdesign-Schnittstellen in der Lage sein, ihr Layout an verschiedenen Haltepunkten anzupassen. Material-UI verwendet eine **vereinfachte** Implementierung der ursprünglichen [Spezifikation](https://material.io/design/layout/responsive-layout-grid.html#breakpoints).

Jeder Haltepunkt (ein Schlüssel) stimmt mit einer *festen* Bildschirmbreite (ein Wert) überein:

- ** xs, ** extraklein: 0px
- ** sm, ** klein: 600px
- ** md, ** mittel: 960px
- ** lg, ** groß: 1280px
- ** xl ** extra groß: 1920px

Diese [ Haltepunktwerte](/customization/default-theme/?expend-path=$.breakpoints.values) werden zur Bestimmung von Haltepunktbereichen verwendet. Ein Bereich beginnt mit dem Haltepunktwert einschließlich bis zum nächsten Haltepunktwert:

```js
Wert          |0px     600px    960px    1280px   1920px
Schlüssel     |xs      sm       md       lg       xl
Breite        |--------|--------|--------|--------|-------->
Bereich       |   xs   |   sm   |   md   |   lg   |   xl
```

Diese Werte können immer angepasst werden. Sie finden sie im Theme unter dem [`breakpoints.values`](/customization/default-theme/?expend-path=$.breakpoints.values) Schlüssel.

Die Haltepunkte werden intern in verschiedenen Komponenten verwendet, um sie ansprechbar zu machen, Sie können sie jedoch auch benutzten, um das Layout Ihrer Anwendung über das [Grid](/layout/grid/) zu steuern und für [Hidden](/layout/hidden/) Komponenten.

## CSS-Medienabfragen

CSS-Medienabfragen sind der idiomatische Ansatz, um Ihre Benutzeroberfläche ansprechbar zu machen. Dafür bieten wir vier Stilhelfer an:

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

{{"demo": "pages/layout/breakpoints/MediaQuery.js"}}

## JavaScript-Medienabfragen

Manchmal reicht die Verwendung von CSS nicht aus. Möglicherweise möchten Sie die React-Rendering-Struktur basierend auf dem Haltepunktwert in JavaScript ändern.

### useMediaQuery hook

Weitere Informationen finden Sie auf der [ useMediaQuery](/layout/use-media-query/) Seite.

### withWidth()

> ⚠️ Diese Komponente höherer Ordnung wird ist veraltet und wird durch den [useMediaQuery](/layout/use-media-query/) hook ersetzt, wenn die React hooks als stabil freigegeben werden.

```jsx
import withWidth from '@material-ui/core/withWidth';

function MyComponent(props) {
  return <div>{`Current width: ${props.width}`}</div>;
}

export default withWidth()(MyComponent);
```

In der folgenden Demo ändern wir das gerenderte DOM-Element (* em*, <u> u</u>, ~~ del ~~ & span) basierend auf der Bildschirmbreite.

{{"demo": "pages/layout/breakpoints/WithWidth.js"}}

## API

### `theme.breakpoints.up(key) => media query`

#### Argumente

1. `key` (*String* | *Number*): Ein Haltepunkteschlüssel (`xs`, `sm`, etc.) oder eine Bildschirmbreite in pixel.

#### Rückgabewerte

`media query`: Eine Medienabfragezeichenfolge, die zur Verwendung mit JSS bereit ist.

#### Beispiele

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Entspricht [md, ∞[
    //       [960px, ∞[
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

`media query`: Eine Medienabfragezeichenfolge, die für die Verwendung mit JSS bereit ist und der Bildschirmbreiten unter und einschließlich der durch die Haltepunkttaste angegebenen Bildschirmgröße entspricht.

#### Beispiele

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Entspricht [0, md + 1[
    //       [0, lg[
    //       [0, 1280px[
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

`media query`: Eine Medienabfragezeichenfolge, die für die Verwendung mit JSS bereit ist und der Bildschirmbreiten über und einschließlich der durch die Haltepunkttaste angegebenen Bildschirmgröße entspricht.

#### Beispiele

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Entspricht [md, md + 1[
    //       [md, lg[
    //       [960px, 1280px[
    [theme.breakpoints.only('md')]: {
      backgroundColor: 'red',
    },
  },
});
```

### `theme.breakpoints.between(start, end) => media query`

#### Argumente

1. `start` (*String*): Eine Haltepunktschlüssel (`xs`, `sm`, etc.).
2. `end` (*String*): Eine Haltepunktschlüssel (`xs`, `sm`, etc.).

#### Rückgabewerte

`media query`: Eine Medienabfragezeichenfolge, die für die Verwendung mit JSS bereit ist und die Bildschirmbreiten größer als die im ersten Argument durch den Haltepunktschlüssel angegebene Bildschirmgröße und weniger als die im zweiten Argument durch den Haltepunktschlüssel angegebene Bildschirmgröße angleicht.

#### Beispiele

```js
const styles = theme => ({
  root: {
    backgroundColor: 'blue',
    // Entspricht [sm, md + 1[
    //       [sm, lg[
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

1. `Optionen` (*Object* [optional]): 
    - `options.withTheme ` (*Boolean* [optional]): Standardeinstellung ist `false`. Übergeben Sie das `Theme` Objekt als Eigenschaft an die Komponente.
    - `options.noSSR ` (*Boolean* [optional]): Standardeinstellung ist `false`. Um den serverseitigen Renderingabgleich durchzuführen, muss er zweimal gerendert werden. Ein erstes Mal mit nichts und ein zweites Mal mit den Kind-Elementen. Dieser Zyklus mit zwei Durchgängen ist mit einem Nachteil verbunden. Die Benutzeroberfläche blinkt möglicherweise. Sie können dieses Flag auf ` true` setzen, wenn Sie kein serverseitiges Rendering durchführen.
    - ` options.initialWidth ` (*Breakpoint* [optional]): Da ` window.innerWidth ` auf dem Server nicht verfügbar ist, wird eine leere Komponente während der ersten Mounts standardmäßig gerendert. Vielleicht mögen Sie eine Heuristik verwenden, um annähernd die Bildschirmbreite des Client-Browsers zu bestimmen. Sie könnten beispielsweise den Benutzeragenten oder die Client-Hinweise verwenden. Mit https://caniuse.com/#search=client%20hint, können wir die anfängliche Breite global festlegen, indem Sie die [`benutzerdefinierten Eigenschaften`](/customization/themes/#default-props) zum Theme verwenden. Um die Anfangsbreite festzulegen, müssen wir eine benutzerdefinierte Eigenschaft mit dieser Form übergeben:

```js
const theme = createMuiTheme({
  props: {
    // withWidth component ⚛️
    MuiWithWidth: {
      // Initial width property
      initialWidth: 'lg', // Breakpoint being globally set 
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

class MyComponent extends React.Component {
  render () {
    if (isWidthUp('sm', this.props.width)) {
      return <span />
    }

    return <div />;
  }
}

export default withWidth()(MyComponent);
```