# Palette

<p class="description">La palette vous permet de modifier la couleur des composants en fonction de votre marque.</p>

## Couleurs des palettes

Une intention de couleur est un mappage d'une couleur de palette à une intention donnée au sein de votre application. Le thème expose les couleurs de palette suivantes (accessibles sous `theme.palette.`) :

- *primary* - utilisé pour représenter les éléments d'interface principaux pour un utilisateur. C'est la couleur qui s'affiche le plus fréquemment sur les écrans et les composants de votre application.
- *secondary* - utilisé pour représenter des éléments d'interface secondaires pour un utilisateur. Il offre plus de façons d'accentuer et de distinguer votre produit. L'avoir est facultatif.
- *error* - utilisé pour représenter les éléments d'interface dont l'utilisateur doit être informé.
- *warning* - utilisé pour représenter des actions potentiellement dangereuses ou des messages importants.
- *info* - utilisé pour présenter à l'utilisateur des informations neutres et pas nécessairement importantes.
- *success* - utilisé pour indiquer la réussite d'une action déclenchée par l'utilisateur.

Si vous souhaitez en savoir plus sur la couleur, vous pouvez consulter la [section couleur](/customization/color/).

## Default values

Vous pouvez explorer les valeurs par défaut de la palette en utilisant [l'explorateur de thèmes](/customization/default-theme/?expand-path=$.palette) ou en ouvrant la console des outils de développement sur cette page (`window.theme.palette`).

{{"demo": "pages/customization/palette/Intentions.js", "bg": "inline", "hideToolbar": true}}

La palette par défaut utilise les teintes préfixées par `A` (`A200`, etc.) pour l'intention secondaire, et les nuances non préfixées pour les autres intentions.

## Personnalisation

Vous pouvez remplacer les valeurs de palette par défaut en incluant un objet palette dans votre thème. Si l'un des :

- [`palette.primary`](/customization/default-theme/?expand-path=$.palette.primary)
- [`palette.secondary`](/customization/default-theme/?expand-path=$.palette.secondary)
- [`palette.error`](/customization/default-theme/?expand-path=$.palette.error)
- [`palette.warning`](/customization/default-theme/?expand-path=$.palette.warning)
- [`palette.info`](/customization/default-theme/?expand-path=$.palette.info)
- [`palette.success`](/customization/default-theme/?expand-path=$.palette.success)

des objets de couleur de palette sont fournis, ils remplaceront les valeurs par défaut.

La valeur de couleur de la palette peut être soit un objet [color](/customization/color/#2014-material-design-color-palettes), soit un objet avec une ou plusieurs des clés spécifiées par l'interface TypeScript suivante :

```ts
interface PaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}
```

### Utiliser un objet de couleur

Le moyen le plus simple de personnaliser une intention est d'importer une ou plusieurs des couleurs fournies et appliquez-les à une intention de palette :

```js
import { createTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createTheme({
  palette: {
    primary: blue,
  },
});
```

### Fournir les couleurs directement

Si vous souhaitez proposer des couleurs plus personnalisées, vous pouvez soit créer votre propre objet couleur, ou fournir directement des couleurs à tout ou partie des clés de l'intention :

```js
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      // light : sera calculé à partir de palette.primary.main,
      main: '#ff4400',
      // dark : sera calculé à partir de palette.primary.main,
      // contrastText : sera calculé pour contraster avec palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // sombre : sera calculé à partir de palette.secondaire.main,
      contrastText: '#ffcc00',
    },
    // Utilisé par `getContrastText()` pour maximiser le contraste entre
    // le fond et le texte.
    tonalOffset: 0.2,
  },
});
    contrastThreshold: 3,
    // Utilisé par les fonctions ci-dessous pour décaler la luminance d'une couleur d'environ
    // deux index dans sa palette tonale.
    // Par exemple, passer du Red 500 au Red 300 ou au Red 700.
    // E.g., shift from Red 500 to Red 300 or Red 700.
```

Comme dans l'exemple ci-dessus, si l'objet d'intention contient des couleurs personnalisées utilisant l'un des Clés "main", "light", "dark" ou "contrastText", ces clés sont mappées comme suit :

- Si les clés "dark" et/ou "light" ne sont pas données, leur(s) valeur(s) seront calculées à partir de "main", selon la valeur "tonalOffset".
- Si "contrastText" n'est pas indiqué, sa valeur sera calculée pour contraster avec "main", selon la valeur "contrastThreshold".

Les valeurs "tonalOffset" et "contrastThreshold" peuvent être personnalisées selon les besoins. La valeur "tonalOffset" peut être soit un nombre compris entre 0 et 1, qui s'appliquera aux variantes claires et sombres, soit un objet avec des variantes claires et sombres spécifiées par le type TypeScript suivant :

```ts
type PaletteTonalOffset = number | {
  light: number;
  dark: number;
};
```

Une valeur plus élevée pour "tonalOffset" rendra les valeurs calculées pour "light" plus claires et "dark" plus sombres. Une valeur plus élevée pour "contrastThreshold" augmente le point auquel une couleur d'arrière-plan est considérée light, et donné un "contrastText" dark

Notez que "contrastThreshold" suit une courbe non linéaire.

### Exemple

{{"demo": "pages/customization/palette/Palette.js", "defaultCodeOpen": true}}

### Ajout de nouvelles couleurs

Vous pouvez ajouter de nouvelles couleurs à l'intérieur et à l'extérieur de la palette du thème comme suit :

```js
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    neutral: {
      main: '#5c6ac4',
    },
  },
});
```

If you are using TypeScript, you would also need to use [module augmentation](/guides/typescript/#customization-of-theme) for the theme to accept the above values.

```ts
declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'],
    }
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color']
    }
  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}
```

## Picking colors

Besoin d'inspiration ? L'équipe Material Design a conçu un [outil de configuration de palette](/customization/color/#picking-colors) pour vous aider.

## Mode Sombre

Material-UI est livré avec deux types de palettes, clair (par défaut) et sombre. Vous pouvez rendre le thème sombre en définissant `type : 'dark'`. Bien qu'il ne s'agisse que d'un seul changement de valeur de propriété, il modifie en interne plusieurs valeurs de palette.

```js
const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});
```

Les couleurs modifiées par le type de palette sont les suivantes :

{{"demo": "pages/customization/palette/DarkTheme.js", "bg": "inline", "hideToolbar": true}}

### Préférence de l'utilisateur

Les utilisateurs peuvent avoir spécifié une préférence pour un thème clair ou sombre. La méthode par laquelle l'utilisateur exprime sa préférence peut varier. Il peut s'agir d'un paramètre à l'échelle du système exposé par le système d'exploitation ou d'un paramètre contrôlé par l'agent utilisateur.

Vous pouvez exploiter cette préférence de manière dynamique avec le crochet [useMediaQuery](/components/use-media-query/) et la requête média [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).

Par exemple, vous pouvez activer le mode sombre automatiquement :

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
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