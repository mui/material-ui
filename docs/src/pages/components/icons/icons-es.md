---
title: React Icon Component
components: Icon, SvgIcon
---

# Iconos

<p class="description">Guía y sugerencias para usar iconos con Material-UI.</p>

Material-UI da soporte para iconos de tres maneras:

1. [Iconos de Material Design](#material-icons) estandarizados y exportados como componentes de React (iconos SVG).
1. Con el componente [SvgIcon](#svgicon), un envoltorio de React para iconos SVG personalizados.
1. Con el componente [Icono](#icon-font-icons), un envoltorio de React para iconos de fuentes personalizados.

## Material Icons

Material Design ha estandarizado más de 1.100 iconos oficiales, cada uno en cinco "temas" diferentes (ver abajo). Para cada icono de SVG, exportamos el componente de React respectivo desde el paquete @material-ui/iconos. Puedes [buscar la lista completa de estos iconos](/components/material-icons/).

### Instalación

Instala el paquete en el directorio de tu proyecto con:

```sh
// usando npm
npm install @material-ui/icons

// usando yarn
yarn add @material-ui/icons
```

Estos componentes utilizan el componente SvgIcon de Material-UI para representar la ruta SVG para cada icono, y por lo tanto tienen una dependencia entre pares de la siguiente versión de Material-UI.

Si aún no estás usando Material-UI en tu proyecto, puedes añadirlo con:

```sh
// usando npm
npm install @material-ui/core

// usando yarn
yarn add @material-ui/core
```

### Implementación

Importa iconos usando una de estas dos opciones:

- Opción 1:

  ```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- Opción 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

La más segura es la Opción 1, pero la Opción 2 puede producir la mejor experiencia para el desarrollador. Make sure you follow the [minimizing bundle size guide](/guides/minimizing-bundle-size/#option-2) before using the second approach. La configuración de un plugin de Babel es recomendado.

Cada icono también tiene un "tema": Filled (por defecto), Outlined, Rounded, Two tone y Sharp. Si desea importar el componente de icono con un tema distinto al predeterminado, añada el nombre del tema al nombre del icono. Por ejemplo el `@material-ui/icons/Delete` icono con:

- El tema Filled (por defecto) se exporta como `@material-ui/icons/Delete`,
- El tema Outlined se exporta como `@material-ui/icons/DeleteOutlined`,
- El tema Rounded se exporta como `@material-ui/icons/DeleteRounded`,
- El tema Twotone se exporta como `@material-ui/icons/DeleteTwoTone`,
- El tema Sharp se exporta como `@material-ui/icons/DeleteSharp`.

> Nota: La especificación de Material Design nombra los iconos usando el nombre "snake_case" (por ejemplo `delete_forever`, `add_a_photo`), mientras `@material-ui/icons` exporta los iconos respectivos usando el nombre "PascalCase" (por ejemplo `DeleteForever`, `AddAPhoto`). Hay tres excepciones a esta regla de nomenclatura: `3d_rotation` exportada como `ThreeDRotation`, `4k` exportado como `FourK`, y `360` exportado como `ThreeSixty`.

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

## SvgIcon

Si necesita un icono SVG personalizado (no disponible en los iconos de Material [por defecto](/components/material-icons/)) puede utilizar el envoltorio `SvgIcon`. Este componente extiende el elemento nativo `<svg>`:

- Viene con accesibilidad integrada.
- Los elementos SVG deben ser escalados para una vista de 24x24px, por lo que el icono resultante puede ser usado tal cual, o incluido como hijo para otros componentes de Material-UI que usan iconos. (Esto puede personalizarse con el atributo `viewBox`).
- Por defecto, el componente hereda el color actual. Opcionalmente, puedes aplicar uno de los colores del tema usando el accesorio `color`.

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

### Tamaño

{{"demo": "pages/components/icons/SvgIconsSize.js"}}

### Component prop

Puede utilizar el envoltorio `SvgIcon` incluso si sus iconos se guardan en el formato `.svg`. [svgr](https://github.com/smooth-code/svgr) tiene cargadores para importar archivos SVG y usarlos como componentes React. Por ejemplo, con webpack:

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

También es posible usarlo con "url-loader" o "file-loader". Es el método utilizado por Create React App.

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

Material Design ha estandarizado más de [1,100 iconos oficiales](#material-icons).

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) proporciona más de 2.000 iconos. Para el icono deseado, copia la ruta SVG `` que proporcionan, y úsalo como el hijo del componente `SvgIcon`.

Nota: [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) ya ha envuelto cada uno de estos iconos SVG con el componente `SvgIcon`, para que no tenga que hacerlo usted mismo.

## Icono (iconos de fuente)

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

## Fuente vs SVG. Qué método usar?

Ambos enfoques funcionan bien, sin embargo, existen algunas diferencias sutiles, especialmente en términos de rendimiento y calidad de representación. Siempre que sea posible, se prefiere SVG, ya que permite la división de código, admite más iconos, se procesa más rápido y mejor.

Para más detalles, puedes echar un vistazo a [por qué GitHub migró de iconos de fuentes a iconos SVG](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Accesibilidad

Los iconos pueden transmitir todo tipo de información significativa, por lo que es importante que alcancen a la mayor cantidad de personas posible. Hay dos casos de uso que querrás considerar:
- **Los iconos decorativos** solo se utilizan para el refuerzo visual o de marca. Si se eliminaran de la página, los usuarios aún entenderían y podrían usar su página.
- **Los Iconos Semánticos** son los que se usan para transmitir un significado, en lugar de una decoración pura. Esto incluye iconos, sin texto junto a ellos, utilizados como controles interactivos — botones, elementos de formularios, conmutadores, etc.

### Iconos SVG Decorativos

Si tus iconos son puramente decorativos, ya está hecho! El atributo `aria-hidden=true` se agrega para que sus iconos sean correctamente accesibles (invisibles).

### Iconos SVG Semánticos

Si el icono tiene un significado semántico, todo lo que se necesita hacer es usar la propiedad `titleAccess="meaning"`. El atributo `role="img"` y el elemento `<title>` se añaden para que sus iconos sean accesibles.

En el caso de los elementos interactivos a los que se puede hacer foco, como cuando se usa con un botón icono, se puede utilizar la propiedad `aria-label`:

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

Si tus iconos son puramente decorativos, ya está hecho! El atributo `aria-hidden=true` se agrega para que sus iconos sean correctamente accesibles (invisibles).

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
