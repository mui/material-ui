---
title: React Icon Component
components: Icon, SvgIcon
---

# Icons

<p class="description">Anleitungen und Vorschläge für die Verwendung von Symbolen mit der Material-UI.</p>

Material-UI provides icons support in three ways:

1. Standardized [Material Design icons](#material-icons) exported as React components (SVG icons).
1. With the [SvgIcon](#svgicon) component, a React wrapper for custom SVG icons.
1. With the [Icon](#icon-font-icons) component, a React wrapper for custom font icons.

## Material Icons

Material Design has standardized over 1,100 official icons, each in five different "themes" (see below). For each SVG icon, we export the respective React component from the @material-ui/icons package. You can [search the full list of these icons](/components/material-icons/).

### Installation

Installieren Sie das Paket innerhalb des Projektordners mit:

```sh
// mit npm
npm install @material-ui/icons

// mit yarn
yarn add @material-ui/icons
```

These components use the Material-UI SvgIcon component to render the SVG path for each icon, and so they have a peer-dependency on the next release of Material-UI.

If you are not already using Material-UI in your project, you can add it with:

```sh
// mit npm
npm install @material-ui/core

// mit yarn
yarn add @material-ui/core
```

### Nutzung

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

### Farbe (Color)

{{"demo": "pages/components/icons/SvgIconsColor.js"}}

### Size

{{"demo": "pages/components/icons/SvgIconsSize.js"}}

### Component prop

You can use the `SvgIcon` wrapper even if your icons are saved in the `.svg` format. [svgr](https://github.com/smooth-code/svgr) has loaders to import SVG files and use them as React components. For example, with webpack:

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

It's also possible to use it with "url-loader" or "file-loader". It's the approach used by Create React App.

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

### Bibliotheken

#### Material Design (recommended)

Material Design has standardized over [1,100 official icons](#material-icons).

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) provides over 2,000 icons. For the wanted icon, copy the SVG `path` they provide, and use it as the child of the `SvgIcon` component.

Note: [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) has already wrapped each of these SVG icons with the `SvgIcon` component, so you don't have to do it yourself.

## Icon (Font icons)

Die `Symbol-` Komponente zeigt ein Symbol aus einer beliebigen Symbolschriftart an, die Ligaturen unterstützt. Voraussetzung ist, dass Sie eine, beispielsweise die [Material Icon-Schriftart](https://google.github.io/material-design-icons/#icon-font-for-the-web) in Ihr Projekt einfügen, beispielsweise über Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` will set the correct class name for the Material icon font. For other fonts, you must supply the class name using the Icon component's `className` property.

Um ein Symbol zu verwenden, wickeln Sie einfach das Symbol Namen (Schrift Ligatur) mit der `Icon` Komponente zum Beispiel:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Standardmäßig erbt ein Symbol die aktuelle Textfarbe. Optional können Sie die Farbe des Symbols mithilfe einer der Designfarbeneigenschaften festlegen: `primary`, `secondary`, `action`, `error` & `disabled`.

### Schriftart Material icons

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) kann wie folgt mit der Komponente `Icon` werden:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Font vs SVG. Which approach to use?

Beide Ansätze funktionieren gut, es gibt jedoch einige geringfügige Unterschiede, insbesondere hinsichtlich der Leistung und der Renderqualität. Wann immer möglich, wird SVG bevorzugt, da es die Codeaufteilung ermöglicht, mehr Symbole unterstützt und schneller und besser rendert.

Weitere Informationen finden Sie unter [warum GitHub von Zeichensymbolen zu SVG-Symbolen migrierte](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Barrierefreiheit

Icons können alle Arten von aussagekräftigen Informationen vermitteln, daher ist es wichtig, dass sie die größtmögliche Anzahl von Personen erreichen. There are two use cases you’ll want to consider:
- **Decorative Icons** are only being used for visual or branding reinforcement. Wenn sie von der Seite entfernt würden, könnten Benutzer Ihre Seite trotzdem verstehen und verwenden.
- **Semantische Symbole** sind Symbole, die Sie verwenden, um Bedeutung zu vermitteln, und nicht nur reine Dekoration. Dazu gehören Symbole ohne nebenstehenden Text, die als interaktive Steuerelemente verwendet werden, etc.

### Dekorative SVG-Symbole

If your icons are purely decorative, you’re already done! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

### Semantic SVG Symbole

Wenn Ihr Symbol semantische Bedeutung hat, alles, was Sie tun müssen, ist das Hinzufügen der `titleAccess=„Bedeutung“` Eigenschaft. The `role="img"` attribute and the `<title>` element are added so that your icons are properly accessible.

Bei fokussierbaren interaktiven Elementen können Sie, wie bei der Verwendung einer Symbolschaltfläche, die Eigenschaft `aria-label` benutzen:

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...
```

### Dekorative Schrift-Symbole

If your icons are purely decorative, you’re already done! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

### Semantic Font Symbole

Wenn Ihre Symbole eine semantische Bedeutung haben, müssen Sie eine Textalternative bereitstellen, die nur für assistive Technologien sichtbar ist.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...
```

### Referenz

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
