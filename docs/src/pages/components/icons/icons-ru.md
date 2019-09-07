---
title: React-компонент Icon
components: Icon, SvgIcon
---

# Иконки

<p class="description">Руководство и рекомендации по использованию иконок в Material-UI.</p>

[Системная иконка](https://material.io/design/iconography/system-icons.html), или иконка UI, обозначает команду, файл, устройство или каталог. Системные иконки также используются для представления частых операций, таких как удаление, печать или сохранение, и обычно размещаются в списках, на кнопках, панелях приложений и инструментов. Google предоставляет набор [иконок Material](https://material.io/tools/icons/?style=baseline), соответствующих рекомендациям.

Material-UI предоставляет два компонента для отображения системных иконок: `SvgIcon` используется с форматом SVG, а `Icon` – с иконочными шрифтами.

## SVG Иконки

Компонент `SvgIcon` принимает в качестве дочернего элемент `path` SVG и преобразует его в компонент React, который отображает SVG-путь и позволяет настроить стиль иконки и её реакцию на события мыши. Элементы SVG должны быть отмасштабированы для области просмотра размером 24x24px.

Полученный значок можно либо использовать сразу, либо включить его в качестве дочернего в другие компоненты Material-UI, которые используют иконки. По умолчанию иконка наследует текущий цвет текста. При желании вы можете установить цвет иконки с помощью одного из свойств цвета темы: `primary`, `secondary`, `action`, `error` или `disabled`.

{{"demo": "pages/components/icons/SvgIcons.js"}}

### SVG-иконки Material

Составные части для создания собственных иконок – это интересно, но как насчет готовых вариантов? [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) is an npm package that includes the 1,000+ official [Material icons](https://material.io/tools/icons/?style=baseline) converted to `SvgIcon` components.

<a href="/components/material-icons/">
  <img src="/static/images/icons/icons.png" alt="Официальные иконки Material" style="width: 566px" />
</a>

#### Использование

You can use the [internal search](/components/material-icons/) or [material.io/tools/icons](https://material.io/tools/icons/?style=baseline) to find a specific icon. При импорте имейте в виду, что для названий иконок используется написание `PascalCase`, например:

- [`delete`](https://material.io/tools/icons/?icon=delete&style=baseline) представлена как `@material-ui/icons/Delete`
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) представлена как `@material-ui/icons/DeleteForever`

For "themed" icons, append the theme name to the icon name. For instance with the

- Иконка [`delete`](https://material.io/tools/icons/?icon=delete&style=outline) в теме Outlined представлена как `@material-ui/icons/DeleteOutlined`
- Иконка [`delete`](https://material.io/tools/icons/?icon=delete&style=rounded) в теме Rounded представлена как `@material-ui/icons/DeleteRounded`
- Иконка [`delete`](https://material.io/tools/icons/?icon=delete&style=twotone) в теме Two Tone представлена как `@material-ui/icons/DeleteTwoTone`
- Иконка [`delete`](https://material.io/tools/icons/?icon=delete&style=sharp) в теме Sharp представлена как `@material-ui/icons/DeleteSharp`

Из данного правила существует три исключения:

- [`3d_rotation`](https://material.io/tools/icons/?icon=3d_rotation&style=baseline) представлена как `@material-ui/icons/ThreeDRotation`
- [`4k`](https://material.io/tools/icons/?icon=4k&style=baseline) представлена как `@material-ui/icons/FourK`
- [`4k`](https://material.io/tools/icons/?icon=4k&style=baseline) представлена как `@material-ui/icons/FourK`

{{"Демо": "pages/components/icons/SvgMaterialIcons.js"}}

#### Импорт

You can import the icons with one of these two options:

- Option 1:

```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- Option 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

The safest is option 1 but option 2 can yield the best experience.
Make sure you follow the [minimizing bundle size guide](/guides/minimizing-bundle-size/#option-2) before using the second approach.
The configuration of a Babel plugin is encouraged.

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

По умолчанию иконка наследует текущий цвет текста. При желании вы можете установить цвет иконки с помощью одного из свойств цвета темы: `primary`, `secondary`, `action`, `error` или `disabled`.

### Font Material icons

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) can be used with the `Icon` component as follow:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Font vs SVG. Which approach to use?

Both approaches work fine, however, there are some subtle differences, especially in terms of performance and rendering quality. Whenever possible SVG is preferred as it allows code splitting, supports more icons, renders faster and better.

For more details, you can check out [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Доступность

Icons can convey all sorts of meaningful information, so it’s important that they reach the largest amount of people possible. There are two use cases you’ll want to consider:

- **Decorative Icons** are only being used for visual or branding reinforcement. If they were removed from the page, users would still understand and be able to use your page.
- **Semantic Icons** are ones that you’re using to convey meaning, rather than just pure decoration. This includes icons without text next to them used as interactive controls — buttons, form elements, toggles, etc.

### Decorative SVG Icons

If your icons are purely decorative, you’re already done! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

### Semantic SVG Icons

If your icon has semantic meaning, all you need to do is throw in a `titleAccess="meaning"` property. The `role="img"` attribute and the `<title>` element are added so that your icons are properly accessible.

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

If your icons are purely decorative, you’re already done! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

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