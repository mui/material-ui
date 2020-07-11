# Cor

<p class="description">Transmita significado através da cor. De forma criativa, você obtém acesso a todas as cores da especificação do Material Design.</p>

O [sistema de cores](https://material.io/design/color/) do Material Design pode ser usado para criar um tema que reflete sua marca ou estilo.

## Escolhendo cores

### Ferramenta oficial de cores

A equipe do Material Design também criou uma ferramenta de configuração de paleta incrível: [material.io/resources/color/](https://material.io/resources/color/). Isso pode ajudar você a criar uma paleta de cores para sua UI, bem como medir o nível de acessibilidade de qualquer combinação de cores.

<a href="https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336" target="_blank" rel="noopener nofollow">
  <img src="/static/images/color/colorTool.png" alt="Ferramenta oficial de cores" style="width: 574px" />
</a>
  
  


A saída pode ser alimentada na função `createMuiTheme()`:

```js
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
```

### Área de exemplos

Para testar um esquema de cores do [material.io/design/color](https://material.io/design/color/) com a documentação do Material-UI, simplesmente selecione as cores usando a paleta e os controles deslizantes abaixo. Como alternativa, você pode inserir valores hexadecimais nos campos de texto Primary e Secondary.

{{"demo": "pages/customization/color/ColorTool.js", "hideToolbar": true, "bg": true}}

A saída exibida na amostra de cores pode ser colada diretamente na função [`createMuiTheme()`](/customization/theming/#createmuitheme-options-theme) (para ser usada com [`ThemeProvider`](/customization/theming/#theme-provider)):

```jsx
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
});
```

Apenas o tom `main` precisa ser fornecido (a menos que você deseje customizar ainda mais `light`, `dark` ou `contrastText`), já que as outras cores serão calculadas por `createMuiTheme()`, como descrito na seção de [customização de tema](/customization/palette/).

Se você estiver usando os tons primário e / ou secundário por padrão, fornecendo o objeto de cor, `createMuiTheme()` usará tons apropriados da cor do material para `main`, `light` e `dark`.

### Ferramentas da comunidade

- [create-mui-theme](https://react-theming.github.io/create-mui-theme/): É uma ferramenta online para criar temas de Material-UI por meio da ferramenta de cor do Material Design.
- [material-ui-tema-editor](https://in-your-saas.github.io/material-ui-theme-editor/): Uma ferramenta para gerar temas para seus aplicativos de Material-UI, basta selecionar as cores e ter uma visualização ao vivo.
- [Material palette generator](https://material.io/inline-tools/color/): O gerador de paleta do Material pode ser usado para gerar uma paleta para qualquer cor que você inserir.

## Paletas de cores Material Design 2014

Estas paletas de cores, originalmente criadas por Material Design em 2014, são compostas por cores desenhadas para trabalhar juntas harmoniosamente e podem ser usadas para desenvolver a paleta de sua marca. Para gerar suas próprias paletas harmoniosas, use a ferramenta de geração de paleta.

### Termos importantes

- **Paleta**: uma paleta é uma coleção de cores, ou seja, tons e seus sombreados. Material-UI fornece todas as cores das diretrizes do Material Design. [Esta paleta de cores](#color-palette) foi projetada com cores que funcionam harmoniosamente entre si.
- **Matiz & Shade**: Uma única cor na paleta é composta de uma tonalidade como "vermelho", e sombra, como "500". "red 50" é o tom mais claro de vermelho (*rosa!*), enquanto "red 900" é o mais escuro. Além disso, a maioria das matizes vem com tons de "destaque" (acentuação), prefixados com um `A`.

### Paleta de cores

Dado que *HUE* seja (red, pink, etc.) e *SHADE* (500, 600, etc.) você pode importar a cor assim:

```jsx
import HUE from '@material-ui/core/colors/HUE';

const color = HUE[SHADE];
```

{{"demo": "pages/customization/color/Color.js", "hideToolbar": true, "bg": "inline"}}

### Exemplos

Por exemplo, você pode se referir a cores complementares primárias e de destaque, "vermelho 500" e "roxo A200" assim:

```js
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #f44336
const accent = purple['A200']; // #e040fb
const accent = purple.A200; // #e040fb (método alternativo)
```