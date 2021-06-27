---
title: Composant React Bouton
components: Button, IconButton, ButtonBase
materialDesign: https://material.io/components/buttons
githubLabel: 'component: Button'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#button'
---

# Button

<p class="description">Les boutons permettent aux utilisateurs d'effectuer une action et de faire des choix en un seul clic.</p>

Les boutons communiquent les actions que les utilisateurs peuvent faire. Ils sont généralement placés à travers votre interface utilisateur, dans des endroits tels que :

- Dialogues
- Fenêtres modales
- Formulaires
- Cartes
- Barres d'outils

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Bouton de base

Le `Button` est livré avec trois variantes : text (par défaut), contained et outlined.

{{"demo": "pages/components/buttons/BasicButtons.js"}}

### Boutons textuels

Les [boutons textuels](https://material.io/components/buttons#text-button) sont généralement utilisés pour les actions moins prononcées, y compris celles situées: dans des fenêtres de dialogues, dans des cartes. Dans les cartes, les boutons de texte aident à maintenir l’accent sur le contenu des cartes.

{{"demo": "pages/components/buttons/TextButtons.js"}}

### Boutons contenus (appelés "Contained buttons")

[Les boutons contenus](https://material.io/design/components/buttons.html#contained-button) sont très accentués, ils se distinguent par leur utilisation de l'élévation et du remplissage. Ils contiennent des actions qui sont essentielles à votre application.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

Vous pouvez supprimer l'élévation avec la propriété `disableElevation`.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

### Boutons à contours

[boutons en surbrillance](https://material.io/design/components/buttons.html#outlined-button) sont des boutons à accent moyen. Ils contiennent des actions importantes mais qui ne sont pas l'action principale d'une application.

Les boutons surbrillance sont également une alternative moins importante que les boutons contenus, ou une alternative plus importante aux boutons de texte.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Gestion des clics

Tous les composants acceptent un gestionnaire `onClick` qui est appliqué à l'élément DOM racine.

```jsx
<Button onClick={() => { alert('clicked') }}>Cliquez-moi</Button>
```

Notez que la documentation [évite](/guides/api/#native-properties) de mentionner les props natifs (il y en a beaucoup) dans la section API des composants.

## Couleur

{{"demo": "pages/components/buttons/ColorButtons.js"}}

En plus d'utiliser les couleurs par défaut, vous pouvez ajouter des couleurs personnalisées, ou désactiver celles dont vous n'avez pas besoin. Voir l'exemple [Ajouter de nouvelles couleurs](/customization/palette/#adding-new-colors) pour plus d'informations.

## Tailles

Pour des boutons plus grands ou plus petits, utilisez la propriété `size`.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Bouton de téléchargement

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Boutons avec icônes et libellés

Parfois vous aimeriez avoir des icônes pour certains boutons afin d'améliorer l'UX de l'application, car nous reconnaissons plus facilement les logos que le texte brut. Par exemple, si vous avez un bouton de suppression, vous pouvez l’étiqueter avec une icône de poubelle.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Boutons avec icône

Les boutons d'icônes se trouvent généralement dans les barres d'applications et les barres d'outils.

Les icônes sont également appropriées pour les boutons de bascule qui permettent à un seul choix d'être sélectionné ou désélectionné, comme l'ajout ou la suppression d'une étoile à un objet.

{{"demo": "pages/components/buttons/IconButtons.js"}}

### Tailles

Pour ajuster la taille des boutons, utilisez la propriété `size`.

{{"demo": "pages/components/buttons/IconButtonSizes.js"}}

### Couleurs

Utilisez la propriété `color` pour appliquer la palette de couleur du thème au composant.

{{"demo": "pages/components/buttons/IconButtonColors.js"}}

## Boutons personnalisés

Here are some examples of customizing the component. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/how-to-customize/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

🎨 Si vous cherchez de l'inspiration, vous pouvez consulter les [exemples de personnalisation de MUI Treasury](https://mui-treasury.com/styles/button).

## Boutons avec chargement

Les boutons de chargement peuvent afficher l'état de celui-ci et désactiver les interactions.

{{"demo": "pages/components/buttons/LoadingButtons.js"}}

Activez/désactivez le switch de chargement pour voir la transition entre les différents états.

{{"demo": "pages/components/buttons/LoadingButtonsTransition.js"}}

## Boutons complexes

Les boutons texte, les boutons contained, les bouton d'action flottante et les boutons icône sont tous basés sur le composant `ButtonBase`. Vous pouvez profiter de ce composant de niveau inférieur pour construire des interactions personnalisées.

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## Bibliothèque de routage tierce

Un cas d'utilisation fréquente est d'effectuer une navigation sur le client uniquement, sans un aller-retour HTTP vers le serveur. Le composant `ButtonBase` fournit la propriété `composante` pour gérer ce cas d'utilisation. Voici un [guide plus détaillé](/guides/routing/#button).

## Limites

### Curseur non autorisé

Le composant ButtonBase définit `pointer-événements : none;` sur les boutons désactivés, ce qui empêche l'apparence d'un curseur désactivé.

Si vous souhaitez utiliser `non-autorisé`, vous avez deux options :

1. **CSS uniquement**. Vous pouvez supprimer le style d'événements du pointeur sur l'état désactivé de l'élément `<button>`:

```css
.MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
```

Toutefois :

- Vous devez ajouter `pointer-events : none;` de retour lorsque vous avez besoin d'afficher [tooltips sur les éléments désactivés](/components/tooltips/#disabled-elements).
- Le curseur ne changera pas si vous rendez quelque chose d'autre qu'un élément de bouton, par exemple, un élément de lien `<a>`.

2. **Changement dans le DOM**. Tu peux envelopper le bouton:

```jsx
<span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
```

Ceci a l'avantage de supporter n'importe quel élément, par exemple, un élément de lien `<a>`.
