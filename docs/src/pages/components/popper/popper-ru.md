---
title: Компонент React Popper
components: Popper
githubLabel: 'component: Popper'
---

# Popper

<p class="description">A Popper can be used to display some content on top of another. It's an alternative to react-popper.</p>

Some important features of the `Popper` component:

- 🕷 Popper relies on the 3rd party library ([Popper.js](https://github.com/FezVrasta/popper.js)) for perfect positioning.
- 💄 It's an alternative API to react-popper. It aims for simplicity.
- 📦 [10 kB gzipped](/size-snapshot) ([7 kB](https://bundlephobia.com/result?p=popper.js) from Popper.js).
- The children is [`Portal`](/components/portal/) to the body of the document to avoid rendering problems. You can disable this behavior with `disablePortal`.
- The scroll isn't blocked like with the [`Popover`](/components/popover/) component. The placement of the popper updates with the available area in the viewport.
- Clicking away does not hide the `Popper` component. If you need this behavior, you can use [`ClickAwayListener`](/components/click-away-listener/) - see the example in the [menu documentation section](/components/menus/#menulist-composition).
- The `anchorEl` is passed as the reference object to create a new `Popper.js` instance.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Simple Popper

{{"demo": "pages/components/popper/SimplePopper.js"}}

## Переходы

The open/close state of the popper can be animated with a render prop child and a transition component. This component should respect the following conditions:

- Be a direct child descendent of the popper.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. Call the `onExited` callback prop when the exit transition is completed.

Popper has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/popper/TransitionsPopper.js"}}

Alternatively, you can use [react-spring](https://github.com/react-spring/react-spring).

{{"demo": "pages/components/popper/SpringPopper.js"}}

## Positioned Popper

{{"demo": "pages/components/popper/PositionedPopper.js", "bg": true}}

## Scroll playground

{{"demo": "pages/components/popper/ScrollPlayground.js", "hideToolbar": true, "bg": true}}

## Faked reference object

Значение `anchorEl` может быть ссылкой на фиктивный DOM-элемент. Вам нужно создать объект с подобной [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123) структурой.

Выделите фрагмент текста, чтобы увидеть всплывающее окно:

{{"demo": "pages/components/popper/FakedReferencePopper.js"}}

## Дополнительные проекты

Для более сложных вариантов использования вы можете воспользоваться:

### PopupState helper

Существует сторонний пакет [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state), который, в большинстве случаев, заботится о состоянии всплывающего меню за вас.

{{"demo": "pages/components/popper/PopperPopupState.js"}}
