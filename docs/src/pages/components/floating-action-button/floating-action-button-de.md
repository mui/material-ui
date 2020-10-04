---
title: React Fab component
components: Fab
---

# Floating action button

<p class="description">A floating action button (FAB) performs the primary, or most common, action on a screen.</p>

## Floating Action Button

A [floating action button](https://material.io/design/components/buttons-floating-action-button.html) appears in front of all screen content, typically as a circular shape with an icon in its center. Es gibt zwei Arten von FABs: normal und erweitert.

Verwenden Sie eine FAB nur, wenn dies für die Darstellung der Hauptaktion eines Bildschirms am besten geeignet ist.

Es wird nur eine Floating Action Button pro Bildschirm empfohlen, um die am häufigsten verwendete Aktion darzustellen.

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Size

Use the `size` prop for larger or smaller floating action buttons.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

## Animation

Der floating-action-button, wird standardmäßig als expandierendes Material auf dem Bildschirm animiert.

Ein floating-action-button, der sich über mehrere seitliche Bildschirme (wie tabbed-screens) erstreckt, sollte kurz verschwinden und dann wieder erscheinen, wenn sich seine Aktion ändert.

Hierzu kann der Zoom-Übergang verwendet werden. Da sowohl die vorhandenen als auch die eingegebenen Animationen gleichzeitig ausgelöst werden, verwenden wir `enterDelay`, um die Animation der ausgehenden Floating Action Buttons zu beenden, bevor die neue Animation eintritt.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
