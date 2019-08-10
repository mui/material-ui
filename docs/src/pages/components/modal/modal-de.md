---
title: Modal React-Komponente
components: Modal
---

# Modal

<p class="description">Die modale Komponente bietet eine solide Grundlage für das Erstellen von Dialogen, Popovers, Leuchtkästen oder anderen Elementen.</p>

Die Komponente rendered seine `Kinder` - Knoten vor einer Hintergrund - Komponente. The `Modal` offers important features:

- 💄 Verwaltet modales Stacking, wenn eins zu einem Zeitpunkt nicht ausreicht.
- 🔐 Erstellt einen Hintergrund zum Deaktivieren der Interaktion unter dem Modal.
- 🔐 Es deaktiviert das Blättern des Seiteninhalts, während es geöffnet ist.
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

## Performance

The content of the modal is **lazily mounted** into the DOM. It ensures that having many closed modals in your React tree won't slow down your page.

However, creating React elements has a cost too. Consider the following case:

```jsx
<Modal open={false}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Nachtisch (100g Portion)</TableCell>
        <TableCell align="right">Kalorien</TableCell>
        <TableCell align="right">Fettt&nbsp;(g)</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map(row => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Modal>
```

We create a lot of React elements that will never be mounted. It's wasteful 🐢. You can **speed up** the rendering by moving the modal body into its own component.

```jsx
<Modal open={false}>
  <TableComponent />
</Modal>
```

Auf diese Weise nutzen Sie [React Rendering Laziness Evaluation](https://overreacted.io/react-as-a-ui-runtime/#lazy-evaluation). Die Rendermethode der `Tabellen-Komponente` wird nur beim Öffnen des Modals ausgewertet.

## Barrierefreiheit

- Achten Sie darauf, eine Referenzierung des modalen Titels durch `aria-labelledby = "id..."` zu dem `Modal` hinzufügen. Zusätzlich können Sie eine Beschreibung Ihres Modals mit der Eigenschaft `aria-descriptionby = "id..."` für das `Modal`angeben.

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

- Mit den [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) können Sie den anfänglichen Fokus auf das relevanteste Element setzen, basierend auf Ihrem modalen Inhalt.

## Server-side modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. In order to make it work, you need to disable this feature with the `disablePortal` prop:

{{"demo": "pages/components/modal/ServerModal.js"}}