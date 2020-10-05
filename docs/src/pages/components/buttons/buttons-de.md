---
title: React Button component
components: Button, IconButton, ButtonBase
---

# Button (Schaltfläche)

<p class="description">Buttons erlauben es dem Benutzer, mit einem einzigen Fingertipp Aktionen auszuführen und Entscheidungen zu treffen.</p>

[Buttons](https://material.io/design/components/buttons.html) (Schaltflächen / Knöpfe) geben Aktionen an, die ein Nutzer ausführen kann. Sie werden an verschiedenen Orten in Anwendungen verwendet, zum Beispiel:

- Dialoge
- Modale Fenster
- Formulare
- Cards
- Toolbars

## Eigenständige Buttons

[Eigenständige Buttons](https://material.io/design/components/buttons.html#contained-button) sind hervorgehoben und unterscheiden sich durch die Verwendung von Höhe und Füllung. Sie enthalten primäre Aktionen einer Anwendung.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

Die Erhöhung kann mit der `disableElevation`-Prop deaktiviert werden.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

## Text-Buttons

[Text-Buttons](https://material.io/design/components/buttons.html#text-button) werden normalerweise für weniger ausgeprägte Aktionen verwendet, als Beispiel solche, die in den folgenden Komponenten enthalten sind:

- In Dialogen
- In Karten

In Karten helfen Text-Buttons dabei, den Karteninhalt zu betonen.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Umrandete Buttons

[Umrandete Buttons](https://material.io/design/components/buttons.html#outlined-button) sind Buttons mit mittlerer Betonung. Sie enthalten wichtige Aktionen, aber nicht die primäre Aktion einer Anwendung.

Umrandete Buttons haben eine geringere Betonung als eigenständige Buttons, aber eine stärkere als Text-Buttons.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Handling clicks

All components accept an `onClick` handler that is applied to the root DOM element.

```jsx
<Button onClick={() => { alert('clicked') }}>Click me</Button>
```

Note that the documentation [avoids](/guides/api/#native-properties) mentioning native props (there are a lot) in the API section of the components.

## Upload-Button

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Größen

Fancy larger or smaller buttons? Verwende die Eigenschaft `size`.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Buttons mit Symbolen und Beschriftung

Manchmal möchten Sie möglicherweise Symbole für bestimmte Schaltflächen, um die UX der Anwendung zu verbessern, da Logos leichter als einfacher Text erkannt werden. Wenn Sie beispielsweise eine Schaltfläche zum Löschen haben, können Sie sie mit einem Mülleimer-Symbol kennzeichnen.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Icon Buttons

Icon Buttons finden Sie häufig in App-Bars und Toolbars.

Icons eignen sich auch für Umschaltflächen, mit denen eine einzelne Auswahl ausgewählt oder die Auswahl auf z. B. das Hinzufügen oder Entfernen eines Sterns zu einem Element.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Benutzerdefinierte Buttons

Hier einige Beispiele zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

🎨 Wenn Sie nach Inspiration suchen, sehen sie sich [MUI Treasury's Anpassungs-Beispiele](https://mui-treasury.com/styles/button) an.

## Komplexe Buttons

Die Text Buttons, die Contained Buttons, die Floatin Action Buttons und die Icon Buttons basieren auf derselben Komponente: der `ButtonBase`. Sie können die Vorteile dieser grundlegenden Komponente zum erstellen von benutzerdefinierten Interaktionen nutzen.

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## Drittanbieter-Routing Bibliothek

Ein häufig gebrauchtes Feature ist das Wechseln zu einer anderen Seite als Button-Aktion. Die `ButtonBase` Komponente stellt eine Eigenschaft für diesen Anwendungsfall bereit: `component`. Für bestimmte Fokus-Polyfills erfordert `ButtonBase` jedoch den DOM-Knoten der bereitgestellten Komponente. Dies wird erreicht, indem der Komponente ein Ref zugeordnet wird und erwartet wird, dass die Komponente diesen Ref an den zugrunde liegenden DOM-Knoten weiterleitet. Given that many of the interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere.

Hier ist ein [Integrationsbeispiel mit react-router](/guides/composition/#button).

## Einschränkungen

### Cursor nicht erlaubt

The ButtonBase component sets `pointer-events: none;` on disabled buttons, which prevents the appearance of a disabled cursor.

If you wish to use `not-allowed`, you have two options:

1. **Nur CSS**. You can remove the pointer events style on the disabled state of the `<button>` element:

  ```css
  .MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
  ```

Aber:

- You should add `pointer-events: none;` back when you need to display [tooltips on disabled elements](/components/tooltips/#disabled-elements).
- The cursor won't change if you render something other than a button element, for instance, a link `<a>` element.

2. **DOM-Anderung**. You can wrap the button:

  ```jsx
  <span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
  ```

This has the advantage of supporting any element, for instance, a link `<a>` element.