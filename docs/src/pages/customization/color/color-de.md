# Farbe (Color)

<p class="description">Vermitteln Sie Bedeutung durch Farbe. Im Auslieferungszustand haben Sie Zugriff auf alle Farben in der Material Design-Spezifikation.</p>

Das Material Design [Farbsystem](https://material.io/design/color/) kann verwendet werden, um ein Farbschema zu erstellen, das Ihre Marke oder Ihren Stil widerspiegelt.

## Farbsystem

### Wichtige Begriffe

#### "Palette"

Eine Palette ist eine Sammlung von Farben, d.h. Farbtönen und deren Nuancen. Die Material-UI stellt alle Farben aus den Richtlinien für Material Design zur Verfügung. [ Diese Farbpalette ](#color-palette) wurde mit Farben gestaltet, die harmonisch zusammenarbeiten.

#### "Farbton" & "Schatten"

Eine einzelne Farbe innerhalb der Palette besteht aus einem Farbton wie "Rot" und eine Schattierung wie "500". "Rot 50" ist der hellste Rotton (*Pink!*), während "Rot 900" am dunkelsten ist. Darüber hinaus enthalten die meisten Farbtöne Akzentfarben, denen ein `A` vorangestellt ist.

### Beispiele

Die Material Design-Farbpalette umfasst Primär- und Akzentfarben, die zur Illustration oder zur Entwicklung Ihrer Markenfarben verwendet werden können. Sie wurden entwickelt, um harmonisch miteinander zu arbeiten.

Sie können sich beispielsweise auf komplementäre Primär- und Akzentfarben beziehen (z. B. 'red 500' & 'purple A200'):

```js
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #F44336
const accent = purple['A200']; // #E040FB
const accent = purple.A200; // #E040FB (alternative Methode)
```

### Farbpalette

Wenn ein *Ton* (rot, pink usw.) und eine *Schattierung* (500, 600 usw.) gegeben sind, können Sie die Farbe folgendermaßen importieren:

```jsx
import HUE from '@material-ui/core/colors/HUE';

const color = HUE[SHADE];
```

{{"demo": "pages/customization/color/Color.js", "hideHeader": true}}

## Farbwerkzeug

Um ein [ material.io/design/color ](https://material.io/design/color/) Farbschema mittels der Material-UI Dokumentation zu testen, wählen Sie die Farben mittels der Palette und der Regler weiter unten aus. Alternativ können Sie Hex-Werte in die Felder Primärer und Sekundärer Text eingeben.

{{"demo": "pages/customization/color/ColorTool.js", "hideHeader": true}}

Die im Farbmuster angezeigte Ausgabe kann direkt in eine [`createMuiTheme()`](/customization/themes/#createmuitheme-options-theme) Funktion (zur Verwendung mit [` MuiThemeProvider`](/customization/themes/#theme-provider)) eingefügt werden:

```jsx
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: '#f44336',
    },
  },
});
```

Nur die `Haupttöne` müssen bereitgestellt werden (es sei denn, Sie möchten `light`, `dark` oder `contrastText` weiter anpassen), da die anderen Farben von `createMuiTheme()` berechnet werden, wie in der Sektion [ Designanpassung ](/customization/palette/) beschrieben.

Wenn Sie die standardmäßigen primären und / oder sekundären Farbtöne verwenden, wird durch das Bereitstellen von dem Farbobjekt die entsprechenden Farbtöne der Materialfarbe für main, light und dark von `createMuiTheme()` berechnet.

### Offizielles Farbwerkzeug

Das Material Design Team hat auch ein tolles Tool zur Palettenkonfiguration entwickelt: [material.io/tools/color](https://material.io/tools/color/). Auf diese Weise können Sie eine Farbpalette für Ihre Benutzeroberfläche erstellen und die Zugänglichkeit einer beliebigen Farbkombination messen.

<a href="https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336">
  <img src="/static/images/color/colorTool.png" alt="Offizielles Farbwerkzeug" style="width: 574px" />
</a>

Die Ausgabe kann in die `createMuiTheme()` Funktion eingegeben werden:

```jsx
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
```

### Werkzeuge von der Community

- [create-mui-theme](https://react-theming.github.io/create-mui-theme/) Ist ein Online-Tool zum Erstellen von Material-UI-Designs mit dem Material Design Color Tool.
- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/) Ein Tool zum Erstellen von Designs für Ihre Material-UI-Anwendungen, indem Sie einfach die Farben auswählen und eine Live-Vorschau angezeigt bekommen.
- [Material palette generator](https://material.io/inline-tools/color/): Mit dem Material-Palettengenerator können Sie eine Palette für jede von Ihnen eingegebene Farbe erstellen.