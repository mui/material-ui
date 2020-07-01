---
title: Button コンポーネント
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

[Contained buttons](https://material.io/design/components/buttons.html#contained-button) are high-emphasis, distinguished by their use of elevation and fill. 重要なアクションを含みますが、アプリ内では最も重要ではない、といった場合に使われます。

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

You can remove the elevation with the `disableElevation` prop.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

## Text Buttons

[Text button](https://material.io/design/components/buttons.html#text-button)は、一般的にそれほど目立たせる必要のないアクションに対して用いられます。例えば、次のようなコンポーネントの中で用いられます。

- Dialog
- Card

Cardの中でText Buttonを用いることで、Cardの内容に重点を置くことができます。

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Outlined Buttons

[Outlined buttons](https://material.io/design/components/buttons.html#outlined-button) are medium-emphasis buttons. 重要なアクションを含みますが、アプリ内では最も重要ではない、といった場合に使われます。

Outlined buttonは、Contained buttonと比べると強調が弱く、 Text buttonと比べると強調の強いボタンです。

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Handling clicks

All components accept an `onClick` handler that is applied to the root DOM element.

```jsx
<Button onClick={() => { alert('clicked') }}>Click me</Button>
```

Note that the documentation [avoids](/guides/api/#native-properties) mentioning native props (there are a lot) in the API section of the components.

## Upload button

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## サイズ

大きなボタンと小さなボタンがありますか? `size`プロパティを使用します。

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Buttons with icons and label

ロゴはプレーンテキストよりも認識しやすいため、ボタンにアイコンを追加してアプリケーションのUXを強化したい場合があります。 たとえば、削除ボタンにごみ箱アイコンを付けるような場合です。 たとえば、削除ボタンにごみ箱アイコンを付けるような場合です。

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Icon Buttons

アイコンだけのボタンは、App BarやToolbarでよく使われます。

アイコンは、アイテムを一つ選択したり、アイテムに星を追加または削除するなど選択/解除できるトグルボタンにも適しています。

{{"demo": "pages/components/buttons/IconButtons.js"}}

## カスタムButton

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/button).

## 複雑なButton

テキストボタン、包含ボタン、フローティングアクションボタン、およびアイコンボタンは、同じコンポーネント（ `ButtonBase`上に構築されています。 この低レベルのコンポーネントを利用してカスタムインタラクションを構築できます。 この低レベルのコンポーネントを利用してカスタムインタラクションを構築できます。

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## サードパーティ製ルーティングライブラリ

一般的な使用例の1つは、ボタンを使用して新しいページへのナビゲーションを開始することです。 `ButtonBase` コンポーネントは、このユースケースを処理するためのプロパティを提供します 。 108/5000 ただし、特定のフォーカスについては` ButtonBase `には提供されているDOMノードが必要です。 これは、refをコンポーネントに添付し、 コンポーネントがこのrefを基になるDOMノードに転送することを期待することによって実現されます。 Given that many of the interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere.

こちらは [react-routerとの統合例](/guides/composition/#button).

## 制限事項

### Cursor not-allowed

The ButtonBase component sets `pointer-events: none;` on disabled buttons, which prevents the appearance of a disabled cursor.

If you wish to use `not-allowed`, you have two options:

1. **CSS only**. You can remove the pointer events style on the disabled state of the `<button>` element:

  ```css
  .MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
  ```

However:

- You should add `pointer-events: none;` back when you need to display [tooltips on disabled elements](/components/tooltips/#disabled-elements).
- The cursor won't change if you render something other than a button element, for instance, a link `<a>` element.

2. **DOM change**. You can wrap the button:

  ```jsx
  <span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
  ```

This has the advantage of supporting any element, for instance, a link `<a>` element.