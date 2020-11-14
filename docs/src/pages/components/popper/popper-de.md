---
title: React Popper component
components: Popper
---

# Popper

<p class="description">A Popper can be used to display some content on top of another. Es ist eine Alternative zu react-popper.</p>

Einige wichtige Funktionen der `Popper` Komponente:

- 🕷 Popper relies on the 3rd party library ([Popper.js](https://github.com/FezVrasta/popper.js)) for perfect positioning.
- 💄 Es ist eine alternative API zu react-popper. Es zielt auf Einfachheit ab.
- 📦 [10 kB gzipped](/size-snapshot) ([7 kB](https://bundlephobia.com/result?p=popper.js) from Popper.js).
- The children is [`Portal`](/components/portal/) to the body of the document to avoid rendering problems. Sie können dieses Verhalten mit `disablePortal` deaktivieren.
- The scroll isn't blocked like with the [`Popover`](/components/popover/) component. The placement of the popper updates with the available area in the viewport.
- Durch Wegklicken wird die `Popper` Komponente ausgeblendet. Wenn Sie dieses Verhalten benötigen, können Sie den [`ClickAwayListener`](/components/click-away-listener/) verwenden - siehe das Beispiel im [Menü Dokumentation Abschnitt](/components/menus/#menulist-composition).
- Die `anchorEl` Komponente wird als Referenzobjekt übergeben, um eine neue Instanz von `Popper.js` zu erstellen.

## Einfacher Popper

{{"demo": "pages/components/popper/SimplePopper.js"}}

## Übergänge

The open/close state of the popper can be animated with a render prop child and a transition component. This component should respect the following conditions:

- Be a direct child descendent of the popper.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. Call the `onExited` callback prop when the exit transition is completed.

Popper has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/popper/TransitionsPopper.js"}}

Alternativ können Sie [react-spring](https://github.com/react-spring/react-spring) verwenden.

{{"demo": "pages/components/popper/SpringPopper.js"}}

## Positionierter Popper

{{"demo": "pages/components/popper/PositionedPopper.js", "bg": true}}

## Blätter Spielplatz

{{"demo": "pages/components/popper/ScrollPlayground.js", "hideToolbar": true, "bg": true}}

## Gefälschtes Referenzobjekt

Die `anchorEl` -Eigenschaft kann eine Referenz auf ein künstliches DOM-Element sein. Sie müssen nur ein Objekt mit der Form [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123) erstellen.

Markieren Sie einen Teil des Textes, um den Popper zu sehen:

{{"demo": "pages/components/popper/FakedReferencePopper.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### PopupState-Helfer

Es gibt ein Drittanbieter-Paket [`Material-Ui-Popup-Status`](https://github.com/jcoreio/material-ui-popup-state), das sich in den meisten Fällen um Popper Status kümmern kann.

{{"demo": "pages/components/popper/PopperPopupState.js"}}