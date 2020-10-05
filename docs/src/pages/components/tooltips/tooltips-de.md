---
title: React Tooltip component
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

## Arrow Tooltips

You can use the `arrow` prop to give your tooltip an arrow indicating which element it refers to.

{{"demo": "pages/components/tooltips/ArrowTooltips.js"}}

## Benutzerdefiniertes untergeordnetes Element

The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element.

```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return <div {...props} ref={ref}>Bin</div>
});

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

## Interaktive Liste

Ein Tooltip kann interaktiv sein. It won't close when the user hovers over the tooltip before the `leaveDelay` is expired.

{{"demo": "pages/components/tooltips/InteractiveTooltips.js"}}

## Deaktivierte Elemente

Standardmäßig lösen deaktivierte Elemente wie `<button>` keine Benutzerinteraktionen aus, sodass ein `Tooltip` bei normalen Ereignissen wie Hover nicht aktiviert wird. To accommodate disabled elements, add a simple wrapper element, such as a `span`.

> ⚠️ In order to work with Safari, you need at least one display block or flex item below the tooltip wrapper.

{{"demo": "pages/components/tooltips/DisabledTooltips.js"}}

> If you're not wrapping a Material-UI component that inherits from `ButtonBase`, for instance, a native `<button>` element, you should also add the CSS property *pointer-events: none;* to your element when disabled:

```jsx
<Tooltip title="You don't have permission to do this">
  <span>
    <button disabled={disabled} style={disabled ? { pointerEvents: "none" } : {}}>
      {'A disabled button'}
    </button>
  </span>
</Tooltip>
```

## Übergänge

Verwenden Sie einen anderen Übergang.

{{"demo": "pages/components/tooltips/TransitionsTooltips.js"}}

## Ein-und ausblenden

Der Tooltip wird normalerweise sofort angezeigt, wenn sich die Maus des Benutzers über dem Element befindet und sofort ausgeblendet wird, wenn die Maus des Benutzers verlassen wird. Eine Verzögerung beim Anzeigen oder Ausblenden des Tooltips kann über die Eigenschaften `enterDelay` und `leaveDelay` hinzugefügt werden, wie in der Demo zum kontrollierten Tooltip oben gezeigt.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` property.

{{"demo": "pages/components/tooltips/DelayTooltips.js"}}