---
title: Tooltip React-Komponente
components: Tooltip
---

# Tooltip

<p class="description">Tooltips zeigen informativen Text an, wenn Benutzer auf ein Element zeigen, darauf fokussieren oder tippen.</p>

Wenn aktiviert, zeigen [Tooltips](https://material.io/design/components/tooltips.html) eine Beschriftung an, die ein Element kennzeichnet, beispielsweise eine Beschreibung seiner Funktion.

## Einfache Tooltips

{{"demo": "pages/components/tooltips/SimpleTooltips.js"}}

## Positionierte Tooltips

The `Tooltip` has 12 **placements** choice. They don’t have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Benutzerdefinierte Tooltips

Hier einige Beispiele zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

## Benutzerdefiniertes untergeordnetes Element

The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element.

```jsx
function MyComponent(props) {
  // Wir geben die Eigenschaften auf das zugrunde liegende DOM-Element weiter.
  return <div {...props}>Bin</div>
}

// ...

<Tooltip title="Löschen">
  <MyComponent>
</Tooltip>
```

Sie können ein ähnliches Konzept in der [Verpackungskomponenten](/guides/composition/#wrapping-components) Dokumentation finden.

## Auslöser

Sie können die Ereignistypen definieren, bei denen ein Tooltip angezeigt wird.

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## Kontrollierte Tooltips

Sie können die Eigenschaften `onOpen`, `onClose` und `open`, verwenden, um das Verhalten des Tooltips zu steuern.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Variable Breite

Der `Tooltip` umhüllt standardmäßig lange Texte, um diese lesbar zu machen.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## Interaktiv

A tooltip can be interactive. It won't close when the user hovers over the tooltip before the `leaveDelay` is expired.

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## Deaktivierte Elemente

Standardmäßig lösen deaktivierte Elemente wie `<button>` keine Benutzerinteraktionen aus, sodass ein `Tooltip` bei normalen Ereignissen wie Hover nicht aktiviert wird. Fügen Sie ein einfaches Wrapper-Element wie eine `span` hinzu, um deaktivierte Elemente aufzunehmen.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

## Übergänge

Verwenden Sie einen anderen Übergang.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Ein-und ausblenden

Der Tooltip wird normalerweise sofort angezeigt, wenn sich die Maus des Benutzers über dem Element befindet und sofort ausgeblendet wird, wenn die Maus des Benutzers verlassen wird. Eine Verzögerung beim Anzeigen oder Ausblenden des Tooltips kann über die Eigenschaften `enterDelay` und `leaveDelay` hinzugefügt werden, wie in der Demo zum kontrollierten Tooltip oben gezeigt.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}