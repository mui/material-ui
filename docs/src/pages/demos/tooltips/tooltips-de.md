---
title: Tooltip React Component
components: Tooltip
---
# Tooltip

<p class="description">Tooltips zeigen informativen Text an, wenn Benutzer auf ein Element zeigen, darauf fokussieren oder tippen.</p>

Wenn aktiviert, zeigen [Tooltips](https://material.io/design/components/tooltips.html) eine Beschriftung an, die ein Element kennzeichnet, beispielsweise eine Beschreibung seiner Funktion.

## Einfache Tooltips

{{"demo": "pages/demos/tooltips/SimpleTooltips.js"}}

## Positionierte Tooltips

Der `Tooltip` hat 12 mögliche **Platzierungen**. Sie haben keine Richtungspfeile; Stattdessen verlassen sie sich auf Bewegungen, die von der Quelle ausgehen, um die Richtung zu vermitteln.

{{"demo": "pages/demos/tooltips/PositionedTooltips.js"}}

## Benutzerdefinierte Tooltips

Wenn du die [Überschreibungs Dokumentationsseite](/customization/overrides/) gelesen hast, aber dich noch nicht sicher genug fühlst, um direkt loszulegen, ist hier noch ein Beispiel, wie du das Theme des Tooltips verändern kannst.

⚠️ Auch wenn die material design Spezifikation zur Verwendung von Themes ermutigt, liegen diese Beispiele außerhalb der üblichen Pfade.

{{"demo": "pages/demos/tooltips/CustomizedTooltips.js"}}

## Benutzerdefiniertes untergeordnetes Element

Der Tooltip muss DOM-Ereignis-Listener auf das untergeordnete Element anwenden. Wenn das untergeordnete Element ein benutzerdefiniertes React-Element ist, müssen Sie sicherstellen, dass es seine Eigenschaften auf das zugrunde liegende DOM-Element weitergibt.

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

{{"demo": "pages/demos/tooltips/TriggersTooltips.js"}}

## Kontrollierte Tooltips

Sie können die Eigenschaften `onOpen`, `onClose` und `open`, verwenden, um das Verhalten des Tooltips zu steuern.

{{"demo": "pages/demos/tooltips/ControlledTooltips.js"}}

## Variable Breite

Der `Tooltip` umhüllt standardmäßig lange Texte, um diese lesbar zu machen.

{{"demo": "pages/demos/tooltips/VariableWidth.js"}}

## Interaktiv

Ein Tooltip kann interaktiv sein. Er wird nicht geschlossen, wenn sich der Benutzer über dem Tooltip befindet, bevor die `leaveDelay` abgelaufen ist.

{{"demo": "pages/demos/tooltips/InteractiveTooltips.js"}}

## Deaktivierte Elemente

Standardmäßig lösen deaktivierte Elemente wie `<button>` keine Benutzerinteraktionen aus, sodass ein `Tooltip` bei normalen Ereignissen wie Hover nicht aktiviert wird. Fügen Sie ein einfaches Wrapper-Element wie eine `span` hinzu, um deaktivierte Elemente aufzunehmen.

{{"demo": "pages/demos/tooltips/DisabledTooltips.js"}}

## Übergänge

Verwenden Sie einen anderen Übergang.

{{"demo": "pages/demos/tooltips/TransitionsTooltips.js"}}

## Ein-und ausblenden

Der Tooltip wird normalerweise sofort angezeigt, wenn sich die Maus des Benutzers über dem Element befindet und sofort ausgeblendet wird, wenn die Maus des Benutzers verlassen wird. Eine Verzögerung beim Anzeigen oder Ausblenden des Tooltips kann über die Eigenschaften `enterDelay` und `leaveDelay` hinzugefügt werden, wie in der Demo zum kontrollierten Tooltip oben gezeigt.

Bei mobilen Geräten wird der Tooltip angezeigt, wenn der Benutzer das Element lange gedrückt hält und versteckt sich nach einer Verzögerung von 1500 ms. Sie können diese Funktion mit der `disableTouchListener` Eigenschaft deaktivieren.

{{"demo": "pages/demos/tooltips/DelayTooltips.js"}}