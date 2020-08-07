# Typografie

<p class="description">Das Theme bietet eine Anzahl von Schriftgrößen, die gut zusammen mit dem Layoutraster funktionieren.</p>

## Schriftfamilie

You can change the font family with the `theme.typography.fontFamily` property.

For instance, this demo uses the system font instead of the default Roboto font:

```js
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
```

### Self-hosted fonts

Um Schriftarten selbst zu hosten, laden Sie diese als `ttf`, `woff` und/oder `woff2` herunter und importieren Sie diese in Ihren Code.

⚠️ Voraussetzung dafür ist, dass Sie in Ihrem Build-Prozess ein Plugin oder Loader haben, dass das Laden von `ttf`, `woff` und `woff2` Datein ermöglicht. Schriftarten werden *nicht * in deinen Bundle eingebettet sein. Sie werden von Ihrem Webserver anstelle von CDN geladen.

```js
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';

const raleway = {
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${RalewayWoff2}) format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};
```

Next, you need to change the theme to use this new font. In order to globally define Raleway as a font face, the [`CssBaseline`](/components/css-baseline/) component can be used (or any other CSS solution of your choice).

```jsx
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [raleway],
      },
    },
  },
});

// ...
return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
```

## Schriftgröße

Material-UI verwendet `rem` Einheiten für die Schriftgröße. The browser `<html>` element default font size is `16px`, but browsers have an option to change this value, so `rem` units allow us to accommodate the user's settings, resulting in a better accessibility support. Benutzer ändern Schriftgröße aus alle Arten von Gründen, von Sehschwäche bis zu optimalen Einstellungen für Geräte, die sehr unterschiedlich in Größe und Betrachtungsabstand sein können.

Um die Schriftgröße der Material-UI zu ändern, können Sie eine `fontSize` Eigenschaft angeben. Der Standardwert ist `14px`.

```js
const theme = createMuiTheme({
  typography: {
    // In Chinesisch und Japanisch sind die Zeichen normalerweise größer,
    // daher kann eine kleinere Schriftgröße angemessen sein.
    fontSize: 12,
  },
});
```

Die vom Browser berechnete Schriftgröße folgt dieser mathematischen Gleichung:

![font-size](/static/images/font-size.gif)

<!-- https://latex.codecogs.com/gif.latex?computed&space;=&space;specification&space;\frac{typography.fontSize}{14}&space;\frac{html&space;font&space;size}{typography.htmlFontSize} -->

### Responsive Schriftgrößen

Die Eigenschaften der Typografievarianten werden direkt dem generierten CSS zugeordnet. Sie können in ihnen [Medienabfragen](/customization/breakpoints/#api) verwenden:

```js
const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};
```

{{"demo": "pages/customization/typography/CustomResponsiveFontSizes.js"}}

Um dieses Setup zu automatisieren, können Sie die Funktion [`responsiveFontSizes()`](/customization/theming/#responsivefontsizes-theme-options-theme) Helfer verwenden, um die Schriftgrößen der Typografie im Design ansprechend zu gestalten.

{{"demo": "pages/customization/typography/ResponsiveFontSizesChart.js", "hideToolbar": true}}

Sie können dies in dem folgenden Beispiel in Aktion sehen. Passen Sie die Fenstergröße Ihres Browsers an und beachten Sie, wie sich die Schriftgröße ändert, wenn die Breite die unterschiedlichen [Haltepunkte](/customization/breakpoints/) überschreitet:

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```

{{"demo": "pages/customization/typography/ResponsiveFontSizes.js"}}

### Fließende Schriftgrößen

Noch zu tun: [#15251](https://github.com/mui-org/material-ui/issues/15251).

### HTML-Schriftgröße

Möglicherweise möchten Sie die Standardschriftgröße des `<html>` Elements ändern. Zum Beispiel bei der Verwendung der [10px-Vereinfachung](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/).

> ⚠️ Changing the font size can harm accessibility ♿️. Most browsers agreed on the default size of 16 pixels, but the user can change it. For instance, someone with an impaired vision could have set their browser’s default font size to something larger.

An `htmlFontSize` theme property is provided for this use case, which tells Material-UI what the font-size on the `<html>` element is. This is used to adjust the `rem` value so the calculated font-size always match the specification.

```js
const theme = createMuiTheme({
  typography: {
    // Informiere die Material-UI über die Schriftgröße des HTML-Elements.
    htmlFontSize: 10,
  },
});
```

```css
html {
  font-size: 62.5%; /* 62.5% of 16px = 10px */
}
```

*Sie müssen das obige CSS auf das HTML-Element dieser Seite anwenden, um die unten stehende Demo korrekt anzuzeigen*

{{"demo": "pages/customization/typography/FontSizeTheme.js"}}

## Varianten

The typography object comes with [13 variants](/components/typography/#component) by default:

- h1
- h2
- h3
- h4
- h5
- h6
- subtitle1
- subtitle2
- body1
- body2
- button
- caption
- overline

Each of these variants can be customized individually:

```js
const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});
```

{{"demo": "pages/customization/typography/TypographyVariants.js"}}

## Default values

You can explore the default values of the typography using [the theme explorer](/customization/default-theme/?expand-path=$.typography) or by opening the dev tools console on this page (`window.theme.typography`).