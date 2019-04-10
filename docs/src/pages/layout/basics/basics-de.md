# Grundlegendes

<p class="description">Layouts für Materialdesigns fördern die Konsistenz über Plattformen, Umgebungen und Bildschirmgrößen hinweg, indem einheitliche Elemente und Abstände verwendet werden.</p>

## Responsive UI

[Responsive Layouts](https://material.io/design/layout/responsive-layout-grid.html) passen sich in Material Design an jede mögliche Bildschirmgröße an. Wir bieten die folgenden Helfer, um die Benutzeroberfläche ansprechbar zu machen:

- [Grid](/layout/grid/): Das responsive Layoutraster von Material Design passt sich der Bildschirmgröße und -ausrichtung an und sorgt für Konsistenz über alle Layouts hinweg.
- [Container](/layout/container/): The container centers your content horizontally. Es ist das grundlegendste Layoutelement.
- [ Rasterpunkte](/layout/breakpoints/): API, die die Verwendung von Rasterpunkten in einer Vielzahl von Kontexten ermöglicht.
- [useMediaQuery](/layout/use-media-query/): Dies ist ein CSS-Media-Abfrage-Hook für React. Es wartet auf Übereinstimmungen mit einer CSS-Medienabfrage.
- [Hidden](/layout/hidden/): Wechseln Sie mit unseren versteckten Komponenten schnell und ansprechend den Sichtbarkeitswert von Komponenten und mehr.

## z-index

Mehrere Material-UI-Komponenten verwenden den `Z-Index `, die CSS-Eigenschaft, die das Layout steuert, indem eine dritte Achse zum Anordnen von Inhalt bereitgestellt wird. Wir verwenden eine Standard-Z-Indexskala in der Material-Benutzeroberfläche, welche Drawer, Modale, Snackbars, Tooltips und vieles mehr richtig, übereinander in Lagen aufbauen.

[Diese Werte](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/styles/zIndex.js) beginnen mit einer beliebigen Anzahl, hoch und spezifisch genug, um Konflikte idealerweise zu vermeiden.

- mobile stepper: 1000
- app bar: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- tooltip: 1500

Diese Werte können immer angepasst werden. Sie finden sie im Theme unter dem [`zIndex`](/customization/default-theme/?expend-path=$.zIndex) Schlüssel. Wir ermutigen nicht dazu, individuelle Werte anzupassen. Wenn Sie einen ändern, müssen Sie wahrscheinlich alle ändern.