---
title: Componente React para Ícones
components: Icon, SvgIcon
---

# Ícones

<p class="description">Orientação e sugestões para usar ícones com o Material-UI.</p>

Material-UI fornece suporte de ícones de três maneiras:

1. Padronizados como [ícones do Material Design](#material-icons) e exportados como componentes do React (ícones SVG).
1. Com o componente [SvgIcon](#svgicon), um wrapper React para ícones SVG customizados.
1. Com o componente [Icon](#icon-font-icons), um wrapper React para ícones de fonte customizados.

## Ícones Material

O Material Design padronizou mais de 1.100 ícones oficiais, cada um em cinco "temas" diferentes (veja abaixo). Para cada ícone SVG, exportamos o respectivo componente React do pacote @material-ui/icons. Você pode [pesquisar na lista completa destes ícones](/components/material-icons/).

### Instalação

Instale o pacote no diretório do seu projeto com:

```sh
// usando npm
npm install @material-ui/icons

// usando yarn
yarn add @material-ui/icons
```

Esses componentes usam o componente Material-UI SvgIcon para renderizar o caminho SVG para cada ícone, devido a isto, têm uma dependência-mútua na próxima versão do Material-UI.

Se você ainda não estiver usando Material-UI no seu projeto, você pode adicioná-lo com:

```sh
// utilizando o npm
npm install @material-ui/core

// utilizando o yarn
yarn add @material-ui/core
```

### Uso

Importe ícones usando uma destas duas opções:

- Opção 1:

  ```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- Opção 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

O mais seguro é a Opção 1, mas a Opção 2 pode proporcionar uma melhor experiência para o desenvolvedor. Certifique-se de seguir o guia [minimizando o tamanho do pacote](/guides/minimizing-bundle-size/#option-2) antes de usar a segunda abordagem. A configuração de um plugin Babel é recomendada.

Cada ícone também tem um "tema": Filled (padrão), Outlined, Rounded, Two tone e Sharp. Se você deseja importar o componente do ícone com um "tema" diferente do padrão, acrescente o nome do "tema" ao nome do ícone. Por exemplo, para usar o ícone `@material-ui/icons/Delete`, temos:

- Tema Filled (preenchido que é o padrão) é exportado como `@material-ui/icons/Delete`,
- Tema Outlined (contornado) é exportado como `@material-ui/icons/DeleteOutlined`,
- Tema Rounded (arredondado) é exportado como `@material-ui/icons/DeleteRounded`,
- Tema Two tone (dois tons) é exportado como `@material-ui/icons/DeleteTwoTone`,
- Tema Sharp (pontiagudo) é exportado como `@material-ui/icons/DeleteSharp`.

> Nota: A especificação Material Design nomeia os ícones usando a nomeação "snake_case" (por exemplo, `delete_forever`, `add_a_photo`), enquanto `@material-ui/icons` exporta os respectivos ícones usando a nomeação "PascalCase" (por exemplo `DeleteForever`, `AddAPhoto`). Há três exceções a essa regra de nomenclatura: `3d_rotation` exportado como `ThreeDRotation`, `4k` exportado como `FourK`e `360` exportado como `ThreeSixty`.

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

## SvgIcon

Se você precisa customizar o ícone SVG (não disponível no [conjunto padrão](/components/material-icons/) de ícones Material) você pode encapsular em um `SvgIcon`. Este componente estende o elemento nativo `<svg>`:

- Ele vem internamente com a acessibilidade.
- Os elementos SVG devem ser dimensionados para uma visualização de 24x24px, de modo que o ícone resultante possa ser usado como está, ou incluído como filho para outros componentes de Material-UI que usam ícones. (Isso pode ser customizado com o atributo `viewBox`).
- Por padrão, o componente herda a cor atual. Opcionalmente, você pode aplicar uma das cores do tema usando a propriedade `color`.

```jsx
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
```

### Cor

{{"demo": "pages/components/icons/SvgIconsColor.js"}}

### Tamanho

{{"demo": "pages/components/icons/SvgIconsSize.js"}}

### Propriedade Componente

Você pode usar o `SvgIcon` para encapsular seus ícones, mesmo que estes estejam salvos no formato `.svg`. A biblioteca [svgr](https://github.com/smooth-code/svgr) possui loaders para importar arquivos SVG e usá-los como componentes React. Por exemplo, com webpack:

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}

// ---
import StarIcon from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

Também é possível usá-lo com "url-loader" ou "file-loader". É a abordagem usada pelo Create React App.

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack', 'url-loader'],
}

// ---
import { ReactComponent as StarIcon } from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

### Bibliotecas

#### Material Design (recomendado)

Material Design padronizou mais de [1.100 ícones oficiais](#material-icons).

#### MDI

O site [materialdesignicons.com](https://materialdesignicons.com/) fornece mais de 2.000 ícones. Para o ícone desejado, copie o `path` do SVG que eles fornecem e use-o como filho do componente `SvgIcon`.

Nota: A biblioteca [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) já agrupou cada um desses ícones SVG com o componente `SvgIcon`, para que você não precise fazer isso.

## Ícone (ícones de fonte)

O componente `Icon` exibirá um ícone de qualquer fonte de ícone que suporte ligadura tipográfica (ligatures). Como pré-requisito, você deve incluir a [fonte Material icon](https://google.github.io/material-design-icons/#icon-font-for-the-web) no seu projeto, por exemplo, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

O componente `Icon` definirá automaticamente o nome da classe para a fonte Material icon. Para outras fontes, você deve fornecer o nome da classe usando a propriedade `className` do componente ícone.

Para usar um ícone, simplesmente coloque o nome do ícone (font ligature) com o componente `Icon`, por exemplo:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Por padrão, um ícone herdará a cor do texto atual. Opcionalmente, você pode definir a cor do ícone usando uma das propriedades de cor do tema: `primary`, `secondary`, `action`, `erro` & `disabled`.

### Fonte Material icons

{{"demo": "pages/components/icons/Icons.js"}}

### Fonte Awesome

A [fonte Awesome](https://fontawesome.com/icons) pode ser usada com o componente `Icon` da seguinte forma:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Fonte vs SVG. Qual abordagem usar?

Ambas as abordagens funcionam bem, no entanto, existem algumas diferenças sutis, especialmente em termos de desempenho e qualidade de renderização. Sempre que possível, utilize o SVG, pois permite a divisão do código, suporta mais ícones, renderiza mais rápido e melhor.

Para maiores detalhes, você pode conferir [porque o GitHub migrou ícones de fonte para ícones SVG](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Acessibilidade

Os ícones podem transmitir todos os tipos de informações significativas, por isso é importante que eles alcancem a maior quantidade possível de pessoas. Há dois casos de uso que você deve considerar:
- **Ícones decorativos** são somente usados para reforço visual ou de marca. Se eles forem removidos da página, os usuários ainda entenderiam e poderiam usar sua página.
- **Ícones semânticos** são aqueles que você usa para transmitir significado, em vez de apenas pura decoração. Isso inclui ícones sem texto ao lado, utilizados como controles interativos — botões, elementos de forma, toggles, etc.

### Ícones SVG decorativos

Se seus ícones são puramente decorativos, você já terminou! O atributo `aria-hidden=true` foi adicionado para que seus ícones estejam adequadamente acessíveis (invisíveis).

### Ícones SVG semânticos

Se o seu ícone tiver significado semântico, tudo o que você precisa fazer é configurar a propriedade `titleAccess="significado"`. O atributo `role="img"` e o elemento `<title>` foram adicionados para que seus ícones sejam acessados corretamente.

No caso de elementos interativos focalizáveis, como quando usado com um botão de ícone, você pode usar a propriedade `aria-label`:

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="deletar">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```

### Ícones de Fonte decorativos

Se seus ícones são puramente decorativos, você já terminou! O atributo `aria-hidden=true` foi adicionado para que seus ícones estejam adequadamente acessíveis (invisíveis).

### Ícones de Fonte semânticos

Se os seus ícones tiverem significado semântico, você precisará fornecer uma alternativa em texto visível apenas para tecnologias assistivas.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Crie um usuário</Typography>
```

### Referência

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
