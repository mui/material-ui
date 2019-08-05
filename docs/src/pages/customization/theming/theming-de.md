# Theming

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

Sie können auf die Themenvariablen in Ihren React-Komponenten [zugreifen](/styles/advanced/#accessing-the-theme-in-a-component).

## Schachteln des Themes

Sie können mehrere Themenanbieter [verschachteln](/styles/advanced/#theme-nesting).

{{"demo": "pages/customization/themes/ThemeNesting.js"}}

Das innere Theme ** überschreibt** das äußere Theme. Sie können das äußere Theme erweitern, indem Sie eine Funktion bereitstellen:

{{"demo": "pages/customization/themes/ThemeNestingExtend.js"}}

### Ein Hinweis zur Leistung

Die Auswirkungen der Verschachtelung der `ThemeProviders` Komponente auf die Performanz sind mit der Arbeit von JSS hinter den Kulissen verbunden. Der wichtigste Punkt zu verstehen ist, dass das injizierte CSS mit dem folgenden Tupel `(styles, theme)` zwischengespeichert wird.

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

Generieren Sie responsive Typografieeinstellungen basierend auf den erhaltenen Optionen.

#### Argumente

1. `theme` (*Object*): Das zu verbessernde Themeobjekt.
2. `options` (*Object* [optional]):

- ` Haltepunkte (Breakpoints)` (* Array <string> * [optional]): Standardmäßig auf ` ['sm', 'md', 'lg'] `. Array von [Haltepunkten](/customization/breakpoints/) (Bezeichner).
- `disableAlign` (*Boolean* [optional]): Standardmäßig auf `false`. Ob sich die Schriftgrößen geringfügig ändern, um die Höhen der Linie beizubehalten und an das 4px-Linienhöhenraster von Material Design anzupassent. Dies erfordert eine einheitlose Zeilenhöhe in den Stilen des Designs.
- `factor` (*Nummer* [optional]): Standardmäßig auf `2`. Dieser Wert bestimmt die Stärke der Größenänderung der Schriftgröße. Je höher der Wert, desto geringer ist der Unterschied zwischen den Schriftgrößen auf kleinen Bildschirmen. Je niedriger der Wert, desto größer die Schriftgröße für kleine Bildschirme. The value must be greater than 1.
- `variants` (*Array<string>* [optional]): Standardmäßig auf alle. Die zu behandelnden Typografie-Varianten.

#### Rückgabewerte

`theme` (*Object*): Das neue Theme mit einer responsiven Typografie.

#### Beispiele

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```
