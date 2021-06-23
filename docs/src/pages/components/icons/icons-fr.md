---
title: React Icon Component
components: Icon, SvgIcon
---

# Icônes

<p class="description">Conseils et suggestions pour l'utilisation des icônes avec Material-UI.</p>

Material-UI fournit le support des icônes de trois manières:

1. [Icônes Material Design](#material-icons) standardisées exportées en tant que composants React (icônes SVG)
1. Avec le composant [SvgIcon](#svgicon) , un wrapper React pour les icônes SVG personnalisées.
1. Avec le composant [Icon](#icon-font-icons), un wrapper React pour les icônes de polices personnalisées.

## Icônes Material

Material Design a standardisé plus de 1 100 icônes officielles, chacune dans cinq différents "thèmes" (voir ci-dessous). Pour chaque icône SVG, nous exportons le composant React correspondant depuis le package `@material-ui/icones`. Vous pouvez [rechercher la liste complète de ces icônes](/components/material-icons/).

### Installation

Installez le package dans votre répertoire de projet avec:

```sh
// with npm
npm install @material-ui/icons

// with yarn
yarn add @material-ui/icons
```

These components use the Material-UI SvgIcon component to render the SVG path for each icon, and so they have a peer-dependency on the next release of Material-UI.

Si vous n'utilisez pas déjà Material-UI dans votre projet, vous pouvez l'ajouter avec:

```sh
// avec npm
npm install @material-ui/core

// avec yarn
yarn add @material-ui/core
```

### Utilisation

Importer des icônes en utilisant l'une de ces deux options :

- Option 1:

  ```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- Option 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

L'option 1 est la plus sûre, mais l'option 2 peut donner la meilleure expérience aux développeurs. Assurez-vous de suivre le [guide de taille des paquets](/guides/minimizing-bundle-size/#option-2) avant d'utiliser la seconde approche. La configuration d'un plugin Babel est encouragée.

Chaque icône de Material a également un "thème" : Filled (par défaut), Outlined, Rounded, Two tone et Sharp. Si vous voulez importer le composant d'icône avec un thème autre que celui par défaut, ajoutez le nom du thème au nom de l'icône. Par exemple l'icône `@material-ui/icons/Delete` avec :

- Le thème Filled (par défaut) est exporté comme `@material-ui/icons/Delete`,
- Le thème Outlined est exporté en tant que `@material-ui/icons/DeleteOutlined`,
- Le thème Rounded est exporté en tant que `@material-ui/icons/DeleteRounded`,
- Le thème Twotone est exporté en tant que `@material-ui/icons/DeleteTwoTone`,
- Le thème Sharp est exporté en tant que `@material-ui/icons/DeleteSharp`.

> Note: La spécification Material Design nomme les icônes en utilisant le nommage "snake_case" (par exemple `delete_forever`, `add_a_photo`), alors que `@material-ui/icons` exporte les icônes respectives en utilisant le nommage "PascalCase" (par exemple `DeleteForever`, `AddAPhoto`). Il y a trois exceptions à cette règle de nommage : `3d_rotation` exportée en tant que `ThreeDRotation`, `4k` exportée en tant que `FourK`, et `360` exportée en tant que `ThreeSixty`.

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

## SvgIcon

Si vous avez besoin d'une icône SVG personnalisée (non disponible dans le [jeu par défaut](/components/material-icons/)) de Material Icons, vous pouvez utiliser le wrapper `SvgIcon`. Ce composant étend l'élément natif `<svg>`:

- Il est livré avec une accessibilité intégrée.
- Les éléments SVG doivent être mis à l'échelle pour une affichage de 24x24px afin que l'icône puisse être utilisée telle quelle, ou incluse en tant qu'enfant pour d'autres composants Material-UI qui utilisent des icônes. (Ceci peut être personnalisé avec l'attribut `viewBox`).
- Par défaut, le composant hérite de la couleur courante. Optionnellement, vous pouvez appliquer une des couleurs du thème en utilisant la propriété `color`.

```jsx
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
```

### Couleur

{{"demo": "pages/components/icons/SvgIconsColor.js"}}

### Taille

{{"demo": "pages/components/icons/SvgIconsSize.js"}}

### Component prop

Vous pouvez utiliser le wrapper `SvgIcon` même si vos icônes sont enregistrées au format `.svg`. [svgr](https://github.com/smooth-code/svgr) a des loaders pour importer des fichiers SVG et les utiliser comme composants React. Par exemple, avec webpack :

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

Il est également possible de l'utiliser avec "url-loader" ou "file-loader". C'est l'approche utilisée par Create React App.

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

### Librairies

#### Material Design (recommandé)

Material Design a standardisé plus de [1 100 icônes officielles](#material-icons).

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) fournit plus de 2 000 icônes. Pour l'icône voulue, copiez le `path` SVG qu'ils fournissent, et utilisez-le comme enfant du composant `SvgIcon`.

Remarque : [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) a déjà enveloppé chacune de ces icônes SVG avec le composant `SvgIcon` pour que vous n'ayez pas à le faire vous-même.

## Icon (Police d'icônes)

Le composant `Icon` affichera une icône à partir de toute police d’icônes prenant en charge les ligatures. Avant de commencer, vous devez en inclure une, telle que la police [Material icon](https://google.github.io/material-design-icons/#icon-font-for-the-web) dans votre projet, par exemple via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` définira le nom de la classe correcte pour la police d'icônes Material. Pour les autres polices, vous devez fournir le nom de la classe en utilisant la propriété `className` du composant Icon.

Pour utiliser une icône, enveloppez simplement le nom de l'icône (ligature de police) avec le composant `Icon` , par exemple:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Par défaut, une icône héritera de la couleur de texte actuelle. Vous pouvez éventuellement définir la couleur de l'icône à l'aide de l'une des propriétés de couleur du thème: `primary`, `secondary`, `action`, `error` & `disabled`.

### Icônes de police Material

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) Peut être utilisé avec le composant `Icon` comme suit:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Font vs SVG. Quelle approche utiliser ?

Les deux approches fonctionnent bien, cependant, il existe quelques différences subtiles, notamment en termes de performances et de qualité de rendu. Lorsque cela est possible, Le SVG est préférable car il permet la division de code, prend en charge plus d'icônes, rend les rendus plus rapidement et mieux.

Pour plus de détails, vous pouvez voir [pourquoi GitHub a migré d'icônes de police en icônes SVG](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Accessibilité

Les icônes peuvent transmettre toutes sortes d'informations utiles. Il est donc important qu'elles atteignent le plus grand nombre de personnes possible. Il y a deux cas d'utilisation que vous voudrez considérer :
- **Les icônes décoratives** ne sont utilisées que pour le renforcement visuel ou de marque. Si elles étaient supprimées de la page, les utilisateurs comprendraient toujours et seraient en mesure d'utiliser votre page.
- **Les Icônes sémantiques** sont celles que vous utilisez pour transmettre du sens, plutôt que de simples décorations. Cela inclut les icônes sans texte adjacentes utilisées comme commandes interactives - boutons, éléments de formulaire, bascules, etc.

### Icônes SVG décoratives

Si vos icônes sont purement décoratives, vous avez déjà fini ! L'attribut `aria-hidden=true` est ajouté afin que vos icônes soient correctement accessibles (invisibles).

### Icônes SVG sémantiques

Si votre icône a une signification sémantique, il vous suffit d'ajouter une propriété `titleAccess = "meaning"` . L'attribut `role="img"` et l'élément `<title>` sont ajoutés pour que vos icônes soient correctement accessibles.

Dans le cas d'éléments interactifs "focusable", comme avec un bouton icône, vous pouvez utiliser la propriété `aria-label`:

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...
```

### Icônes de polices décoratives

Si vos icônes sont purement décoratives, vous avez déjà fini ! L'attribut `aria-hidden=true` est ajouté afin que vos icônes soient correctement accessibles (invisibles).

### Icônes de polices sémantiques

Si vos icônes ont un sens sémantique, vous devez fournir une alternative textuelle uniquement visible aux technologies d'assistance.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Créez un utilisateur</Typography>
```

### Référence

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
