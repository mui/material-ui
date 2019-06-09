---
title: Composant React Button
components: Button, ButtonGroup, Fab, IconButton, ButtonBase, Zoom
---

# Buttons (Boutons)

<p class="description">Les boutons permettent aux utilisateurs d'effectuer une action et de faire des choix en un seul clic.</p>

[Buttons](https://material.io/design/components/buttons.html) communiquent les actions que les utilisateurs peuvent effectuer. Ils sont généralement placés dans votre interface utilisateur, dans des endroits tels que:

- Dialogues
- Fenêtres modales
- Formulaires
- Cartes
- Barres d'outils

## Contained Buttons (boutons contenus)

[Les boutons contenus](https://material.io/design/components/buttons.html#contained-button) sont très accentués, ils se distinguent par leur utilisation de l'élévation et du remplissage. Ils contiennent des actions qui sont essentielles à votre application.

Le dernier exemple de cette démo montre comment utiliser un bouton de téléchargement.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

## Boutons de texte

[Les boutons de texte](https://material.io/design/components/buttons.html#text-button) sont généralement utilisés pour les actions moins prononcées, y compris celles situées:

- Dans les dialogues
- Dans les cartes

Dans les cartes, les boutons de texte aident à maintenir l’accent sur le contenu des cartes.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Boutons en surbrillance

[boutons en surbrillance](https://material.io/design/components/buttons.html#outlined-button) sont des boutons à accent moyen. Ils contiennent des actions importantes mais qui ne sont pas l'action principale d'une application.

### Alternatives

Les boutons surbrillance sont également une alternative moins importante que les boutons contenus, ou une alternative plus importante aux boutons de texte.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Grouped Buttons

The ButtonGroup component can be used to group outlined (the default) or contained buttons.

{{"demo": "pages/components/buttons/GroupedButtons.js"}}

## Split Button

ButtonGroup can also be used to create a split button. The dropdown can change the button action (as in this example), or be use to immediately trigger a related action.

{{"demo": "pages/components/buttons/SplitButton.js"}}

## Boutons d'action flottant

A [bouton d'action flottante](https://material.io/design/components/buttons-floating-action-button.html) (FAB) effectue la première, ou la plus courante, l' action sur un écran. Il apparaît devant tout le contenu de l'écran, généralement sous la forme d'une forme circulaire avec une icône en son centre. Il existe deux types de FAB: régulier et étendu.

Utilisez un FAB uniquement si c'est le moyen le plus approprié pour présenter l'action principale d'un écran.

Un seul bouton d’action flottante est recommandé par écran pour représenter l’action la plus courante.

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

Le bouton d'action flottante s'anime sur l'écran en tant que matériau en expansion, par défaut.

Un bouton d'action flottant qui s'étend sur plusieurs écrans latéraux (tels que des écrans à onglets) devrait disparaître brièvement, puis sur si son action change.

La transition Zoom peut être utilisée pour y parvenir. Notez que, comme les animations sortantes et entrantes sont déclenchées simultanément, nous utilisons `enterDelay` pour permettre à l'animation du bouton d'action flottant sortant de se terminer avant l'entrée de la nouvelle.

{{"demo": "pages/components/buttons/FloatingActionButtonZoom.js"}}

## Tailles

Envie de boutons plus grands ou plus petits? Utilisez la propriété `size`.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Boutons avec des icônes et une étiquette

Parfois, vous voudrez peut-être avoir des icônes pour certains boutons afin d'améliorer l'UX de l'application, car nous reconnaissons plus facilement les logos que le texte brut. Par exemple, si vous avez un bouton de suppression, vous pouvez lui attribuer une icône représentant une poubelle.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Boutons avec icône

Les boutons d'icône se trouvent généralement dans les barres d'applications et les barres d'outils.

Les icônes sont également appropriés pour les boutons à bascule qui permettent à un seul choix à choisir ou décochée, comme l' ajout ou la suppression d' une étoile à un élément.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Boutons personnalisés

Voici quelques exemples de personnalisation du composant. Vous pouvez en apprendre plus sur [la page de documentation de personnalisation](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js"}}



## Boutons complexes

Les boutons texte, les boutons contained, les bouton d'action flottante et les boutons icône sont tous basés sur le composant `ButtonBase`. Vous pouvez tirer parti de ce composant de niveau inférieur pour créer des interactions personnalisées.

{{"demo": "pages/components/buttons/ButtonBases.js"}}

## Bibliothèque de routage tierce

Un cas d'utilisation courant consiste à utiliser le bouton pour déclencher une navigation vers une nouvelle page. Le composant `ButtonBase` fournit une propriété pour traiter ce cas d'utilisation: `composant`. Cependant, pour certains focus polyfills `ButtonBase` requiert le nœud DOM du composant fourni. Pour ce faire, associez une référence au composant et attendez-vous à ce que le composant transmette cette référence au noeud DOM sous-jacent. Étant donné que beaucoup de nos composants interactifs comptent sur `ButtonBase`, vous devriez être en mesure d'en tirer profit partout:

{{"demo": "pages/components/buttons/ButtonRouter.js", "defaultCodeOpen": true}}

*Note : La création de composants Button est nécessaire pour éviter une erreur inattendu. Vous pouvez en lire plus dans notre [guide de propriété de composant](/guides/composition/#component-property).*