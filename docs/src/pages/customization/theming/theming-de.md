# Theming

<p class="description">Passen Sie die Material-UI an Ihrem Design an. Sie können die Farben, die Typografie und vieles mehr ändern.</p>

Das Theme legt die Farbe der Komponenten, die Dunkelheit der Oberflächen, die Schatten, die geeignete Deckkraft der Tintenelemente usw. fest.

Mithilfe von Designs können Sie Ihrer App einen einheitlichen Ton verleihen. Sie können **alle Designaspekte** Ihres Projekts anpassen, um die spezifischen Anforderungen Ihres Unternehmens oder Ihrer Marke zu erfüllen.

Um die Konsistenz zwischen Apps zu erhöhen, stehen helle und dunkle Themenarten zur Auswahl. Standardmäßig verwenden Komponenten den Light-Theme-Typ.

## Theme provider

Wenn Sie das Design anpassen möchten, müssen Sie die `ThemeProvider` Komponente verwenden, um ein Theme in Ihre Anwendung einzufügen. Dies ist jedoch optional. Material-UI-Komponenten werden mit einem Standarddesign geliefert.

Mehr darüber erfahren Sie im [API](/styles/api/#themeprovider) Abschnitt. `ThemeProvider` relies on the [context feature of React](https://reactjs.org/docs/context.html) to pass the theme down to the components, so you need to make sure that `ThemeProvider` is a parent of the components you are trying to customize.

## Theme-Konfigurationsvariablen

Das Ändern der Konfigurationsvariablen für das Theme ist der effektivste Weg, um die Material-UI an Ihre Bedürfnisse anzupassen. Die folgenden Abschnitte behandeln die wichtigsten Theme-Variablen:

- [Palette](/customization/palette/)
- [Typography](/customization/typography/)
- [Abstände](/customization/spacing/)
- [Haltepunkte](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [Globale Objekte](/customization/globals/)

Sie können den [Standard-Themenbereich](/customization/default-theme/) auschecken, um das Standarddesign vollständig anzuzeigen.

### Benutzerdefinierte Variablen

When using Material-UI's theme with the [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider), it can be convenient to add additional variables to the theme so you can use them everywhere. Zum Beispiel:

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## Zugriff auf das Theme in einer Komponente

Sie können auf die Themenvariablen in Ihren React-Komponenten [zugreifen](/styles/advanced/#accessing-the-theme-in-a-component).

## Schachteln des Themes

Sie können mehrere Themenanbieter [verschachteln](/styles/advanced/#theme-nesting).

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

Das innere Theme ** überschreibt** das äußere Theme. Sie können das äußere Theme erweitern, indem Sie eine Funktion bereitstellen:

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

### Ein Hinweis zur Leistung

Die Auswirkungen der Verschachtelung der `ThemeProviders` Komponente auf die Performanz sind mit der Arbeit von JSS hinter den Kulissen verbunden. Der wichtigste Punkt zu verstehen ist, dass das injizierte CSS mit dem folgenden Tupel `(styles, theme)` zwischengespeichert wird.

- `Theme`: Wenn Sie bei jedem Rendering ein neues Themebereitstellen, wird ein neues CSS-Objekt berechnet und eingefügt. Sowohl für die Konsistenz der Benutzeroberfläche als auch für die Leistung ist es besser, eine begrenzte Anzahl von Themeobjekten wiederzugeben.
- `styles`: Je größer das Styles-Objekt ist, desto mehr Arbeit ist erforderlich.

## API

### `createMuiTheme(options, ...args) => theme`

Generieren Sie eine Themenbasis von den gegebenen Optionen.

#### Parameter

1. `options` (*Object*): Nimmt ein unvollständiges Themeobjekt auf und fügt die fehlenden Teile hinzu.
2. `...args` (*Array*): Deep merge the arguments with the about to be returned theme.

#### Rückgabewerte

`theme` (*Object*): Ein vollständiges, gebrauchsfertiges Themeobjekt.

#### Beispiele

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

Generieren Sie responsive Typografieeinstellungen basierend auf den erhaltenen Optionen.

#### Argumente

1. `theme` (*Object*): Das zu verbessernde Themeobjekt.
2. `options` (*Object* [optional]):

- Array von [Haltepunkten](/customization/breakpoints/) (Bezeichner). Array von [Haltepunkten](/customization/breakpoints/) (Bezeichner).
- `disableAlign` (*Boolean* [optional]): Standardmäßig auf `false`. Ob sich die Schriftgrößen geringfügig ändern, um die Höhen der Linie beizubehalten und an das 4px-Linienhöhenraster von Material Design anzupassent. Dies erfordert eine einheitlose Zeilenhöhe in den Stilen des Designs.
- `factor` (*Nummer* [optional]): Standardmäßig auf `2`. Dieser Wert bestimmt die Stärke der Größenänderung der Schriftgröße. Je höher der Wert, desto geringer ist der Unterschied zwischen den Schriftgrößen auf kleinen Bildschirmen. Je niedriger der Wert, desto größer die Schriftgröße für kleine Bildschirme. The value must be greater than 1.
- `variants` (*Array\<String\>* [optional]): Default to all. Die zu behandelnden Typografie-Varianten.

#### Rückgabewerte

`theme` (*Object*): Das neue Theme mit einer responsiven Typografie.

#### Beispiele

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

**WARNING**: Do not use this method in production.

Generates a theme that reduces the amount of warnings inside [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) like `Warning: findDOMNode is deprecated in StrictMode`.

#### Requirements

Using `unstable_createMuiStrictModeTheme` restricts the usage of some of our components.

##### `component` prop

The component used in the `component` prop of the following components need to forward their ref:

- [`Collapse`](/api/collapse/)

Otherwise you'll encounter `Error: Function component cannot be given refs`. See also: [Composition: Caveat with refs](/guides/composition/#caveat-with-refs).

##### `children` prop

The `children` of the following components need to forward their ref:

- [`Fade`](/api/fade/)
- [`Grow`](/api/grow/)
- [`Zoom`](/api/zoom/)

```diff
-function TabPanel(props) {
+const TabPanel = React.forwardRef(function TabPanel(props, ref) {
  return <div role="tabpanel" {...props} ref={ref} />;
-}
+});

function Tabs() {
  return <Fade><TabPanel>...</TabPanel></Fade>;
}
```

Otherwise the component will not animate properly and you'll encounter the warning that `Function components cannot be given refs`.

#### Disable StrictMode compatibility partially

If you still see `Error: Function component cannot be given refs` then you're probably using a third-party component for which the previously mentioned fixes aren't applicable. You can fix this by applying `disableStrictModeCompat`. You'll see deprecation warnings again but these are only warnings while `Function component cannot be given refs` actually breaks the documented behavior of our components.

```diff
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

function ThirdPartyTabPanel(props) {
  return <div {...props} role="tabpanel">
}

const theme = unstable_createMuiStrictModeTheme();

function Fade() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>

-        <Fade>
+        <Fade disableStrictModeCompat>
          <ThirdPartyTabPanel />
        </Fade>
      </ThemeProvider>
    </React.StrictMode>,
  );
}
```

#### Parameter

1. `options` (*Object*): Nimmt ein unvollständiges Themeobjekt auf und fügt die fehlenden Teile hinzu.
2. `...args` (*Array*): Deep merge the arguments with the about to be returned theme.

#### Rückgabewerte

`theme` (*Object*): Ein vollständiges, gebrauchsfertiges Themeobjekt.

#### Beispiele

```js
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
```