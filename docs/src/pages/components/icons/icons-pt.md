---
title: Componente React para Ícones
components: Icon, SvgIcon
githubLabel: 'components: SvgIcon'
materialDesign: https://material.io/design/iconography/system-icons.html
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

These components use the Material-UI `SvgIcon` component to render the SVG path for each icon, and so have a peer-dependency on `@materialui/core`.

If you aren't already using Material-UI in your project, you can add it with:

```sh
// usando npm
npm install @material-ui/core

// usando yarn
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

The safest for bundle size is Option 1, but some developers prefer Option 2. Certifique-se de seguir o guia [minimizando o tamanho do pacote](/guides/minimizing-bundle-size/#option-2) antes de usar a segunda abordagem.

Each Material icon also has a "theme": Filled (default), Outlined, Rounded, Two-tone, and Sharp. To import the icon component with a theme other than the default, append the theme name to the icon name. Por exemplo, para usar o ícone `@material-ui/icons/Delete`, temos:

- Tema Filled (preenchido que é o padrão) é exportado como `@material-ui/icons/Delete`,
- Tema Outlined (contornado) é exportado como `@material-ui/icons/DeleteOutlined`,
- Tema Rounded (arredondado) é exportado como `@material-ui/icons/DeleteRounded`,
- Tema Two tone (dois tons) é exportado como `@material-ui/icons/DeleteTwoTone`,
- Tema Sharp (pontiagudo) é exportado como `@material-ui/icons/DeleteSharp`.

> Nota: A especificação Material Design nomeia os ícones usando a nomeação "snake_case" (por exemplo, `delete_forever`, `add_a_photo`), enquanto `@material-ui/icons` exporta os respectivos ícones usando a nomeação "PascalCase" (por exemplo `DeleteForever`, `AddAPhoto`). Há três exceções a essa regra de nomenclatura: `3d_rotation` exportado como `ThreeDRotation`, `4k` exportado como `FourK`e `360` exportado como `ThreeSixty`.

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

### Testando

For testing purposes, each icon exposed from `@material-ui/icons` has a `data-testid` attribute with the name of the icon. Por exemplo:

```jsx
import DeleteIcon from '@material-ui/icons/Delete';
```

has the following attribute once mounted:

```html
<svg data-testid="DeleteIcon"></svg>
```

## SvgIcon

If you need a custom SVG icon (not available in the [Material Icons](/components/material-icons/)) you can use the `SvgIcon` wrapper. Este componente estende o elemento nativo `<svg>`:

- Ele vem internamente com a acessibilidade.
- SVG elements should be scaled for a 24x24px viewport so that the resulting icon can be used as is, or included as a child for other Material-UI components that use icons. (Isso pode ser customizado com o atributo `viewBox`).
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

Também é possível usá-lo com "url-loader" ou "file-loader". This is the approach used by Create React App.

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

### createSvgIcon

The `createSvgIcon` utility component is used to create the [Material icons](#material-icons). It can be used to wrap an SVG path with an SvgIcon component.

```jsx
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);
```

{{"demo": "pages/components/icons/CreateSvgIcon.js"}}

### Fonte Awesome

If you find that there are layout issues when using FontAwesomeIcon from `@fortawesome/react-fontawesome`, you can try passing the Font Awesome SVG data directly to SvgIcon.

[Fonte Awesome](https://fontawesome.com/icons) pode ser usada com o componente `Icon` da seguinte forma:

Nota: [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) já agrupou cada um desses ícones SVG com o componente `SvgIcon`, para que você não precise fazer isso.

FontAwesomeIcon's `fullWidth` prop can also be used to approximate the correct dimensions, but it isn't perfect.

### Fonte Material icons

#### MDI

O site [materialdesignicons.com](https://materialdesignicons.com/) fornece mais de 2.000 ícones. For the wanted icon, copy the SVG `path` they provide, and use it as the child of the `SvgIcon` component, or with `createSvgIcon()`.

Nota: A biblioteca [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) já agrupou cada um desses ícones SVG com o componente `SvgIcon`, para que você não precise fazer isso.

## Ícone (ícones de fonte)

O componente `Icon` exibirá um ícone de qualquer fonte de ícone que suporte ligadura tipográfica (ligatures). Como pré-requisito, você deve incluir a [fonte Material icon](https://google.github.io/material-design-icons/#icon-font-for-the-web) no seu projeto, por exemplo, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` will set the correct class name for the Material Icons font. `Icon` definirá o nome correto da classe para a fonte do ícone Material.

Para usar um ícone, simplesmente coloque o nome do ícone (font ligature) com o componente `Icon`, por exemplo:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Por padrão, um ícone herdará a cor do texto atual. Opcionalmente, você pode definir a cor do ícone usando uma das propriedades de cor do tema: `primary`, `secondary`, `action`, `erro` & `disabled`.

### Fonte Material icons

{{"demo": "pages/components/icons/Icons.js"}}

### Fonte Awesome

[Font Awesome](https://fontawesome.com/icons) can be used with the `Icon` component as follows:

{{"demo": "pages/components/icons/FontAwesomeIcon.js"}}

Note that the Font Awesome icons weren't designed like the Material Design icons (compare the two previous demos). The fa icons are cropped to use all the space available. You can adjust for this with a global override:

```jsx
const theme = createMuiTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          boxSizing: 'content-box',
          padding: 3,
          fontSize: '1.125rem',
        },
      },
    },
  },
});
```

{{"demo": "pages/components/icons/FontAwesomeIconSize.js"}}

## Fonte vs SVG. Qual abordagem usar?

Both approaches work fine, however there are some subtle differences, especially in terms of performance and rendering quality. Whenever possible SVG is preferred as it allows code splitting, supports more icons, and renders faster and better.

For more details, take a look at [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Acessibilidade

Icons can convey all sorts of meaningful information, so it’s important to ensure they are accessible where appropriate. Há dois casos de uso que você deve considerar:

- **Decorative icons** that are only being used for visual or branding reinforcement. Se eles forem removidos da página, os usuários ainda entenderiam e poderiam usar sua página.
- **Semantic icons** are ones that you’re using to convey meaning, rather than just pure decoration. This includes icons without text next to them that are used as interactive controls — buttons, form elements, toggles, etc.

### Decorative icons

Se seus ícones são puramente decorativos, você já terminou! O atributo `aria-hidden=true` foi adicionado para que seus ícones estejam adequadamente acessíveis (invisíveis).

### Semantic icons

#### Semantic SVG icons

You should include the `titleAccess` prop with a meaningful value. The `role="img"` attribute and the `<title>` element are added so that your icons are correctly accessible.

In the case of focusable interactive elements, for example when used with an icon button, you can use the `aria-label` prop:

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

#### Semantic font icons

You need to provide a text alternative that is only visible to assistive technologies.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Crie um usuário</Typography>
```

#### Referência

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
