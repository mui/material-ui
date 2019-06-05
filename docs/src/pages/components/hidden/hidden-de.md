---
title: Hidden React-Komponente
components: Hidden
---

# Hidden

<p class="description">Wechseln Sie mit unseren versteckten Komponenten schnell und ansprechend den Sichtbarkeitswert von Komponenten und mehr.</p>

Alle Elemente sind sichtbar, außer **sie explizit versteckt**. To ease integration with Material-UI's [responsive breakpoints](/customization/breakpoints/), this component can be used to hide any content, or you can use it in conjunction with our [`Grid`](/components/grid/) component.

## So funktioniert es

Hidden funktioniert mit einem Bereich von Haltepunkten, z. B. `xsUp` oder `mdDown`, oder einem oder mehreren Haltepunkten, z. B. `only='sm'` oder `only {['md','xl']}`. Bereiche und individuelle Haltepunkte können gleichzeitig verwendet werden, um ein sehr benutzerdefiniertes Verhalten zu erreichen. Die Bereiche enthalten die angegebenen Haltepunkte.

```js
innerWidth  |xs      sm       md       lg       xl
            |--------|--------|--------|--------|-------->
width       |   xs   |   sm   |   md   |   lg   |   xl

smUp        |   show | hide
mdDown      |                     hide | show

```

## Implementierungen

### js

Standardmäßig wird die `js` Implementierung verwendet, die den Inhalt basierend auf der [`withWidth()`](/customization/breakpoints/#withwidth)-Komponente höherer Ordnung, die die Bildschirmgröße überwacht, ansprechend versteckt. Dies hat den Vorteil, dass überhaupt kein Inhalt dargestellt wird, wenn der Haltepunkt nicht erreicht wird.

### css

Wenn Sie serverseitiges Rendering verwenden, können Sie `implementation="css"` festlegen, wenn der Browser Ihren Inhalt nicht erneut auf dem Bildschirm anzeigen soll.

## Haltepunkte Up

Unter Verwendung einer beliebigen Haltepunkte `up` Eigenschaft, werden die angegebenen *Kinder* ausgeblendet *bei oder über* dem Haltepunkt.

{{"demo": "pages/components/hidden/BreakpointUp.js"}}

## Haltepunkte Down

Unter Verwendung einer beliebigen Haltepunkte `down` Eigenschaft, werden die angegebenen *Kinder* ausgeblendet *bei oder unter* dem Haltepunkt.

{{"demo": "pages/components/hidden/BreakpointDown.js"}}

## Haltepunkte einzeln

Unter Verwendung der Haltepunkt `only` Eigenschaft, werden die angegebenen *Kinder* *bei* dem Haltepunkt(en) ausgeblendet.

Die `only` Eigenschaft kann auf zwei Arten verwendet werden:

- Einzelnen Haltepunkt auflisten
- Listen Sie ein Array von Haltepunkten auf

{{"demo": "pages/components/hidden/BreakpointOnly.js"}}

## Integration mit Grid

Es ist üblich, das`Grid` an verschiedenen Haltepunkten zu ändern, und in vielen Fällen möchten Sie einige dieser Elemente ausblenden.

{{"demo": "pages/components/hidden/GridIntegration.js"}}