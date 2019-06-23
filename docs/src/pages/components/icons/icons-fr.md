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
  <img src="/static/images/icons/icons.png" alt="Icônes matérielles officielles" style="width: 566px" />
</a>

#### Utilisation

Vous pouvez utiliser [material.io/tools/icons](https://material.io/tools/icons/?style=baseline) pour rechercher une icône spécifique. Lors de l'importation d'une icône, n'oubliez pas que les noms des icônes sont `PascalCase`, par exemple:

- [`delete`](https://material.io/tools/icons/?icon=delete&style=baseline) est exposé en tant que `@material-ui/icons/Delete`
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) est exposé en tant que `@material-ui/icons/DeleteForever`

Pour des icônes* "à thème"*, ajoutez le nom du thème au nom de l'icône. Par exemple avec le

- L'icône avec contour [`Delete`](https://material.io/tools/icons/?icon=delete&style=outline) est exposée comme `@material-ui /icons/DeleteOutlined`
- L'icône Arrondi [`delete`](https://material.io/tools/icons/?icon=delete&style=rounded) est exposée sous la forme `@ material-ui/icons /DeleteRounded`
- L’icône Deux tonalités [`delete`](https://material.io/tools/icons/?icon=delete&style=twotone) apparaît sous la forme `@material-ui/icons/DeleteTwoTone`
- L'icône Sharp [`delete`](https://material.io/tools/icons/?icon=delete&style=sharp) est exposée sous la forme `@material-ui/icons/DeleteSharp`

Il y a trois exceptions à cette règle:

- [`3d_rotation`](https://material.io/tools/icons/?icon=3d_rotation&style=baseline) est exposé sous la forme `@material-ui/icons/ThreeDRotation`
- [`4k`](https://material.io/tools/icons/?icon=4k&style=baseline) est exposé comme `@material-ui/icons/FourK`
- [`360`](https://material.io/tools/icons/?icon=360&style=baseline) est exposé comme `@material-ui/icons/ThreeSixty`

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

#### Importations

- Si votre environnement ne prend pas en charge le tree-shaking, la façon **recommandée** d'importer les icônes est la suivante:

```jsx
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

- Si votre environnement prend en charge le tree-shaking, vous pouvez également importer les icônes de cette façon:

```jsx
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
```

Note : L'importation des exportations nommées de cette manière entraînera le code pour *chaque icône* étant incluse dans votre projet, il n'est donc pas recommandé à moins que vous ne configuriez le [tree-shaking](https://webpack.js.org/guides/tree-shaking/). Il peut également avoir un impact sur les performances de recharge des modules à chaud.

### Plus d'icônes SVG

Vous recherchez encore plus d'icônes SVG? Il existe de nombreux projets, mais [https://materialdesignicons.com](https://materialdesignicons.com/) fournit plus de 2 000 icônes officielles et fournies par la communauté. [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) empaquette ces icônes en tant que SvgIcons Material-UI de la même manière que [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) pour les icônes officielles.

## Polices d'icônes

Le composant `Icon` affichera une icône à partir de toute police d’icône prenant en charge les ligatures. Avant de commencer, vous devez en inclure une, telle que la police [Material icon](https://google.github.io/material-design-icons/#icon-font-for-the-web) dans votre projet, par exemple via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` définira le nom de classe correct pour la police de l'icône Material. Pour les autres polices, vous devez fournir le nom de la classe à l'aide de la propriété `className` du composant Icon.

Pour utiliser une icône, enveloppez simplement le nom de l'icône (ligature de police) avec le composant `Icon` , par exemple:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Par défaut, une icône héritera de la couleur de texte actuelle. Vous pouvez éventuellement définir la couleur de l'icône à l'aide de l'une des propriétés de couleur du thème: `primary`, `secondary`, `action`, `error` & `disabled`.

### Icônes de police Material

{{"demo": "pages/components/buttons/TextButtons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) Peut être utilisé avec le composant `Icon` comme suit:

{{"demo": "pages/style/icons/FontAwesome.js", "hideEditButton": true}}

## Police vs SVG. Quelle approche utiliser?

Les deux approches fonctionnent bien, cependant, il existe quelques différences subtiles, notamment en termes de performances et de qualité de rendu. Lorsque cela est possible, Le SVG est préférable car il permet la division de code, prend en charge plus d'icônes, rend les rendus plus rapidement et mieux.

Pour plus de détails, vous pouvez voir [pourquoi GitHub a migré d'icônes de police en icônes SVG](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Accessibilité

Les icônes peuvent transmettre toutes sortes d'informations utiles. Il est donc important qu'elles atteignent le plus grand nombre de personnes possible. Il convient de prendre en compte deux cas d'utilisation: - **Les icônes décoratives** ne sont utilisées que pour le renforcement visuel ou le marquage. S'ils étaient supprimés de la page, les utilisateurs comprendraient toujours et pourraient utiliser votre page. - **Les Icônes sémantiques** sont celles que vous utilisez pour transmettre du sens, plutôt que de simples décorations. Cela inclut les icônes sans texte adjacentes utilisées comme commandes interactives - boutons, éléments de formulaire, bascules, etc.

### Icônes SVG décoratives

Si vos icônes sont purement décoratives, vous avez déjà terminé! Nous ajoutons l'attribut `aria-hidden = true` pour que vos icônes soient correctement accessibles (invisibles).

### Icônes SVG sémantiques

Si votre icône a une signification sémantique, il vous suffit d'ajouter une propriété `titleAccess = "meaning"` . Nous ajoutons l'attribut `role = "img"` et l'élément`<title>` afin que vos icônes soient correctement accessibles.

Dans le cas d'éléments interactifs "focusable", comme avec un bouton icône, vous pouvez utiliser la propriété `aria-label`:

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

### Icônes de polices décoratives

Si vos icônes sont purement décoratives, vous avez déjà terminé! Nous ajoutons l'attribut `aria-hidden = true` pour que vos icônes soient correctement accessibles (invisibles).

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