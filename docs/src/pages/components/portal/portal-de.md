---
title: Portal React-Komponente
components: Portal
---

# Portal

<p class="description">Die Portalkomponente rendert ihre untergeordneten Elemente in eine neue "Unterstruktur" außerhalb der aktuellen Komponentenhierarchie.</p>

Die untergeordneten Elemente der Portalkomponente werden an den angegebenen `Container` angehängt.

The component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components. Auf dem Server wird der Inhalt nicht gerendert. Sie müssen auf die Hydratation des Klienten warten, um die Subkomponenten zu sehen.

## Einfaches Portal

{{"demo": "pages/components/portal/SimplePortal.js"}}