# @material-ui/system

<p class="description">Gestylte System- und Stilfunktionen zum Erstellen leistungsstarker Design-Systeme.</p>

## Erste Schritte

`@material-ui/system` bietet Hilfsfunktionen auf niedriger Ebene, die als "*Style Funktionen*" bezeichnet werden für den Aufbau leistungsstarker Konstruktionssysteme. Einige der wichtigsten Funktionen:

- ⚛️ Greifen Sie über die Komponentenrequisiten direkt auf die Themewerte zu.
- 🦋 Konsistenz der Benutzeroberfläche fördern.
- 🌈 Schreibe mühelos responsive Styles.
- 🦎 Arbeiten Sie mit beliebigen Themeobjekten.
- 💅 Arbeite mit den bekanntesten CSS-in-JS Lösungen.
- 📦 Weniger als [4 KB gzipped](https://bundlephobia.com/result?p=@material-ui/system).
- 🚀 [ Schnell genug ](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uisystem) kein Flaschenhals zur Laufzeit zu sein.

Es ist wichtig zu verstehen, dass dieses Paket mit dieser Signatur reine (nebenwirkungsfreie) Stilfunktionen bereitstellt: `({ theme, ...style }) => style` ** das ist alles** .

### Demo

Im Rest dieses *Erste Schritte* Abschnitts verwenden wir **styled-components** als Referenzbeispiel (um die Universalität dieses Pakets zu betonen). Alternativ können Sie [JSS verwenden](#interoperability). Die Demos basieren ebenfalls auf der **Standardeinstellung** des Material-UI [Themeobjekt](/customization/default-theme/).

{{"demo": "pages/system/basics/Demo.js", "defaultCodeOpen": true}}

### Installation

```jsx
// usando npm
npm install @material-ui/system

// usando yarn
yarn add @material-ui/system
```

### Komponent erstellen

Um die `Box` Komponente zu verwenden, müssen Sie diese zuerst erstellen. Fügen Sie zunächst eine `Abstand` und eine `Palette` Funktion zum Stilargument hinzu.

```jsx
import styled from 'styled-components';
import { spacing, palette } from '@material-ui/system';

const Box = styled.div`${spacing}${palette}`;

export default Box;
```

Diese Box-Komponente unterstützt jetzt neue [Abstandseigenschaften](/system/spacing/#api) und [Farbeigenschaften](/system/palette/#api). Zum Beispiel können Sie eine Padding-Eigenschaft angeben: `p` und eine Farbeigenschaft: `color`.

```jsx
<Box p="1rem" color="grey">Gib mir etwas Platz!</Box>
```

Die Komponente kann mit beliebigen gültigen CSS-Werten gestaltet werden.

### Theming

Die meiste Zeit möchten Sie sich jedoch auf die Werte eines Themas verlassen, um die Konsistenz der Benutzeroberfläche zu erhöhen. Es ist besser einen vorgegebenen Satz von Paddings und Farbwerten zu haben. Importieren Sie den theme provider Ihrer Styling-Lösung.

```jsx
import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  spacing: 4,
  palette: {
    primary: '#007bff',
  },
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* children */}
    </ThemeProvider>
  )
}
```

Jetzt können Sie einen Abstandsmultiplikatorwert angeben:

```jsx
<Box p={1}>4px</Box>
<Box p={2}>8px</Box>
<Box p={-1}>-4px</Box>
```

und eine Grundfarbe:

```jsx
<Box color="primary">blue</Box>
```

### Alles inklusive

Um die Box-Komponente noch nützlicher zu machen, haben wir eine Sammlung von Stilfunktionen erstellt. Hier ist eine vollständige Liste:

- [borders](/system/borders/#api)
- [display](/system/display/#api)
- [flexbox](/system/flexbox/#api)
- [palette](/system/palette/#api)
- [positions](/system/positions/#api)
- [shadows](/system/shadows/#api)
- [sizing](/system/sizing/#api)
- [spacing](/system/spacing/#api)
- [typography](/system/typography/#api)

If you are already using `@material-ui/core`, you can use the [Box component](/components/box/) (using JSS internally):

```jsx
import Box from '@material-ui/core/Box';
```

## Interoperabilität

`@material-ui/system` arbeitet mit den meisten CSS-in-JS-Bibliotheken, einschließlich JSS, Stilkomponenten und Emotionen.

Wenn Sie bereits `@material-ui/core` verwenden, empfehlen wir Ihnen, mit der **JSS** zur Minimierung der Paketgröße zu beginnen.

### JSS

{{"demo": "pages/system/basics/JSS.js", "defaultCodeOpen": true}}

### Styled components

{{"demo": "pages/system/basics/StyledComponents.js", "defaultCodeOpen": true}}

### Emotion

{{"demo": "pages/system/basics/Emotion.js", "defaultCodeOpen": true}}

## Reaktionsfähig

**Alle** Eigenschaften sind reagierend, wir unterstützen 3 verschiedene APIs. Es verwendet diese standardmäßige, aber anpassbare Struktur der Rasterpunkte:

```js
const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const theme = {
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: key => `@media (min-width:${values[key]}px)`,
  },
};
```

### Array

```jsx
<Box p={[2, 3, 4]} />

/**
 * Ausgaben:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

### Object

```jsx
<Box p={{ xs: 2, sm: 3, md: 4 }} />

/**
 * Asugaben:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

### Kollokation

Wenn Sie möchten, die Gruppe der breakpoint-Werte verwenden, können Sie die `breakpoints()` helfer.

```jsx
import { compose, spacing, palette, breakpoints } from '@material-ui/system';
import styled from 'styled-components';

const Box = styled.div`
  ${breakpoints(
    compose(
      spacing,
      palette,
    ),
  )}
`;

<Box
  p={2}
  sm={{ p: 3 }}
  md={{ p: 4 }}
/>

/**
 * Ausgaben:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

{{"demo": "pages/system/basics/CollocationApi.js"}}

## Individuelle Stileigenschaften

### `style(options) => style function`

Verwenden Sie diesen Helfer, um Ihre eigene Style-Funktion zu erstellen.

Not all CSS properties are supported. Möglicherweise möchten Sie neue unterstützen. Es ist auch möglich, dass Sie das Designpfad-Präfix ändern möchten.

#### Argumente

1. `options` (*Object*): 
  - `options.pro` (*String*): Die Eigenschaft, für die die Style-Funktion ausgelöst wird.
  - `options.cssProperty` (*String|Boolean* [optional]): Standardeinstellung ist `options.prop`. Die verwendete CSS-Eigenschaft. Sie können diese Option deaktivieren, indem Sie `false` angeben. Wenn diese Eigenschaft deaktiviert ist, wird der Eigenschaftswert als eigenes Stilobjekt behandelt. Es kann für [Rendering-Varianten](#variants) verwendet werden.
  - `options.themeKey` (*String* [optional]): Der Themepfadpräfix.
  - `options.transform` (*Function* [optional]): Wenden Sie eine Umwandlung an, bevor Sie einen CSS-Wert ausgeben.

#### Rückgabewerte

`Style-Funktion`: Die erstellte Stilfunktion.

#### Beispiele

You can create a component that supports some CSS grid properties like `grid-gap`. By supplying `spacing` as the `themeKey` you can reuse logic enabling the behavior we see in other spacing properties like `padding`.

```jsx
import styled from 'styled-components';
import { style } from '@material-ui/system';
import { Box } from '@material-ui/core';

const gridGap = style({
  prop: 'gridGap',
  themeKey: 'spacing',
});

const Grid = styled(Box)`${gridGap}`;
const example = <Grid display="grid" gridGap={[2, 3]}>...</Grid>;
```

You can also customize the prop name by adding both a `prop` and `cssProperty` and transform the value by adding a `transform` function.

```jsx
import styled from 'styled-components';
import { style } from '@material-ui/system';

const borderColor = style({
  prop: 'bc',
  cssProperty: 'borderColor',
  themeKey: 'palette',
  transform: value => `${value} !important`,
});

const Colored = styled.div`${borderColor}`;
const example = <Colored bc="primary.main">...</Colored>;
```

### `compose(...style functions) => style function`

Mehrere Stilfunktionen in einer zusammenführen.

#### Rückgabewerte

`Style-Funktion`: Die erstellte Stilfunktion.

#### Beispiele

```js
import { style, compose } from '@material-ui/system'

export const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

export const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
});

const palette = compose(textColor, bgcolor);
```

## Varianten

Der `style()` Helfer kann auch verwendet werden, um Eigenschaften Stilobjekten in einem Theme zuzuordnen. In diesem Beispiel unterstützt die `variant` Eigenschaft alle in `theme.typography` vorhandenen Schlüssel.

{{"demo": "pages/system/basics/Variant.js", "defaultCodeOpen": true}}

## CSS-Eigenschaft

Dieser verarbeitet die `css` Eigenshaften. If you want to support custom CSS values, you can use the `css()` helper.

{{"demo": "pages/system/basics/CssProp.js", "defaultCodeOpen": true}}

## So funktioniert es

styled-system hat hervorragende Arbeit geleistet im Erklären [wie es funktioniert](https://github.com/jxnblk/styled-system/blob/master/docs/how-it-works.md#how-it-works). Es kann dabei helfen, ein mentales Modell für dieses Konzept der "Stilfunktion" zu erstellen.

## Realer Anwendungsfall

In Praxis kann eine Box-Komponente viel Zeit sparen. In diesem Beispiel wird gezeigt, wie eine Bannerkomponente reproduziert wird.

{{"demo": "pages/system/basics/RealWorld.js", "bg": true}}

## Stand der Technik

`@material-ui/system` synthetisiert Ideen & APIs aus verschiedenen Quellen:

- [Tachyons](https://tachyons.io/) war eine der ersten (2014) CSS-Bibliotheken, die das [Atomic CSS-Muster](https://css-tricks.com/lets-define-exactly-atomic-css/) förderten (oder funktionales CSS).
- Tachyons wurde später (2017) gefolgt von [Tailwind CSS](https://tailwindcss.com/). Sie haben Atomic CSS populärer gemacht.
- [Twitter-Bootstrap](https://getbootstrap.com/docs/4.1/utilities/borders/) hat langsam atomare Klassennamen in v2, v3 und v4 eingeführt. The way they group their "Helper classes" was used as inspiration.
- In der Welt von React, war das [Styled System](https://github.com/jxnblk/styled-system) eins der ersten (2017), die Stilfunktionen unterstützte. Sie kann als generische Box-Komponente verwendet werden und ersetzt die atomaren CSS-Helfer sowie Helfer beim Schreiben neuer Komponenten.
- Große Unternehmen wie Pinterest, GitHub und Segment.io verwenden denselben Ansatz in verschiedenen Geschmacksrichtungen: 
  - [Evergreen Box](https://evergreen.segment.com/components/layout-primitives/)
  - [Gestalt Box](https://pinterest.github.io/gestalt/#/Box)
  - [Primer Box](https://primer.style/components/docs/Box)
- Die eigentliche Implementierung und die objektabhängige API wurden vom [System der Smooth-UI](https://smooth-ui.smooth-code.com/docs-basics-system) inspiriert.