# Paleta

<p class="description">A paleta permite modificar a cor dos componentes para se adequarem à sua marca.</p>

## Paleta de cores

O tema expõe as seguintes cores da paleta (acessível sob `theme.palette`.):

- _primary_ - used to represent primary interface elements for a user. É a cor mais frequentemente exibida nas telas e componentes do seu aplicativo.
- _secondary_ - used to represent secondary interface elements for a user. Ela fornece mais maneiras de realçar e distinguir o seu produto. Tê-la é opcional.
- _error_ - used to represent interface elements that the user should be made aware of.
- _warning_ - used to represent potentially dangerous actions or important messages.
- _info_ - used to present information to the user that is neutral and not necessarily important.
- _success_ - used to indicate the successful completion of an action that user triggered.

If you want to learn more about color, you can check out [the color section](/material-ui/customization/color/).

## Valores padrão

You can explore the default values of the palette using [the theme explorer](/material-ui/customization/default-theme/?expand-path=$.palette) or by opening the dev tools console on this page (`window.theme.palette`).

{{"demo": "Intentions.js", "bg": "inline", "hideToolbar": true}}

A paleta padrão usa as sombras prefixadas com `A` (`A200`, etc.) para a intenção secundária, e as cores não pré-fixadas para as outras intenções.

## Customização

Você pode sobrescrever os valores padrão da paleta incluindo um objeto de paleta como parte do seu tema. Se algum dos seguintes:

- [`.palette.primary`](/material-ui/customization/default-theme/?expand-path=$.palette.primary)
- [`.palette.secondary`](/material-ui/customization/default-theme/?expand-path=$.palette.secondary)
- [`.palette.error`](/material-ui/customization/default-theme/?expand-path=$.palette.error)
- [`.palette.warning`](/material-ui/customization/default-theme/?expand-path=$.palette.warning)
- [`.palette.info`](/material-ui/customization/default-theme/?expand-path=$.palette.info)
- [`.palette.success`](/material-ui/customization/default-theme/?expand-path=$.palette.success)

objetos de cores da paleta são fornecidos, eles substituirão os padrões.

The palette color value can either be a [color](/material-ui/customization/color/#2014-material-design-color-palettes) object, or an object with one or more of the keys specified by the following TypeScript interface:

```ts
interface PaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}
```

### Usando um objeto de cor

A maneira mais simples de customizar uma intenção é importar uma ou mais das cores fornecidas e aplicá-las a uma intenção da paleta:

```js
import { createTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createTheme({
  palette: {
    primary: blue,
  },
});
```

### Fornecendo as cores diretamente

Se você deseja fornecer cores mais customizadas, você pode criar seu próprio objeto de cor, ou fornecer cores diretamente para algumas ou todas as chaves da intenção:

```js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
     // Provide every color token (light, main, dark, and contrastText) when using
     // custom colors for props in Material UI's components.
     // Then you will be able to use it like this: `<Button color="custom">`
     // (For TypeScript, you need to add module augmentation for the `custom` value)
    custom: {
      light: '#ffa726'
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    }
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

Como no exemplo acima, se o objeto de intenção contém cores customizadas usando qualquer uma das chaves "main", "light", "dark" ou "contrastText", os seguintes comportamentos serão aplicados:

- Se as chaves "dark" e / ou "light" são omitidas, seus valores serão calculados de "main", de acordo com o valor "tonalOffset".
- Se "contrastText" é omitido, seu valor será calculado para contrastar com "main", de acordo com o valor de "contrastThreshold".

Tanto os valores de "tonalOffset" e "contrastThreshold" poderão ser customizados conforme o necessário. O "tonalOffset" pode ser um valor numérico entre 0 e 1, que será aplicado a ambas variantes de claro e escuro, ou um objeto com as variantes claro e escuro especificado a seguir pelo tipo TypeScript:

```ts
type PaletteTonalOffset =
  | number
  | {
      light: number;
      dark: number;
    };
```

Um valor mais alto para "tonalOffset" fará valores calculados para "light" mais claro e "dark" mais escuro. Um valor mais alto para "contrastThreshold" aumenta o ponto no qual uma cor de fundo é considerada clara, e recebe um "contrastText" escuro.

Observe que "contrastThreshold" segue uma curva não linear.

### Exemplo

{{"demo": "Palette.js", "defaultCodeOpen": true}}

### Adicionando novas cores

You can add new colors inside and outside the palette of the theme as follows:

```js
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});
```

If you are using TypeScript, you would also need to use [module augmentation](/material-ui/guides/typescript/#customization-of-theme) for the theme to accept the above values.

<!-- tested with packages/mui-material/test/typescript/augmentation/paletteColors.spec.ts -->

```ts
declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}
```

{{"demo": "CustomColor.js"}}

## Escolhendo cores

Precisa de inspiração? The Material Design team has built an [palette configuration tool](/material-ui/customization/color/#picking-colors) to help you.

## Modo escuro

For details of how you can set up a dark mode for your theme, head to the [dark mode guide](/material-ui/customization/dark-mode/).
