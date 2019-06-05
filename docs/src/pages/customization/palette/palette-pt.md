# Paleta de Cores

<p class="description">A paleta permite modificar a cor dos componentes para se adequarem à sua marca.</p>

## Intenções

Uma intenção de cor é um mapeamento de uma paleta para uma determinada intenção dentro da sua aplicação.

O tema expõe as seguintes intenções de cores:

- primário - usado para representar os elementos de interface primários para um usuário.
- secundário - usado para representar os elementos de interface secundários para um usuário.
- erro - usado para representar os elementos de interface dos quais o usuário deve estar ciente.

A paleta padrão usa as sombras prefixadas com `A` (`A200`, etc.) para a intenção secundária, e as cores não pré-fixadas para as outras intenções.

Se você quiser aprender mais sobre cor, você pode conferir [a seção de cores](/customization/color/).

## Paleta personalizada

Você pode sobrescrever os valores padrão da paleta incluindo um objeto `palette` como parte do seu tema.

Se algum dos objetos de intenção [`palette.primary`](/customization/default-theme/?expend-path=$.palette.primary), [`palette.secondary`](/customization/default-theme/?expend-path=$.palette.secondary) ou [`palette.error`](/customization/default-theme/?expend-path=$.palette.error) forem fornecidos, eles sobrescreverão os padrões.

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

Se a chave de intenção receber um objeto de cor como no exemplo acima, o mapeamento a seguir será usado para preencher as chaves necessárias:

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

Este exemplo ilustra como você pode recriar os valores padrão da paleta:

```js
import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

// Todas as chaves a seguir são opcionais.
// Nós tentamos nosso melhor para fornecer um ótimo valor padrão.
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    // Usado por `getContrastText ()` para maximizar o contraste entre o segundo plano e
    // o texto.
    contrastThreshold: 3,
    // Usado para alterar a luminosidade de uma cor em aproximadamente
    // dois índices em sua paleta de tons.
    // Por exemplo, mude de Red 500 para Red 300 ou Red 700.
    tonalOffset: 0.2,
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
      // dark: será calculada com base em palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: irá usar a cor padrão
  },
});
```

Como no exemplo acima, se o objeto intenção contiver cores personalizadas usando qualquer uma das chaves `main`, `light`, `dark` e `contrastText`, esses valores se mapeiam da seguinte maneira:

- Se a chave `dark` e / ou `light` são omitidas, seus valores serão calculados com base em `main`, de acordo com o valor de `tonalOffset`.

- Se `contrastText` é omitido, seu valor será calculado para contrastar com `main`, de acordo com o valor de `contrastThreshold`.

Tanto os valores de `tonalOffset` e `contrastThreshold` poderão ser customizados conforme o necessário. Um valor mais alto para `tonalOffset` fará valores calculados para `light` mais claro e `escuro` mais escuro. Um valor mais alto para `contrastThreshold` aumenta o ponto no qual uma cor de fundo é considerada clara, e recebe um `contrastText` escuro.

Observe que `contrastThreshold ` segue uma curva não linear.

## Exemplo

{{"demo": "pages/customization/palette/Palette.js"}}

## Ferramenta de cor

Precisa de inspiração? A equipe do Material Design construiu uma incrível [ferramenta de configuração de paleta](/customization/color/#color-tool) para te ajudar.

## Tipo (Tema claro / escuro)

O Material-UI vem com duas variantes de temas, claro (padrão) e escuro.

Você pode aplicar o tema escuro definindo `type` como `dark`. Embora seja apenas uma alteração no valor de uma única propriedade, internamente ela altera as seguintes chaves:

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