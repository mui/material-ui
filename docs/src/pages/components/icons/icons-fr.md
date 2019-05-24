---
title: React Icon Component
components: Icon, SvgIcon
---

# Icônes

<p class="description">Conseils et suggestions pour l'utilisation des icônes avec Material-UI.</p>

Une [icône système](https://material.io/design/iconography/system-icons.html) ou icône UI, symbolise une commande, un fichier, un appareil, ou un répertoire. Les icônes système sont également utilisés pour représenter des actions communes comme des déchets, d'imprimer et d'enregistrer, et sont généralement utilisées dans les barres d'application, les barres d'outils, les boutons et les listes. Google a fourni un ensemble de [icônes "Material"](https://material.io/tools/icons/?style=baseline) qui respectent ces consignes.

Material-UI fournit deux composants pour le rendu des icônes système: `SvgIcon` pour restituer les chemins SVG et `Icon` pour restituer les icônes de police.

## Icônes SVG

Le composant `SvgIcon` prend un élément SVG `path` comme enfant et le convertit en composant React qui affiche le chemin et permet de styliser l'icône et de répondre aux événements de la souris. Les éléments SVG doivent être mis à l'échelle pour une fenêtre d'affichage 24x24px.

L'icône résultante peut être utilisée telle quelle, ou incluse en tant qu'enfant pour d'autres composants Material-UI utilisant des icônes. Par défaut, une icône héritera de la couleur de texte actuelle. Vous pouvez éventuellement définir la couleur de l'icône à l'aide de l'une des propriétés de couleur du thème: `primary`, `secondary`, `action`, `error` & `disabled`.

{{"demo": "pages/components/icons/SvgIcons.js"}}

### Icônes SVG Material

Il est intéressant de disposer des éléments nécessaires à la mise en œuvre d'icônes personnalisées, mais qu'en est-il des préréglages? Nous fournissons un package npm séparé, [@ material-ui / icons](https://www.npmjs.com/package/@material-ui/icons), qui inclut les 1 000+ icônes de matériau [officielles](https://material.io/tools/icons/?style=baseline) converties en composants `SvgIcon`.

<a href="https://material.io/tools/icons/?icon=3d_rotation&style=baseline">
  <img src="/static/images/icons/icons.png" alt="Official material icons" style="width: 566px" />
</a>

#### Utilisation

Vous pouvez utiliser [material.io/tools/icons](https://material.io/tools/icons/?style=baseline) pour rechercher une icône spécifique. Lors de l'importation d'une icône, n'oubliez pas que les noms des icônes sont `PascalCase`, par exemple:

- [`delete`](https://material.io/tools/icons/?icon=delete&style=baseline) est exposé en tant que `@material-ui/icons/Delete`
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) est exposé en tant que `@material-ui/icons/DeleteForever`

Pour des icônes* "à thème"*, ajoutez le nom du thème au nom de l'icône. Par exemple avec le

- L'icône avec contour [`Delete`](https://material.io/tools/icons/?icon=delete&style=outline) est exposée comme `@material-ui /icons/DeleteOutlined`
- The Rounded [`delete`](https://material.io/tools/icons/?icon=delete&style=rounded) icon is exposed as `@material-ui/icons/DeleteRounded`
- The Two Tone [`delete`](https://material.io/tools/icons/?icon=delete&style=twotone) icon is exposed as `@material-ui/icons/DeleteTwoTone`
- The Sharp [`delete`](https://material.io/tools/icons/?icon=delete&style=sharp) icon is exposed as `@material-ui/icons/DeleteSharp`

There are three exceptions to this rule:

- [`3d_rotation`](https://material.io/tools/icons/?icon=3d_rotation&style=baseline) is exposed as `@material-ui/icons/ThreeDRotation`
- [`4k`](https://material.io/tools/icons/?icon=4k&style=baseline) is exposed as `@material-ui/icons/FourK`
- [`360`](https://material.io/tools/icons/?icon=360&style=baseline) is exposed as `@material-ui/icons/ThreeSixty`

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

#### Imports

- Si votre environnement ne prend pas en charge le tree-shaking, la façon **recommandée** d'importer les icônes est la suivante:

```jsx
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

- Si votre environnement prend en charge le tree-shaking, vous pouvez également importer les icônes de cette façon:

```jsx
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
```

Note: Importing named exports in this way will result in the code for *every icon* being included in your project, so is not recommended unless you configure [tree-shaking](https://webpack.js.org/guides/tree-shaking/). It may also impact Hot Module Reload performance.

### More SVG icons

Looking for even more SVG icons? There are a lot of projects out there, but [https://materialdesignicons.com](https://materialdesignicons.com/) provides over 2,000 official and community provided icons. [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) packages these icons as Material-UI SvgIcons in much the same way as [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) does for the official icons.

## Polices d'icônes

The `Icon` component will display an icon from any icon font that supports ligatures. As a prerequisite, you must include one, such as the [Material icon font](http://google.github.io/material-design-icons/#icon-font-for-the-web) in your project, for instance, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` will set the correct class name for the Material icon font. For other fonts, you must supply the class name using the Icon component's `className` property.

To use an icon simply wrap the icon name (font ligature) with the `Icon` component, for example:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Par défaut, une icône héritera de la couleur de texte actuelle. Vous pouvez éventuellement définir la couleur de l'icône à l'aide de l'une des propriétés de couleur du thème: `primary`, `secondary`, `action`, `error` & `disabled`.

### Font Material icons

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) can be used with the `Icon` component as follow:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Font vs SVG. Which approach to use?

Both approaches work fine, however, there are some subtle differences, especially in terms of performance and rendering quality. Whenever possible SVG is preferred as it allows code splitting, supports more icons, renders faster and better.

For more details, you can check out [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Accessibilité

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