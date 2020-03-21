---
title: Composant React Button
components: Button, IconButton, ButtonBase
---

# Button (bouton)

<p class="description">Les boutons permettent aux utilisateurs d'effectuer une action et de faire des choix en un seul clic.</p>

[Buttons](https://material.io/design/components/buttons.html) communicate actions that users can take. They are typically placed throughout your UI, in places like:

- Dialogues
- Fenêtres modales
- Formulaires
- Cartes
- Barres d'outils

## Contained Buttons (boutons contenus)

[Les boutons contenus](https://material.io/design/components/buttons.html#contained-button) sont très accentués, ils se distinguent par leur utilisation de l'élévation et du remplissage. Ils contiennent des actions qui sont essentielles à votre application.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

You can remove the elevation with the `disableElevation` prop.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

## Boutons de texte

[Les boutons de texte](https://material.io/design/components/buttons.html#text-button) sont généralement utilisés pour les actions moins prononcées, y compris celles situées:

- Dans les dialogues
- Dans les cartes

Dans les cartes, les boutons de texte aident à maintenir l’accent sur le contenu des cartes.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Boutons en surbrillance

[boutons en surbrillance](https://material.io/design/components/buttons.html#outlined-button) sont des boutons à accent moyen. Ils contiennent des actions importantes mais qui ne sont pas l'action principale d'une application.

Les boutons surbrillance sont également une alternative moins importante que les boutons contenus, ou une alternative plus importante aux boutons de texte.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Upload button

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Tailles

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Boutons avec des icônes et une étiquette

Parfois, vous voudrez peut-être avoir des icônes pour certains boutons afin d'améliorer l'UX de l'application, car nous reconnaissons plus facilement les logos que le texte brut. Par exemple, si vous avez un bouton de suppression, vous pouvez lui attribuer une icône représentant une poubelle.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Boutons avec icône

Les boutons d'icône se trouvent généralement dans les barres d'applications et les barres d'outils.

Les icônes sont également appropriés pour les boutons à bascule qui permettent à un seul choix à choisir ou décochée, comme l' ajout ou la suppression d' une étoile à un élément.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Boutons personnalisés

Here are some examples of customizing the component. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

👑 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/button).

## Boutons complexes

Les boutons texte, les boutons contained, les bouton d'action flottante et les boutons icône sont tous basés sur le composant `ButtonBase`. Vous pouvez tirer parti de ce composant de niveau inférieur pour créer des interactions personnalisées.

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## Bibliothèque de routage tierce

One common use case is to use the button to trigger navigation to a new page. Le composant `ButtonBase` fournit une propriété pour traiter ce cas d'utilisation: `composant`. Cependant, pour certains focus polyfills `ButtonBase` requiert le nœud DOM du composant fourni. Pour ce faire, associez une référence au composant et attendez-vous à ce que le composant transmette cette référence au noeud DOM sous-jacent. Given that many of the interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere.

Here is an [integration example with react-router](/guides/composition/#button).

## Limites

### Cursor not-allowed

The ButtonBase component sets `pointer-events: none;` on disabled buttons, which prevents the appearance of a disabled cursor.

If you wish to use `not-allowed`, you have two options:

1. **CSS only**. You can remove the pointer events style on the disabled state of the `<button>` element:

  ```css
  .MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
  ```

However:

- You should add `pointer-events: none;` back when you need to display [tooltips on disabled elements](/components/tooltips/#disabled-elements).
- The cursor won't change if you render something other than a button element, for instance, a link `<a>` element.

2. **DOM change**. You can wrap the button:

  ```jsx
  <span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
  ```

This has the advantage of supporting any element, for instance, a link `<a>` element.