# Paleta

<p class="description">La paleta le permite modificar el color de los componentes para adaptarse a su marca.</p>

## Propósitos

El propósito de un color es una asignación de una paleta a una determinada intención dentro de la aplicación. El tema expone los siguientes propósitos de colores:

- primary - se usa para representar los elementos de interfaz de usuario primarios.
- secondary - se usa para representar los elementos de interfaz de usuario secundarios.
- error - se usa para representar los elementos de interfaz de usuario de los cuales estar alerta.
- warning - se usa para representar posibles acciones peligrosas o mensajes importantes.
- info - se utiliza para presentar información al usuario de que es neutral y no necesariamente importante.
- success - utilizado para indicar la finalización exitosa de una acción que el usuario activó.

La paleta predeterminada utiliza los tonos con prefijo `A` (`A200`, etc.) para los propósitos secundarios, y los tonos sin prefijo para las otras intenciones.

Si quieres aprender más sobre el color, puedes echar un vistazo a [la sección de color](/customization/color/).

{{"demo": "pages/customization/palette/Intentions.js", "bg": "inline", "hideToolbar": true}}

### Personalización

Puede anular los valores de la paleta por defecto incluyendo un objeto de paleta como parte de su tema.

Si alguno de los [`palette.primary`](/customization/default-theme/?expand-path=$.palette.primary), [`palette.secondary`](/customization/default-theme/?expand-path=$.palette.secondary), [`palette.error`](/customization/default-theme/?expand-path=$.palette.error), [`palette. arning`](/customization/default-theme/?expand-path=$.palette.warning), [`palette.info`](/customization/default-theme/?expand-path=$.palette.info) o [`palette.successs`](/customization/default-theme/?expand-path=$.palette.successs) objetos 'propósito' son proporcionados, sustituirán los valores predeterminados.

El valor del propósito de color puede ser un objeto [color](/customization/color/), o un objeto con una o más de las claves especificadas en la siguiente interfaz de TypeScript:

```ts
interface PaletteIntention {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}
```

**Utilizando un objeto de color**

La forma más sencilla de personalizar un propósito de color es importar uno o más de los colores proporcionados y aplicarlos a una intención de paleta:

```js
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
```

**Proporcionando los colores directamente**

Si desea proporcionar colores más personalizados, puede crear su propio objeto de color, o directamente proporciona colores a algunas o todas las claves del propósito de color:

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

Como en el ejemplo anterior, si el objeto de propósito de color contiene colores personalizados usando cualquiera de las claves "main", "light", "dark" o "contrastText", se mapean de la siguiente manera:

- Si las claves "dark" y / o "light" son omitidas, su valor/es serán calculados desde "main", de acuerdo al valor de "tonalOffset".
- Si "contrastText" es omitido, su valor será calculado para contrastar con "main", de acuerdo al valor de "contrastThreshold".

Tanto el valor de "tonalOffset" como el de "contrastThreshold" pueden ser personalizados según sea necesario. The "tonalOffset" value can either be a number between 0 and 1, which will apply to both light and dark variants, or an object with light and dark variants specified by the following TypeScript type:

```ts
type PaletteTonalOffset = number | {
  light: number;
  dark: number;
};
```

A higher value for "tonalOffset" will make calculated values for "light" lighter, and "dark" darker. A higher value for "contrastThreshold" increases the point at which a background color is considered light, and given a dark "contrastText".

Note that "contrastThreshold" follows a non-linear curve.

### Ejemplo

{{"demo": "pages/customization/palette/Palette.js"}}

## Herramienta de color

Need inspiration? The Material Design team has built an awesome [palette configuration tool](/customization/color/#color-tool) to help you.

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