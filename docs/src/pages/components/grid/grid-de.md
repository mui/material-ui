---
title: React Grid component
components: Grid
---

# Grid

<p class="description">Das responsive Layoutraster von Material Design passt sich der Bildschirmgröße und -ausrichtung an und sorgt für Konsistenz über alle Layouts hinweg.</p>

Das [Grid](https://material.io/design/layout/responsive-layout-grid.html) sorgt für visuelle Konsistenz zwischen Layouts und ermöglicht Flexibilität bei einer Vielzahl von Designs. Die responsive UI von Material Design basiert auf einem 12-Spalten-Rasterlayout.

> ⚠️ The `Grid` component shouldn't be confused with a data grid; it is closer to a layout grid. For a data grid head to [the `DataGrid` component](/components/data-grid/).

## So funktioniert es

Das Rastersystem wird mit der `Grid-` Komponente implementiert:

- Es verwendet das [CSS Flexible Box - Modul](https://www.w3.org/TR/css-flexbox-1/) für hohe Flexibilität.
- Es gibt zwei Arten von Layouts: *Container* und *Elemente*.
- Die Elementbreiten werden in Prozent angegeben. Sie sind daher immer fließend und werden in Bezug auf das übergeordnete Element angepasst.
- Elemente haben einen Abstand, um den Abstand zwischen den einzelnen Elementen zu erstellen.
- Es gibt fünf Rasterpunkte: xs, sm, md, lg und xl.

Wenn Sie **neu sind oder Flexbox nicht gut kennen**, empfehlen wir Ihnen, dies zu lesen: [CSS-Tricks Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

## Abstände

Das responsive Raster konzentriert sich auf konsistente Abstandsbreiten und nicht auf die Spaltenbreite. Die Ränder und Spalten des Materialdesigns folgen einem Grundraster aus **8px** Quadraten. Die Abstandseigenschaft ist eine ganze Zahl zwischen 0 und einschließlich 10. Standardmäßig folgt der Abstand zwischen zwei Rasterelementen einer linearen Funktion: `output(spacing) = spacing * 8px`, z. B. `spacing={2}` erzeugt eine Lücke von 16px.

Diese Ausgabetransformationsfunktion kann durch [Verwendung des Themes](/customization/spacing/) angepasst werden.

{{"demo": "pages/components/grid/SpacingGrid.js", "bg": true}}

## Fluides Raster

Flüssige Raster verwenden Spalten, die den Inhalt skalieren und verkleinern. A fluid grid’s layout can use breakpoints to determine if the layout needs to change dramatically.

### Grundraster

Die Spaltenbreiten gelten für alle Rasterpunkte (d.h. `xs` und höher).

{{"demo": "pages/components/grid/CenteredGrid.js", "bg": true}}

### Raster mit Rasterpunkten

Für einige Spalten sind mehrere Breiten definiert, wodurch sich das Layout am definierten Rasterpunkten ändert.

{{"demo": "pages/components/grid/FullWidthGrid.js", "bg": true}}

## Interaktive Liste

Nachfolgend finden Sie eine interaktive Demo, mit der Sie die visuellen Ergebnisse der verschiedenen Einstellungen untersuchen können:

{{"demo": "pages/components/grid/InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## Automatisches Layout

The Auto-layout makes the *items* equitably share the available space. That also means you can set the width of one *item* and the others will automatically resize around it.

{{"demo": "pages/components/grid/AutoGrid.js", "bg": true}}

## Komplexes Raster

Die folgende Demo folgt nicht der Material Design-Spezifikation, sondern zeigt, wie das Raster zum Erstellen komplexer Layouts verwendet werden kann.

{{"demo": "pages/components/grid/ComplexGrid.js", "bg": true}}

## Verschachteltes Raster

The `container` and `item` properties are two independent booleans. Sie können kombiniert werden.

> Ein Flex **container** ist die Box, die von einem Element mit einer berechneten Anzeige von `flex` oder `Iinline-flex`. In-Flow-Kinder eines Flex-Containers heißen Flex **Elemente** und werden mit dem Flex-Layout-Modell angeordnet.

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/components/grid/NestedGrid.js", "bg": true}}

## Einschränkungen

### Negative Abstände

Es gibt eine Einschränkung beim negativen Rand, den wir verwenden, um den Abstand zwischen den Elementen zu implementieren. Ein horizontaler Bildlauf wird angezeigt, wenn ein negativer Rand weiter als `<body>` geht. Es gibt 3 verfügbare Problemumgehungen:

1. Nicht die Abstands-Funktion benutzen und den Abstand in Anzeigeraum `spacing={0}` (Standard) setzen.
2. Anwenden von Paddings auf das übergeordnete Element, wobei mindestens der halbe Abstand auf das untergeordnete Element angewendet wird:

```jsx
  <body>
    <div style={{ padding: 20 }}>
      <Grid container spacing={5}>
        //...
      </Grid>
    </div>
  </body>
```

3. Hinzufügen von `overflow-x: hidden;` zum Elternteil.

### white-space: nowrap;

The initial setting on flex items is `min-width: auto`. It's causing a positioning conflict when the children is using `white-space: nowrap;`. You can experience the issue with:

```jsx
<Grid item xs>
  <Typography noWrap>
```

In order for the item to stay within the container you need to set `min-width: 0`. In practice, you can set the `zeroMinWidth` property:

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/components/grid/AutoGridNoWrap.js", "bg": true}}

### direction: column | column-reverse

Obwohl die `Grid-` Komponente eine `direction-` Eigenschaft hat, die Werte von `row`, `row-reverse`, `column`und `column-reverse` zulässt, gibt es einige Funktionen, die in `column` und `column-reverse` Containern nicht unterstützt werden. Die Eigenschaften, die die Anzahl der Gitter definieren, die die Komponente für einen bestimmten Rasterpunkt (`xs`, `sm`, `md`, `lg` und `xl`) hat, konzentrieren sich auf die Steuerung der Breite und **nicht** auf die Höhe innerhalb der `column` und `column-reverse` Container. Wenn innerhalb `column` oder `column-reverse` - Container verwendete, können diese Eigenschaften unerwünschte Nebenwirkungen auf die Breite der `Grid` Elemente haben.

## CSS-Raster Layout

Die Material-UI bietet selbst keine CSS-Grid-Funktionalität. Wie Sie jedoch unten sehen, können Sie CSS-Grid einfach zum Layout Ihrer Seiten hinzufügen.

{{"demo": "pages/components/grid/CSSGrid.js", "bg": true}}