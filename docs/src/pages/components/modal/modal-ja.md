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

## パフォーマンス

モーダルの内容は、DOMに **遅延マウント**されます。 これにより、Reactツリーに多くの閉じたモーダルを追加しても、ページが遅くなることはありません。

ただし、React要素を作成するにはコストもかかります。 次の例をみてください:

```jsx
<Modal open={false}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Dessert (100g serving)</TableCell>
        <TableCell align="right">Calories</TableCell>
        <TableCell align="right">Fat&nbsp;(g)</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map(row => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Modal>
```

決してマウントされないReact要素をたくさん作成します。 無駄です🐢。 モーダルボディを独自のコンポーネントに移動することで、レンダリングを**speed up**できます。

```jsx
<Modal open={false}>
  <TableComponent />
</Modal>
```

This way, you take advantage of [React render laziness evaluation](https://overreacted.io/react-as-a-ui-runtime/#lazy-evaluation). `TableComponent` レンダリングメソッドは、モーダルを開いたときにのみ評価されます。

## アクセシビリティ

- モーダルタイトルを参照する `aria-labelledby = "id..."` `モーダル`に追加してください。 さらに、 `モーダル`の `aria-describedby = "id..."` プロパティを使用して、モーダルの説明を指定できます。

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

- [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html)は、モーダルなコンテンツに基づいて、最も関連性の高い要素に最初に重点を置く場合に役立ちます。

## Server-side modal

React [は、サーバー上の](https://github.com/facebook/react/issues/13097) [`createPortal（）`](https://reactjs.org/docs/portals.html) APIをサポートしません。 これを機能させるには、`disablePortal`でこの機能を無効にする必要があります。

{{"demo": "pages/components/modal/ServerModal.js"}}