# Farbe (Color)

<p class="description">Vermitteln Sie Bedeutung durch Farbe. Im Auslieferungszustand haben Sie Zugriff auf alle Farben in der Material Design-Spezifikation.</p>

Das Material Design [Farbsystem](https://material.io/design/color/) kann verwendet werden, um ein Farbschema zu erstellen, das Ihre Marke oder Ihren Stil widerspiegelt.

## Picking colors

### Offizielles Farbwerkzeug

The Material Design team has also built an awesome palette configuration tool: [material.io/resources/color/](https://material.io/resources/color/). Auf diese Weise können Sie eine Farbpalette für Ihre Benutzeroberfläche erstellen und die Zugänglichkeit einer beliebigen Farbkombination messen.

<a href="https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336" target="_blank" rel="noopener nofollow">
  <img src="/static/images/color/colorTool.png" alt="Offizielles Farbwerkzeug" style="width: 574px" />
</a>
  
  


Die Ausgabe kann in die `createMuiTheme()` Funktion eingegeben werden:

```js
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

### Spielwiese

To test a [material.io/design/color](https://material.io/design/color/) color scheme with the Material-UI documentation, simply select colors using the palette and sliders below. Alternativ können Sie Hex-Werte in die Felder Primärer und Sekundärer Text eingeben.

{{"demo": "pages/customization/color/ColorTool.js", "hideToolbar": true, "bg": true}}

The output shown in the color sample can be pasted directly into a [`createMuiTheme()`](/customization/theming/#createmuitheme-options-theme) function (to be used with [`ThemeProvider`](/customization/theming/#theme-provider)):

```jsx
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
});
```

Nur die `Haupttöne` müssen bereitgestellt werden (es sei denn, Sie möchten `light`, `dark` oder `contrastText` weiter anpassen), da die anderen Farben von `createMuiTheme()` berechnet werden, wie in der Sektion [ Designanpassung ](/customization/palette/) beschrieben.

Wenn Sie die standardmäßigen primären und / oder sekundären Farbtöne verwenden, wird durch das Bereitstellen von dem Farbobjekt die entsprechenden Farbtöne der Materialfarbe für main, light und dark von `createMuiTheme()` berechnet.

### Werkzeuge von der Community

- [create-mui-theme](https://react-theming.github.io/create-mui-theme/): Is an online tool for creating Material-UI themes via Material Design Color Tool.
- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/): A tool to generate themes for your Material-UI applications by just selecting the colors and having a live preview.
- [Material palette generator](https://material.io/inline-tools/color/): Mit dem Material-Palettengenerator können Sie eine Palette für jede von Ihnen eingegebene Farbe erstellen.

## 2014 Material Design color palettes

These color palettes, originally created by Material Design in 2014, are comprised of colors designed to work together harmoniously, and can be used to develop your brand palette. To generate your own harmonious palettes, use the palette generation tool.

### Wichtige Begriffe

- **Palette**: A palette is a collection of colors, i.e. hues and their shades. Die Material-UI stellt alle Farben aus den Richtlinien für Material Design zur Verfügung. [ Diese Farbpalette ](#color-palette) wurde mit Farben gestaltet, die harmonisch zusammenarbeiten.
- **Hue" & "Shade**: A single color within the palette is made up of a hue such as "red", and shade, such as "500". "Rot 50" ist der hellste Rotton (*Pink!*), während "Rot 900" am dunkelsten ist. Darüber hinaus enthalten die meisten Farbtöne Akzentfarben, denen ein `A` vorangestellt ist.

### Farbpalette

Wenn ein *Ton* (rot, pink usw.) und eine *Schattierung* (500, 600 usw.) gegeben sind, können Sie die Farbe folgendermaßen importieren:

```jsx
import HUE from '@material-ui/core/colors/HUE';

const color = HUE[SHADE];
```

{{"demo": "pages/customization/color/Color.js", "hideToolbar": true, "bg": "inline"}}

### Beispiele

For instance, you can refer to complementary primary and accent colors, "red 500" and "purple A200" like so:

```js
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #f44336
const accent = purple['A200']; // #e040fb
const accent = purple.A200; // #e040fb (alternative method)
```