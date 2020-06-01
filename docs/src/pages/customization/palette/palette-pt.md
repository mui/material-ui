# Paleta de Cores

<p class="description">A paleta permite modificar a cor dos componentes para se adequarem à sua marca.</p>

## Intenções

Uma intenção de cor é um mapeamento de uma paleta para uma determinada intenção dentro da sua aplicação. O tema expõe as seguintes intenções de cores:

- primário - usado para representar os elementos de interface primários para um usuário.
- secundário - usado para representar os elementos de interface secundários para um usuário.
- erro - usado para representar os elementos de interface dos quais o usuário deve estar ciente.
- aviso - usado para representar ações potencialmente perigosas ou mensagens importantes.
- info - usado para apresentar ao usuário informações neutras e não necessariamente importantes.
- success - usado para indicar a conclusão bem-sucedida de uma ação que o usuário acionou.

A paleta padrão usa as sombras prefixadas com `A` (`A200`, etc.) para a intenção secundária, e as cores não pré-fixadas para as outras intenções.

Se você quiser aprender mais sobre cor, você pode conferir [a seção de cores](/customization/color/).

{{"demo": "pages/customization/palette/Intentions.js", "bg": "inline", "hideToolbar": true}}

### Customização

Você pode sobrescrever os valores padrão da paleta incluindo um objeto palette como parte do seu tema.

Se algum dos objetos [`palette.primary`](/customization/default-theme/?expand-path=$.palette.primary), [`palette.secondary`](/customization/default-theme/?expand-path=$.palette.secondary), [`palette.error`](/customization/default-theme/?expand-path=$.palette.error), [`palette.warning`](/customization/default-theme/?expand-path=$.palette.warning), [`palette.info`](/customization/default-theme/?expand-path=$.palette.info) ou [`palette.success`](/customization/default-theme/?expand-path=$.palette.successs) 'intenção' são fornecidos, eles substituirão os padrões.

O valor da intenção pode ser um objeto [cor](/customization/color/), ou um objeto com uma ou mais das chaves especificadas pela seguinte interface TypeScript:

```ts
interface PaletteIntention {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}
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
      // light: será calculada com base em palette.primary.main,
      main: '#ff4400',
      // dark: será calculada com base em palette.primary.main,
      // contrastText: será calculada para contrastar com palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: será calculada com base palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Usado por `getContrastText()` para maximizar o contraste entre
    // o plano de fundo e o texto.
    contrastThreshold: 3,
    // Usado pelas funções abaixo para mudança de uma cor de luminância por aproximadamente
    // dois índices dentro de sua paleta tonal.
    // Por exemplo, mude de Red 500 para Red 300 ou Red 700.
    tonalOffset: 0.2,
  },
});
```

Como no exemplo acima, se o objeto de intenção contém cores customizadas usando qualquer uma das chaves "main", "light", "dark" ou "contrastText", esses mapas são os seguintes:

- Se as chaves "dark" e / ou "light" são omitidas, seus valores serão calculados de "main", de acordo com o valor "tonalOffset".
- Se "contrastText" é omitido, seu valor será calculado para contrastar com "main", de acordo com o valor de "contrastThreshold".

Tanto os valores de "tonalOffset" e "contrastThreshold" poderão ser customizados conforme o necessário. O "tonalOffset" pode ser um valor numérico entre 0 e 1, que será aplicada a ambos variantes claros e escuros, ou um objeto com as variantes clara e escuras especificado a seguir pelo tipo TypeScript:

```ts
type PaletteTonalOffset = number | {
  light: number;
  dark: number;
};
```

Um valor mais alto para "tonalOffset" fará valores calculados para "light" mais claro e "dark" mais escuro. Um valor mais alto para "contrastThreshold" aumenta o ponto no qual uma cor de fundo é considerada clara, e recebe um "contrastText" escuro.

Observe que "contrastThreshold" segue uma curva não linear.

### Exemplo

{{"demo": "pages/customization/palette/Palette.js"}}

## Ferramenta de cor

Precisa de inspiração? A equipe do Material Design construiu uma incrível [ferramenta de configuração de paleta](/customization/color/#color-tool) para te ajudar.

## Modo escuro

O Material-UI vem com dois tipos de paletas, luz (o padrão) e escuro. Você pode deixar o tema escuro definindo `type: 'dark'`. Embora seja apenas uma alteração no valor de uma propriedade única, internamente ela modifica vários valores da paleta.

```js
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
```

As cores modificadas pelo tipo da paleta são as seguintes:

{{"demo": "pages/customization/palette/DarkTheme.js", "bg": "inline", "hideToolbar": true}}

### Preferência do usuário

Usuários podem especificar uma preferência por um tema claro ou escuro. O método pelo qual o usuário expressa a sua preferência pode variar. Pode ser uma configuração de sistema exposta pelo Sistema Operacional, ou uma configuração controlada pelo Agente de Usuário.

Você pode utilizar essa preferência dinamicamente com o hook [useMediaQuery](/components/use-media-query/) e a consulta de mídia [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).

Por exemplo, você pode ativar o modo escuro automaticamente:

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

## Valores padrão

Você pode explorar os valores padrão da paleta usando [o explorador de tema](/customization/default-theme/?expand-path=$.palette) ou abrindo o console das ferramentas de desenvolvimento nesta página (`window.theme.palette`).