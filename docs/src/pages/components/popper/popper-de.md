---
title: Popper React-Komponente
components: Popper
---

# Popper

<p class="description">A Popper can be used to display some content on top of another. It's an alternative to react-popper.</p>

Einige wichtige Funktionen der `Popper` Komponente:

- 🕷 Popper relies on the 3rd party library ([Popper.js](https://github.com/FezVrasta/popper.js)) for perfect positioning.
- 💄 It's an alternative API to react-popper. It aims for simplicity.
- 📦 [10 kB gzipped](/size-snapshot) (7 kB from Popper.js).
- The children is [`Portal`](/components/portal/) to the body of the document to avoid rendering problems. You can disable this behavior with `disablePortal`.
- The scroll isn't blocked like with the [`Popover`](/components/popover/) component. The placement of the popper updates with the available area in the viewport.
- Durch Wegklicken wird die `Popper` Komponente ausgeblendet. Wenn Sie dieses Verhalten benötigen, können Sie den [`ClickAwayListener`](/components/click-away-listener/) verwenden - siehe das Beispiel im [Menü Dokumentation Abschnitt](/components/menus/#menulist-composition).
- Die `anchorEl` Komponente wird als Referenzobjekt übergeben, um eine neue Instanz von `Popper.js` zu erstellen.

## Einfacher Popper

{{"demo": "pages/components/popper/SimplePopper.js"}}

## Minimalistischer Popper

Sie können die Komponente ohne zusätzliche Abhängigkeiten verwenden.

{{"demo": "pages/components/popper/MinimalPopper.js"}}

## Blätter Spielplatz

{{"demo": "pages/components/popper/ScrollPlayground.js", "hideHeader": true}}

## Positionierter Popper

{{"demo": "pages/components/popper/PositionedPopper.js"}}

## Popper ohne Übergang

{{"demo": "pages/components/popper/NoTransitionPopper.js"}}

## Gefälschtes Referenzobjekt

Die `anchorEl` -Eigenschaft kann eine Referenz auf ein künstliches DOM-Element sein. Sie müssen nur ein Objekt mit der Form [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123) erstellen.

Markieren Sie einen Teil des Textes, um den Popper zu sehen:

{{"demo": "pages/components/popper/FakedReferencePopper.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### PopupState-Helfer

Es gibt ein Drittanbieter-Paket [`Material-Ui-Popup-Status`](https://github.com/jcoreio/material-ui-popup-state), das sich in den meisten Fällen um Popper Status kümmern kann.

{{"demo": "pages/components/popper/PopperPopupState.js"}}