# Theming

<p class="description">Passen Sie die Material-UI an Ihrem Design an. Sie können die Farben, die Typografie und vieles mehr ändern.</p>

Das Theme legt die Farbe der Komponenten, die Dunkelheit der Oberflächen, die Schatten, die geeignete Deckkraft der Tintenelemente usw. fest.

Mithilfe von Designs können Sie Ihrer App einen einheitlichen Ton verleihen. Sie können **alle Designaspekte** Ihres Projekts anpassen, um die spezifischen Anforderungen Ihres Unternehmens oder Ihrer Marke zu erfüllen.

Um die Konsistenz zwischen Apps zu erhöhen, stehen helle und dunkle Themenarten zur Auswahl. Standardmäßig verwenden Komponenten den Light-Theme-Typ.

## Theme provider

Wenn Sie das Design anpassen möchten, müssen Sie die `ThemeProvider` Komponente verwenden, um ein Theme in Ihre Anwendung einzufügen. Dies ist jedoch optional. Material-UI-Komponenten werden mit einem Standarddesign geliefert.

`ThemeProvider` stützt sich auf die Kontext - Funktion von React um das Theme an die Komponenten zu übergeben. Deswegen müssen Sie den `ThemeProvider` als ein übergeordnetes Element der Komponenten, die Sie anpassen möchten, setzen. You can learn more about this in [the API section](/styles/api/#themeprovider).

## Theme-Konfigurationsvariablen

Das Ändern der Konfigurationsvariablen für das Theme ist der effektivste Weg, um die Material-UI an Ihre Bedürfnisse anzupassen. Die folgenden Abschnitte behandeln die wichtigsten Theme-Variablen:

- [Palette](/customization/palette/)
- [Typografie](/customization/typography/)
- [Abstände](/customization/spacing/)
- [Haltepunkte](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [Globale Objekte](/customization/globals/)

You can check out the [default theme section](/customization/default-theme/) to view the default theme in full.

### Custom variables

When using Material-UI's theme with the [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider). It can be convenient to add additional variables to the theme so you can use them everywhere. For instance:

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## Accessing the theme in a component

Sie können auf die Themenvariablen in Ihren React-Komponenten [zugreifen](/styles/advanced/#accessing-the-theme-in-a-component).

## Nesting the theme

Sie können mehrere Themenanbieter [verschachteln](/styles/advanced/#theme-nesting).

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

The inner theme will **override** the outer theme. You can extend the outer theme by providing a function:

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

### A note on performance

The performance implications of nesting the `ThemeProvider` component are linked to JSS's work behind the scenes. Der wichtigste Punkt zu verstehen ist, dass das injizierte CSS mit dem folgenden Tupel `(styles, theme)` zwischengespeichert wird.

- `theme`: If you provide a new theme at each render, a new CSS object will be computed and injected. Both for UI consistency and performance, it's better to render a limited number of theme objects.
- `styles`: The larger the styles object is, the more work is needed.

## API

### `createMuiTheme(options, ...args) => theme`

Generate a theme base on the options received.

#### Parameter

1. `options` (*Object*): Nimmt ein unvollständiges Themeobjekt auf und fügt die fehlenden Teile hinzu.
2. `...args` (*Array*): Deep merge the arguments with the about to be returned theme.

#### Rückgabewerte

`theme` (*Object*): A complete, ready to use theme object.

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

- `breakpoints` (*Array\<String\>* [optional]): Default to `['sm', 'md', 'lg']`. Array von [Haltepunkten](/customization/breakpoints/) (Bezeichner).
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