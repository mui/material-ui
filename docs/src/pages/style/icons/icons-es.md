---
components: Icon, SvgIcon
---
# Iconos

<p class="description">Dirección y sugerencias para usar iconos con Material-UI.</p>

Un [icono de sistema](https://material.io/design/iconography/system-icons.html) o icono de IU, representa una acción, un archivo, un dispositivo o un directorio. Los iconos del sistema también se usan para representar acciones comunes como borrar, imprimir y guardar, y comúnmente se encuentran en los appbar, barras de herramientas, botones y listas. Google ha proporcionado un conjunto de [Material icons](https://material.io/tools/icons/?style=baseline) que van conformes a estas normas.

Material-UI proporciona dos componentes para renderizar iconos de sistema: `SvgIcon` para renderizar vectores SVG, e `Icon` para renderizar iconos de fuente.

## Iconos SVG

El componente `SvgIcon` usa un elemento SVG `path` como su hijo y lo convierte en un componente React que muestra el vector, y permite que el icono sea personalizado y que responda a eventos del mouse. La escala de los elementos SVG se debe modificar para estar conformes a un área de 24x24px.

El icono que se produce puede ser usado tal como es, o incluido como un hijo de otros componentes de Material-UI que usan iconos. Por defecto, un Icono heredará el color del texto actual. Opcionalmente, puedes cambiar el color usando uno de los atributos del color del tema: `primary`, `secondary`, `action`, `error` & `disabled`.

{{"demo": "pages/style/icons/SvgIcons.js"}}

### Iconos de Material SVG

Es interesante tener los cimientos para implementar iconos personalizados, pero qué hay de iconos predeterminados? Nosotros proporcionamos otro paquete npm, [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons), que incluye más de un mil de los [Material icons](https://material.io/tools/icons/?style=baseline) oficiales convertidos en componentes `SvgIcon`.

<a href="https://material.io/tools/icons/?icon=3d_rotation&style=baseline">
  <img src="/static/images/icons/icons.png" alt="Official material icons" style="width: 566px" />
</a>

#### Implementación

Puedes usar [material.io/tools/icons](https://material.io/tools/icons/?style=baseline) para encontrar un icono específico. Al importar un icono, ten presente que los nombres de los iconos son en forma `PascalCase`, por ejemplo:

- [`delete`](https://material.io/tools/icons/?icon=delete&style=baseline) está disponible como `@material-ui/icons/Delete`
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) está disponible como `@material-ui/icons/DeleteForever`

Para iconos con *"tema"*, adjunta el nombre del tema al nombre del icono. Por ejemplo:

- El icono [`delete`](https://material.io/tools/icons/?icon=delete&style=outline) Outlined está disponible como `@material-ui/icons/DeleteOutlined`
- El icono [`delete`](https://material.io/tools/icons/?icon=delete&style=rounded) Rounded está disponible como `@material-ui/icons/DeleteRounded`
- El icono [`delete`](https://material.io/tools/icons/?icon=delete&style=twotone) Two Tone está disponible como `@material-ui/icons/DeleteTwoTone`
- El icono [`delete`](https://material.io/tools/icons/?icon=delete&style=sharp) Sharp está disponible como `@material-ui/icons/DeleteSharp`

Hay tres excepciones a esta regla:

- [`3d_rotation`](https://material.io/tools/icons/?icon=3d_rotation&style=baseline) está disponible como `@material-ui/icons/ThreeDRotation`
- [`4k`](https://material.io/tools/icons/?icon=4k&style=baseline) está disponible como `@material-ui/icons/FourK`
- [`360`](https://material.io/tools/icons/?icon=360&style=baseline) está disponible como `@material-ui/icons/ThreeSixty`

{{"demo": "pages/style/icons/SvgMaterialIcons.js"}}

#### Importaciones

- If your environment doesn't support tree-shaking, the **recommended** way to import the icons is the following:

```jsx
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

- If your environment support tree-shaking you can also import the icons this way:

```jsx
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
```

Note: Importing named exports in this way will result in the code for *every icon* being included in your project, so is not recommended unless you configure [tree-shaking](https://webpack.js.org/guides/tree-shaking/). It may also impact Hot Module Reload performance.

### Más iconos SVG

Buscando aun más iconos SVG? There are a lot of projects out there, but [https://materialdesignicons.com](https://materialdesignicons.com/) provides over 2,000 official and community provided icons. [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) packages these icons as Material-UI SvgIcons in much the same way as [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) does for the official icons.

## Iconos de fuente

The `Icon` component will display an icon from any icon font that supports ligatures. As a prerequisite, you must include one, such as the [Material icon font](http://google.github.io/material-design-icons/#icon-font-for-the-web) in your project, for instance, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

`Icon` will set the correct class name for the Material icon font. For other fonts, you must supply the class name using the Icon component's `className` property.

To use an icon simply wrap the icon name (font ligature) with the `Icon` component, for example:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Por defecto, un Icono heredará el color del texto actual. Opcionalmente, puedes cambiar el color usando uno de los atributos del color del tema: `primary`, `secondary`, `action`, `error` & `disabled`.

### Font Material icons

{{"demo": "pages/style/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) can be used with the `Icon` component as follow:

{{"demo": "pages/style/icons/FontAwesome.js", "hideEditButton": true}}

## Font vs SVG. Which approach to use?

Both approaches work fine, however, there are some subtle differences, especially in terms of performance and rendering quality. Whenever possible SVG is preferred as it allows code splitting, supports more icons, renders faster and better.

For more details, you can check out [why GitHub migrated](https://blog.github.com/2016-02-22-delivering-octicons-with-svg/) from font icons to SVG icons.

## Accessibility

Icons can convey all sorts of meaningful information, so it’s important that they reach the largest amount of people possible. There are two use cases you’ll want to consider: - **Decorative Icons** are only being used for visual or branding reinforcement. If they were removed from the page, users would still understand and be able to use your page. - **Semantic Icons** are ones that you’re using to convey meaning, rather than just pure decoration. This includes icons without text next to them used as interactive controls — buttons, form elements, toggles, etc.

### Decorative SVG Icons

If your icons are purely decorative, you’re already done! We add the `aria-hidden=true` attribute so that your icons are properly accessible (invisible).

### Semantic SVG Icons

If your icon has semantic meaning, all you need to do is throw in a `titleAccess="meaning"` property. We add the `role="img"` attribute and the `<title>` element so that your icons are properly accessible.

In the case of focusable interactive elements, like when used with an icon button, you can use the `aria-label` property:

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

### Decorative Font Icons

If your icons are purely decorative, you’re already done! We add the `aria-hidden=true` attribute so that your icons are properly accessible (invisible).

### Semantic Font Icons

If your icons have semantic meaning, you need to provide a text alternative only visible to assistive technologies.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Create a user</Typography>
```

### Reference

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/