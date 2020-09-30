---
title: Schnellwahl React Komponente
components: SpeedDial, SpeedDialAction, SpeedDialIcon
githubLabel: 'component: SpeedDial'
packageName: '@material-ui/lab'
---

# Schnellwahl

<p class="description">Wenn gedrückt, kann eine schwebende Aktionstaste drei bis sechs verwandte Aktionen in Form einer Kurzwahl anzeigen.</p>

Wenn mehr als sechs Aktionen erforderlich sind, sollten andere als FAB verwendet werden, um sie zu präsentieren.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Einfache Schnellwahl

Die schwebende Aktionstaste kann verwandte Aktionen anzeigen.

{{"demo": "pages/components/speed-dial/SpeedDials.js"}}

## Kundenspezifisches Schließsymbol

Sie können ein alternatives Symbol für den geschlossenen und den geöffneten Zustand mit den `icon` und `openIcon` Eigenschaften der Komponente `SpeedDialIcon` bereitstellen.

Die SpeedDialActions-Tooltips können dauerhaft angezeigt werden, sodass Benutzer nicht lange drücken müssen, um den Tooltip auf Touch-Geräten anzuzeigen.

## Kundenspezifisches Schließsymbol

Sie können ein alternatives Symbol für den geschlossenen und den geöffneten Zustand mit den `icon` und `openIcon` Eigenschaften der Komponente `SpeedDialIcon` bereitstellen.

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## Anhaltenden Aktion Tooltips

The SpeedDialActions tooltips can be displayed persistently so that users don't have to long-press in order to see the tooltip on touch devices.

It is enabled here across all devices for demo purposes, but in production it could use the `isTouch` logic to conditionally set the prop.

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}
