---
title: Portal React-Komponente
components: Portal
---

# Portal

<p class="description">Die Portalkomponente rendert ihre untergeordneten Elemente in eine neue "Unterstruktur" außerhalb der aktuellen Komponentenhierarchie.</p>

- 

Die untergeordneten Elemente der Portalkomponente werden an den angegebenen `Container` angehängt.

Die Komponente wird intern von den Komponenten [`Modal`](/components/modal/) und [`Popper`](/components/popper/) benutzt. Auf dem Server wird der Inhalt nicht gerendert. You have to wait for the client-side hydration to see the children.

## Einfaches Portal

{{"demo": "pages/components/portal/SimplePortal.js"}}