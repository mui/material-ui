---
title: Erkennt einen Klick außerhalb der Komponente
components: ClickAwayListener
---

# Wegklick Zuhörer

<p class="description">Detect if a click event happened outside of an element. Es hört auf Klicks, die irgendwo im Dokument auftreten.</p>

- 📦 [1.5 kB gzipped](/size-snapshot).
- ⚛️ Support portals

## Beispiel

Wenn Sie beispielsweise ein Dropdown-Menü ausblenden müssen, wenn Personen auf eine andere Stelle auf Ihrer Seite klicken:

{{"demo": "pages/components/click-away-listener/ClickAway.js"}}

Beachten Sie, dass die Komponente nur ein untergeordnetes Element akzeptiert. You can find a more advanced demo on the [Menu documentation section](/components/menus/#menulist-composition).

## Portal

The following demo uses [`Portal`](/components/portal/) to render the dropdown into a new "subtree" outside of current DOM hierarchy.

{{"demo": "pages/components/click-away-listener/PortalClickAway.js"}}

## Leading edge

By default, the component responds to the trailing events (click + touch end). However, you can configure it to respond to the leading events (mouse down + touch start).

{{"demo": "pages/components/click-away-listener/LeadingClickAway.js"}}

> ⚠️ In this mode, only interactions on the scrollbar of the document is ignored.