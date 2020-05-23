# Palette

<p class="description">In der Palette können Sie die Farbe der Komponenten an Ihre Marke anpassen.</p>

## Intentionen

Eine Farbintention ist eine Zuordnung einer Palette zu einer bestimmten Intention in Ihrer Anwendung. Das Theme stellt die folgenden FarbIntentionen zur Verfügung:

- primary - wird verwendet, um primäre Oberflächenelemente für einen Benutzer darzustellen.
- secondary - wird verwendet, um sekundäre Oberflächenelemente für einen Benutzer darzustellen.
- error- wird verwendet, um Oberflächenelemente darzustellen, auf die der Benutzer aufmerksam gemacht werden sollte.
- warning - used to represent potentially dangerous actions or important messages.
- info - used to present information to the user that is neutral and not necessarily important.
- success - used to indicate the successful completion of an action that user triggered.

Die Standardpalette verwendet die mit `A` (`A200` usw.) gekennzeichneten Schattierungen für die sekundäre Intention, und die nicht vorangestellten Farben für die anderen Intentionen.

Wenn Sie mehr über Farbe erfahren möchten, können Sie sich im [Farbabschnitt](/customization/color/) informeiren.

{{"demo": "pages/customization/palette/Intentions.js", "bg": "inline", "hideToolbar": true}}

### Individuelle Anpassung

Sie können die Standardpalettenwerte überschreiben, indem Sie ein Palette Objekt als Teil Ihres Themas hinzufügen.

If any of the [`palette.primary`](/customization/default-theme/?expand-path=$.palette.primary), [`palette.secondary`](/customization/default-theme/?expand-path=$.palette.secondary), [`palette.error`](/customization/default-theme/?expand-path=$.palette.error), [`palette.warning`](/customization/default-theme/?expand-path=$.palette.warning), [`palette.info`](/customization/default-theme/?expand-path=$.palette.info) or [`palette.successs`](/customization/default-theme/?expand-path=$.palette.successs) 'intention' objects are provided, they will replace the defaults.

Der Intentionswert kann entweder ein [ Farbobjekt ](/customization/color/) sein oder ein Objekt mit einem oder mehreren der Schlüssel, die von der folgenden TypeScript-Schnittstelle angegeben werden:

```ts
interface PaletteIntention {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}
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

**Die Farben direkt zur Verfügung stellen**

Wenn Sie mehr benutzerdefinierte Farben bereitstellen möchten, können Sie entweder ein eigenes Farbobjekt erstellen oder Farben für einige oder alle Schlüssel der Absichten direkt angeben:

```js
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // Zum Beispiel von Red 500 zu Red 300 oder Red 700 zu wechseln.
    tonalOffset: 0.2,
  },
});
```

As in the example above, if the intention object contains custom colors using any of the "main", "light", "dark" or "contrastText" keys, these map as follows:

- If the "dark" and / or "light" keys are omitted, their value(s) will be calculated from "main", according to the "tonalOffset" value.
- If "contrastText" is omitted, its value will be calculated to contrast with "main", according to the "contrastThreshold" value.

Both the "tonalOffset" and "contrastThreshold" values may be customized as needed. The "tonalOffset" value can either be a number between 0 and 1, which will apply to both light and dark variants, or an object with light and dark variants specified by the following TypeScript type:

```ts
type PaletteTonalOffset = number | {
  light: number;
  dark: number;
};
```

A higher value for "tonalOffset" will make calculated values for "light" lighter, and "dark" darker. A higher value for "contrastThreshold" increases the point at which a background color is considered light, and given a dark "contrastText".

Note that "contrastThreshold" follows a non-linear curve.

### Beispiel

{{"demo": "pages/customization/palette/Palette.js"}}

## Farbwerkzeug

Etwas Inspiration gefällig? The Material Design team has built an awesome [palette configuration tool](/customization/color/#color-tool) to help you.

## Dark mode

Material-UI comes with two palette types, light (the default) and dark. You can make the theme dark by setting `type: 'dark'`. While it's only a single property value change, internally it modifies several palette values.

```js
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
```

The colors modified by the palette type are the following:

{{"demo": "pages/customization/palette/DarkTheme.js", "bg": "inline", "hideToolbar": true}}

### User preference

Users might have specified a preference for a light or dark theme. The method by which the user expresses their preference can vary. It might be a system-wide setting exposed by the Operating System, or a setting controlled by the User Agent.

You can leverage this preference dynamically with the [useMediaQuery](/components/use-media-query/) hook and the [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query.

For instance, you can enable the dark mode automatically:

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes />
    </ThemeProvider>
  );
}
```

## Default values

You can explore the default values of the palette using [the theme explorer](/customization/default-theme/?expand-path=$.palette) or by opening the dev tools console on this page (`window.theme.palette`).