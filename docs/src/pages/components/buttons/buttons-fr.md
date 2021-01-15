---
title: React Button component
components: Button, IconButton, ButtonBase
---

# Button (bouton)

<p class="description">Les boutons permettent aux utilisateurs d'effectuer une action et de faire des choix en un seul clic.</p>

[Boutons](https://material. io/design/components/buttons. html) communiquent les actions que les utilisateurs peuvent faire. Ils sont généralement placés à travers votre interface utilisateur, dans des endroits tels que :

- Dialogues
- Fenêtres modales
- Formulaires
- Cartes
- Barres d'outils

## Contained Buttons (boutons contenus)

[Les boutons contenus](https://material.io/design/components/buttons.html#contained-button) sont très accentués, ils se distinguent par leur utilisation de l'élévation et du remplissage. Ils contiennent des actions qui sont essentielles à votre application.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

Vous pouvez supprimer l'élévation avec la propriété `disableElevation`.

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

## Gestion des clics

Tous les composants acceptent un gestionnaire `onClick` qui est appliqué à l'élément DOM racine.

```jsx
<Button onClick={() => { alert('cliqué') }}>Cliquez moi</Button>
```

Notez que la documentation [évite](/guides/api/#native-properties) de mentionner les props natifs (il y en a beaucoup) dans la section API des composants.

## Bouton de téléchargement

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Tailles

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Boutons avec icônes et libellés

Parfois, vous pouvez avoir des icônes pour certains boutons pour améliorer l'UX de l'application car nous reconnaissons les logos plus facilement que le texte brut. Par exemple, si vous avez un bouton de suppression, vous pouvez l’étiqueter avec une icône de poubelle.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Boutons avec icône

Les boutons d'icônes se trouvent généralement dans les barres d'applications et les barres d'outils.

Les icônes sont également appropriées pour les boutons de bascule qui permettent à un seul choix d'être sélectionné ou désélectionné, comme l'ajout ou la suppression d'une étoile à un objet.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Boutons personnalisés

Here are some examples of customizing the component. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

🎨 Si vous cherchez de l'inspiration, vous pouvez consulter les [exemples de personnalisation de MUI Treasury](https://mui-treasury.com/styles/button).

## Boutons complexes

Les boutons texte, les boutons contained, les bouton d'action flottante et les boutons icône sont tous basés sur le composant `ButtonBase`. Vous pouvez tirer parti de ce composant de niveau inférieur pour créer des interactions personnalisées.

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## Bibliothèque de routage tierce

Un cas d'utilisation courant est d'utiliser le bouton pour déclencher la navigation vers une nouvelle page. Le composant `ButtonBase` fournit une propriété pour traiter ce cas d'utilisation: `composant`. Cependant, pour certains focus polyfills `ButtonBase` requiert le nœud DOM du composant fourni. Pour ce faire, associez une référence au composant et attendez-vous à ce que le composant transmette cette référence au noeud DOM sous-jacent. Given that many of the interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere.

Voici un exemple d'intégration [avec react-router](/guides/composition/#button).

## Limites

### Curseur non autorisé

Le composant ButtonBase définit `pointer-événements : none;` sur les boutons désactivés, ce qui empêche l'apparence d'un curseur désactivé.

Si vous souhaitez utiliser `non-autorisé`, vous avez deux options :

1. **CSS seulement**. Vous pouvez supprimer le style d'événements du pointeur sur l'état désactivé de l'élément `<button>`:

  ```css
  .MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
  ```

Toutefois :

- Vous devez ajouter `pointer-events : none;` de retour lorsque vous avez besoin d'afficher [tooltips sur les éléments désactivés](/components/tooltips/#disabled-elements).
- Le curseur ne changera pas si vous rendez quelque chose d'autre qu'un élément de bouton, par exemple, un élément de lien `<a>`.

2. **DOM changement**. Tu peux envelopper le bouton:

  ```jsx
  <span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      désactivé
    </Button>
  </span>
  ```

Ceci a l'avantage de supporter n'importe quel élément, par exemple, un élément de lien `<a>`.