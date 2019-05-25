---
title: Componente React para Ícones
components: Icon, SvgIcon
---

# Ícones

<p class="description">Orientação e sugestões para usar ícones com o Material-UI.</p>

Um ícone de sistema ([system icon](https://material.io/design/iconography/system-icons.html)) ou ícone UI, simboliza um comando, arquivo, dispositivo ou diretório. Os ícones do sistema também são usados para representar ações comuns como lixeira, imprimir e salvar, e são comumente encontrados em barras de aplicativos, barras de ferramentas, botões e listas. O Google forneceu um conjunto de [Material icons](https://material.io/tools/icons/?style=baseline) que seguem essas diretrizes.

O Material-UI fornece dois componentes para renderizar ícones do sistema: `SvgIcon` para renderizar caminhos SVG e `Icon` para renderizar ícones de fontes.

## Ícones SVG

O componente `SvgIcon` usa um elemento SVG `path` como filho e o converte em um componente React que renderiza o ícone, e permite que seja estilizado e responda a eventos do mouse. Os elementos SVG devem ser dimensionados para uma visualização de 24x24px.

O ícone resultante pode ser usado como está, ou incluído como filho para outros componentes de Material-UI que usam ícones. Por padrão, um ícone herdará a cor do texto atual. Opcionalmente, você pode definir a cor do ícone usando uma das propriedades de cor do tema: `primary`, `secondary`, `action`, `erro` & `disabled`.

{{"demo": "pages/components/icons/SvgIcons.js"}}

### SVG Material Ícones

É interessante ter as ferramentas necessárias para implementar ícones customizados, mas com quais predefinições? Nós fornecemos um pacote npm separado, [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons), que inclui os mais de 1.000 ícones oficiais [Material icons](https://material.io/tools/icons/?style=baseline) convertidos para componentes `SvgIcon`.

<a href="https://material.io/tools/icons/?icon=3d_rotation&style=baseline">
  <img src="/static/images/icons/icons.png" alt="Material oficial de ícones" style="width: 566px" />
</a>

#### Uso

Você pode usar [material.io/tools/icons](https://material.io/tools/icons/?style=baseline) para encontrar um ícone específico. Ao importar um ícone, tenha em mente que os nomes dos ícones são `PascalCase`, por exemplo:

- [`delete`](https://material.io/tools/icons/?icon=delete&style=baseline) é exposto como `@material-ui/icons/Delete`
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) é exposto como `@material-ui/icons/DeleteForever`

Para ícones baseados em tema (*"themed"*), acrescente o nome do tema ao nome do ícone. Por exemplo, com o

- O ícone [`delete`](https://material.io/tools/icons/?icon=delete&style=outline) delineado é exposto como `@material-ui/icons/DeleteOutlined`
- O ícone [`delete`](https://material.io/tools/icons/?icon=delete&style=rounded) arredondado é exposto como `@material-ui/icons/DeleteRounded`
- O ícone [`delete`](https://material.io/tools/icons/?icon=delete&style=twotone) com tom de cor duplo é exposto como `@material-ui/icons/DeleteTwoTone`
- O ícone [`delete`](https://material.io/tools/icons/?icon=delete&style=sharp) afiado é exposto como `@material-ui/icons/DeleteSharp`

Há três exceções para esta regra:

- [`3d_rotation`](https://material.io/tools/icons/?icon=3d_rotation&style=baseline) é exposto como `@material-ui/icons/ThreeDRotation`
- [`4k`](https://material.io/tools/icons/?icon=4k&style=baseline) é exposto como `@material-ui/icons/FourK`
- [`360`](https://material.io/tools/icons/?icon=360&style=baseline) é exposto como `@material-ui/icons/ThreeSixty`

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

#### Importações

- Se o seu ambiente de desenvolvimento não suporta a otimização de código (tree-shaking), a forma **recomendada** para importar ícones é a seguinte:

```jsx
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

- Se o seu ambiente de desenvolvimento suporta a otimização de código (tree-shaking) você pode importar ícones desta maneira:

```jsx
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
```

Note: Importando exportações nomeadas dessa forma, irá resultar que o código de *cada ícone* seja incluído em seu projeto, portanto não é recomendado, a menos que você configure a otimização de código ([tree-shaking](https://webpack.js.org/guides/tree-shaking/)). Isso também pode afetar o desempenho do Hot Module Reload.

### Mais ícones SVG

Procurando ainda mais SVG ícones? Há muitos projetos por aí, mas [https://materialdesignicons.com](https://materialdesignicons.com/) oferece mais de 2.000 ícones oficiais e fornecidos pela comunidade. O [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) empacota estes ícones como SvgIcons de Material-UI da mesma maneira que [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) faz para os ícones oficiais.

## Ícones

O componente `Icon` exibirá um ícone de qualquer fonte de ícone que suporte ligadura tipográfica (ligatures). Como pré-requisito, você deve incluir a fonte [Material icon](http://google.github.io/material-design-icons/#icon-font-for-the-web) no seu projeto, por exemplo, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

O componente `Icon` definirá o nome correto da classe para a fonte Material icon. Para outras fontes, você deve fornecer o nome da classe usando a propriedade `className` do componente Icon.

Para usar um ícone, simplesmente coloque o nome do ícone (font ligature) com o componente `Icon`, por exemplo:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Por padrão, um ícone herdará a cor do texto atual. Opcionalmente, você pode definir a cor do ícone usando uma das propriedades de cor do tema: `primary`, `secondary`, `action`, `erro` & `disabled`.

### Fonte Material icons

{{"demo": "pages/components/icons/Icons.js"}}

### Fonte Awesome

[Fonte Awesome](https://fontawesome.com/icons) pode ser usada com o componente `Icon` da seguinte forma:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Fonte vs SVG. Qual abordagem usar?

Ambas as abordagens funcionam bem, no entanto, existem algumas diferenças sutis, especialmente em termos de desempenho e qualidade de renderização. Sempre que possível, utlize o SVG, pois permite a divisão do código, suporta mais ícones, renderiza mais rápido e melhor.

Para maiores detalhes, você pode conferir [porque o GitHub migrou ícones de fonte para ícones SVG](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Acessibilidade

Os ícones podem transmitir todos os tipos de informações significativas, por isso é importante que eles alcancem a maior quantidade possível de pessoas. Existem dois casos de uso que você deve considerar: - **Ícones Decorativos** são usados somente para reforço visual ou de marca. Se eles forem removidos da página, os usuários ainda entenderiam e poderiam usar sua página. - **Ícones Semânticos** são aqueles que você usa para transmitir significado, em vez de apenas pura decoração. Isso inclui ícones sem texto ao lado deles utilizados como controles interativos — botões, elementos de forma, toggles, etc.

### Ícones SVG Decorativos

Se seus ícone são puramente decorativos, você já terminou! Adicionamos o atributo `aria-hidden=true` para que seus ícones sejam devidamente acessíveis (invisíveis).

### Ícones SVG Semânticos

Se o seu ícone tiver significado semântico, tudo o que você precisa fazer é configurar a propriedade `titleAccess="significado"`. Adicionamos o atributo `role="img"` e o elemento `<title>` para que seus ícones sejam acessados corretamente.

No caso de elementos interativos focalizáveis, como quando usado com um botão de ícone, você pode usar a propriedade `aria-label`:

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="Delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```

### Ícones de Fonte Decorativos

Se seus ícone são puramente decorativos, você já terminou! Adicionamos o atributo `aria-hidden=true` para que seus ícones sejam devidamente acessíveis (invisíveis).

### Ícones de Fonte Semânticos

Se os seus ícones tiverem significado semântico, você precisará fornecer uma alternativa em texto visível apenas para tecnologias visuais.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Crie um usuário</Typography>
```

### Referência

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/