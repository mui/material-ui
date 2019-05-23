# Palette

<p class="description">The palette enables you to modify the color of the components to suit your brand.</p>

## Intentionen

Eine Farbintention ist eine Zuordnung einer Palette zu einer bestimmten Intention in Ihrer Anwendung.

Das Theme stellt die folgenden FarbIntentionen zur Verfügung:

- primary - wird verwendet, um primäre Oberflächenelemente für einen Benutzer darzustellen.
- secondary - wird verwendet, um sekundäre Oberflächenelemente für einen Benutzer darzustellen.
- error- wird verwendet, um Oberflächenelemente darzustellen, auf die der Benutzer aufmerksam gemacht werden sollte.

Die Standardpalette verwendet die mit `A` (`A200` usw.) gekennzeichneten Schattierungen für die sekundäre Intention, und die nicht vorangestellten Farben für die anderen Intentionen.

Wenn Sie mehr über Farbe erfahren möchten, können Sie sich im [Farbabschnitt](/customization/color/) informeiren.

## Benutzerdefinierte Palette

Sie können die Standardpalettenwerte überschreiben, indem Sie ein `Palette` Objekt als Teil Ihres Themas hinzufügen.

Wenn eine der [`palette.primary`](/customization/default-theme/?expend-path=$.palette.primary), [`palette.secondary`](/customization/default-theme/?expend-path=$.palette.secondary) oder [` palette.error`](/customization/default-theme/?expend-path=$.palette.error) 'Intent'-Objekte bereitgestellt ist, wird die Standardeinstellungen ersetzen.

Der Intentionswert kann entweder ein [ Farbobjekt ](/customization/color/) sein oder ein Objekt mit einem oder mehreren der Schlüssel, die von der folgenden TypeScript-Schnittstelle angegeben werden:

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

## Beispiel

{{"demo": "pages/customization/palette/Palette.js"}}

## Farbwerkzeug

Etwas Inspiration gefällig? Das Material-Design-Team hat ein fantastisches [Konfigurationstool](/customization/color/#color-tool) entwickelt, um dir zu helfen.

## Typ (helles/dunkles Theme)

Material-UI comes with two theme variants, light (the default) and dark.

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

{{"demo": "pages/customization/palette/DarkTheme.js", "hideEditButton": true}}