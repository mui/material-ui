---
title: React Modal component
components: Modal
---

# Modal

<p class="description">Le composant modal fournit une base solide pour la création de boîtes de dialogue, de popovers, de lightboxes ou autres.</p>

Le composant affiche ses nœuds `children` devant un composant d'arrière-plan. La `Modal` offre d'importantes fonctionnalités :

- 💄 Gère la superposition de modales.
- 🔐 Crée un backdrop, pour désactiver les interactions sous la modale.
- 🔐 Désactive le scroll de la page quand elle est ouverte.
- ♿️ Gère proprement le focus ; assure l'accessibilité au contenu de la modale jusqu'à sa fermeture.
- ♿ Ajoute automatiquement les rôles ARIA appropriés.
- 📦 [5 kB gzippé](/size-snapshot).

> **Note de terminologie**. Le terme "modal" est parfois utilisé pour signifier "dialogue", mais c'est un terme impropre. Un élément est considéré modal si [il bloque l'interaction avec le reste de l'application](https://en.wikipedia.org/wiki/Modal_window). A modal window describes parts of a UI.

Si vous créez une boîte de dialogue modale, vous voudrez probablement utiliser le composant [Dialog](/components/dialogs/) plutôt que d'utiliser directement Modal. Modal est un élément de construction de niveau faible exploitée par les composants suivants :

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Modal simple

{{"demo": "pages/components/modal/SimpleModal.js"}}

Notez que vous pouvez désactiver le contour (souvent bleu ou or) avec la propriété `outline : 0` CSS .

## Les transitions

L'état ouvert/fermé de la modale peut être animé avec un composant de transition. Ce composant doit respecter les conditions suivantes :

- Être un enfant descendant direct du modal.
- Avoir la propriété `in`. Correspond à l'état ouvert/fermé.
- Appeler la propriété de callback `onEnter` lorsque la transition d'entrée démarre.
- Appeler la propriété de callback `onExited` lorsque la transition de sortie est terminée. Ces deux fonctions de callback permettent à la modale de retirer le contenu enfant lorsqu'elle est fermée et que la transition est terminée.

Modal a un support intégré pour [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/modal/TransitionsModal.js"}}

Alternativement, vous pouvez utiliser [react-spring](https://github.com/react-spring/react-spring).

{{"demo": "pages/components/modal/SpringModal.js"}}

## Modal côté serveur

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. In order to display the modal, you need to disable the portal feature with the `disablePortal` prop:

{{"demo": "pages/components/modal/ServerModal.js"}}

## Limites

### Focus trap

The modal moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes, however, it might create issues. In the event the users need to interact with another part of the page, e.g. with a chatbot window, you can disable the behavior:

```jsx
<Modal disableEnforceFocus />
```

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#dialog_modal)

- Be sure to add `aria-labelledby="id..."`, referencing the modal title, to the `Modal`. Additionally, you may give a description of your modal with the `aria-describedby="id..."` prop on the `Modal`.
    
    ```jsx
    <Modal
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    >
    <h2 id="modal-title">
      My Title
    </h2>
    <p id="modal-description">
      My Description
    </p>
    </Modal>
    ```

- The [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) can help you set the initial focus on the most relevant element, based on your modal content.
- Windows under a modal are **inert**. That is, users cannot interact with content outside an active modal window. Keep in mind that a "modal window" overlays on either the primary window or another modal window. This might create [conflicting behaviors](#focus-trap).