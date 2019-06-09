---
title: List React Komponente
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---

# Listen (List)

<p class="description">Listen sind durchgehende, vertikale Indexe von Text oder Bildern.</p>

[Listen](https://material.io/design/components/lists.html) sind eine fortlaufende Gruppe von Text oder Bildern. Sie bestehen aus Elementen, die primäre und ergänzende Aktionen enthalten, die durch Symbole und Texte dargestellt werden.

## Einfache Liste

{{"demo": "pages/components/lists/SimpleList.js"}}

Das letzte Element der vorherigen Demo zeigt, wie Sie einen Link rendern können:

```jsx
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

//...

<ListItemLink href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemLink>
```

Nach diesem Abschnitt der Dokumentation finden Sie eine [Demo mit React Router](/guides/composition/#react-router).

## Verschachtelte Liste

{{"demo": "pages/components/lists/NestedList.js"}}

## Ordnerliste

{{"demo": "pages/components/lists/FolderList.js"}}

## Interaktive Liste

Nachfolgend finden Sie eine interaktive Demo, mit der Sie die visuellen Ergebnisse der verschiedenen Einstellungen untersuchen können:

{{"demo": "pages/components/lists/InteractiveList.js"}}

## Ausgewähltes Listenelement

{{"demo": "pages/components/lists/SelectedListItem.js"}}

## Listenelemente ausrichten

Sie sollten die Ausrichtung der Listenelemente ändern, wenn Sie 3 Zeilen oder mehr anzeigen. Setzen Sie die Eigenschaft `alignItems = "flex-start"`.

{{"demo": "pages/components/lists/AlignItemsList.js"}}

## Listensteuerelemente

### Checkbox

Eine Checkbox kann entweder eine primäre oder eine sekundäre Aktion sein.

Die Checkbox ist die Hauptaktion und das Zustandskennzeichen für das Listenelement. Die Kommentarschaltfläche ist eine sekundäre Aktion und ein separates Ziel.

{{"demo": "pages/components/lists/CheckboxList.js"}}

Die Checkbox ist die sekundäre Aktion für das Listenelement und ein separates Ziel.

{{"demo": "pages/components/lists/CheckboxListSecondary.js"}}

### Switch

Der Schalter ist die sekundäre Aktion und ein separates Ziel.

{{"demo": "pages/components/lists/SwitchListSecondary.js"}}

## Liste mit angehefteter Kopfzeile

Nach dem Scrollen bleiben angeheftete Kopfzeilen am oberen Bildschirmrand fixiert, bis sie von der nächsten Kopfzeile aus dem Bildschirm gedrückt werden.

Diese Funktion basiert auf der CSS-Sticky-Positionierung. Leider ist es [ nicht von allen Browsern implementiert](https://caniuse.com/#search=sticky), die wir unterstützt. Wir setzen standardmäßig auf `disableSticky` wenn dies nicht unterstützt wird.

{{"demo": "pages/components/lists/PinnedSubheaderList.js"}}

## Eingerückte Liste

{{"demo": "pages/components/lists/InsetList.js"}}

## Virtualisierte Liste

Im folgenden Beispiel zeigen wir wie Sie [react-window](https://github.com/bvaughn/react-window) mit der `Listen<` Komponente nutzen können. Sie zeigt 200 Zeilen an und kann auch einfach mehr verwalten. Virtualisierung hilft bei Leistungsproblemen.

{{"demo": "pages/components/lists/VirtualizedList.js"}}

Wir empfehlen die Verwendung von [react-window](https://github.com/bvaughn/react-window) wenn dies möglich ist. Wenn diese Bibliothek Ihren Anwendungsfall nicht abdeckt, sollten Sie [react-virtualized](https://github.com/bvaughn/react-virtualized) und Alternativen wie [react-virtuoso](https://github.com/petyosi/react-virtuoso) in Betracht ziehen.