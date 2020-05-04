---
title: Detect click outside React component
components: ClickAwayListener
---

# Click Away Listener

<p class="description">Detecta si ocurrió un evento de clic fuera de un elemento. Escucha los clics que se producen en algún lugar del documento.</p>

- 📦 [1.5 kB comprimido](/size-snapshot).
- ⚛️ Support portals

## Ejemplo

Por ejemplo, si necesita ocultar un menú desplegable cuando las personas hacen clic en cualquier otro lugar de su página:

{{"demo": "pages/components/click-away-listener/ClickAway.js"}}

Notice that the component only accepts one child element. You can find a more advanced demo on the [Menu documentation section](/components/menus/#menulist-composition).

## Portal

The following demo uses [`Portal`](/components/portal/) to render the dropdown into a new "subtree" outside of current DOM hierarchy.

{{"demo": "pages/components/click-away-listener/PortalClickAway.js"}}

## Leading edge

By default, the component responds to the trailing events (click + touch end). However, you can configure it to respond to the leading events (mouse down + touch start).

{{"demo": "pages/components/click-away-listener/LeadingClickAway.js"}}

> ⚠️ In this mode, only interactions on the scrollbar of the document is ignored.