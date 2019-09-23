# @material-ui/styles

<p class="description">Sie können die Styling-Lösung von Material-UI in Ihrer App verwenden, unabhängig davon, ob Sie Material-UI-Komponenten verwenden.</p>

Material-UI hat das Ziel, solide Grundlagen für dynamische UIs zu schaffen. Der Einfachheit halber **stellen wir die in Material-UI-Komponenten verwendete Styling-Lösung** als `@material-ui/styles ` Paket zur Verfügung. Sie können es verwenden, müssen aber nicht, da Material-UI auch mit allen anderen wichtigen Styling-Lösungen [verwendbar ist](/guides/interoperability/).

## Wieso die Styling-Lösung von Material-UI benutzten?

In früheren Versionen hat Material-UI LESS verwendet, eine benutzerdefinierte Inline-Lösung zum Schreiben der Stile der Komponenten. Diese Ansätze erwiesen sich jedoch als begrenzt Einsetzbar. [A *CSS-in-JS* solution](https://github.com/oliviertassinari/a-journey-toward-better-style) overcomes many of those limitations, and **unlocks many great features** (theme nesting, dynamic styles, self-support, etc.).

Die Styling-Lösung von Material-UI ist von vielen anderen Styling-Bibliotheken wie [styled-components](https://www.styled-components.com/) und [emotion](https://emotion.sh/) inspiriert.

- 💅 You can expect [the same advantages](https://www.styled-components.com/docs/basics#motivation) as styled-components.
- 🚀 It's [blazing fast](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uistyles).
- 🧩 It's extensible via a [plugin](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API.
- ⚡️ It uses [JSS](https://github.com/cssinjs/jss) at its core – a [high performance](https://github.com/cssinjs/jss/blob/master/docs/performance.md) JavaScript to CSS compiler which works at runtime and server-side.
- 📦 Less than [15 KB gzipped](https://bundlephobia.com/result?p=@material-ui/styles); and no bundle size increase if used alongside Material-UI.

## Installation

Um die Abhängigkeit zu ihrer `package.json` hinzuzufügen, führen Sie folgenden Befehl aus:

```sh
// mit npm
npm install @material-ui/styles

// mit yarn
yarn add @material-ui/styles
```

## Erste Schritte

There are 3 possible APIs you can use to generate and apply styles, however they all share the same underlying logic.

### Hook API

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function Hook() {
  const classes = useStyles();
  return <Button className={classes.root}>Hook</Button>;
}
```

{{"demo": "pages/styles/basics/Hook.js"}}

### Styled components API

Hinweis: Dies gilt nur für aufrufende Syntax-Stil-Definitionen, die noch ein JSS-Objekt verwenden. Sie können dieses Verhalten auch mit einigen Einschränkungen [ändern](/styles/advanced/#string-templates).

```jsx
import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default function StyledComponents() {
  return <MyButton>Styled Components</MyButton>;
}
```

{{"demo": "pages/styles/basics/StyledComponents.js"}}

### Higher-order component API

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};

function HigherOrderComponent(props) {
  const { classes } = props;
  return <Button className={classes.root}>Higher-order component</Button>;
}

HigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);
```

{{"demo": "pages/styles/basics/HigherOrderComponent.js"}}

## Verschachteln von Selektoren

Sie können Selektoren verschachteln, um Elemente innerhalb der aktuellen Klasse oder Komponente anzuvisieren. Das folgende Beispiel benutzt die Hook-API, aber es funktioniert genauso wie die anderen APIs.

```js
const useStyles = makeStyles({
  root: {
    padding: 16,
    color: 'red',
    '& p': {
      color: 'green',
      '& span': {
        color: 'blue'
      }
    }
  },
});
```

{{"demo": "pages/styles/basics/NestedStylesHook.js"}}

## Anpassung basierend auf Eigenschaften

Sie können eine Funktion an `makeStyles` ("Interpolation") übergeben, um den generierten Wert basierend auf den Eigenschaften der Komponente anzupassen. Die Funktion kann auf Stilregelebene oder auf CSS-Eigenschaftsebene bereitgestellt werden:

```jsx
const useStyles = makeStyles({
  // Stilregel
  foo: props => ({
    backgroundColor: props.backgroundColor,
  }),
  bar: {
    // CSS Eigenschaft
    color: props => props.color,
  },
});

function MyComponent() {
  // Simulierte Eigenschaften für dieses Beispiel
  const props = { backgroundColor: 'black', color: 'white' };
  // Leite die Eigenschaften als erstes Argument an useStyles() weiter
  const classes = useStyles(props);

  return <div className={`${classes.foo} ${classes.bar}`} />
}
```

Diese Buttonkomponente hat eine Farbeigenschaft, die ihre Farbe ändert:

### Hook-API anpassen

{{"demo": "pages/styles/basics/AdaptingHook.js", "react":"next"}}

### Gestylte Komponenten-API anpassen

{{"demo": "pages/styles/basics/AdaptingStyledComponents.js"}}

### API für Komponenten höherer Ordnung anpassen

{{"demo": "pages/styles/basics/AdaptingHOC.js"}}

### Stress test

Im folgenden Stresstest können Sie die *Themefarbe* und *background-color property* live aktualisieren:

```js
const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "pages/styles/basics/StressTest.js"}}

## @material-ui/core/styles vs @material-ui/styles

Material-UI's styles are powered by the [@material-ui/styles](https://www.npmjs.com/package/@material-ui/styles) package, (built with JSS). This solution is [isolated](https://bundlephobia.com/result?p=@material-ui/styles). It doesn't have a default theme, and can be used to style React applications that are not using Material-UI components.

To reduce the number of packages to install when using Material-UI, and to simplify the imports, `@material-ui/styles` modules are re-exported from `@material-ui/core/styles`.

To remove the need to systematically supply a theme, the default Material-UI theme is applied to the re-exported `makeStyles`, `styled`, `withTheme`, `useTheme`, and `withStyles` modules.

For instance:

```js
// Re-export with a default theme
import { makeStyles } from '@material-ui/core/styles';

// Original module with no default theme
import { makeStyles } from '@material-ui/styles';
```