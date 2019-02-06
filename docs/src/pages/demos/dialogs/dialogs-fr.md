---
title: Composant React Dialogue
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
---
# Dialogues (Dialoges)

<p class="description">Les boîtes de dialogue informent les utilisateurs sur une tâche et peuvent contenir des informations critiques, nécessiter des décisions ou impliquer plusieurs tâches.</p>

Un [Dialog](https://material.io/design/components/dialogs.html) est un type de fenêtre [modale](/utils/modal/) qui apparaît devant le contenu de l'application pour fournir des informations critiques ou demander une décision. Les boîtes de dialogue désactivent toutes les fonctionnalités des applications lorsqu'elles apparaissent et restent à l'écran jusqu'à confirmation, exclusion ou action requise.

Les dialogues sont délibérément interruptifs, ils doivent donc être utilisés avec parcimonie.

## Dialogues simples

Des boîtes de dialogue simples peuvent fournir des détails supplémentaires ou des actions sur un élément de la liste. Par exemple, ils peuvent afficher des avatars, des icônes, des clarifications de sous-texte ou des actions orthogonales (telles que l'ajout d'un compte).

Mécanique tactile:

- Choisir une option valide immédiatement l'option et ferme le menu
- Toucher en dehors de la boîte de dialogue ou appuyer sur Retour annule l'action et ferme la boîte de dialogue

{{"demo": "pages/demos/dialogs/SimpleDialog.js"}}

## Alertes

Les alertes sont des interruptions urgentes, nécessitant un acquittement, qui informent l'utilisateur de la situation.

La plupart des alertes n'ont pas besoin de titres. Ils résument une décision en une phrase ou deux en:

- Poser une question (par exemple "Supprimer cette conversation?")
- Faire une déclaration relative aux boutons d'action

Utilisez les alertes de la barre de titre uniquement dans les situations à haut risque, telles que la perte de connectivité potentielle. Les utilisateurs devraient être en mesure de comprendre les choix basés sur le titre et le texte du bouton seul.

Si un titre est requis:

- Use a clear question or statement with an explanation in the content area, such as "Erase USB storage?".
- Avoid apologies, ambiguity, or questions, such as “Warning!” or “Are you sure?”

{{"demo": "pages/demos/dialogs/AlertDialog.js"}}

You can also swap out the transition, the next example uses `Slide`.

{{"demo": "pages/demos/dialogs/AlertDialogSlide.js"}}

## Dialogues de formulaire

Form dialogs allow users to fill out form fields within a dialog. For example, if your site prompts for potential subscribers to fill in their email address, they can fill out the email field and touch 'Submit'

{{"demo": "pages/demos/dialogs/FormDialog.js"}}

## Dialogue personnalisé

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here is one example of how you can customize the `DialogTitle` to support a close button.

⚠️ Bien que la spécification material encouragent la thématisation, cet exemple sort des sentiers battus.

{{"demo": "pages/demos/dialogs/CustomizedDialog.js"}}

## Dialogues plein écran

{{"demo": "pages/demos/dialogs/FullScreenDialog.js"}}

## Tailles en option

You can set a dialog maximum width by using the `maxWidth` enumerable in combination with the `fullWidth` boolean. When the `fullWidth` property is true, the dialog will adapt based on the `maxWidth` value.

{{"demo": "pages/demos/dialogs/MaxWidthDialog.js"}}

## Responsive full-screen

You may make a dialog responsively full screen the dialog using `withMobileDialog`. By default, `withMobileDialog()(Dialog)` responsively full screens *at or below* the `sm` [screen size](/layout/basics/). You can choose your own breakpoint for example `xs` by passing the `breakpoint` argument: `withMobileDialog({breakpoint: 'xs'})(Dialog)`.

{{"demo": "pages/demos/dialogs/ResponsiveDialog.js"}}

## Dialogues de confirmation

Confirmation dialogs require users to explicitly confirm their choice before an option is committed. For example, users can listen to multiple ringtones but only make a final selection upon touching “OK.”

Touching “Cancel” in a confirmation dialog, or pressing Back, cancels the action, discards any changes, and closes the dialog.

{{"demo": "pages/demos/dialogs/ConfirmationDialog.js"}}

## Accessibilité

Be sure to add `aria-labelledby="id..."`, referencing the modal title, to the `Dialog`. Additionally, you may give a description of your modal dialog with the `aria-describedby="id..."` property on the `Dialog`.

## Défiler de longues contenu

Lorsque les boîtes de dialogue deviennent trop longues pour la fenêtre ou le périphérique de l'utilisateur, elles défilent.

- `scroll=paper` le contenu de la boîte de dialogue défile dans l'élément de papier.
- `scroll=body` le contenu de la boîte de dialogue défile dans l'élément body.

Essayez la démo ci-dessous pour voir ce que nous voulons dire:

{{"demo": "pages/demos/dialogs/ScrollDialog.js"}}

## Dialogue glissable

You can create a draggable dialog by using [react-draggable](https://github.com/mzabriskie/react-draggable). To do so, you can pass the the imported `Draggable` component as the `PaperComponent` of the `Dialog` component. This will make the entire dialog draggable.

{{"demo": "pages/demos/dialogs/DraggableDialog.js"}}

## Performances

Suivez la [section de performance de la Modal](/utils/modal/#performance).