# Palette

<p class="description">The palette enables you to modify the color of the components to suit your brand.</p>

## Intentions

A color intention is a mapping of a palette to a given intention within your application.
The theme exposes the following color intentions:

- primary - used to represent primary interface elements for a user.
- secondary - used to represent secondary interface elements for a user.
- error - used to represent interface elements that the user should be made aware of.
- warning - used to represent potentially dangerous actions or important messages.
- info - used to present information to the user that is neutral and not necessarily important.
- success - used to indicate the successful completion of an action that user triggered.

The default palette uses the shades prefixed with `A` (`A200`, etc.) for the secondary intention,
and the un-prefixed shades for the other intentions.

If you want to learn more about color, you can check out [the color section](/customization/color/).

{{"demo": "pages/customization/palette/Intentions.js", "bg": "inline", "hideHeader": true}}

### Customization

You may override the default palette values by including a palette object as part of your theme.

If any of the [`palette.primary`](/customization/default-theme/?expand-path=$.palette.primary),
[`palette.secondary`](/customization/default-theme/?expand-path=$.palette.secondary),
[`palette.error`](/customization/default-theme/?expand-path=$.palette.error),
[`palette.warning`](/customization/default-theme/?expand-path=$.palette.warning),
[`palette.info`](/customization/default-theme/?expand-path=$.palette.info) or
[`palette.successs`](/customization/default-theme/?expand-path=$.palette.successs)
'intention' objects are provided, they will replace the defaults.

The intention value can either be a [color](/customization/color/) object, or an object with one or more of the keys specified by the following TypeScript interface:

```ts
interface PaletteIntention {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}
```

**Using a color object**

The simplest way to customize an intention is to import one or more of the provided colors
and apply them to a palette intention:

```js
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
```

**Providing the colors directly**

If you wish to provide more customized colors, you can either create your own color object,
or directly supply colors to some or all of the intention's keys:

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
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});
```

As in the example above, if the intention object contains custom colors using any of the
"main", "light", "dark" or "contrastText" keys, these map as follows:

- If the "dark" and / or "light" keys are omitted, their value(s) will be calculated from "main",
  according to the "tonalOffset" value.
- If "contrastText" is omitted, its value will be calculated to contrast with "main",
  according to the "contrastThreshold" value.

Both the "tonalOffset" and "contrastThreshold" values may be customized as needed.
A higher value for "tonalOffset" will make calculated values for "light" lighter, and "dark" darker.
A higher value for "contrastThreshold" increases the point at which a background color is considered
light, and given a dark "contrastText".

Note that "contrastThreshold" follows a non-linear curve.

### Example

{{"demo": "pages/customization/palette/Palette.js"}}

## Color tool

Need inspiration? The Material Design team has built an awesome [palette configuration tool](/customization/color/#color-tool) to help you.

## Dark mode

Material-UI comes with two palette types, light (the default) and dark.
You can make the theme dark by setting `type: 'dark'`.
While it's only a single property value change, internally it modifies several palette values.

```js
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
```

The colors modified by the palette type are the following:

{{"demo": "pages/customization/palette/DarkTheme.js", "bg": "inline", "hideHeader": true}}

### User preference

Users might have specified a preference for a light or dark theme.
The method by which the user expresses their preference can vary. It might be a system-wide setting exposed by the Operating System, or a setting controlled by the User Agent.

You can leverage this preference dynamically with the [useMediaQuery](/components/use-media-query/) hook and the [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query.

For instance, you can enable the dark mode automatically:

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
      <Routes />
    </ThemeProvider>
  );
}
```

## Default values

You can explore the default values of the palette using [the theme explorer](/customization/default-theme/?expand-path=$.palette) or by opening the dev tools console on this page (`window.theme.palette`).
