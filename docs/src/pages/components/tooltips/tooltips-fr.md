---
title: Composant React Info-bulle
components: Tooltip
---

# Tooltips (Info-bulle)

<p class="description">Les info-bulles affichent un texte informatif lorsque les utilisateurs survolent, se concentrent ou tapent sur un élément.</p>

Lorsqu'elles sont activées, [Info-bulles](https://material.io/design/components/tooltips.html) affiche une étiquette de texte identifiant un élément, telle qu'une description de sa fonction.

## Info-bulles simples

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## Info-bulles positionnées

The `Tooltip` has 12 **placements** choice. They don’t have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Customized tooltips

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Élément enfant personnalisé

The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element.

```jsx
function MyComponent(props) {
  // We spread the properties to the underlying DOM element.
  return <div {...props}>Bin</div>
}

// ...

<Tooltip title="Delete">
  <MyComponent>
</Tooltip>
```

Vous pouvez trouver un concept similaire dans le [composants d'emballage](/guides/composition/#wrapping-components) guide.

## Activation

Vous pouvez définir les types d'événements qui entraînent l'affichage d'une info-bulle.

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## Info-bulles contrôlées

Vous pouvez utiliser les propriétés `open`, `onOpen` et `onClose` pour contrôler le comportement de l'info-bulle.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Largeur Variable

Le `Tooltip` enveloppements long texte par défaut pour le rendre lisible.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## Interactive

A tooltip can be interactive. It won't close when the user hovers over the tooltip before the `leaveDelay` is expired.

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## Éléments désactivés

Par éléments désactivés par défaut comme `<button>` ne déclenchent pas les interactions utilisateur si un `infobulle` ne sera pas activée sur les événements normaux comme vol stationnaire. Pour recevoir des éléments handicapés, ajoutez un simple élément d'emballage comme un `durée`.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

## Les transitions

Utilisez une transition différente.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Montrer et se cacher

L'info-bulle est normalement affichée immédiatement lorsque la souris de l'utilisateur survole l'élément, et se cache immédiatement lorsque la souris de l'utilisateur quitte la souris. Un retard dans l'affichage ou le masquage de l'info-bulle peut être ajouté via les propriétés suivantes `enterDelay` et `leaveDelay`, comme indiqué dans la démo Infobulles contrôlées ci-dessus.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}