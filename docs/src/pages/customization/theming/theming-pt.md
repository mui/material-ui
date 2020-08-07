# Temas

<p class="description">Customize Material-UI com seu tema. Você pode mudar as cores, a tipografia e muito mais.</p>

O tema especifica a cor dos componentes, o escurecimento das superfícies, o nível de sombra, a opacidade apropriada dos elementos de tinta, etc.

Temas permitem que você aplique um tom consistente na sua aplicação. Ele permite que você **customize todos os aspectos do design** do seu projeto, para atender as necessidades específicas do seu negócio ou marca.

Para promover uma maior consistência entre os aplicativos, os temas claro e escuro estão disponíveis para escolha. Por padrão, os componentes usam o tema claro.

## Provedor de Temas

Se você deseja personalizar o tema, você precisa usar o ` ThemeProvider ` componente para injetar um tema em sua aplicação. No entanto, isso é opcional; Material-UI componentes vêm com um tema padrão.

O `ThemeProvider` depende do [ recurso de contexto do React](https://pt-br.reactjs.org/docs/context.html) afim de passar o tema para baixo na árvore de componentes, então você precisa ter certeza de que o `ThemeProvider` é um pai dos componentes que você está tentando customizar. Você pode aprender mais sobre isso lendo a [sessão da API](/styles/api/#themeprovider).

## Variáveis de configuração do tema

Alterar as variáveis de configuração do tema é a maneira mais eficaz de combinar o Material-UI às suas necessidades. As seções a seguir abordam as variáveis mais importantes do tema:

- [Paleta](/customization/palette/)
- [Tipografia](/customization/typography/)
- [Espaçamento](/customization/spacing/)
- [Pontos de quebra](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [Globais](/customization/globals/)

Você pode conferir a [seção de tema padrão](/customization/default-theme/) para visualizar o tema padrão na íntegra.

### Variáveis customizáveis

Ao usar o tema do Material-UI com a [solução de estilo](/styles/basics/) ou [quaisquer outros](/guides/interoperability/#themeprovider), pode ser conveniente adicionar variáveis adicionais ao tema, para que você possa usá-las em qualquer lugar. Por exemplo:

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## Acessando o tema em um componente

Você [pode acessar](/styles/advanced/#accessing-the-theme-in-a-component) as variáveis do tema dentro de seus componentes React.

## Aninhando o tema

[Você pode aninhar](/styles/advanced/#theme-nesting) vários provedores de tema.

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

O tema interno **sobrescreverá** o tema externo. Você pode estender o tema externo fornecendo uma função:

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

### Uma nota sobre desempenho

As implicações de desempenho de aninhamento do componente `ThemeProvider`, estão ligados a forma como o JSS trabalha nos bastidores. O principal ponto a ser entendido é que o CSS injetado é armazenado em cache com a seguinte tupla `(styles, theme)`.

- `theme`: Se você fornecer um novo tema em cada renderização, um novo objeto CSS será computado e injetado. Tanto para consistência quanto desempenho da UI, é melhor renderizar um número limitado de objetos de tema.
- `styles`: Quanto maior é o objeto de estilos, mais trabalho é necessário.

## API

### `createMuiTheme(options, ...args) => theme`

Gere uma base de temas sobre as opções recebidas.

#### Argumentos

1. `options` (*Object*): Recebe um objeto de tema incompleto e adiciona as partes ausentes.
2. `...args` (*Array*): mescle os argumentos com o tema sobre o qual será retornado.

#### Retornos

`theme` (*Object*): Um objeto de tema completo, pronto para uso.

#### Exemplos

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

Gera configurações de tipografia responsivas com base nas opções recebidas.

#### Argumentos

1. `theme` (*Object*): O objeto de tema a ser aplicado as alterações.
2. `options` (*Object* [opcional]):

- `breakpoints` (*Array\<String\>* [opcional]): Padrão `['sm', 'md', 'lg']`. Array de [pontos de quebra](/customization/breakpoints/) (identificadores).
- `disableAlign` (*Boolean* [opcional]): Padrão `false`. Se os tamanhos de fonte mudam pouco, as alturas da linha são preservadas e alinhadas à altura da linha da grade em 4px do Material Design. Isso requer uma altura de linha sem unidade nos estilos do tema.
- `factor` (*Number* [opcional]): Padrão `2`. Este valor determina o fator de redimensionamento do tamanho da fonte. Quanto maior o valor, menor a diferença entre tamanhos de fonte em telas pequenas. Quanto menor o valor, maiores os tamanhos de fonte para telas pequenas. O valor deve ser maior que 1.
- `variants` (*Array\<String\>* [opcional]): Padrão todas. As variantes de tipografia para manipular.

#### Retornos

`theme` (*Object*): O novo tema com uma tipografia responsiva.

#### Exemplos

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

**AVISO**: Não use esse método em produção.

Gera um tema que reduz a quantidade de avisos dentro de [`React.StrictMode`](https://pt-br.reactjs.org/docs/strict-mode.html) como por exemplo, `Warning: findDOMNode is deprecated in StrictMode`.

#### Requisitos

Usando `unstable_createMuiStrictModeTheme` restringe o uso de alguns de nossos componentes.

##### Propriedade `component`

O componente usado na propriedade `component` dos seguintes componentes precisa encaminhar seu ref:

- [`Collapse`](/api/collapse/)

Caso contrário, você irá se deparar com `Error: Function component cannot be given refs`. Veja também: [Composição: Advertência com refs](/guides/composition/#caveat-with-refs).

##### Propriedade `children`

O `children` dos seguintes componentes precisam encaminhar seu ref:

- [`Fade`](/api/fade/)
- [`Grow`](/api/grow/)
- [`Zoom`](/api/zoom/)

```diff
-function TabPanel(props) {
+const TabPanel = React.forwardRef(function TabPanel(props, ref) {
  return <div role="tabpanel" {...props} ref={ref} />;
-}
+});

function Tabs() {
  return <Fade><TabPanel>...</TabPanel></Fade>;
}
```

Caso contrário o componente não irá animar corretamente e você irá se deparar com o aviso `Function components cannot be given refs`.

#### Desabilitar a compatibilidade do StrictMode parcialmente

Se você ainda ver essa mensagem, `Error: Function component cannot be given refs`, então você provavelmente está utilizando um componente de terceiros no qual as correções mencionadas acima não surtem efeito. Você pode corrigir isso aplicando `disableStrictModeCompat`. Você verá novamente avisos de depreciação, mas estes são somente avisos, enquanto a mensagem `Function component cannot be given refs` quebra o comportamento documentado de nossos componentes.

```diff
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

function ThirdPartyTabPanel(props) {
  return <div {...props} role="tabpanel">
}

const theme = unstable_createMuiStrictModeTheme();

function Fade() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>

-        <Fade>
+        <Fade disableStrictModeCompat>
          <ThirdPartyTabPanel />
        </Fade>
      </ThemeProvider>
    </React.StrictMode>,
  );
}
```

#### Argumentos

1. `options` (*Object*): Recebe um objeto de tema incompleto e adiciona as partes ausentes.
2. `...args` (*Array*): mescle os argumentos com o tema sobre o qual será retornado.

#### Retornos

`theme` (*Object*): Um objeto de tema completo, pronto para uso.

#### Exemplos

```js
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
```