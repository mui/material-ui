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

É interessante ter as ferramentas necessárias para implementar ícones customizados, mas com quais predefinições? [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) is an npm package that includes the 1,000+ official [Material icons](https://material.io/tools/icons/?style=baseline) converted to `SvgIcon` components.

<a href="/components/material-icons/">
  <img src="/static/images/icons/icons.png" alt="Material oficial de ícones" style="width: 566px" />
</a>

#### Uso

You can use our [internal search](/components/material-icons/) or [material.io/tools/icons](https://material.io/tools/icons/?style=baseline) to find a specific icon. Ao importar um ícone, tenha em mente que os nomes dos ícones são `PascalCase`, por exemplo:

- [`delete`](https://material.io/tools/icons/?icon=delete&style=baseline) é exposto como `@material-ui/icons/Delete`
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) é exposto como `@material-ui/icons/DeleteForever`

For "themed" icons, append the theme name to the icon name. Por exemplo, com o

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

You can import the icons with one of these two options:

- Option n°1:

```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```
- Option n2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

The safest option is n°1 but option n°2 can yield the best experience.
Make sure you follow our [minimizing bundle size guide](/guides/minimizing-bundle-size/#option-2) before using the approach n°2.
We encourage the configuration of a Babel plugin.

### More SVG icons

Looking for even more SVG icons? There are a lot of projects out there,
but [https://materialdesignicons.com](https://materialdesignicons.com/) provides over 2,000 official and community provided icons.
[mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) packages these icons as Material-UI SvgIcons in much the same way as [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) does for the official icons.

## Font Icons

The `Icon` component will display an icon from any icon font that supports ligatures.
As a prerequisite, you must include one, such as the
[Material icon font](https://google.github.io/material-design-icons/#icon-font-for-the-web) in your project, for instance, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` will set the correct class name for the Material icon font. For other fonts, you must supply the class name using the Icon component's `className` property.

To use an icon simply wrap the icon name (font ligature) with the `Icon` component, for example:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Por padrão, um ícone herdará a cor do texto atual. Opcionalmente, você pode definir a cor do ícone usando uma das propriedades de cor do tema: `primary`, `secondary`, `action`, `erro` & `disabled`.

### Font Material icons

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) can be used with the `Icon` component as follow:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Font vs SVG. Which approach to use?

Both approaches work fine, however, there are some subtle differences, especially in terms of performance and rendering quality. Whenever possible SVG is preferred as it allows code splitting, supports more icons, renders faster and better.

For more details, you can check out [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Acessibilidade

Icons can convey all sorts of meaningful information, so it’s important that they reach the largest amount of people possible. There are two use cases you’ll want to consider:

- **Decorative Icons** are only being used for visual or branding reinforcement. If they were removed from the page, users would still understand and be able to use your page.
- **Semantic Icons** are ones that you’re using to convey meaning, rather than just pure decoration. This includes icons without text next to them used as interactive controls — buttons, form elements, toggles, etc.

### Decorative SVG Icons

If your icons are purely decorative, you’re already done! We add the `aria-hidden=true` attribute so that your icons are properly accessible (invisible).

### Semantic SVG Icons

If your icon has semantic meaning, all you need to do is throw in a `titleAccess="meaning"` property. We add the `role="img"` attribute and the `<title>` element so that your icons are properly accessible.

In the case of focusable interactive elements, like when used with an icon button, you can use the `aria-label` property:

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