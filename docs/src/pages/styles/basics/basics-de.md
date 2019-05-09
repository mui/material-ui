# @material-ui/styles

<p class="description">Sie können unsere Styling-Lösung auch nutzen, falls Sie unsere Komponenten nicht verwenden.</p>

Material-UI hat das Ziel, eine solide Grundlage für dynamische UIs zu schaffen. Der Einfachheit halber **stellen wir unseren Nutzern unsere Styling-Lösung bereit**. Sie können sie benutzen, aber Sie müssen nicht. Diese Styling-Lösung [funktioniert mit](/guides/interoperability/) allen anderen bekannten Lösungen.

## Die Styling-Lösung von Material-UI

In früheren Versionen hat Material-UI LESS verwendet, eine benutzerdefinierte Inline-Lösung zum Schreiben der Stile der Komponenten. Diese Ansätze erwiesen sich jedoch als begrenzt Einsetzbar. In letzter Zeit haben wir uns in Richtung einer *CSS-in-JS* Lösung [bewegt](https://github.com/oliviertassinari/a-journey-toward-better-style). Es ** schaltet viele großartige Funktionen frei ** (Verschachtelung von Themen, dynamische Stile, Selbstunterstützung usw.). Wir denken, das ist die Zukunft:

- [Eine vereinheitlichte Styling-Sprache](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)
- [SCSS (Sass) in CSS-in-JS umwandeln](https://egghead.io/courses/convert-scss-sass-to-css-in-js)

Die Styling-Lösung von Material-UI ist von vielen anderen Styling-Bibliotheken wie [styled-components](https://www.styled-components.com/) und [emotion](https://emotion.sh/) inspiriert.

- 💅 Sie können [die gleichen Vorteile](https://www.styled-components.com/docs/basics#motivation) wie bei styled-components erwarten.
- 🚀 Es ist [blitzschnell](https://github.com/mui-org/material-ui/blob/next/packages/material-ui-benchmark/README.md#material-uistyles).
- 🧩 Es ist erweiterbar über ein [Plugin](https://github.com/cssinjs/jss/blob/next/docs/plugins.md) API.
- ⚡️ Es verwendet [JSS](https://github.com/cssinjs/jss) im Kern. Es ist ein [leistungsstarker](https://github.com/cssinjs/jss/blob/next/docs/performance.md) JavaScript to CSS Compiler, der zur Laufzeit und serverseitig arbeitet.
- 📦 Weniger als [15 KB gzipped](https://bundlephobia.com/result?p=@material-ui/styles).

## Installation

Um die Abhängigkeit zu ihrer `package.json` hinzuzufügen, führen Sie folgenden Befehl aus:

```sh
// mit npm
npm install @material-ui/styles

// mit yarn
yarn add @material-ui/styles
```

## Erste Schritte

Wir bieten 3 verschiedene APIs an. Sie alle teilen dieselbe zugrunde liegende Logik.

### Hook API

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/styles';
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

{{"demo": "pages/css-in-js/basics/Hook.js"}}

### Styled components API

```jsx
import React from 'react';
import { styled } from '@material-ui/styles';
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

{{"demo": "pages/css-in-js/basics/StyledComponents.js"}}

### Higher-order component API

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
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

{{"demo": "pages/css-in-js/basics/HigherOrderComponent.js"}}

## Verschachteln von Selektoren

Sie können Selektoren verschachteln, um Elemente innerhalb der aktuellen Klasse oder Komponente anzuvisieren. Das folgende Beispiel basiert auf der Hook-API. Es funktioniert genauso wie die anderen APIs.

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

{{"demo": "pages/css-in-js/basics/NestedStylesHook.js"}}

## Anpassung basierend auf Eigenschaften

Sie können eine Funktion ("interpolations") an eine Stileigenschaft übergeben, um sie basierend auf ihren Eigenschaften anzupassen. Die Funktion kann auf Stilregelebene oder auf CSS-Eigenschaftsebene bereitgestellt werden:

```jsx
const useStyles = makeStyles({
  // style rule
  foo: props => ({
    backgroundColor: props.backgroundColor,
  },
  bar: {
    // CSS property
    color: props => props.color,
  },
});

function MyComponent() {
  const props = { backgroundColor: 'black', color: 'white' };
  // Es injiziert die Eigenschaften von useStyles();
  const classes = useStyles(props);

  return <div className={`${classes.foo} ${classes.bar}`} />
}
```

Diese Buttonkomponente hat eine Farbeigenschaft, die ihre Farbe ändert:

### Hook-API anpassen

{{"demo": "pages/css-in-js/basics/AdaptingHook.js", "react":"next"}}

### Gestylte Komponenten-API anpassen

{{"demo": "pages/css-in-js/basics/AdaptingStyledComponents.js"}}

### API für Komponenten höherer Ordnung anpassen

{{"demo": "pages/css-in-js/basics/AdaptingHOC.js"}}

## Stresstest

Im folgenden Stresstest können Sie die *Themefarbe* und *background-color property* live aktualisieren:

```js
const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "pages/css-in-js/basics/StressTest.js"}}