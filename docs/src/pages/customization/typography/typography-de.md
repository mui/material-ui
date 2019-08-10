# Typography

<p class="description">Das Theme bietet eine Anzahl von Schriftgrößen, die gut zusammen mit dem Layoutraster funktionieren.</p>

The following example demonstrates how to change the [default values](/customization/default-theme/?expend-path=$.typography) of the typography in the theme. You can learn more about how to use the [Typography component](/components/typography/) by checking out the dedicated page.

{{"demo": "pages/customization/typography/TypographyTheme.js"}}

## Schriftfamilie

Sie können die Systemschriftart anstelle der Standardschriftart Roboto verwenden.

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

## Bereitstellen von eigenen Schriftarten

Um Schriftarten selbst zu hosten, laden Sie diese als ` ttf`, ` woff ` und/oder ` woff2 ` herunter und importieren Sie diese in Ihren Code.

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
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};
```

Dann können Sie das Theme ändern, um diese neue Schriftart zu verwenden. Um Raleway global als Schriftart zu definieren, verwenden Sie die [`CssBaseline`](/components/css-baseline/) Komponente.

```js
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Raleway',
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
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [raleway],
      },
    },
  },
});
```

## Schriftgröße

Material-UI verwendet `rem` Einheiten für die Schriftgröße. Die Standardschriftgröße des Browsers `<html>` ist `16px`, aber Browser haben eine Option, um diesen Wert zu ändern, deshalb ermöglichen es uns `rem` Einheiten, die Einstellungen des Benutzers anzupassen, was zu einer viel besseren Benutzererfahrung führt. Benutzer ändern Schriftgröße aus alle Arten von Gründen, von Sehschwäche bis zu optimalen Einstellungen für Geräte, die sehr unterschiedlich in Größe und Betrachtungsabstand sein können.

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

![font-size](/static/images/font-size.gif) <!-- https://latex.codecogs.com/gif.latex?computed&space;=&space;specification&space;\frac{typography.fontSize}{14}&space;\frac{html&space;font&space;size}{typography.htmlFontSize} -->

## HTML-Schriftgröße

Möglicherweise möchten Sie die Standardschriftgröße des `<html>` Elements ändern. Zum Beispiel bei der Verwendung der [10px-Vereinfachung](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/). Wir bieten eine `htmlFontSize` Theme-Eigenschaft für diesen Anwendungsfall an. Es sagt dem Material-UI, was die Schriftgröße des `<html>`-Elements ist. Es wird verwendet, um den `rem` Wert einzustellen, damit die berechnete Schriftgröße immer der Spezifikation entspricht.

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

## Responsive Schriftgrößen

Die Eigenschaften der Typografievarianten werden direkt dem generierten CSS zugeordnet. Sie können in ihnen [Medienabfragen](/customization/breakpoints/#api) verwenden:

```js
const theme = createMuiTheme();

theme.typography.h1 = {
  fontSize: '3rem',
  '@media (min-width:600px)': {
    fontSize: '4.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '6rem',
  },
};
```

Um dieses Setup zu automatisieren, können Sie die Funktion [`responsiveFontSizes()`](/customization/theming/#responsivefontsizes-theme-options-theme) Helfer verwenden, um die Schriftgrößen der Typografie im Design ansprechend zu gestalten.

{{"demo": "pages/customization/typography/ResponsiveFontSizesChart.js", "hideHeader": true}}

Sie können dies in dem folgenden Beispiel in Aktion sehen. Passen Sie die Fenstergröße Ihres Browsers an und beachten Sie, wie sich die Schriftgröße ändert, wenn die Breite die unterschiedlichen [Haltepunkte](/customization/breakpoints/) überschreitet:

{{"demo": "pages/customization/typography/ResponsiveFontSizes.js"}}

## Fließende Schriftgrößen

Noch zu tun: [#15251](https://github.com/mui-org/material-ui/issues/15251).