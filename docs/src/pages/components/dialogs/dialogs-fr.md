---
title: Composant React Dialogue
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
---

# Dialogs (Dialogues)

<p class="description">Les boîtes de dialogue informent les utilisateurs sur une tâche et peuvent contenir des informations critiques, nécessiter des décisions ou impliquer plusieurs tâches.</p>

Un [Dialog](https://material.io/design/components/dialogs.html) est un type de fenêtre [modale](/components/modal/) qui apparaît devant le contenu de l'application pour fournir des informations critiques ou demander une décision. Les boîtes de dialogue désactivent toutes les fonctionnalités des applications lorsqu'elles apparaissent et restent à l'écran jusqu'à confirmation, exclusion ou action requise.

Les dialogues sont délibérément interruptifs, ils doivent donc être utilisés avec parcimonie.

## Dialogues simples

Des boîtes de dialogue simples peuvent fournir des détails supplémentaires ou des actions sur un élément de la liste. Par exemple, ils peuvent afficher des avatars, des icônes, des clarifications de sous-texte ou des actions orthogonales (telles que l'ajout d'un compte).

Mécanique tactile:

- Choisir une option valide immédiatement l'option et ferme le menu
- Toucher en dehors de la boîte de dialogue ou appuyer sur Retour annule l'action et ferme la boîte de dialogue

{{"demo": "pages/components/dialogs/SimpleDialog.js"}}

## Alertes

Les alertes sont des interruptions urgentes, nécessitant un acquittement, qui informent l'utilisateur de la situation.

La plupart des alertes n'ont pas besoin de titres. Ils résument une décision en une phrase ou deux en:

- Poser une question (par exemple "Supprimer cette conversation?")
- Faire une déclaration relative aux boutons d'action

Utilisez les alertes de la barre de titre uniquement dans les situations à haut risque, telles que la perte de connectivité potentielle. Les utilisateurs devraient être en mesure de comprendre les choix basés sur le titre et le texte du bouton seul.

Si un titre est requis:

- Utilisez une question ou une déclaration claire avec une explication dans la zone de contenu, telle que "Effacer le stockage USB?".
- Évitez les excuses, les ambiguïtés ou les questions telles que "Attention"

{{"demo": "pages/components/dialogs/AlertDialog.js"}}

Vous pouvez également permuter la transition. L’exemple suivant utilise `Slide`.

{{"demo": "pages/components/dialogs/AlertDialogSlide.js"}}

## Dialogues de formulaire

Les boîtes de dialogue de formulaire permettent aux utilisateurs de remplir des champs de formulaire dans une boîte de dialogue. Par exemple, si votre site invite les abonnés potentiels à saisir leur adresse e-mail, ils peuvent renseigner le champ e-mail et appuyer sur "Envoyer".

{{"demo": "pages/components/dialogs/FormDialog.js"}}

## Customized dialogs

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

The dialog has a close button added to aide usability.

{{"demo": "pages/components/dialogs/CustomizedDialogs.js"}}

## Dialogues plein écran

{{"demo": "pages/components/dialogs/FullScreenDialog.js"}}

## Tailles en option

Vous pouvez définir une largeur maximale dans la boîte de dialogue à l’aide de la valeur `maxWidth`, associée à la valeur `fullWidth`. Lorsque la propriété `fullWidth` est définie sur true, la boîte de dialogue s'adapte en fonction de la valeur `maxWidth`.

{{"demo": "pages/components/dialogs/MaxWidthDialog.js"}}

## Responsive full-screen

You may make a dialog responsively full screen using `withMobileDialog`. By default, `withMobileDialog()(Dialog)` responsively full screens *at or below* the `sm` [screen size](/customization/breakpoints/). You can choose your own breakpoint for example `xs` by passing the `breakpoint` argument: `withMobileDialog({breakpoint: 'xs'})(Dialog)`.

{{"demo": "pages/components/dialogs/ResponsiveDialog.js"}}

## Dialogues de confirmation

Les dialogues de confirmation demandent aux utilisateurs de confirmer explicitement leur choix avant la validation d'une option. For example, users can listen to multiple ringtones but only make a final selection upon touching “OK”.

Appuyer sur “Annuler” dans une boîte de dialogue de confirmation ou appuyer sur Retour annule l'action, annule les modifications et ferme la boîte de dialogue.

{{"demo": "pages/components/dialogs/ConfirmationDialog.js"}}

## Accessibilité

Suivez la [section d'accessibilité de la Modal](/components/modal/#accessibility).

## Défiler de longues contenu

Lorsque les boîtes de dialogue deviennent trop longues pour la fenêtre ou le périphérique de l'utilisateur, elles défilent.

- `scroll=paper` le contenu de la boîte de dialogue défile dans l'élément de papier.
- `scroll=body` le contenu de la boîte de dialogue défile dans l'élément body.

Essayez la démo ci-dessous pour voir ce que nous voulons dire:

{{"demo": "pages/components/dialogs/ScrollDialog.js"}}

## Dialogue glissable

Vous pouvez créer une boîte de dialogue déplaçable à l’aide de [react-draggable](https://github.com/mzabriskie/react-draggable). Pour ce faire, vous pouvez passer le composant importé `Draggable` en tant que proprieté `PaperComponent` du composant `Dialog`. Cela rend la totalité de la boîte de dialogue déplaçable.

{{"demo": "pages/components/dialogs/DraggableDialog.js"}}

## Performances

Suivez la [section de performance de la Modal](/components/modal/#performance).