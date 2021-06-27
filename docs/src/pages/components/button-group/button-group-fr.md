---
title: Groupe de Boutons
components: Button, ButtonGroup
githubLabel: 'component: ButtonGroup'
---

# Groupe de boutons

<p class="description">Le composant ButtonGroup peut être utilisé pour regrouper les boutons associés.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Groupe de boutons de base

Les boutons peuvent être regroupés en les entourant avec le composant `ButtonGroup`. Ils doivent être des enfants immédiats.

{{"demo": "pages/components/button-group/BasicButtonGroup.js"}}

## Variantes de boutons

Toutes les variantes de boutons standards sont prises en charge.

{{"demo": "pages/components/button-group/VariantButtonGroup.js"}}

## Tailles et couleurs

Les propriétés `size` et `color` peuvent être utilisées pour contrôler l'apparence du groupe de boutons.

{{"demo": "pages/components/button-group/GroupSizesColors.js"}}

## Groupe vertical

Le groupe de boutons peut être affiché verticalement en utilisant la propriété `orientation`.

{{"demo": "pages/components/button-group/GroupOrientation.js"}}

## Bouton Split

`ButtonGroup` peut également être utilisé pour créer un bouton de séparation. La liste déroulante peut modifier l'action du bouton (comme dans cet exemple), ou être utilisée pour déclencher immédiatement une action liée.

{{"demo": "pages/components/button-group/SplitButton.js"}}

## Désactivé élévation

Vous pouvez supprimer l'élévation avec la propriété `disableElevation`.

{{"demo": "pages/components/button-group/DisableElevation.js"}}
