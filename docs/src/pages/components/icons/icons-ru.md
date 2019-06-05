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

Составные части для создания собственных иконок – это интересно, но как насчет готовых вариантов? Мы предоставляем отдельный npm-пакет [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons), который содержит более 1000 официальных [иконок Material](https://material.io/tools/icons/?style=baseline), преобразованных в компоненты `SvgIcon`.

<a href="https://material.io/tools/icons/?icon=3d_rotation&style=baseline">
  <img src="/static/images/icons/icons.png" alt="Официальные иконки Material" style="width: 566px" />
</a>

#### Использование

Найти конкретную иконку можно на сайте Material: [material.io/tools/icons](https://material.io/tools/icons/?style=baseline). При импорте имейте в виду, что для названий иконок используется написание `PascalCase`, например:

- [`delete`](https://material.io/tools/icons/?icon=delete&style=baseline) представлена как `@material-ui/icons/Delete`
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) представлена как `@material-ui/icons/DeleteForever`

Для *"тематических"* иконок к названию иконки добавляется имя темы. Например

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

- Если ваша среда не поддерживает tree-shaking, **рекомендуется** импортировать иконки следующим образом:

```jsx
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

- Если же у вас настроено tree-shaking, импорт иконок можно осуществлять так:

```jsx
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
```

Примечание: такой способ импорта именованных экспортов приведет к тому, что *каждая иконка* будет включена в проект, поэтому не рекомендуется его использовать без настройки [tree-shaking](https://webpack.js.org/guides/tree-shaking/). Кроме того, это может повлиять на производительность горячей замены модулей.

### Больше SVG-иконок

Нужно еще больше SVG-иконок? Проектов существует множество, но, например, [https://materialdesignicons.com](https://materialdesignicons.com/) предоставляет более 2000 иконок, как официальных, так и созданных сообществом. [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) запаковывает эти иконки в виде компонентов Material-UI SvgIcons таким же образом, как [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) делает это для официальных иконок.

## Иконочный шрифт

Компонент `Icon` отображает иконку из любого иконочного шрифта с поддержкой лигатур. Предварительно необходимо включить в проект шрифт, такой как [Material icon font](http://google.github.io/material-design-icons/#icon-font-for-the-web), с помощью, например, Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` корректно установит имя класса для иконочного шрифта Material. Для прочих шрифтов необходимо предоставить имя класса с помощью свойства `className` компонента Icon.

Чтобы использовать иконку, просто оберните её имя (лигатуру шрифта) в компонент `Icon`, например:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

По умолчанию иконка наследует текущий цвет текста. При желании вы можете установить цвет иконки с помощью одного из свойств цвета темы: `primary`, `secondary`, `action`, `error` или `disabled`.

### Шрифтовые иконки Material

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) можно использовать с компонентом `Icon` следующим образом:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Шрифт или SVG. Какой подход использовать?

Оба подхода работают нормально, однако есть некоторые тонкие различия, особенно с точки зрения производительности и качества отрисовки. Когда это возможно, использование SVG является более предпочтительным, так как в этом случае есть возможность разделения кода, поддерживается больше иконок, отрисовка происходит лучше и быстрее.

For more details, you can check out [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Доступность

Иконки могут передавать всевозможную значимую информацию, поэтому важно, чтобы они охватывали максимально возможное количество людей. Существует два варианта использования, которые необходимо учесть: - **Декоративные иконки** используются только для визуального подкрепления или брендинга. Если удалить их со страницы, пользователи всё равно смогут её использовать, им всё будет понятно. - **Семантические иконки** – это те, которые используются для передачи смысла, а не только для украшения. В данную группу входят иконки без текста, используемые в качестве интерактивных элементов управления – кнопки, элементы форм, переключатели, и так далее.

### Декоративные SVG-иконки

Если у вас чисто декоративные иконки, почти всё уже готово! Добавим атрибут `aria-hidden=true` для правильной настройки их доступности (невидимость).

### Семантические SVG-иконки

Если у вашей иконки есть семантическое значение, необходимо только добавить свойство `titleAccess="значение"`. Для правильной настройки доступности добавим атрибут `role="img"` и элемент `<title>`.

В случае фокусируемых интерактивных элементов, например, кнопки с иконкой, можно использовать свойство `aria-label`:

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

### Декоративные шрифтовые иконки

Если у вас чисто декоративные иконки, почти всё уже готово! Добавим атрибут `aria-hidden=true` для правильной настройки их доступности (невидимость).

### Семантические шрифтовые иконки

Если у ваших иконок есть семантическое значение, необходимо предоставить текстовую альтернативу, видимую только для вспомогательных технологий.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Создать пользователя</Typography>
```

### Справка

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/