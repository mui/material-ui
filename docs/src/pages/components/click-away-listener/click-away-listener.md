---
title: Detect click outside React component
components: ClickAwayListener
---

# Click away listener

<p class="description">Detect if a click event happened outside of an element. It listens for clicks that occur somewhere in the document.</p>

- 📦 [1.5 kB gzipped](/size-snapshot).
- ⚛️ Support portals

## Example

For instance, if you need to hide a menu dropdown when people click anywhere else on your page:

{{"demo": "pages/components/click-away-listener/ClickAway.js"}}

Notice that the component only accepts one child element.
You can find a more advanced demo on the [Menu documentation section](/components/menus/#menulist-composition).

## Portal

The following demo uses [`Portal`](/components/portal/) to render the dropdown into a new "subtree" outside of current DOM hierarchy.

{{"demo": "pages/components/click-away-listener/PortalClickAway.js"}}

## Leading edge

By default, the component responds to the trailing events (click + touch end).
However, you can configure it to respond to the leading events (mouse down + touch start).

{{"demo": "pages/components/click-away-listener/LeadingClickAway.js"}}

> ⚠️ In this mode, only interactions on the scrollbar of the document is ignored.
