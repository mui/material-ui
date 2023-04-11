---
product: material-ui
title: Componente React para Ícones
components: Icon, SvgIcon
githubLabel: 'components: SvgIcon'
materialDesign: https://m2.material.io/design/iconography/system-icons.html
---

# Ícones

<p class="description">Orientação e sugestões para usar ícones com o Material-UI.</p>

Material-UI fornece suporte de ícones de três maneiras:

1. Standardized [Material Icons](#material-svg-icons) exported as React components (SVG icons).
1. Com o componente [SvgIcon](#svgicon), um wrapper React para ícones SVG customizados.
1. Com o componente [Icon](#icon-font-icons), um wrapper React para ícones de fonte customizados.

## Material SVG icons

Google has created over 2,000 official Material icons, each in five different "themes" (see below). Para cada ícone SVG, exportamos o respectivo componente React do pacote @material-ui/icons. You can [search the full list of these icons](/material-ui/material-icons/).

### Instalação

To install and save in your `package.json` dependencies, run the command below using **npm**:

```sh
npm install @mui/icons-material
```

Or **yarn**:

```sh
yarn add @mui/icons-material
```

These components use the MUI `SvgIcon` component to render the SVG path for each icon, and so have a peer-dependency on `@mui/material`.

If you aren't already using Material UI in your project, you can add it following the [installation guide](/material-ui/getting-started/installation/).

### Uso

Import icons using one of these two options:

- Opção 1:

  ```jsx
  import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
  import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
  ```

- Opção 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
  ```

The safest for bundle size is Option 1, but some developers prefer Option 2. Make sure you follow the [minimizing bundle size guide](/material-ui/guides/minimizing-bundle-size/#option-two-use-a-babel-plugin) before using the second approach.

Each Material icon also has a "theme": Filled (default), Outlined, Rounded, Two-tone, and Sharp. To import the icon component with a theme other than the default, append the theme name to the icon name. For example `@mui/icons-material/Delete` icon with:

- Tema Filled (preenchido que é o padrão) é exportado como `@material-ui/icons/Delete`,
- Tema Outlined (contornado) é exportado como `@material-ui/icons/DeleteOutlined`,
- Tema Rounded (arredondado) é exportado como `@material-ui/icons/DeleteRounded`,
- Tema Two tone (dois tons) é exportado como `@material-ui/icons/DeleteTwoTone`,
- Tema Sharp (pontiagudo) é exportado como `@material-ui/icons/DeleteSharp`.

:::info
Note: The Material Design guidelines name the icons using "snake_case" naming (for example `delete_forever`, `add_a_photo`), while `@mui/icons-material` exports the respective icons using "PascalCase" naming (for example `DeleteForever`, `AddAPhoto`). There are three exceptions to this naming rule: `3d_rotation` exported as `ThreeDRotation`, `4k` exported as `FourK`, and `360` exported as `ThreeSixty`.
:::

{{"demo": "SvgMaterialIcons.js"}}

### Testando

For testing purposes, each icon exposed from `@mui/icons-material` has a `data-testid` attribute with the name of the icon. For instance:

```jsx
import DeleteIcon from '@mui/icons-material/Delete';
```

has the following attribute once mounted:

```html
<svg data-testid="DeleteIcon"></svg>
```

## SvgIcon

If you need a custom SVG icon (not available in the [Material Icons](/material-ui/material-icons/)) you can use the `SvgIcon` wrapper. This component extends the native `<svg>` element:

- Ele vem internamente com a acessibilidade.
- Os elementos SVG devem ser dimensionados para uma visualização de 24x24px, de modo que o ícone resultante possa ser usado como está, ou incluído como filho para outros componentes de Material-UI que usam ícones. This can be customized with the `viewBox` attribute. To inherit the `viewBox` value from the original image, the `inheritViewBox` prop can be used.
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

{{"demo": "SvgIconsColor.js"}}

### Tamanho

{{"demo": "SvgIconsSize.js"}}

### Propriedade Componente

You can use the `SvgIcon` wrapper even if your icons are saved in the `.svg` format. [svgr](https://github.com/gregberge/svgr) has loaders to import SVG files and use them as React components. For example, with webpack:

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}

// ---
import StarIcon from './star.svg';

<SvgIcon component={StarIcon} inheritViewBox />
```

It's also possible to use it with "url-loader" or "file-loader". This is the approach used by Create React App.

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack', 'url-loader'],
}

// ---
import { ReactComponent as StarIcon } from './star.svg';

<SvgIcon component={StarIcon} inheritViewBox />
```

### createSvgIcon

The `createSvgIcon` utility component is used to create the [Material Icons](#material-icons). It can be used to wrap an SVG path with an SvgIcon component.

```jsx
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);
```

{{"demo": "CreateSvgIcon.js"}}

### Fonte Awesome

If you find that there are layout issues when using FontAwesomeIcon from `@fortawesome/react-fontawesome`, you can try passing the Font Awesome SVG data directly to SvgIcon.

Below is a comparison of the `FontAwesomeIcon` component and a wrapped `SvgIcon` component.

{{"demo": "FontAwesomeSvgIconDemo.js"}}

FontAwesomeIcon's `fullWidth` prop can also be used to approximate the correct dimensions, but it isn't perfect.

### Fonte Material icons

#### MDI

[materialdesignicons.com](https://pictogrammers.com/library/mdi/) provides over 2,000 icons. For the wanted icon, copy the SVG `path` they provide, and use it as the child of the `SvgIcon` component, or with `createSvgIcon()`.

Note: [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) has already wrapped each of these SVG icons with the `SvgIcon` component, so you don't have to do it yourself.

## Ícone (ícones de fonte)

The `Icon` component will display an icon from any icon font that supports ligatures. As a prerequisite, you must include one, such as the [Material Icons font](https://google.github.io/material-design-icons/#icon-font-for-the-web) in your project. To use an icon simply wrap the icon name (font ligature) with the `Icon` component, for example:

```jsx
import Icon from '@mui/material/Icon';

<Icon>star</Icon>;
```

By default, an Icon will inherit the current text color. Optionally, you can set the icon color using one of the theme color properties: `primary`, `secondary`, `action`, `error` & `disabled`.

### Font Material Icons

`Icon` will by default set the correct base class name for the Material Icons font (filled variant). All you need to do is load the font, for instance, via Google Web Fonts:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

{{"demo": "Icons.js"}}

### Fonte customizada

For other fonts, you can customize the baseline class name using the `baseClassName` prop. For instance, you can display two-tone icons with Material Design:

```jsx
import Icon from '@mui/material/Icon';

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Material+Icons+Two+Tone"
  // Import the two tones MD variant                           ^^^^^^^^
/>;
```

{{"demo": "TwoToneIcons.js"}}

#### Nome da classe base global

Modifying the `baseClassName` prop for each component usage is repetitive. You can change the default prop globally with the theme

```js
const theme = createTheme({
  components: {
    MuiIcon: {
      defaultProps: {
        // Replace the `material-icons` default value.
        baseClassName: 'material-icons-two-tone',
      },
    },
  },
});
```

Then, you can use the two-tone font directly:

```jsx
<Icon>add_circle</Icon>
```

### Fonte Awesome

[Font Awesome](https://fontawesome.com/icons) can be used with the `Icon` component as follows:

{{"demo": "FontAwesomeIcon.js"}}

Note that the Font Awesome icons weren't designed like the Material Icons (compare the two previous demos). The fa icons are cropped to use all the space available. You can adjust for this with a global override:

```js
const theme = createTheme({
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

{{"demo": "FontAwesomeIconSize.js"}}

## Fonte vs SVG. Qual abordagem usar?

Both approaches work fine, however there are some subtle differences, especially in terms of performance and rendering quality. Whenever possible SVG is preferred as it allows code splitting, supports more icons, and renders faster and better.

For more details, take a look at [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Acessibilidade

Icons can convey all sorts of meaningful information, so it's important to ensure they are accessible where appropriate. There are two use cases you'll want to consider:

- **Ícones decorativos** que são usados apenas para reforço visual ou de marca. Se eles forem removidos da página, os usuários ainda entenderiam e poderiam usar sua página.
- **Semantic icons** are ones that you're using to convey meaning, rather than just pure decoration. Isso inclui ícones sem texto ao lado deles que são usados como controles interativos — botões, elementos de forma, toggles, etc.

### Ícones decorativos

If your icons are purely decorative, you're already done! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

### Ícones semânticos

#### Ícones SVG semânticos

You should include the `titleAccess` prop with a meaningful value. The `role="img"` attribute and the `<title>` element are added so that your icons are correctly accessible.

In the case of focusable interactive elements, for example when used with an icon button, you can use the `aria-label` prop:

```jsx
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

// ...

<IconButton aria-label="delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>;
```

#### Ícones de fonte semânticos

You need to provide a text alternative that is only visible to assistive technologies.

```jsx
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import { visuallyHidden } from '@mui/utils';

// ...

<Icon>add_circle</Icon>
<Box component="span" sx={visuallyHidden}>Create a user</Box>
```

#### Referência

- https://www.tpgi.com/using-aria-enhance-svg-accessibility/
