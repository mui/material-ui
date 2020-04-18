---
title: React Icon Component
components: Icon, SvgIcon
---

# Iconos

<p class="description">Guía y sugerencias para usar iconos con Material-UI.</p>

Material-UI provides icons support in three ways:

1. Standardized [Material Design icons](#material-icons) exported as React components (SVG icons).
1. With the [SvgIcon](#svgicon) component, a React wrapper for custom SVG icons.
1. With the [Icon](#icon-font-icons) component, a React wrapper for custom font icons.

## Material Icons

Material Design has standardized over 1,100 official icons, each in five different "themes" (see below). For each SVG icon, we export the respective React component from the @material-ui/icons package. You can [search the full list of these icons](/components/material-icons/).

### Instalación

Instala el paquete en el directorio de tu proyecto con:

```sh
// usando npm
npm install @material-ui/icons

// usando yarn
yarn add @material-ui/icons
```

Estos componentes utilizan el componente SvgIcon de Material-UI para representar la ruta SVG para cada icono, y por lo tanto tienen una dependencia entre pares de la siguiente versión de Material-UI.

If you are not already using Material-UI in your project, you can add it with:

```sh
// usando npm
npm install @material-ui/core

// usando yarn
yarn add @material-ui/core
```

### Implementación

Import icons using one of these two options:

- Option 1:

  ```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- Option 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

The safest is Option 1 but Option 2 can yield the best developer experience. Make sure you follow the [minimizing bundle size guide](/guides/minimizing-bundle-size/#option-2) before using the second approach. The configuration of a Babel plugin is encouraged.

Each icon also has a "theme": Filled (default), Outlined, Rounded, Two tone and Sharp. If you want to import the icon component with a theme other than default, append the theme name to the icon name. For example `@material-ui/icons/Delete` icon with:

- Filled theme (default) is exported as `@material-ui/icons/Delete`,
- Outlined theme is exported as `@material-ui/icons/DeleteOutlined`,
- Rounded theme is exported as `@material-ui/icons/DeleteRounded`,
- Twotone theme is exported as `@material-ui/icons/DeleteTwoTone`,
- Sharp theme is exported as `@material-ui/icons/DeleteSharp`.

> Note: The Material Design specification names the icons using "snake_case" naming (for example `delete_forever`, `add_a_photo`), while `@material-ui/icons` exports the respective icons using "PascalCase" naming (for example `DeleteForever`, `AddAPhoto`). There are three exceptions to this naming rule: `3d_rotation` exported as `ThreeDRotation`, `4k` exported as `FourK`, and `360` exported as `ThreeSixty`.

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

## SvgIcon

If you need a custom SVG icon (not available in the Material Icons [default set](/components/material-icons/)) you can use the `SvgIcon` wrapper. This component extends the native `<svg>` element:

- It comes with built-in accessibility.
- SVG elements should be scaled for a 24x24px viewport, so the resulting icon can be used as is, or included as a child for other Material-UI components that use icons. (This can be customized with the `viewBox` attribute).
- By default, the component inherits the current color. Optionally, you can apply one of the theme colors using the `color` prop.

```jsx
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
```

### Color

{{"demo": "pages/components/icons/SvgIconsColor.js"}}

### Size

{{"demo": "pages/components/icons/SvgIconsSize.js"}}

### Component prop

You can use the `SvgIcon` wrapper even if your icons are saved the `.svg` format. [svgr](https://github.com/smooth-code/svgr) has loaders to import svg files and use them as React components. For instance, with webpack:

**webpack.config.js**
```js
{
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}
```

```jsx
import StarIcon from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

### Libraries

#### Material Design (recommended)

Material Design has standardized over [1,100 official icons](#material-icons).

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) provides over 2,000 icons. For the wanted icon, copy the SVG `path` they provide, and use it as the child of the `SvgIcon` component.

Note: [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) has already wrapped each of these SVG icons with the `SvgIcon` component, so you don't have to do it yourself.

## Icon (Font icons)

El componente `Icon` mostrará iconos de cualquier fuente compatible con ligaduras. Como requisito previo, se debe incluir una, como la [fuente de iconos Material](https://google.github.io/material-design-icons/#icon-font-for-the-web) en el proyecto, por ejemplo, vía Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` will set the correct class name for the Material icon font. For other fonts, you must supply the class name using the Icon component's `className` property.

Para usar un icono, simplemente se envuelve el nombre del icono (ligadura de la fuente) con el componente `Icono`, por ejemplo:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Por defecto, un Icono heredará el color del texto actual. Opcionalmente, se puede cambiar el color usando uno de los atributos del color del tema: `primary`, `secondary`, `action`, `error` & `disabled`.

### Fuente de iconos Material

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) se puede utilizar con el componente `Icon` siguiente manera:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Font vs SVG. Which approach to use?

Ambos enfoques funcionan bien, sin embargo, existen algunas diferencias sutiles, especialmente en términos de rendimiento y calidad de representación. Siempre que sea posible, se prefiere SVG, ya que permite la división de código, admite más iconos, se procesa más rápido y mejor.

For more details, you can check out [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Accesibilidad

Los iconos pueden transmitir todo tipo de información significativa, por lo que es importante que alcancen a la mayor cantidad de personas posible. There are two use cases you’ll want to consider:
- **Decorative Icons** are only being used for visual or branding reinforcement. Si se eliminaran de la página, los usuarios aún entenderían y podrían usar su página.
- **Los Iconos Semánticos** son los que se usan para transmitir un significado, en lugar de una decoración pura. Esto incluye iconos, sin texto junto a ellos, utilizados como controles interactivos — botones, elementos de formularios, conmutadores, etc.

### Iconos SVG Decorativos

If your icons are purely decorative, you’re already done! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

### Iconos SVG Semánticos

Si el icono tiene un significado semántico, todo lo que se necesita hacer es usar la propiedad `titleAccess="meaning"`. The `role="img"` attribute and the `<title>` element are added so that your icons are properly accessible.

En el caso delos elementos interactivos a los que se puede hacer foco, como cuando se usa con un botón icono, se puede utilizar la propiedad `aria-label`:

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```

### Iconos de Fuente Decorativos

If your icons are purely decorative, you’re already done! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

### Iconos de Fuente Semánticos

Si los iconos tienen significado semántico, se necesita proporcionar una alternativa de texto sólo visible a las tecnologías de asistencia.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Crear ususario</Typography>
```

### Referencia

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
