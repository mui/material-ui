---
title: React Popper component
components: Popper
githubLabel: 'component: Popper'
---

# Popper

<p class="description">A Popper can be used to display some content on top of another. Es ist eine Alternative zu react-popper.</p>

Einige wichtige Funktionen der `Popper` Komponente:

- 🕷 Popper relies on the 3rd party library ([Popper.js](https://github.com/popperjs/popper-core)) for perfect positioning.
- 💄 Es ist eine alternative API zu react-popper. Es zielt auf Einfachheit ab.
- 📦 [8 kB gzipped](/size-snapshot).
- The children is [`Portal`](/components/portal/) to the body of the document to avoid rendering problems. Sie können dieses Verhalten mit `disablePortal` deaktivieren.
- The scroll isn't blocked like with the [`Popover`](/components/popover/) component. The placement of the popper updates with the available area in the viewport.
- Durch Wegklicken wird die `Popper` Komponente ausgeblendet. Wenn Sie dieses Verhalten benötigen, können Sie den [`ClickAwayListener`](/components/click-away-listener/) verwenden - siehe das Beispiel im [Menü Dokumentation Abschnitt](/components/menus/#menulist-composition).
- Die `anchorEl` Komponente wird als Referenzobjekt übergeben, um eine neue Instanz von `Popper.js` zu erstellen.

Die Style-Funktion der [Palette](/system/palette/).

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

## Positioned popper

{{"demo": "pages/components/popper/PositionedPopper.js"}}

## Blätter Spielplatz

{{"demo": "pages/components/popper/ScrollPlayground.js", "hideToolbar": true, "bg": true}}

## Virtual element

Die `anchorEl` -Eigenschaft kann eine Referenz auf ein künstliches DOM-Element sein. You need to create an object shaped like the [`VirtualElement`](https://popper.js.org/docs/v2/virtual-elements/).

Markieren Sie einen Teil des Textes, um den Popper zu sehen:

{{"demo": "pages/components/popper/VirtualElementPopper.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### PopupState-Helfer

Es gibt ein Drittanbieter-Paket [`Material-Ui-Popup-Status`](https://github.com/jcoreio/material-ui-popup-state), das sich in den meisten Fällen um Popper Status kümmern kann.

{{"demo": "pages/components/popper/PopperPopupState.js"}}
