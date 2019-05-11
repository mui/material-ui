# Themes

<p class="description">Passen Sie die Material-UI an Ihrem Design an. Sie können die Farben, die Typografie und vieles mehr ändern.</p>

Das Theme legt die Farbe der Komponenten, die Dunkelheit der Oberflächen, die Schatten, die geeignete Deckkraft der Tintenelemente usw. fest.

Mithilfe von Designs können Sie Ihrer App einen einheitlichen Ton verleihen. Sie können **alle Designaspekte** Ihres Projekts anpassen, um die spezifischen Anforderungen Ihres Unternehmens oder Ihrer Marke zu erfüllen.

Um die Konsistenz zwischen Apps zu erhöhen, stehen helle und dunkle Themenarten zur Auswahl. Standardmäßig verwenden Komponenten den Light-Theme-Typ.

## Theme provider

Wenn Sie das Design anpassen möchten, müssen Sie die `ThemeProvider` Komponente verwenden, um ein Theme in Ihre Anwendung einzufügen. Dies ist jedoch optional. Material-UI-Komponenten werden mit einem Standarddesign geliefert.

`ThemeProvider` stützt sich auf die Kontext - Funktion von React um das Theme an die Komponenten zu übergeben. Deswegen müssen Sie den `ThemeProvider` als ein übergeordnetes Element der Komponenten, die Sie anpassen möchten, setzen. Mehr darüber erfahren Sie im [API](/styles/api/#themeprovider) Abschnitt.

## Theme-Konfigurationsvariablen

Das Ändern der Konfigurationsvariablen für das Theme ist der effektivste Weg, um die Material-UI an Ihre Bedürfnisse anzupassen. Die folgenden Abschnitte behandeln die wichtigsten Theme-Variablen:

- [Palette](/customization/palette/)
- [Typografie](/customization/typography/)
- [Abstände](/customization/spacing/)
- [Haltepunkte](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [Globale Objekte](/customization/globals/)

Sie können den [Standard-Themenbereich](/customization/default-theme/) auschecken, um das Standarddesign vollständig anzuzeigen.

### Benutzerdefinierte Variablen

Wenn Sie das Material-UI-Theme mit unserer [Styling-Lösung](/styles/basics/) oder einer [beliebige andere](/guides/interoperability/#themeprovider) verwenden, kann praktisch sein, dem Theme weitere Variablen hinzuzufügen, damit Sie sie überall verwenden können. Zum Beispiel:

{{"demo": "pages/customization/themes/CustomStyles.js"}}

## Zugriff auf das Theme in einer Komponente

You [can access](/styles/advanced/#accessing-the-theme-in-a-component) the theme variables inside your React components.

## Schachteln des Themes

[You can nest](/styles/advanced/#theme-nesting) multiple theme providers.

{{"demo": "pages/customization/themes/ThemeNesting.js"}}

Das innere Theme ** überschreibt** das äußere Theme. Sie können das äußere Theme erweitern, indem Sie eine Funktion bereitstellen:

{{"demo": "pages/customization/themes/ThemeNestingExtend.js"}}

### Ein Hinweis zur Leistung

Die Auswirkungen der Verschachtelung der `ThemeProviders` Komponente auf die Performanz sind mit der Arbeit von JSS hinter den Kulissen verbunden. The main point to understand is that the injected CSS is cached with the following tuple `(styles, theme)`.

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

### `responsiveFontSizes(theme, options) => theme`

Generate responsive typography settings based on the options received.

#### Argumente

1. `theme` (*Object*): The theme object to enhance.
2. `options` (*Object* [optional]):

- `breakpoints` (*Array<string>* [optional]): Default to `['sm', 'md', 'lg']`. Array of [breakpoints](/customization/breakpoints/) (identifiers).
- `disableAlign` (*Boolean* [optional]): Default to `false`. Whether font sizes change slightly so line heights are preserved and align to Material Design's 4px line height grid. This requires a unitless line height in the theme's styles.
- `factor` (*Number* [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens. The lower the value, the bigger font sizes for small screens. The value must me greater than 1.
- `variants` (*Array<string>* [optional]): Default to all. The typography variants to handle.

#### Rückgabewerte

`theme` (*Object*): The new theme with a responsive typography.

#### Beispiele

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```