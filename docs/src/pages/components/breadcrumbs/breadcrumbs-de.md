---
title: Breadcrumbs React-Komponente
components: Breadcrumbs, Link, Typography
---

# Breadcrumbs

<p class="description">Breadcrumbs erlauben es Nutzern, eine Auswahl aus einer Reihe von Werten zu treffen.</p>

## Einfache Breadcrumbs

{{"demo": "pages/components/breadcrumbs/SimpleBreadcrumbs.js"}}

## Benutzerdefiniertes Trennzeichen

In den folgenden Beispielen werden zwei textbasierte Trennzeichen und ein SVG Icon verwendet.

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## Breadcrumbs mit Icons

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## Zusammengeklappte Breadcrumbs

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Benutzerdefinierte Breadcrumbs

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Barrierefreiheit

Stelle sicher, dass du ein `aria-label` mit einem Beschreibungstext zur `Breadcrumbs`-Komponente hinzufügst.

Die Barrierefreiheit dieser Komponente setzt voraus:

- Die Links sind in einer geordneten Liste strukturiert (`<ol>`-Element).
- Um zu verhindern, dass Screenreader die visuellen Trennzeichen zwischen den Links vorlesen, sind diese durch `aria-hidden` vor ihnen versteckt.
- Ein nav-Element, dass mit einem `aria-label` gelabelt ist, markiert die Struktur als einen Breadcrumb-Pfad und macht sie zu einer Navigations-Landmarke, so dass sie einfach auffindbar ist.

## Integration mit react-router

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js"}}