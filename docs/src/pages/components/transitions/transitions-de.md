---
title: Übergang React Komponente
components: Collapse, Fade, Grow, Slide, Zoom
---

# Übergänge

<p class="description">Übergänge helfen, eine Oberfläche ausdrucksvoll und einfach zu benutzen zu gestalten.</p>

Material-UI bietet eine Anzahl von Übergängen, die verwendet werden können, um einige einfache [Bewegungen](https://material.io/design/motion/) in deiner Anwendung einzuführen.

Um Server Rendering besser zu unterstützen, bietet Material-UI ein `style` Property auf den Kindern einiger Übergangs-Komponenten (Fade, Grow, Zoom, Slide). Das `style` Property muss auf das DOM angewendet werden, damit die Animation wie gewünscht funktioniert.

```jsx
// Das `props'-Objekt enthält eine` style'-Eigenschaft.
// Dieses musst du, wie hier gezeigt, an das `div` Element übergeben.
function MyComponent(props) {
  return (
    <div {...props}>
      Fade
    </div>
  );
}

export default Main() {
  return (
    <Fade>
      <MyComponent />
    </Fade>
  );
}
```

## Collapse

Klappt senkrecht vom oberen Rand des Kind-Elementes ausgehend auf. Das ` collapsedHeight` Property kann benutzt werden, um die minimale Höhe festzulegen, wenn nicht ausgeklappt.

{{"demo": "pages/components/transitions/SimpleCollapse.js"}}

## Fade

Blende von Transparent zu Undurchsichtig ein.

{{"demo": "pages/components/transitions/SimpleFade.js"}}

## Grow

Erweitert sich von der Mitte des untergeordneten Elements nach außen, während es von transparent nach opak einblendet.

Das zweite Beispiel zeigt, wie Sie die `transform-origin` ändern können und bedingt die ` Timeout` Eigenschaft anpassen, um die Eintrittsgeschwindigkeit zu beeinflussen.

{{"demo": "pages/components/transitions/SimpleGrow.js"}}

## Slide

Gleitet vom Bildschirmrand ein. Die Eigenschaft `direction` steuert, von welchem Bildschirmrand der Übergang beginnt.

Die `mountOnEnter` -Eigenschaft der Transition-Komponente verhindert, dass die untergeordnete Komponente gezeigt wird, bis `in` gleich `true` ist. Dadurch wird verhindert, dass die relativ positionierte Komponente von der Off-Screen-Position in die Ansicht gescrollt wird. In ähnlicher Weise entfernt die `unmountOnExit` -Eigenschaft die Komponente aus dem DOM, nachdem der Übergang vom Bildschirm beendet wurde.

{{"demo": "pages/components/transitions/SimpleSlide.js"}}

## Zoom

Erweitern sich von der Mitte des untergeordneten Elements nach außen.

In diesem Beispiel veranschaulicht, wie der Eintritts animation verzögert wird.

{{"demo": "pages/components/transitions/SimpleZoom.js"}}