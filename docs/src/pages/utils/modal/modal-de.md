---
title: Modal React-Komponente
components: Modal
---
# Modal

<p class="description">Die modale Komponente bietet eine solide Grundlage für das Erstellen von Dialogen, Popovers, Leuchtkästen oder anderen Elementen.</p>

Die Komponente rendered seine `Kinder` - Knoten vor einer Hintergrund - Komponente. Das `Modal` bietet einige hilfreiche Funktionen gegenüber der Verwendung einer [`Portal`](/utils/portal/) Komponente und einiger Stile:

- Verwaltet modales Stacking, wenn eins zu einem Zeitpunkt nicht ausreicht.
- Erstellt einen Hintergrund zum Deaktivieren der Interaktion unter dem Modal.
- Es deaktiviert das Blättern des Seiteninhalts, während es geöffnet ist.
- ♿️ Der Fokus wird richtig verwaltet. Wechseln des Fokus zum modalen Inhalt und diesen halten belassen, bis der Modal geschlossen ist.
- ♿️ Fügt die entsprechenden ARIA-Rollen automatisch hinzu.

> **Terminologieanmerkung**. Der Begriff "modal" bedeutet manchmal "Dialog", aber das ist eine Fehlbezeichnung. Ein modales Fenster beschreibt Teile einer Benutzeroberfläche. Ein Element wird als modal betrachtet, wenn es [die Interaktion mit dem Rest der Anwendung blockiert](https://en.wikipedia.org/wiki/Modal_window).

Wenn Sie ein modales Dialogfeld erstellen, möchten Sie wahrscheinlich die [Dialog-](/demos/dialogs/) Komponente verwenden, anstatt direkt ein Modal zu verwenden. Modal ist ein untergeordnetes Konstrukt, das von den folgenden Komponenten genutzt wird:

- [Dialog](/demos/dialogs/)
- [Drawer](/demos/drawers/)
- [Menu](/demos/menus/)
- [Popover](/utils/popover/)

## Einfaches Modal

{{"demo": "pages/utils/modal/SimpleModal.js"}}

## Performance

Der Inhalt des Modals wird **lazily eingehangen** im DOM. Dadurch wird sichergestellt, dass viele geschlossene Modale in Ihrem React-Baum Ihre Seite nicht verlangsamen.

Das Erstellen von React-Elementen ist jedoch ebenfalls mit Kosten verbunden. Betrachten Sie den folgenden Fall:

```jsx
<Modal open={false}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Dessert (100g serving)</TableCell>
        <TableCell align="right">Calories</TableCell>
        <TableCell align="right">Fat (g)</TableCell>
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

We create a lot of React elements that will never be mounted. It's wasteful 

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
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>
  <Typography variant="h6" id="modal-title">
    My Title
  </Typography>
  <Typography variant="subtitle1" id="simple-modal-description">
    My Description
  </Typography>
</Modal>
```

- Mit den [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) können Sie den anfänglichen Fokus auf das relevanteste Element setzen, basierend auf Ihrem modalen Inhalt.