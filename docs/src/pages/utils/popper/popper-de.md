---
title: Popper React-Komponente
components: Popper
---
# Popper

<p class="description">Mit einem Popper können Inhalte übereinander angezeigt werden. Es ist eine Alternative zum React-Popper.</p>

Einige wichtige Funktionen der `Popper` Komponente:

- 
- 
- 
- Das untergeordnete Element des Hauptteils des Dokuments ist ein [`Portal`](/utils/portal/), um Probleme beim Rendern zu vermeiden. Sie können dieses Verhalten mit `disablePortal` deaktivieren.
- Bildlauf und Klick werden nicht wie bei der Komponente [`Popover`](/utils/popover/) blockiert. Die Platzierung des Popper wird mit dem verfügbaren Bereich im Ansichtsfenster aktualisiert.
- Die `anchorEl` Komponente wird als Referenzobjekt übergeben, um eine neue Instanz von `Popper.js` zu erstellen.

## Einfacher Popper

{{"demo": "pages/utils/popper/SimplePopper.js" }}

## Minimalistischer Popper

Sie können die Komponente ohne zusätzliche Abhängigkeiten verwenden.

{{"demo": "pages/utils/popper/MinimalPopper.js" }}

## Blätter Spielplatz

{{"demo": "pages/utils/popper/ScrollPlayground.js", "hideHeader": true}}

## Positionierter Popper

{{"demo": "pages/utils/popper/PositionedPopper.js"}}

## Popper ohne Übergang

{{"demo": "pages/utils/popper/NoTransitionPopper.js"}}

## Gefälschtes Referenzobjekt

Die `anchorEl` -Eigenschaft kann eine Referenz auf ein künstliches DOM-Element sein. Sie müssen nur ein Objekt mit der Form [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123) erstellen.

Markieren Sie einen Teil des Textes, um den Popper zu sehen:

{{"demo": "pages/utils/popper/FakedReferencePopper.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### PopupState-Helfer

Es gibt ein Drittanbieter-Paket [`Material-Ui-Popup-Status`](https://github.com/jcoreio/material-ui-popup-state), das sich in den meisten Fällen um Popper Status kümmern kann.

{{"demo": "pages/utils/popper/PopperPopupState.js"}}