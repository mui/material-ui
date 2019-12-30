# Paleta de Cores

<p class="description">A paleta permite modificar a cor dos componentes para se adequarem à sua marca.</p>

## Intenções

Uma intenção de cor é um mapeamento de uma paleta para uma determinada intenção dentro da sua aplicação. O tema expõe as seguintes intenções de cores:

- primário - usado para representar os elementos de interface primários para um usuário.
- secundário - usado para representar os elementos de interface secundários para um usuário.
- erro - usado para representar os elementos de interface dos quais o usuário deve estar ciente.
- warning - used to represent potentially dangerous actions or important messages.
- info - used to present information to the user that is neutral and not necessarily important.
- success - used to indicate the successful completion of an action that user triggered.

A paleta padrão usa as sombras prefixadas com `A` (`A200`, etc.) para a intenção secundária, e as cores não pré-fixadas para as outras intenções.

Se você quiser aprender mais sobre cor, você pode conferir [a seção de cores](/customization/color/).

{{"demo": "pages/customization/palette/Intentions.js", "bg": "inline"}}

### Customização

Você pode sobrescrever os valores padrão da paleta incluindo um objeto palette como parte do seu tema.

If any of the [`palette.primary`](/customization/default-theme/?expand-path=$.palette.primary), [`palette.secondary`](/customization/default-theme/?expand-path=$.palette.secondary), [`palette.error`](/customization/default-theme/?expand-path=$.palette.error), [`palette.warning`](/customization/default-theme/?expand-path=$.palette.warning), [`palette.info`](/customization/default-theme/?expand-path=$.palette.info) or [`palette.successs`](/customization/default-theme/?expand-path=$.palette.successs) 'intention' objects are provided, they will replace the defaults.

O valor da intenção pode ser um objeto [cor](/customization/color/), ou um objeto com uma ou mais das chaves especificadas pela seguinte interface TypeScript:

```ts
interface PaletteIntention {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
};
```

**Usando um objeto de cor**

A maneira mais simples de customizar uma intenção é importar uma ou mais das cores fornecidas e aplicá-las a uma intenção da paleta:

```js
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
```

**Fornecendo as cores diretamente**

Se você deseja fornecer cores mais personalizadas, você pode criar seu próprio objeto de cor, ou fornecer cores diretamente para algumas ou todas as chaves da intenção:

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
    contrastThreshold = 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // Por exemplo, mude de Red 500 para Red 300 ou Red 700.
    tonalOffset: 0.2,
  },
});
```

As in the example above, if the intention object contains custom colors using any of the "main", "light", "dark" or "contrastText" keys, these map as follows:

- If the "dark" and / or "light" keys are omitted, their value(s) will be calculated from "main", according to the "tonalOffset" value.
- If "contrastText" is omitted, its value will be calculated to contrast with "main", according to the"contrastThreshold" value.

Both the "tonalOffset" and "contrastThreshold" values may be customized as needed. A higher value for "tonalOffset" will make calculated values for "light" lighter, and "dark" darker. A higher value for "contrastThreshold" increases the point at which a background color is considered light, and given a dark "contrastText".

Note that "contrastThreshold" follows a non-linear curve.

### Exemplo

{{"demo": "pages/customization/palette/Palette.js"}}

## Ferramenta de cor

Precisa de inspiração? A equipe do Material Design construiu uma incrível [ferramenta de configuração de paleta](/customization/color/#color-tool) para te ajudar.

## Dark mode

Material-UI comes with two palette types, light (the default) and dark. You can make the theme dark by setting `type: 'dark'`. While it's only a single property value change, internally it modifies several palette values.

```js
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
```

{{"demo": "pages/customization/palette/DarkTheme.js", "bg": "inline", "defaultCodeOpen": false}}

### User preference

Users might have specified a preference for a light or dark theme. The method by which the user expresses their preference can vary. It might be a system-wide setting exposed by the Operating System, or a setting controlled by the User Agent.

You can leverage this preference dynamically with the [useMediaQuery](/components/use-media-query/) hook and the [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query.

For instance, you can enable the dark mode automatically:

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/core/styles';

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

## Valores padrão

Você pode explorar os valores padrão da paleta usando [o explorador de tema](/customization/default-theme/?expand-path=$.palette) ou abrindo o console das ferramentas de desenvolvimento nesta página (`window.theme.palette`).