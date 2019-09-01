# Theming

<p class="description">Personalize Material-UI com seu tema. Você pode mudar as cores, a tipografia e muito mais.</p>

O tema especifica a cor dos componentes, o escurecimento das superfícies, o nível de sombra, a opacidade apropriada dos elementos de tinta, etc.

Temas permitem que você aplique um tom consistente na sua aplicação. Ele permite que você **customize todos os aspectos do design** do seu projeto, para atender as necessidades específicas do seu negócio ou marca.

Para promover uma maior consistência entre os aplicativos, os temas claro e escuro estão disponíveis para escolha. Por padrão, os componentes usam o tema claro.

## Provedor de Temas

Se você deseja personalizar o tema, você precisa usar o ` ThemeProvider ` componente para injetar um tema em sua aplicação. No entanto, isso é opcional; Material-UI componentes vêm com um tema padrão.

O `ThemeProvider` depende do recurso de contexto do React para passar o tema para os componentes, então você precisa ter certeza de que `ThemeProvider` é um pai (parent) dos componentes que você está tentando customizar. You can learn more about this in [the API section](/styles/api/#themeprovider).

## Variáveis de configuração do tema

Alterar as variáveis de configuração do tema é a maneira mais eficaz de combinar o Material-UI às suas necessidades. As seções a seguir abordam as variáveis mais importantes do tema:

- [Paleta de Cores](/customization/palette/)
- [Tipografia](/customization/typography/)
- [Espaçamento](/customization/spacing/)
- [Pontos de quebra](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [Globais](/customization/globals/)

Você pode conferir a [seção de tema padrão](/customization/default-theme/) para visualizar o tema padrão na íntegra.

### Variáveis customizáveis

When using Material-UI's theme with the [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider). Pode ser conveniente adicionar variáveis adicionais ao tema para que você possa usá-las em todos os lugares. Por exemplo:

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## Accessing the theme in a component

Você [pode acessar](/styles/advanced/#accessing-the-theme-in-a-component) as variáveis do tema dentro de seus componentes React.

## Aninhando o tema

[Você pode aninhar](/styles/advanced/#theme-nesting) vários provedores de tema.

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

The inner theme will **override** the outer theme. You can extend the outer theme by providing a function:

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

### Uma nota sobre desempenho

As implicações de desempenho de aninhamento do componente `ThemeProvider`, estão ligados a forma como o JSS trabalha nos bastidores. O principal ponto a ser entendido é que o CSS injetado é armazenado em cache com a seguinte tupla `(styles, theme)`.

- `theme`: Se você fornecer um novo tema em cada renderização, um novo objeto CSS será computado e injetado. Tanto para consistência quanto desempenho da UI, é melhor renderizar um número limitado de objetos de tema.
- `styles`: Quanto maior é o objeto de estilos, mais trabalho é necessário.

## API

### `createMuiTheme(options) => theme`

Gere uma base de temas sobre as opções recebidas.

#### Argumentos

1. `options` (*Object*): Recebe um objeto de tema incompleto e adiciona as partes ausentes.

#### Retornos

`theme` (*Object*): Um objeto de tema completo, pronto para uso.

#### Exemplos

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

Gera configurações de tipografia responsivas com base nas opções recebidas.

#### Argumentos

1. `theme` (*Object*): O objeto de tema a ser aplicado as alterações.
2. `options` (*Object* [opcional]):

- `breakpoints` (*Array<String>* [optional]): Default to `['sm', 'md', 'lg']`. Array de [pontos de quebra](/customization/breakpoints/) (identificadores).
- `disableAlign` (*Boolean* [opcional]): Padrão `false`. Se os tamanhos de fonte mudam pouco, as alturas da linha são preservadas e alinhadas à altura da linha da grade em 4px do Material Design. Isso requer uma altura de linha sem unidade nos estilos do tema.
- `factor` (*Number* [opcional]): Padrão `2`. Este valor determina o fator de redimensionamento do tamanho da fonte. Quanto maior o valor, menor a diferença entre tamanhos de fonte em telas pequenas. Quanto menor o valor, maiores os tamanhos de fonte para telas pequenas. O valor deve ser maior que 1.
- `variants` (*Array<String>* [optional]): Default to all. As variantes de tipografia para manipular.

#### Retornos

`theme` (*Object*): O novo tema com uma tipografia responsiva.

#### Exemplos

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```