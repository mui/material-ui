---
title: React Modal component
components: Modal
---

# Modal

<p class="description">Die modale Komponente bietet eine solide Grundlage für das Erstellen von Dialogen, Popovers, Leuchtkästen oder anderen Elementen.</p>

Die Komponente rendered seine `Kinder` - Knoten vor einer Hintergrund - Komponente. The `Modal` offers important features:

- 💄 Verwaltet modales Stacking, wenn eins zu einem Zeitpunkt nicht ausreicht.
- 🔐 Erstellt einen Hintergrund zum Deaktivieren der Interaktion unter dem Modal.
- 🔐 Es deaktiviert das Blättern des Seiteninhalts, während es geöffnet ist.
- The [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) can help you set the initial focus on the most relevant element, based on your modal content.
- ♿️ Fügt die entsprechenden ARIA-Rollen automatisch hinzu.
- 📦 [5 kB gzipped](/size-snapshot).

> **Terminologieanmerkung**. Der Begriff "modal" bedeutet manchmal "Dialog", aber das ist eine Fehlbezeichnung. Ein Element wird als modal betrachtet, wenn es [die Interaktion mit dem Rest der Anwendung blockiert](https://en.wikipedia.org/wiki/Modal_window). A modal window describes parts of a UI.

Wenn Sie ein modales Dialogfeld erstellen, möchten Sie wahrscheinlich die [Dialog-](/components/dialogs/) Komponente verwenden, anstatt direkt ein Modal zu verwenden. Modal ist ein untergeordnetes Konstrukt, das von den folgenden Komponenten genutzt wird:

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Einfaches Modal

{{"demo": "pages/components/modal/SimpleModal.js"}}

Notice that you can disable the outline (often blue or gold) with the `outline: 0` CSS property.

## Übergänge

The open/close state of the modal can be animated with a transition component. This component should respect the following conditions:

- Be a direct child descendent of the modal.
- Have an `in` prop. This corresponds to the open / close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow the modal to unmount the child content when closed and fully transitioned.

Modal has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/modal/TransitionsModal.js"}}

Alternativ können Sie [react-spring](https://github.com/react-spring/react-spring) verwenden.

{{"demo": "pages/components/modal/SpringModal.js"}}

## Server-seitiges Modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. In order to display the modal, you need to disable the portal feature with the `disablePortal` prop:

{{"demo": "pages/components/modal/ServerModal.js"}}

## Einschränkungen

### Focus trap

The modal moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes, however, it might create issues. In the event the users need to interact with another part of the page, e.g. with a chatbot window, you can disable the behavior:

```jsx
<Modal disableEnforceFocus />
```

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#dialog_modal)

- Achten Sie darauf, eine Referenzierung des modalen Titels durch `aria-labelledby = "id..."` zu dem `Modal` hinzufügen. Zusätzlich können Sie eine Beschreibung Ihres Modals mit der `aria-describedby="id..."` Prop auf dem `Modal` angeben.
    
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