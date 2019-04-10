# Themes

<p class="description">Passen Sie die Material-UI an Ihrem Design an. Sie können die Farben, die Typografie und vieles mehr ändern.</p>

Das Theme legt die Farbe der Komponenten, die Dunkelheit der Oberflächen, die Schatten, die geeignete Deckkraft der Tintenelemente usw. fest.

Mithilfe von Designs können Sie Ihrer App einen einheitlichen Ton verleihen. Sie können **alle Designaspekte** Ihres Projekts anpassen, um die spezifischen Anforderungen Ihres Unternehmens oder Ihrer Marke zu erfüllen.

Um die Konsistenz zwischen Apps zu erhöhen, stehen helle und dunkle Themenarten zur Auswahl. Standardmäßig verwenden Komponenten den Light-Theme-Typ.

## Theme provider

Wenn Sie das Design anpassen möchten, müssen Sie die `ThemeProvider` Komponente verwenden, um ein Theme in Ihre Anwendung einzufügen. Dies ist jedoch optional. Material-UI-Komponenten werden mit einem Standarddesign geliefert.

`ThemeProvider` stützt sich auf die Kontext - Funktion von React um das Theme an die Komponenten zu übergeben. Deswegen müssen Sie den `ThemeProvider` als ein übergeordnetes Element der Komponenten, die Sie anpassen möchten, setzen. Mehr darüber erfahren Sie im [API](/css-in-js/api/#themeprovider) Abschnitt.

## Theme-Konfigurationsvariablen

Das Ändern der Konfigurationsvariablen für das Theme ist der effektivste Weg, um die Material-UI an Ihre Bedürfnisse anzupassen. Die folgenden Abschnitte behandeln die wichtigsten Theme-Variablen:

- [Palette](#palette)
- [Typ (helles/dunkles Theme)](#type-light-dark-theme)
- [Typografie](#typography)
- [Abstände](#spacing)
- [Andere Variablen](#other-variables)
- [Benutzerdefinierte Variablen](#other-variables)

## Palette

### Intentionen

Eine Farbintention ist eine Zuordnung einer Palette zu einer bestimmten Intention in Ihrer Anwendung.

Das Theme stellt die folgenden FarbIntentionen zur Verfügung:

- primary - wird verwendet, um primäre Oberflächenelemente für einen Benutzer darzustellen.
- secondary - wird verwendet, um sekundäre Oberflächenelemente für einen Benutzer darzustellen.
- error- wird verwendet, um Oberflächenelemente darzustellen, auf die der Benutzer aufmerksam gemacht werden sollte.

Die Standardpalette verwendet die mit `A` (`A200` usw.) gekennzeichneten Schattierungen für die sekundäre Intention, und die nicht vorangestellten Farben für die anderen Intentionen.

Wenn Sie mehr über Farbe erfahren möchten, können Sie sich im [Farbabschnitt](/style/color/) informeiren.

### Benutzerdefinierte Palette

Sie können die Standardpalettenwerte überschreiben, indem Sie ein `Palette` Objekt als Teil Ihres Themas hinzufügen.

Wenn eine der [`palette.primary`](/customization/default-theme/?expend-path=$.palette.primary), [`palette.secondary`](/customization/default-theme/?expend-path=$.palette.secondary) oder [` palette.error`](/customization/default-theme/?expend-path=$.palette.error) 'Intent'-Objekte bereitgestellt ist, wird die Standardeinstellungen ersetzen.

Der Intentionswert kann entweder ein [ Farbobjekt ](/style/color/) sein oder ein Objekt mit einem oder mehreren der Schlüssel, die von der folgenden TypeScript-Schnittstelle angegeben werden:

```ts
interface PaletteIntention {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
};
```

**Verwenden eines Farbobjekts**

Die einfachste Möglichkeit, eine Absicht anzupassen, besteht darin, eine oder mehrere der angegebenen Farben zu importieren und auf eine Palettenabsicht anzuwenden:

```js
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
```

Wenn die Absicht Schlüssel ein Farbobjekt wie im Beispiel empfängt, wird die folgende Abbildung verwendet, um die restlichen, erforderlichen Schlüssel zu füllen:

```js
palette: {
  primary: {
    light: palette.primary[300],
    main: palette.primary[500],
    dark: palette.primary[700],
    contrastText: getContrastText(palette.primary[500]),
  },
  secondary: {
    light: palette.secondary.A200,
    main: palette.secondary.A400,
    dark: palette.secondary.A700,
    contrastText: getContrastText(palette.secondary.A400),
  },
  error: {
    light: palette.error[300],
    main: palette.error[500],
    dark: palette.error[700],
    contrastText: getContrastText(palette.error[500]),
  },
},
```

Dieses Beispiel zeigt, wie Sie die Standardpalettenwerte neu erstellen können:

```js
import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

// Alle folgende Schlüssel sind optional.
// Wir versuchen unser Bestes, um einen hervorragenden Standardwert bereitzustellen.
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    // Wird von `getContrastText()` benutzt, um den Kontrast zwischen Text und 
    // Hintergrund zu maximieren.
    contrastThreshold: 3,
    // Wird verwendet, um die Luminanz einer Farbe um ungefähr
    // zwei Indizes in der Tonpalette zu verschieben.
    // Zum Beispiel von Red 500 zu Red 300 oder Red 700 zu wechseln.
    tonalOffset: 0.2,
  },
});
```

**Die Farben direkt zur Verfügung stellen**

Wenn Sie mehr benutzerdefinierte Farben bereitstellen möchten, können Sie entweder ein eigenes Farbobjekt erstellen oder Farben für einige oder alle Schlüssel der Absichten direkt angeben:

```js
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: wird von palette.primary.main berechnet,
      main: '#ff4400',
      // dark: wird von palette.primary.main berechnet,
      // contrastText: wird von palette.primary.main berechnet,
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: wird von palette.primary.main berechnet,
      contrastText: '#ffcc00',
    },
    // error: wird die Standardfarbe benutzen
  },
});
```

Wie im obigen Beispiel, wenn das Absichtsobjekt benutzerdefinierte Farben mit einem der Hauptbereiche `main`, `light`, `dark` or `contrastText` Schlüssel enthält, ist die Zuordnung wie folgt:

- Wenn der `dark` und / oder `light` Schlüssel weggelassen wird, werden ihre Werte von `main` berechnet, gemäß dem `tonalOffset` Wert.

- Wenn `contrastText` weggelassen wird, wird sein Wert so berechnet, dass er mit `main` kontrastiert, gemäß dem `contrastThreshold` Wert.

Sowohl `tonalOffset` als auch`contrastThreshold` können nach Bedarf angepasst werden. Ein höherer Wert für `tonalOffset` berechnet für `light` hellere und für `dark` dunklere Töne. Ein höherer Wert für `contrastThreshold` erhöht den Punkt ab wann eine Hintergrundfarbe als hell angesehen und einen dunklen `contrastText` gegeben wird.

Beachten Sie, dass `contrastThreshold` einer nichtlinearen Kurve folgt.

### Beispiel

{{"demo": "pages/customization/themes/Palette.js"}}

### Farbwerkzeug

Etwas Inspiration gefällig? Das Material-Design-Team hat ein fantastisches [Konfigurationstool](/style/color/#color-tool) entwickelt, um dir zu helfen.

## Typ (helles/dunkles Theme)

Sie können das Theme dunkel machen, indem Sie `type` auf `dark` setzen. Während es sich nur um eine einzelne Eigenschaftswertänderung handelt, ändert es intern den Wert der folgenden Schlüssel:

- `palette.text`
- `palette.divider`
- `palette.background`
- `palette.action`

```js
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
```

{{"demo": "pages/customization/themes/DarkTheme.js", "hideEditButton": true}}

## Typografie

Zu viele Schriftgrößen und -stile gleichzeitig können jedes Layout beeinträchtigen. Das Theme bietet eine **begrenzte Anzahl von Schriftgrößen** die gut zusammen mit dem Layoutraster funktionieren. Diese Größen werden für die Komponenten verwendet.

Sehen Sie sich das folgende Beispiel zum Ändern der Standardwerte an, z. B. der Schriftfamilie an. Wenn Sie mehr über Typografie erfahren möchten, können Sie sich im [Typografie ](/style/typography/) informeiren.

{{"demo": "pages/customization/themes/TypographyTheme.js"}}

### Schriftfamilie

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

### Bereitstellen von eigenen Schriftarten

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

Dann können Sie das Theme ändern, um diese neue Schriftart zu verwenden. Es erfordert die Verwendung von einer [` CssBaseline `](/style/css-baseline/) Komponente, um Raleway global als Schriftfamilie zu definieren.

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
        '@font-family': [raleway],
      },
    },
  },
});
```

### Schriftgröße

Material-UI verwendet `rem` Einheiten für die Schriftgröße. Die Standardschriftgröße des Browsers `<html>` ist `16px`, aber Browser haben eine Option, um diesen Wert zu ändern, deshalb ermöglichen es uns `rem` Einheiten, die Einstellungen des Benutzers anzupassen, was zu einer viel besseren Benutzererfahrung führt. Benutzer ändern Schriftgröße aus alle Arten von Gründen, von Sehschwäche bis zu optimalen Einstellungen für Geräte, die sehr unterschiedlich in Größe und Betrachtungsabstand sein können.

Um die Schriftgröße der Material-UI zu ändern, können Sie eine `fontSize` Eigenschaft angeben. Der Standardwert ist `14px`.

```js
const theme = createMuiTheme ({
  Typografie: {
    // Auf Japanisch sind die Zeichen normalerweise größer.
    fontSize: 12,
  },
});
```

Die vom Browser berechnete Schriftgröße folgt dieser mathematischen Gleichung:

![font-size](/static/images/font-size.gif) <!-- https://latex.codecogs.com/gif.latex?computed&space;=&space;specification&space;\frac{typography.fontSize}{14}&space;\frac{html&space;font&space;size}{typography.htmlFontSize} -->

### HTML-Schriftgröße

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

{{"demo": "pages/customization/themes/FontSizeTheme.js"}}

## Abstände

Wir empfehlen Ihnen, den `theme.spacing()` Helfer zu verwenden, um einen konsistenten Abstand zwischen den Elementen Ihrer Benutzeroberfläche zu erstellen. Die Material-UI verwendet standardmäßig den [empfohlenen 8px-Skalierungsfaktor](https://material.io/design/layout/understanding-layout.html).

```js
const styles = theme => ({
  root: {
    // JSS verwendet px als Standardeinheiten für diese CSS-Eigenschaft.
    auffüllen: theme.spacing (2), // Ergibt 8 * 2
  },
});
```

Sie können die Abstandstransformation ändern, indem Sie Folgendes angeben:

- eine Zahl

```js
const theme = createMuiTheme({
  spacing: 4,
});

theme.spacing(2) // = 4 * 2
```

- oder eine Funktion

```js
const theme = createMuiTheme({
  spacing: factor => `${0.25 * factor}rem`, // (Bootstrap Strategie)
});

theme.spacing(2) // = 0.5rem = 8px
```

### Mehrere Aritäten

Der`theme.spacing ()` Helfer akzeptiert bis zu 4 Argumente. Sie können die Argumente verwenden, um den Boilerplate zu reduzieren:

```diff
<br />-  padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
+  padding: theme.spacing(1, 2), // '8px 16px'
```

## Andere Variablen

Neben der Palette, den dunklen und den hellen Typen sowie der Typografie normalisiert das Theme die Implementierung, indem es viele weitere Standardwerte bereitstellt, wie zum Beispiel breakpoints, Schatten, Übergänge, etc. Sie können den [Standard-Themenbereich](/customization/default-theme/) auschecken, um das Standarddesign vollständig anzuzeigen.

## Benutzerdefinierte Variablen

Wenn Sie das Material-UI-Theme mit unserer [Styling-Lösung](/css-in-js/basics) oder einer [beliebige andere](/guides/interoperability/#themeprovider) verwenden, kann praktisch sein, dem Theme weitere Variablen hinzuzufügen, damit Sie sie überall verwenden können. Zum Beispiel:

{{"demo": "pages/customization/themes/CustomStyles.js"}}

## Anpassen aller Instanzen eines Komponententyps

### CSS

Wenn die Konfigurationsvariablen nicht ausreichen, können Sie die Vorteile der `overrides` Schlüssel des `Theme` verwenden, um potenziell jeden einzelnen von Material-UI in den DOM eingefügten **Stil** zu ändern. Das ist eine sehr mächtige Funktion.

```js
const theme = createMuiTheme({
  overrides: {
    MuiButton: { // Name der Komponente ⚛️ / Style-Sheet
      text: { // Name der Regel
        color: 'white', // Einige CSS
      },
    },
  },
});
```

{{"demo": "pages/customization/themes/OverridesCss.js"}}

Die Liste dieser Anpassungspunkte für jede Komponente ist unter der **Komponenten-API** Sektion dokumentiert. Zum Beispiel können Sie sich den [Button](/api/button/#css) anschauen. Alternativ können Sie sich immer die [Implementierung](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Button/Button.js) ansehen.

### Eigenschaften

Sie können auch Eigenschaften auf alle Instanzen eines Komponententyps anwenden. Wir stellen einen `props` Schlüssel im `Theme` für diesen Anwendungsfall zur Verfügung.

```js
const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // Die Eigenschaft, die angewendet werden soll
      disableRipple: true, // Kein Ripple-Effekt in der ganzen Applikation mehr 
    },
  },
});
```

{{"demo": "pages/customization/themes/OverridesProperties.js"}}

## Zugriff auf das Theme in einer Komponente

Möglicherweise müssen Sie auf die Themevariablen in Ihren React-Komponenten zugreifen. Angenommen, Sie möchten den Wert der Primärfarbe anzeigen, können Sie die `withTheme` Komponente höherer Ordnung dazu verwenden. Hier ist ein Beispiel:

{{"demo": "pages/customization/themes/WithTheme.js"}}

## Schachteln des Themes

Die Theming-Lösung ist sehr flexibel, da Sie mehrere Theme-anbieter [verschachteln können](/css-in-js/advanced/#theme-nesting). Dies kann sehr nützlich sein, wenn Sie sich mit unterschiedlichen Bereichen Ihrer Anwendung befassen, die sich voneinander unterscheiden.

{{"demo": "pages/customization/themes/ThemeNesting.js"}}

Das innere Theme ** überschreibt** das äußere Theme. Sie können das äußere Theme erweitern, indem Sie eine Funktion bereitstellen:

{{"demo": "pages/customization/themes/ThemeNestingExtend.js"}}

#### Ein Hinweis zur Leistung

Die Auswirkungen der Verschachtelung der `ThemeProviders` Komponente auf die Performanz sind mit der Arbeit von JSS hinter den Kulissen verbunden. Der wichtigste Punkt zu verstehen ist, dass wir das injizierte CSS mit dem folgenden Tupel `(styles, theme)` zwischenspeichern.

- `Theme`: Wenn Sie bei jedem Rendering ein neues Themebereitstellen, wird ein neues CSS-Objekt berechnet und eingefügt. Sowohl für die Konsistenz der Benutzeroberfläche als auch für die Leistung ist es besser, eine begrenzte Anzahl von Themeobjekten wiederzugeben.
- `styles`: Je größer das Styles-Objekt ist, desto mehr Arbeit ist erforderlich.

## API

### `createMuiTheme(options) => theme`

Generieren Sie eine Themenbasis von den gegebenen Optionen.

#### Argumente

1. `options` (*Object*): Nimmt ein unvollständiges Themeobjekt auf und fügt die fehlenden Teile hinzu.

#### Rückgabewerte

`theme` (*Object*): Ein vollständiges, gebrauchsfertiges Themeobjekt.

#### Beispiele

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});
```