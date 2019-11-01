# Interoperabilität der Stilbibliothek

<p class="description">Zwar ist die Verwendung der JSS-basierten Styling-Lösung, die von Material-UI zur Verfügung gestellt wird, einfach, um Ihre Anwendung zu stylen. Es ist jedoch möglich, eine beliebige Styling-Lösung zu verwenden, von einfachem CSS bis zu einer beliebigen Anzahl von CSS-in-JS-Bibliotheken.</p>

In diesem Handbuch sollen die beliebtesten Alternativen dokumentiert werden, aber Sie sollten sich merken, dass die hier vorgestellten Anwendungen an andere Bibliotheken angepasst werden können. There are examples for the following styling solutions:

- [Einfaches CSS](#plain-css)
- [Globales CSS](#global-css)
- [Styled Components](#styled-components)
- [CSS Modules](#styled-components)
- [Emotion](#css-modules)
- [React JSS](#emotion)
- [Glamor](#glamor)

## Einfaches CSS

Nothing fancy, plain old CSS.

**PlainCssButton.css**

```css
.button {
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
}
```

**PlainCssButton.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';

export default function PlainCssButton() {
  return (
    <div>
      <Button>Material-UI</Button>
      <Button className="button">Plain CSS</Button>
    </div>
  );
}
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/l5qv4y57vl)

**Hinweis:** JSS fügt seine Styles am unteren Rand von `<head>` ein. Wenn Sie Stilattribute nicht mit **!important** markieren möchten, ist das wichtig, dass Sie die [ CSS-Injektionsreihenfolge ](/styles/advanced/#css-injection-order) wie in der Demo ändern.

## Globales CSS

Ist es zu viel Aufwand, die Klassennamen explizit für die Komponente bereitzustellen? [Sie können die von Material-UI generierten Klassennamen anvisieren](/styles/advanced/#with-material-ui-core).

**GlobalCssButton.css**

```css
.MuiButton-root {
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
}
```

**GlobalCssButton.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';

export default function GlobalCssButton() {
  return (
    <div>
      <Button>Global CSS</Button>
    </div>
  );
}
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/9yxopv4vmp)

**Hinweis:** JSS fügt seine Styles am unteren Rand von `<head>` ein. Wenn Sie Stilattribute nicht mit **!important** markieren möchten, ist das wichtig, dass Sie die [ CSS-Injektionsreihenfolge ](/styles/advanced/#css-injection-order) wie in der Demo ändern.

## Styled Components

![stars](https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/styled-components.svg?)

The `styled()` method works perfectly on all of the components.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "defaultCodeOpen": true}}

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/k553lz1qrv)

### Priorität kontrollieren

**Hinweis:** Sowohl styled-components als auch JSS fügen ihre Stile unten in `<head>` ein. Um sicherzustellen, dass styled-components-Stile zuletzt geladen werden, ändern Sie die [CSS-Injektionsreihenfolge](/styles/advanced/#css-injection-order), wie in der Demo:

```jsx
import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* Your component tree.
      Mit Stil versehene Komponenten können die Stile von Material-UI überschreiben. */}
</StylesProvider>
```

Ein anderer Ansatz ist die Verwendung von `&&` Zeichen in Stilkomponenten, um, durch Wiederholen des Klassennamens, die [Spezifität zu erhöhen ](https://www.styled-components.com/docs/advanced#issues-with-specificity). Avoid the usage of `!important`.

### Tiefere Elemente

Wenn Sie versuchen, einen Drawer mit der Variante permanent zu stylen, müssen Sie wahrscheinlich das untergeordnete Papierelement des Drawers beeinflussen. Das Paper ist jedoch nicht das Wurzelelement vom Drawer, sodass die Anpassung der gestalteten Komponenten wie oben daher nicht funktioniert. Sie müssen die [`classes`](/styles/advanced/#overriding-styles-classes-prop) API von Material-UI verwenden.

Im folgenden Beispiel wird der `label` Stil der `Button` Komponente zusätzlich zu den benutzerdefinierten Stilen auf dem Button selbst überschrieben. Es funktioniert auch um das [styled-components Problem](https://github.com/styled-components/styled-components/issues/439) durch "verbrauchen" der Eigenschaften, die nicht an die zugrunde liegende Komponente weitergegeben werden sollten, zu beheben.

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "defaultCodeOpen": true}}

Die obige Demo basiert auf den [standard `classes` Werten](/styles/advanced/#with-material-ui-core). Sie können jedoch Ihren eigenen Klassennamen angeben: `.label`.

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(({ color, ...other }) => (
  <Button classes={{ label: 'label' }} {...other} />
))`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);

  & .label {
    color: ${props => props.color};
  }
`;

export default function StyledComponentsDeep() {
  return (
    <div>
      <Button>Material-UI</Button>
      <StyledButton color="papayawhip">Styled Components</StyledButton>
    </div>
  );
}
```

### ThemeProvider

Material-UI hat eine reiche Themenstruktur, die Sie für Farbmanipulationen, Übergänge, die Medien - Anfragen und mehr nutzen können,.

{{"demo": "pages/guides/interoperability/StyledComponentsTheme.js"}}

### Portale

Das [Portal](/components/portal/) bietet eine erstklassige Möglichkeit, Kinder in einen DOM-Knoten zu rendern, der sich außerhalb der DOM-Hierarchie der übergeordneten Komponente befindet. Aufgrund der Art und Weise, in der styled-components das CSS erfasst, können Probleme auftreten, bei denen das Styling nicht angewendet wird.

Beispielsweise, wenn Sie versuchen, das [Menu](/components/menus/) einer [Select](/components/selects/) Komponente mit der Eigenschaft `MenuProps` zu stylen. Dafür müssen Sie die `className` Eigenschaft für das Element, das außerhalb der DOM-Hierarchie gerendert wird, mit übergeben. The following example shows a workaround:

```jsx
import React from 'react';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const StyledMenu = styled(({ className, ...props }) => (
  <Menu {...props} classes={{ paper: className }} />
))`
  box-shadow: none;
  border: 1px solid #d3d4d5;

  li {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;
```

{{"demo": "pages/guides/interoperability/StyledComponentsPortal.js"}}

## CSS Modules

![stars](https://img.shields.io/github/stars/css-modules/css-modules.svg?style=social&label=Star)

Es ist schwer zu wissen, welchen Marktanteil [diese Styling-Lösung](https://github.com/css-modules/css-modules) hat, da es von der Bündelungslösung, die die Leute verwenden abhängig ist.

**CssModulesButton.css**

```css
.button {
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
}
```

**CssModulesButton.js**

```jsx
import React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesButton.css';
import Button from '@material-ui/core/Button';

export default function CssModulesButton() {
  return (
    <div>
      <Button>Material-UI</Button>
      <Button className={styles.button}>CSS Modules</Button>
    </div>
  );
}
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5km241l9xn)

**Hinweis:** JSS fügt seine Styles am unteren Rand von `<head>` ein. Wenn Sie Stilattribute nicht mit **!important** markieren möchten, ist das wichtig, dass Sie die [ CSS-Injektionsreihenfolge ](/styles/advanced/#css-injection-order) wie in der Demo ändern.

## Emotion

![stars](https://img.shields.io/github/stars/emotion-js/emotion.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/emotion.svg?)

### Die `css` Eigenschaft

Die Emotion **css()** Methode funktioniert nahtlos mit der Material-UI.

{{"demo": "pages/guides/interoperability/EmotionCSS.js", "defaultCodeOpen": true}}

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/yw93kl7y0j)

**Hinweis:** JSS fügt seine Styles am unteren Rand von `<head>` ein. Wenn Sie Stilattribute nicht mit **!important** markieren möchten, ist das wichtig, dass Sie die [ CSS-Injektionsreihenfolge ](/styles/advanced/#css-injection-order) wie in der Demo ändern.

### Die `styled()` API

Es funktioniert genauso wie gestylte Komponenten. Sie können [dieselbe Anleitung verwenden](/guides/interoperability/#styled-components).

## React JSS

![stars](https://img.shields.io/github/stars/cssinjs/jss.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/react-jss.svg?)

Die Styling-Lösung von Material-UI teilt viele Bausteine mit [react-jss](https://github.com/cssinjs/react-jss). A fork was needed in order to handle Material-UI's unique needs, but with the intent to merge the changes and fixes from Material-UI back to react-jss.

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Button from '@material-ui/core/Button';

const styles = {
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
};

function ReactJssButton(props) {
  return (
    <div>
      <Button>Material-UI</Button>
      <Button className={props.classes.button}>react-jss</Button>
    </div>
  );
}

ReactJssButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ReactJssButton);
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/24kllqxvmp)