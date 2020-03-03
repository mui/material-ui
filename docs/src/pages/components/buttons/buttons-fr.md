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

[Text buttons](https://material.io/design/components/buttons.html#text-button) are typically used for less-pronounced actions, including those located:

- Dans les dialogues
- Dans les cartes

In cards, text buttons help maintain an emphasis on card content.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Boutons en surbrillance

[Outlined buttons](https://material.io/design/components/buttons.html#outlined-button) are medium-emphasis buttons. They contain actions that are important, but aren’t the primary action in an app.

Outlined buttons are also a lower emphasis alternative to contained buttons, or a higher emphasis alternative to text buttons.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Upload button

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Tailles

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Buttons with icons and label

Sometimes you might want to have icons for certain button to enhance the UX of the application as we recognize logos more easily than plain text. For example, if you have a delete button you can label it with a dustbin icon.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Icon Buttons

Icon buttons are commonly found in app bars and toolbars.

Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected, such as adding or removing a star to an item.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Customized buttons

Here are some examples of customizing the component. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

👑 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/button).

## Complex Buttons

The Text Buttons, Contained Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the `ButtonBase`. You can take advantage of this lower level component to build custom interactions.

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## Bibliothèque de routage tierce

One common use case is to use the button to trigger navigation to a new page. The `ButtonBase` component provides a property to handle this use case: `component`. However for certain focus polyfills `ButtonBase` requires the DOM node of the provided component. This is achieved by attaching a ref to the component and expecting that the component forwards this ref to the underlying DOM node. Given that many of the interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere.

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

- You should add `pointer-events: none;` back when you need to display [tooltips on disabled elements](/components/tooltips/#disabled-elements)
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