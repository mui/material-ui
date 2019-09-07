---
title: Modal React-Komponente
components: Modal
---

# Modal

<p class="description">Die modale Komponente bietet eine solide Grundlage für das Erstellen von Dialogen, Popovers, Leuchtkästen oder anderen Elementen.</p>

Die Komponente rendered seine `Kinder` - Knoten vor einer Hintergrund - Komponente. The `Modal` offers important features:

- 💄 Manages modal stacking when one-at-a-time just isn't enough.
- 🔐 Creates a backdrop, for disabling interaction below the modal.
- 🔐 It disables scrolling of the page content while open.
- ♿️ Der Fokus wird richtig verwaltet. Wechseln des Fokus zum modalen Inhalt und diesen halten belassen, bis der Modal geschlossen ist.
- ♿️ Fügt die entsprechenden ARIA-Rollen automatisch hinzu.
- 📦 [5 kB gzipped](/size-snapshot).

> **Terminologieanmerkung**. Der Begriff "modal" bedeutet manchmal "Dialog", aber das ist eine Fehlbezeichnung. Ein modales Fenster beschreibt Teile einer Benutzeroberfläche. Ein Element wird als modal betrachtet, wenn es [die Interaktion mit dem Rest der Anwendung blockiert](https://en.wikipedia.org/wiki/Modal_window).

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

Alternatively, you can use [react-spring](https://github.com/react-spring/react-spring).

{{"demo": "pages/components/modal/SpringModal.js"}}

## Barrierefreiheit

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

- The [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) can help you set the initial focus on the most relevant element, based on your modal content.

## Server-side modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. In order to see the modal, you need to disable the portal feature with the `disablePortal` prop:

{{"demo": "pages/components/modal/ServerModal.js"}}