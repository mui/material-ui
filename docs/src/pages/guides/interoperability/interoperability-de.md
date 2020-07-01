# Interoperabilität der Stilbibliothek

<p class="description">While you can use the JSS based styling solution provided by Material-UI to style your application, you can also use the one you already know and love (from plain CSS to styled-components).</p>

This guide aims to document the most popular alternatives, but you should find that the principles applied here can be adapted to other libraries. There are examples for the following styling solutions:

- [Einfaches CSS](#plain-css)
- [Globales CSS](#global-css)
- [Styled Components](#styled-components)
- [CSS Modules](#styled-components)
- [Emotion](#css-modules)
- [React JSS](#emotion)

## Einfaches CSS

Nothing fancy, just plain CSS.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/plain-css-mtzri)

**PlainCssButton.css**

```css
.button {
  background-color: #6772e5;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.button:hover {
  background-color: #5469d4;
}
```

**PlainCssButton.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';
import './PlainCssButton.css';

export default function PlainCssButton() {
  return (
    <div>
      <Button>Default</Button>
      <Button className="button">Customized</Button>
    </div>
  );
}
```

### Controlling priority ⚠️

**Hinweis:** JSS fügt seine Styles am unteren Rand von `<head>` ein. Wenn Sie Stilattribute nicht mit **!important** markieren möchten, ist das wichtig, dass Sie die [ CSS-Injektionsreihenfolge ](/styles/advanced/#css-injection-order) wie in der Demo ändern:

```jsx
*/}
</StylesProvider>
      Now, you can override Material-UI's styles. Mit Stil versehene Komponenten können die Stile von Material-UI überschreiben.
```

### Tiefere Elemente

Wenn Sie versuchen, einen Drawer mit der Variante permanent zu stylen, müssen Sie wahrscheinlich das untergeordnete Papierelement des Drawers beeinflussen. Das Paper ist jedoch nicht das Wurzelelement vom Drawer, sodass die Anpassung der gestalteten Komponenten wie oben daher nicht funktioniert. Sie müssen die [`classes`](/styles/advanced/#overriding-styles-classes-prop) API von Material-UI verwenden.

Im folgenden Beispiel wird der `label` Stil der `Button` Komponente zusätzlich zu den benutzerdefinierten Stilen auf dem Button selbst überschrieben.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

**PlainCssButtonDeep.css**

```css
.button {
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.button:hover {
  background-color: #5469d4;
}
.button-label {
  color: #fff;
}
```

**PlainCssButtonDeep.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';
import './PlainCssButtonDeep.css';

export default function PlainCssButtonDeep() {
  return (
    <div>
      <Button>Default</Button>
      <Button classes={{ root: 'button', label: 'button-label' }}>
        Customized
      </Button>
    </div>
  );
}
```

## Globales CSS

Ist es zu viel Aufwand, die Klassennamen explizit für die Komponente bereitzustellen? [Sie können die von Material-UI generierten Klassennamen anvisieren](/styles/advanced/#with-material-ui-core).

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/global-css-bir9e)

**GlobalCssButton.css**

```css
.MuiButton-root {
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.MuiButton-root:hover {
  background-color: #5469d4;
}
.MuiButton-label {
  color: #fff;
}
```

**GlobalCssButton.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';
import './GlobalCssButton.css';

export default function GlobalCssButton() {
  return <Button>Customized</Button>;
}
```

### Controlling priority ⚠️

**Hinweis:** JSS fügt seine Styles am unteren Rand von `<head>` ein. Wenn Sie Stilattribute nicht mit **!important** markieren möchten, ist das wichtig, dass Sie die [ CSS-Injektionsreihenfolge ](/styles/advanced/#css-injection-order) wie in der Demo ändern:

```jsx
*/}
</StylesProvider>
      Now, you can override Material-UI's styles. Mit Stil versehene Komponenten können die Stile von Material-UI überschreiben.
```

## Styled Components

![stars](https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/styled-components.svg?)

The `styled()` method works perfectly on all of the components.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/styled-components-r1fsr)

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  background-color: #6772e5;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
`;

export default function StyledComponents() {
  return (
    <div>
      <Button>Default</Button>
      <StyledButton>Customized</StyledButton>
    </div>
  );
}

```

### Controlling priority ⚠️

**Hinweis:** Sowohl styled-components als auch JSS fügen ihre Stile unten in `<head>` ein. Um sicherzustellen, dass styled-components-Stile zuletzt geladen werden, ändern Sie die [CSS-Injektionsreihenfolge](/styles/advanced/#css-injection-order), wie in der Demo:

```jsx
*/}
</StylesProvider>
      Now, you can override Material-UI's styles. Mit Stil versehene Komponenten können die Stile von Material-UI überschreiben.
```

Ein anderer Ansatz ist die Verwendung von `&&` Zeichen in Stilkomponenten, um, durch Wiederholen des Klassennamens, die [Spezifität zu erhöhen ](https://www.styled-components.com/docs/advanced#issues-with-specificity). Avoid the usage of `!important`.

### Tiefere Elemente

Wenn Sie versuchen, einen Drawer mit der Variante permanent zu stylen, müssen Sie wahrscheinlich das untergeordnete Papierelement des Drawers beeinflussen. Das Paper ist jedoch nicht das Wurzelelement vom Drawer, sodass die Anpassung der gestalteten Komponenten wie oben daher nicht funktioniert. Sie müssen die [`classes`](/styles/advanced/#overriding-styles-classes-prop) API von Material-UI verwenden.

Im folgenden Beispiel wird der `label` Stil der `Button` Komponente zusätzlich zu den benutzerdefinierten Stilen auf dem Button selbst überschrieben. Es funktioniert auch um das [styled-components Problem](https://github.com/styled-components/styled-components/issues/439) durch "verbrauchen" der Eigenschaften, die nicht an die zugrunde liegende Komponente weitergegeben werden sollten, zu beheben.

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js"}}

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
  & .MuiButton-label {
    color: #fff;
  }
`;

export default function StyledComponentsDeep() {
  return (
    <div>
      <Button>Default</Button>
      <StyledButton>Customized</StyledButton>
    </div>
  );
}
```

Die obige Demo basiert auf den [standard `classes` Werten](/styles/advanced/#with-material-ui-core). Sie können jedoch Ihren eigenen Klassennamen angeben: `.label`.

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(({ color, ...other }) => (
  <Button classes={{ label: 'label' }} {...other} />
))`
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
  & .label {
    color: #fff;
  }
`;

export default function StyledComponentsDeep() {
  return (
    <div>
      <Button>Default</Button>
      <StyledButton>Customized</StyledButton>
    </div>
  );
}
```

### Theme

Material-UI hat eine reiche Themenstruktur, die Sie für Farbmanipulationen, Übergänge, die Medien - Anfragen und mehr nutzen können,.

We encourage to share the same theme object between Material-UI and your styles.

```jsx
const StyledButton = styled(Button)`
  ${({ theme }) => `
  background-color: ${theme.palette.primary.main};
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 4px 10px;
  font-size: 13px;
  &:hover {
    background-color: ${darken(theme.palette.primary.main, 0.2)};
  }
  ${theme.breakpoints.up('sm')} {
    font-size: 14px;
    padding: 7px 14px;
  }
  `}
`;
```

{{"demo": "pages/guides/interoperability/StyledComponentsTheme.js"}}

### Portale

The [Portal](/components/portal/) provides a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. Aufgrund der Art und Weise, in der styled-components das CSS erfasst, können Probleme auftreten, bei denen das Styling nicht angewendet wird.

For example, if you attempt to style the [Menu](/components/menus/) of a [Select](/components/selects/) component using the property `MenuProps`, you will need to pass along the `className` property to the element being rendered outside of it's DOM hierarchy. Das folgende Beispiel zeigt eine Problemumgehung:

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

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/css-modules-3j29h)

**CssModulesButton.css**

```css
.button {
  background-color: #6772e5;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.button:hover {
  background-color: #5469d4;
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
      <Button>Default</Button>
      <Button className={styles.button}>Customized</Button>
    </div>
  );
}
```

### Controlling priority ⚠️

**Hinweis:** JSS fügt seine Styles am unteren Rand von `<head>` ein. Wenn Sie Stilattribute nicht mit **!important** markieren möchten, ist das wichtig, dass Sie die [ CSS-Injektionsreihenfolge ](/styles/advanced/#css-injection-order) wie in der Demo ändern:

```jsx
*/}
</StylesProvider>
      Now, you can override Material-UI's styles. Mit Stil versehene Komponenten können die Stile von Material-UI überschreiben.
```

### Tiefere Elemente

Wenn Sie versuchen, einen Drawer mit der Variante permanent zu stylen, müssen Sie wahrscheinlich das untergeordnete Papierelement des Drawers beeinflussen. Das Paper ist jedoch nicht das Wurzelelement vom Drawer, sodass die Anpassung der gestalteten Komponenten wie oben daher nicht funktioniert. Sie müssen die [`classes`](/styles/advanced/#overriding-styles-classes-prop) API von Material-UI verwenden.

Im folgenden Beispiel wird der `label` Stil der `Button` Komponente zusätzlich zu den benutzerdefinierten Stilen auf dem Button selbst überschrieben.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideToolbar": true}}

**CssModulesButtonDeep.css**

```css
.root {
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
}
.root:hover {
  background-color: #5469d4;
}
.label {
  color: #fff;
}
```

**CssModulesButtonDeep.js**

```jsx
import React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesButtonDeep.css';
import Button from '@material-ui/core/Button';

export default function CssModulesButtonDeep() {
  return (
    <div>
      <Button>Default</Button>
      <Button classes={styles}>Customized</Button>
    </div>
  );
}
```

## Emotion

![stars](https://img.shields.io/github/stars/emotion-js/emotion.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/emotion.svg?)

### Die `css` Eigenschaft

Die Emotion **css()** Methode funktioniert nahtlos mit der Material-UI.

{{"demo": "pages/guides/interoperability/EmotionCSS.js", "hideToolbar": true}}

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/emotion-bgfxj)

```jsx
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Button from '@material-ui/core/Button';

export default function EmotionCSS() {
  return (
    <div>
      <Button>Default</Button>
      <Button
        css={css`
          background-color: #6772e5;
          color: #fff;
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
          padding: 7px 14px;
          &:hover {
            background-color: #5469d4;
          }
        `}
      >
        Customized
      </Button>
    </div>
  );
}
```

### Controlling priority ⚠️

**Hinweis:** JSS fügt seine Styles am unteren Rand von `<head>` ein. Wenn Sie Stilattribute nicht mit **!important** markieren möchten, ist das wichtig, dass Sie die [ CSS-Injektionsreihenfolge ](/styles/advanced/#css-injection-order) wie in der Demo ändern:

```jsx
*/}
</StylesProvider>
      Now, you can override Material-UI's styles. Mit Stil versehene Komponenten können die Stile von Material-UI überschreiben.
```

### Theme

Material-UI hat eine reiche Themenstruktur, die Sie für Farbmanipulationen, Übergänge, die Medien - Anfragen und mehr nutzen können,.

We encourage to share the same theme object between Material-UI and your styles.

```jsx
<Button
  css={theme => css`
    background-color: ${theme.palette.primary.main};
    color: #fff;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    padding: 4px 10px;
    font-size: 13px;
    &:hover {
      background-color: ${darken(theme.palette.primary.main, 0.2)};
    }
    ${theme.breakpoints.up('sm')} {
      font-size: 14px;
      padding: 7px 14px;
    }
  `}
>
  Customized
</Button>
```

{{"demo": "pages/guides/interoperability/EmotionTheme.js"}}

### Die `styled()` API

Es funktioniert genauso wie gestylte Komponenten. Sie können [dieselbe Anleitung verwenden](/guides/interoperability/#styled-components).