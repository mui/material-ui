---
title: Button React Komponente
components: Button, ButtonGroup, Fab, IconButton, ButtonBase, Zoom
---

# Button (schaltfläche)

<p class="description">Mit den Schaltflächen können Benutzer mit einem einzigen Tastendruck Aktionen ausführen und Entscheidungen treffen.</p>

[Buttons](https://material.io/design/components/buttons.html) (Schaltflächen / Knöpfe) geben Aktionen an, die ein Nutzer ausführen kann. Sie werden an verschiedenen Orten in Anwendungen verwendet, zum Beispiel:

- Dialoge
- Modale Fenster
- Formulare
- Cards
- Toolbars

## Contained Buttons

[Contained buttons](https://material.io/design/components/buttons.html#contained-button) sind hervorgehoben und unterscheiden sich durch die Verwendung von Höhe und Füllung. Sie enthalten Aktionen, die für Ihre App vorrangig sind.

Das letzte Beispiel dieser Demo zeigt, wie Sie eine Schaltfläche zum Hochladen verwenden.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

You can remove the elevation with the `disableElevation` prop.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

## Text Buttons

[Text buttons](https://material.io/design/components/buttons.html#text-button) werden normalerweise für weniger ausgeprägte Aktionen verwendet, darunter auch solche, die Folgendes enthalten:

- In Dialogen
- In Karten

In Karten helfen Text Buttons dabei, den Karteninhalt hervorzuheben.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Outlined Buttons

[Outlined Buttons](https://material.io/design/components/buttons.html#outlined-button) sind Buttons mit mittlerer Betonung. Sie enthalten wichtige Aktionen, aber nicht die primäre Aktion in einer App.

Outlined Buttons sind auch eine Alternative mit geringerer Betonung als Contained Buttons, oder eine Alternative mit höherer Betonung als Text Buttons.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Grouped Buttons

The `ButtonGroup` component can be used to group buttons.

{{"demo": "pages/components/buttons/GroupedButtons.js"}}

### Group sizes and colors

{{"demo": "pages/components/buttons/GroupSizesColors.js"}}

### Gruppenorientierung

{{"demo": "pages/components/buttons/GroupOrientation.js"}}

### Split Button

Eine ButtonGroup kann auch verwendet werden um einen geteilten Button zu erstellen. Ein Dropdown kann verwendet werden um die Button-Aktion zu ändern (wie im unteren Beispiel gezeigt) oder die Aktion direkt zu aktivieren.

{{"demo": "pages/components/buttons/SplitButton.js"}}

## Floating Action Buttons

Ein [Floating Action Button](https://material.io/design/components/buttons-floating-action-button.html) (FAB) führt die primäre oder gebräuchlichste Aktion auf einem Bildschirm aus. Es wird vor allen Bildschirminhalten angezeigt, normalerweise als Kreisform mit einem Symbol in der Mitte. Es gibt zwei Arten von FABs: normal und erweitert.

Verwenden Sie eine FAB nur, wenn dies für die Darstellung der Hauptaktion eines Bildschirms am besten geeignet ist.

Es wird nur eine Floating Action Button pro Bildschirm empfohlen, um die am häufigsten verwendete Aktion darzustellen.

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

Der floating-action-button, wird standardmäßig als expandierendes Material auf dem Bildschirm animiert.

Ein floating-action-button, der sich über mehrere seitliche Bildschirme (wie tabbed-screens) erstreckt, sollte kurz verschwinden und dann wieder erscheinen, wenn sich seine Aktion ändert.

Hierzu kann der Zoom-Übergang verwendet werden. Da sowohl die vorhandenen als auch die eingegebenen Animationen gleichzeitig ausgelöst werden, verwenden wir `enterDelay`, um die Animation der ausgehenden Floating Action Buttons zu beenden, bevor die neue Animation eintritt.

{{"demo": "pages/components/buttons/FloatingActionButtonZoom.js", "bg": true}}

## Upload button

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Größen

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Buttons mit Symbolen und Beschriftung

Manchmal möchten Sie möglicherweise Symbole für bestimmte Schaltflächen, um die UX der Anwendung zu verbessern, da Logos leichter als einfacher Text erkannt werden. Wenn Sie beispielsweise eine Schaltfläche zum Löschen haben, können Sie sie mit einem Mülleimer-Symbol kennzeichnen.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Icon Buttons

Icon Buttons finden Sie häufig in App-Bars und Toolbars.

Icons eignen sich auch für Umschaltflächen, mit denen eine einzelne Auswahl ausgewählt oder die Auswahl auf z. B. das Hinzufügen oder Entfernen eines Sterns zu einem Element.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Benutzerdefinierte Buttons

Hier sind einige Beispiele, wie man die Komponente anpassen kann. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

👑 Wenn Sie nach Inspiration suchen, sehen sie sich [MUI Treasury's Anpassungs-Beispiele](https://mui-treasury.com/components/button) an.

## Complex Buttons

Die Text Buttons, die Contained Buttons, die Floatin Action Buttons und die Icon Buttons basieren auf derselben Komponente: der `ButtonBase`. Sie können die Vorteile dieser grundlegenden Komponente zum erstellen von benutzerdefinierten Interaktionen nutzen.

{{"demo": "pages/components/buttons/ButtonBases.js"}}

## Drittanbieter-Routing Bibliothek

Ein häufig gebrauchtes Feature ist das Wechseln zu einer anderen Seite als Button-Aktion. Die `ButtonBase` Komponente stellt eine Eigenschaft für diesen Anwendungsfall bereit: `component`. Für bestimmte Fokus-Polyfills erfordert `ButtonBase` jedoch den DOM-Knoten der bereitgestellten Komponente. Dies wird erreicht, indem der Komponente ein Ref zugeordnet wird und erwartet wird, dass die Komponente diesen Ref an den zugrunde liegenden DOM-Knoten weiterleitet. Given that many of the interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere.

Hier ist ein [Integrationsbeispiel mit react-router](/guides/composition/#button).

## Einschränkungen

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