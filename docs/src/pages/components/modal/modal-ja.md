---
title: Modal React component
components: Modal
---

# Modal

<p class="description">モーダルコンポーネントは、ダイアログ、ポップオーバー、ライトボックスなどを作成するための強固な基盤を提供します。</p>

コンポーネントは、backdropコンポーネントの前にその `children`ノードをレンダリングします。 `Modal` には、次のような重要な機能があります。 `Modal` には、次のような重要な機能があります。

- 💄 一度に1つだけでは不十分な場合に、モーダルスタッキングを管理します。
- 🔐モーダルの下のインタラクションを無効にするためのバックドロップを作成します。
- 🔐open開いている間、ページコンテンツのスクロールを無効にします。
- ♿️フォーカスを適切に管理します。モーダルコンテンツに移動し、 して、モーダルが閉じられるまでそこに保持します。
- ♿️適切なARIAロールを自動的に追加します。
- [5 kB gzipped](/size-snapshot).

> **用語の注記**。 「モーダル」という用語は「ダイアログ」を意味するために使用されることがありますが、これは誤った呼び名です。 A modal window describes parts of a UI. 要素が[アプリケーションの他の部分との対話をブロックする場合](https://en.wikipedia.org/wiki/Modal_window)、その要素はモーダルであると見なされます。

The open/close state of the modal can be animated with a transition component. This component should respect the following conditions:

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Simple modal

{{"demo": "pages/components/modal/SimpleModal.js"}}

`アウトライン：0` CSSプロパティでアウトライン（多くの場合、青または金）を無効にできることに注意してください。

## トランジション

The open/close state of the modal can be animated with a transition component. This component should respect the following conditions:

- Be a direct child descendent of the modal.
- `in`プロパティを持っています。 これは、オープン/クローズ状態に対応します。
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow the modal to unmount the child content when closed and fully transitioned.

Modal has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/modal/TransitionsModal.js"}}

Alternatively, you can use [react-spring](https://github.com/react-spring/react-spring).

{{"demo": "pages/components/modal/SpringModal.js"}}

## Server-side modal

React は、サーバー上の [`createPortal（）`](https://reactjs.org/docs/portals.html) APIを[サポートしません。](https://github.com/facebook/react/issues/13097) In order to display the modal, you need to disable the portal feature with the `disablePortal` prop: In order to display the modal, you need to disable the portal feature with the `disablePortal` prop:

{{"demo": "pages/components/modal/ServerModal.js"}}

## 制限事項

### Focus trap

The modal moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes, however, it might create issues. In the event the users need to interact with another part of the page, e.g. with a chatbot window, you can disable the behavior:

```jsx
<Modal disableEnforceFocus />
```

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#dialog_modal)

- **用語の注記**。 「モーダル」という用語は「ダイアログ」を意味するために使用されることがありますが、これは誤った呼び名です。 A modal window describes parts of a UI. 要素が[アプリケーションの他の部分との対話をブロックする場合](https://en.wikipedia.org/wiki/Modal_window)、その要素はモーダルであると見なされます。
    
    ```jsx
    <Modal
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    >
    <h2 id="modal-title">
      My Title
    </h2>
    <p id="modal-description">
      My Description
    </p>
    </Modal>
    ```

- The [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) can help you set the initial focus on the most relevant element, based on your modal content.
- That is, users cannot interact with content outside an active modal window. Keep in mind that a "modal window" overlays on either the primary window or another modal window. Windows under a modal are **inert**. This might create [conflicting behaviors](#focus-trap).