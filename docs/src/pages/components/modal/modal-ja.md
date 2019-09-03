---
title: Modal React component
components: Modal
---

# Modal

<p class="description">モーダルコンポーネントは、ダイアログ、ポップオーバー、ライトボックスなどを作成するための強固な基盤を提供します。</p>

コンポーネントは、backdropコンポーネントの前にその `children`ノードをレンダリングします。 `Modal` には、次のような重要な機能があります。

- 💄 一度に1つだけでは不十分な場合に、モーダルスタッキングを管理します。
- 🔐モーダルの下のインタラクションを無効にするためのバックドロップを作成します。
- 🔐open開いている間、ページコンテンツのスクロールを無効にします。
- ♿️フォーカスを適切に管理します。モーダルコンテンツに移動し、 して、モーダルが閉じられるまでそこに保持します。
- ♿️適切なARIAロールを自動的に追加します。
- 📦 [5 kB gzipped](/size-snapshot).

> **用語の注記**。 「モーダル」という用語は「ダイアログ」を意味するために使用されることがありますが、これは誤った呼び名です。 モーダルウィンドウは、UIの一部を説明します。 要素が[アプリケーションの他の部分との対話をブロックする場合](https://en.wikipedia.org/wiki/Modal_window)、その要素はモーダルであると見なされます。

モーダルダイアログを作成する場合は、モーダルを直接使用するのではなく、 [ダイアログ](/components/dialogs/) コンポーネントを使用することをお勧めします。 モーダルは、次のコンポーネントによって活用される低レベルの構成要素です。

- [Dialog](/components/dialogs/)
- [Drawer](/components/drawers/)
- [Menu](/components/menus/)
- [Popover](/components/popover/)

## Simple modal

{{"demo": "pages/components/modal/SimpleModal.js"}}

`アウトライン：0` CSSプロパティでアウトライン（多くの場合、青または金）を無効にできることに注意してください。

## Transições

The open/close state of the modal can be animated with a transition component. This component should respect the following conditions:

- Be a direct child descendent of the modal.
- Have an `in` prop. This corresponds to the open / close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow the modal to unmount the child content when closed and fully transitioned.

Modal has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/modal/TransitionsModal.js"}}

Alternatively, you can use [react-spring](https://github.com/react-spring/react-spring).

{{"demo": "pages/components/modal/SpringModal.js"}}

## パフォーマンス

The content of the modal is **lazily mounted** into the DOM. It ensures that having many closed modals in your React tree won't slow down your page.

However, creating React elements has a cost too. Consider the following case:

```jsx
<Modal open={false}>
  <table>
    <thead>
      <tr>
        <td>Dessert (100g serving)</td>
        <td>Calories</td>
        <td>Fat (g)</td>
      </tr>
    </thead>
    <tbody>
      {rows.map(row => (
        <tr key={row.id}>
          <th scope="row">
            {row.name}
          </th>
          <td>{row.calories}</td>
          <td>{row.fat}</TableCell>
        </tr>
      ))}
    </tbody>
  </table>
</Modal>
```

We create a lot of React elements that will never be mounted. It's wasteful 🐢. You can **speed up** the rendering by moving the modal body into its own component.

```jsx
<Modal open={false}>
  <TableComponent />
</Modal>
```

This way, you take advantage of [React render laziness evaluation](https://overreacted.io/react-as-a-ui-runtime/#lazy-evaluation). The `TableComponent` render method will only be evaluated when opening the modal.

## アクセシビリティ

- Be sure to add `aria-labelledby="id..."`, referencing the modal title, to the `Modal`. Additionally, you may give a description of your modal with the `aria-describedby="id..."` prop on the `Modal`.

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

- The [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) can help you set the initial focus on the most relevant element, based on your modal content.

## Server-side modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. In order to see the modal, you need to disable the portal feature with the `disablePortal` prop:

{{"demo": "pages/components/modal/ServerModal.js"}}