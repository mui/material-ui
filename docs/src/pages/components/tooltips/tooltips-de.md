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

Der `Tooltip` hat 12 mögliche **Platzierungen**. Sie haben keine Richtungspfeile; Stattdessen verlassen sie sich auf Bewegungen, die von der Quelle ausgehen, um die Richtung zu vermitteln.

{{"demo": "pages/components/tooltips/PositionedTooltips.js"}}

## Customized tooltips

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/tooltips/CustomizedTooltips.js"}}

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

{{"demo": "pages/components/tooltips/TriggersTooltips.js"}}

## Kontrollierte Tooltips

Sie können die Eigenschaften `onOpen`, `onClose` und `open`, verwenden, um das Verhalten des Tooltips zu steuern.

{{"demo": "pages/components/tooltips/ControlledTooltips.js"}}

## Variable Breite

Der `Tooltip` umhüllt standardmäßig lange Texte, um diese lesbar zu machen.

{{"demo": "pages/components/tooltips/VariableWidth.js"}}

## Interaktiv

Ein Tooltip kann interaktiv sein. Er wird nicht geschlossen, wenn sich der Benutzer über dem Tooltip befindet, bevor die `leaveDelay` abgelaufen ist.

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## Deaktivierte Elemente

Standardmäßig lösen deaktivierte Elemente wie `<button>` keine Benutzerinteraktionen aus, sodass ein `Tooltip` bei normalen Ereignissen wie Hover nicht aktiviert wird. Fügen Sie ein einfaches Wrapper-Element wie eine `span` hinzu, um deaktivierte Elemente aufzunehmen.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

## Übergänge

Verwenden Sie einen anderen Übergang.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Ein-und ausblenden

Der Tooltip wird normalerweise sofort angezeigt, wenn sich die Maus des Benutzers über dem Element befindet und sofort ausgeblendet wird, wenn die Maus des Benutzers verlassen wird. Eine Verzögerung beim Anzeigen oder Ausblenden des Tooltips kann über die Eigenschaften `enterDelay` und `leaveDelay` hinzugefügt werden, wie in der Demo zum kontrollierten Tooltip oben gezeigt.

Bei mobilen Geräten wird der Tooltip angezeigt, wenn der Benutzer das Element lange gedrückt hält und versteckt sich nach einer Verzögerung von 1500 ms. Sie können diese Funktion mit der `disableTouchListener` Eigenschaft deaktivieren.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}