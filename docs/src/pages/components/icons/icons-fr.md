---
title: React Icon Component
components: Icones, SvgIcon
githubLabel: 'components: SvgIcon'
materialDesign: https://material.io/design/iconography/system-icons.html
---

# Icônes

<p class="description">Conseils et suggestions pour l'utilisation des icônes avec Material-UI.</p>

Material-UI fournit le support des icônes de trois manières:

1. [Icônes Material Design](#material-icons) standardisées exportées en tant que composants React (icônes SVG)
1. Avec le composant [SvgIcon](#svgicon) , un wrapper React pour les icônes SVG personnalisées.
1. Avec le composant [Icon](#icon-font-icons), un wrapper React pour les icônes de polices personnalisées.

## Icônes de Material

Material Design has standardized over 1,100 official icons, each in five different "themes" (see below). Material Design has standardized over 1,100 official icons, each in five different "themes" (see below). Vous pouvez [rechercher la liste complète de ces icônes](/components/material-icons/).

### Installation

Installez le package dans votre répertoire de projet avec:

```sh
// with npm
npm install @material-ui/icons

// with yarn
yarn add @material-ui/icons
```

Ces composants utilisent le composant Material-UI `SvgIcon` pour afficher le chemin SVG pour chaque icône, et ont donc une dépendance sur `@materialui/core`.

Si vous n'utilisez pas déjà Material-UI dans votre projet, vous pouvez l'ajouter avec:

```sh
// Avec npm
npm install @material-ui/core@next

// Avec yarn
yarn add @material-ui/core@next
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

La plus sûre pour la taille des packages est l'option 1, mais certains développeurs préfèrent l'option 2. Assurez-vous de suivre le [guide de taille des paquets](/guides/minimizing-bundle-size/#option-2) avant d'utiliser la seconde approche.

Chaque icône de Material a également un "thème" : Configuré (par défaut), `Outlined`, `Rounded`, `Two-tone`, et `Sharp`. Pour importer le composant d'icône avec un autre thème que celui par défaut, ajoutez le nom du thème au nom de l'icône. Par exemple l'icône `@material-ui/icons/Delete` avec :

- Le thème Filled (par défaut) est exporté comme `@material-ui/icons/Delete`,
- Le thème Outlined est exporté en tant que `@material-ui/icons/DeleteOutlined`,
- Le thème Rounded est exporté en tant que `@material-ui/icons/DeleteRounded`,
- Le thème Twotone est exporté en tant que `@material-ui/icons/DeleteTwoTone`,
- Le thème Sharp est exporté en tant que `@material-ui/icons/DeleteSharp`.

> Note: The Material Design specification names the icons using "snake_case" naming (for example `delete_forever`, `add_a_photo`), while `@material-ui/icons` exports the respective icons using "PascalCase" naming (for example `DeleteForever`, `AddAPhoto`). Il y a trois exceptions à cette règle de nommage : `3d_rotation` exportée en tant que `ThreeDRotation`, `4k` exportée en tant que `FourK`, et `360` exportée en tant que `ThreeSixty`.

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

### Test

Pour tester les fins, chaque icône importée de `@material-ui/icons` a un attribut `data-testid` avec le nom de l'icône. Par exemple:

```jsx
import DeleteIcon from '@material-ui/icons/Delete';
```

a l'attribut suivant une fois monté :

```html
<svg data-testid="DeleteIcon"></svg>
```

## SvgIcon

Si vous avez besoin d'une icône SVG personnalisée (non disponible dans les [icônes Material](/components/material-icons/)), vous pouvez utiliser le wrapper `SvgIcon`. Ce composant étend l'élément natif `<svg>`:

- Il est livré avec une accessibilité intégrée.
- Les éléments de type SVG doivent être mis à l'échelle pour une affichage de 24x24px afin que l'icône puisse être utilisée telle quelle, ou inclus en tant qu'enfant pour d'autres composants Material-UI qui utilisent des icônes. (Ceci peut être personnalisé avec l'attribut `viewBox`).
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

Il est également possible de l'utiliser avec "url-loader" ou "file-loader". C'est l'approche utilisée pour une application créée par React App.

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

### createSvgIcon

La fonction `createSvgIcon` est utilisé pour créer les [icônes Material](#material-icons). Il peut être utilisé pour envelopper le chemin SVG avec un composant `SvgIcon`.

```jsx
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);
```

{{"demo": "pages/components/icons/CreateSvgIcon.js"}}

### Font Awesome

Si vous trouvez qu'il y a des problèmes de mise en page lors de l'utilisation de `FontAwesomeIcon` de `@fortawesome/react-fontawesome`, vous pouvez essayer de passer les données SVG Font Awesome directement à `SvgIcon`.

Ci-dessous est une comparaison du composant `FontAwesomeIcon` et d'un composant `SvgIcon` encapsulé.

{{"demo": "pages/components/icons/FontAwesomeSvgIconDemo.js"}}

La propriété  `fullWidth` de `FontAwesomeicon` peut également être utilisée pour approximer les bonnes dimensions, mais elle n'est pas parfaite.

### Autres bibliothèques

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) fournit plus de 2 000 icônes. Pour l'icône souhaitée, copiez le chemin (`path`) de SVG qu'ils fournissent, et l'utiliser comme fils du composant `SvgIcon` ou avec la fonction `createSvgIcon()`.

Remarque : [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) a déjà enveloppé chacune de ces icônes SVG avec le composant `SvgIcon` pour que vous n'ayez pas à le faire vous-même.

## Icon (Police d'icônes)

Le composant `Icon` affichera une icône à partir de toute police d’icônes prenant en charge les ligatures. Le composant `Icon` affichera une icône à partir de toute police d’icône prenant en charge les ligatures. Pour utiliser une icône, enveloppez simplement le nom de l'icône (ligature de police) avec le composant `Icon` , par exemple:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Par défaut, une icône héritera de la couleur de texte actuelle. Vous pouvez éventuellement définir la couleur de l'icône à l'aide de l'une des propriétés de couleur du thème: `primary`, `secondary`, `action`, `error` & `disabled`.

### Icônes de police Material

`Icon` définira par défaut le nom de la classe de base pour la police des icônes de Material grace à la propriété `variant`. Tout ce que vous avez à faire est de charger la police, par exemple, via Google Web Fonts :

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

{{"demo": "pages/components/icons/Icons.js"}}

### Police personnalisée

Pour les autres polices, vous pouvez personnaliser le nom de la classe de base en utilisant la propriété `baseClassName`. Par exemple, vous pouvez afficher des icônes two-tone avec Material Design:

```jsx
import Icon from '@material-ui/core/Icon';

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Material+Icons+Two+Tone"
  // Importer les Icônes de two-tones                           ^^^^^^^^
/>;
```

{{"demo": "pages/components/icons/TwoToneIcons.js"}}

#### Nom global de la classe de base

La modification de la propriété `baseClassName` pour chaque utilisation du composant est répétitive. Vous pouvez changer la propriété par défaut via le thème

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

Ensuite, vous pouvez utiliser la police de tow-tone directement :

```jsx
<Icon>add_circle</Icon>
```

### Font Awesome

La police [Font Awesome](https://fontawesome.com/icons) peut être utilisée avec la composante `Icon` comme suit :

{{"demo": "pages/components/icons/FontAwesomeIcon.js"}}

Notez que les icônes Font Awesome n'ont pas été conçues comme les icônes Material Design (comparer les deux démos précédentes). Les icônes de fa (Font Awesome) sont recadrées pour utiliser tout l'espace disponible. Vous pouvez ajuster pour cela avec une substitution globale :

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

{{"demo": "pages/components/icons/FontAwesomeIconSize.js"}}

## Font vs SVG. Quelle approche utiliser ?

Les deux approches fonctionnent bien, cependant il y a des différences subtiles, en particulier en termes de performance et de qualité d'affichage. Dans la mesure du possible, SVG est préféré car il permet le fractionnement de code, supporte plus d'icônes, et rend plus rapidement et mieux.

Pour plus de détails, jetez un œil à [pourquoi GitHub a migré des icônes de police vers les icônes SVG](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Accessibilité

Les icônes peuvent transmettre toutes sortes d'informations significatives, il est donc important de assurer qu'elles soient accessibles dans le cas échéant. Il y a deux cas d'utilisation que vous deviez considérer :

- **Icônes décoratives** qui ne sont utilisées que pour le renforcement visuel ou de marque. Si elles étaient supprimées de la page, les utilisateurs comprendraient toujours et seraient en mesure d'utiliser votre page.
- **Les Icônes sémantiques** sont celles que vous utilisez pour transmettre du sens, plutôt que de simples décorations. Ceci inclut les icônes sans texte à côté d'elles qui sont utilisées comme contrôles interactifs — boutons, éléments de formulaire, toggles, etc.

### Icônes décoratives

Si vos icônes sont purement décoratives, vous avez déjà fini ! L'attribut `aria-hidden=true` est ajouté afin que vos icônes soient correctement accessibles (invisibles).

### Icônes sémantiques

#### Icônes sémantiques type SVG

Vous devez inclure la propriété `titleAccess` avec une valeur significative. L'attribut `role="img"` et l'élément `<title>` sont ajoutés pour que vos icônes soient correctement accessibles.

Dans le cas d'éléments interactifs ciblables, par exemple lorsqu'il est utilisé avec un bouton d'icône, vous pouvez utiliser la propriété `aria-label`:

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

#### Icônes de polices sémantiques

Vous devez fournir une alternative de texte qui n'est visible que pour les technologies d'assistance.

```jsx
import Icon from '@material-ui/core/Icon';
import { visuallyHidden } from '@material-ui/utils';
import { makeStyles } from '@material-ui/core/styles';

const classes = makeStyles({ visuallyHidden })();

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Créez un utilisateur</Typography>
```

#### Référence

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
