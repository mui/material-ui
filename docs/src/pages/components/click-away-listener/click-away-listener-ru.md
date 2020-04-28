---
title: Отлавливает щелчок за пределами компонента
components: ClickAwayListener
---

# Прослушиватель завершающего щелчка

<p class="description">Detect if a click event happened outside of an element. It listens for clicks that occur somewhere in the document.</p>

- 1.5 [1 кБ в сжатом виде](/size-snapshot).
- ⚛️ Support portals

## Пример

Например, если вам нужно скрыть выпадающее меню щелчком по странице за его пределами:

{{"demo": "pages/components/click-away-listener/ClickAway.js"}}

Notice that the component only accepts one child element. You can find a more advanced demo on the [Menu documentation section](/components/menus/#menulist-composition).

## Portal

The following demo uses [`Portal`](/components/portal/) to render the dropdown into a new "subtree" outside of current DOM hierarchy.

{{"demo": "pages/components/click-away-listener/PortalClickAway.js"}}

## Leading edge

By default, the component responds to the trailing events (click + touch end). However, you can configure it to respond to the leading events (mouse down + touch start).

{{"demo": "pages/components/click-away-listener/LeadingClickAway.js"}}

> ⚠️ In this mode, only interactions on the scrollbar of the document is ignored.