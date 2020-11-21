---
title: React Button component
components: Button, IconButton, ButtonBase
---

# Button (ボタン)

<p class="description">Buttonを使用すると、ユーザーは1回のタップでアクションを実行したり選択したりできます。</p>

[ボタン](https://material.io/design/components/buttons.html) 、ユーザーが実行できるアクションを伝えます。 これらは通常、UI全体の次のような場所に配置されます。

- Dialogs
- Modal window
- Form
- Card
- Toolbar

## Contained Buttons

[Contained buttons](https://material.io/design/components/buttons.html#contained-button) are high-emphasis, distinguished by their use of elevation and fill. アプリ内で強調すべきアクションを含みます。

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

`disableElevation`でシャドウを取り除けます。

{{"demo": "pages/components/buttons/DisableElevation.js"}}

## Text Buttons

[Text button](https://material.io/design/components/buttons.html#text-button)は、一般的にそれほど目立たせる必要のないアクションに対して用いられます。例えば、次のようなコンポーネントの中で用いられます。

- Dialog
- Card

Cardでは、テキストボタンを使用することでCardの内容に重点を置くことができます。

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Outlined Buttons

[Outlined buttons](https://material.io/design/components/buttons.html#outlined-button) は少し強調されたボタンです。 重要ではあるが、一番ではないアクションを含みます。 重要ではあるが、一番ではないアクションを含みます。 重要ではあるが、一番ではないアクションを含みます。

Outlined buttonは、Contained buttonより弱く、 Text buttonよりは強い強調をします。

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Handling clicks

全てのコンポーネントは `onClick`を受け付けます。これはルートのDOM要素に適用されます。

```jsx
<Button onClick={() => { alert('clicked') }}>クリックして!</Button>
```

ドキュメントでは(多すぎるので)ネイティブpropsに関しては [言及していない](/guides/api/#native-properties)ことに注意してください。

## Upload button

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## サイズ

大きなボタンと小さなボタンがありますか? `size`プロパティを使用します。

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Buttons with icons and label

ロゴはプレーンテキストよりも認識しやすいため、ボタンにアイコンを追加してアプリケーションのUXを強化したい場合があります。 たとえば、削除ボタンにごみ箱アイコンを付けるような場合です。 たとえば、削除ボタンにごみ箱アイコンを付けるような場合です。 たとえば、削除ボタンにごみ箱アイコンを付けるような場合です。 たとえば、削除ボタンにごみ箱アイコンを付けるような場合です。 たとえば、削除ボタンにごみ箱アイコンを付けるような場合です。

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Icon Buttons

アイコンだけのボタンは、App BarやToolbarでよく使われます。

アイコンは、アイテムを一つ選択したり、アイテムに星を追加または削除するなど選択/解除できるトグルボタンにも適しています。

{{"demo": "pages/components/buttons/IconButtons.js"}}

## カスタムButton

コンポーネントのカスタマイズの例を次に示します。 コンポーネントのカスタマイズ例を次に示します。 コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

🎨 インスピレーションを求めている場合は、 [MUI Treasury's customization examples](https://mui-treasury.com/styles/button) を確認すると良いでしょう。

## 複雑なButton

テキストボタン、コンテインボタン、フローティングアクションボタン、アイコンボタンは、同じコンポーネント(`ButtonBase`) を元に作成されています。 この元のコンポーネントを利用して独自のインタラクションを構築できます。 この元のコンポーネントを利用して独自のインタラクションを構築できます。

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## サードパーティ製ルーティングライブラリ

一般的な使用例の1つは、ボタンを使用して新しいページへのナビゲーションを発火することです。 `ButtonBase` コンポーネントは、このユースケースを扱うためのプロパティを提供します 。 ただし、特定のフォーカスについては` ButtonBase `には提供されているコンポーネントのDOMノードが必要です。 コンポーネントにrefを添付し、コンポーネントが基のDOMノードにrefを継承することを期待して成り立っています。 多くのインタラクティブなコンポーネントが `ButtonBase` に依存していることから、どこでもこの機能を使うことができるはずです。

こちらは [react-routerとの統合例](/guides/composition/#button).

## 制限事項

### Cursor not-allowed

ButtonBaseコンポーネントは無効化時に、 `pointer-events: none;` としています。無効化されたカーソルが出現することを抑制するためです。

`not-allowed`を意図的に使用したい場合、２つの選択肢があります。

1. **CSS だけ**. `<button>` エレメントの無効化時のポインターイベントを削除できます:

  ```css
  .MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
  ```

ただし:

- [tooltips を無効化したエレメント](/components/tooltips/#disabled-elements)で表示する必要がある時、 `pointer-events: none;` に戻す必要があります。
- ボタン要素以外をレンダリングする時、カーソルが変更されない時がある。例えば、link `<a>`要素。

2. **DOM 変更**. Buttonコンポーネントを囲う。

  ```jsx
  <span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
  ```

どのような要素でも対応できるメリットがあります。例えば、link `<a>` 要素。