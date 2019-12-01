---
title: Breadcrumbs React-Komponente
components: Breadcrumbs, Link, Typography
---

# Breadcrumbs

<p class="description">Breadcrumbs erlauben es Nutzern, eine Auswahl aus einer Reihe von Werten zu treffen.</p>

## Einfache Breadcrumbs

{{"demo": "pages/components/breadcrumbs/SimpleBreadcrumbs.js"}}

## Active last breadcrumb

Keep the last breadcrumb interactive.

{{"demo": "pages/components/breadcrumbs/ActiveLastBreadcrumb.js"}}

## Custom separator

In the following examples, we are using two string separators, and an SVG icon.

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## Breadcrumbs with icons

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## Collapsed breadcrumbs

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Customized breadcrumbs

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Integration with react-router

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js", "bg": true}}

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#breadcrumb)

Be sure to add a `aria-label` description on the `Breadcrumbs` component.

Die Barrierefreiheit dieser Komponente setzt voraus:

- Die Links sind in einer geordneten Liste strukturiert (`<ol>`-Element).
- Um zu verhindern, dass Screenreader die visuellen Trennzeichen zwischen den Links vorlesen, sind diese durch `aria-hidden` vor ihnen versteckt.
- Ein nav-Element, dass mit einem `aria-label` gelabelt ist, markiert die Struktur als einen Breadcrumb-Pfad und macht sie zu einer Navigations-Landmarke, so dass sie einfach auffindbar ist.