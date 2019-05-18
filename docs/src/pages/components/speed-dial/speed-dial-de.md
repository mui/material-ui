---
title: Schnellwahl React Komponente
components: SpeedDial, SpeedDialAction, SpeedDialIcon
---

# Schnellwahl

<p class="description">Wenn gedrückt, kann eine schwebende Aktionstaste drei bis sechs verwandte Aktionen in Form einer Kurzwahl anzeigen.</p>

Wenn mehr als sechs Aktionen erforderlich sind, sollten andere als FAB verwendet werden, um sie zu präsentieren.

## Einfache Schnellwahl

Die schwebende Aktionstaste kann verwandte Aktionen anzeigen.

{{"demo": "pages/components/speed-dial/SpeedDials.js"}}

## Kundenspezifisches Schließsymbol

Sie können ein alternatives Symbol für den geschlossenen und den geöffneten Zustand mit den `icon` und `openIcon` Eigenschaften der Komponente `SpeedDialIcon` bereitstellen.

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## Anhaltenden Aktion Tooltips

Die SpeedDialActions-Tooltips können dauerhaft angezeigt werden, sodass Benutzer nicht lange drücken müssen, um den Tooltip auf Touch-Geräten anzuzeigen.

Sie ist hier für alle Geräte zu Demonstrationszwecken aktiviert, in der Produktion jedoch kann durch die `isTouch` Logik die Eigenschaft bedingt festgelegt werden.

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}